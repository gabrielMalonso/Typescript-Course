import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { ConvexProviderWithAuth, ConvexReactClient } from 'convex/react'

type Session = { user: { id: string }; accessToken: string }
const SessionContext = createContext<{ session: Session | null; loading: boolean; fetchToken: (force: boolean) => Promise<string | null> } | null>(null)
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

export function StudySession({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const fetchToken = useCallback(async (force: boolean) => {
    try {
      const result = await fetch('/auth/sessao' + (force ? '?refresh=1' : ''), { cache: 'no-store' })
      if (result.status === 401) { location.replace('/auth/entrar?returnTo=' + encodeURIComponent(location.pathname + location.search + location.hash)); return null }
      if (!result.ok) throw new Error('Session unavailable')
      const data: unknown = await result.json()
      if (!isSession(data)) throw new Error('Invalid session')
      setSession(data); setError(false)
      return data.accessToken
    } catch { setError(true); return null }
    finally { setLoading(false) }
  }, [])
  useEffect(() => {
    // Discard the laboratory SDK's old browser tokens after moving to HttpOnly sessions.
    for (const key of Object.keys(localStorage)) if (key.startsWith('workos:')) localStorage.removeItem(key)
    void fetchToken(false)
  }, [fetchToken])
  return <SessionContext.Provider value={{ session, loading, fetchToken }}>
    {loading ? <p role="status">Confirmando acesso…</p> : error || !session ? <main className="session-error"><p>Não foi possível confirmar sua sessão.</p><button onClick={() => void fetchToken(false)}>Tentar novamente</button></main> : <ConvexProviderWithAuth client={convex} useAuth={useConvexSession}>{children}</ConvexProviderWithAuth>}
  </SessionContext.Provider>
}
function useConvexSession() {
  const value = useContext(SessionContext)
  if (!value) throw new Error('Missing StudySession')
  const { fetchToken } = value
  const fetchAccessToken = useCallback(({ forceRefreshToken }: { forceRefreshToken: boolean }) => fetchToken(forceRefreshToken), [fetchToken])
  return { isLoading: value.loading, isAuthenticated: Boolean(value.session), fetchAccessToken }
}
export function useStudyOwner() {
  const value = useContext(SessionContext)
  if (!value?.session) throw new Error('Missing authenticated owner')
  return value.session.user.id
}
function isSession(value: unknown): value is Session {
  return Boolean(value && typeof value === 'object' && 'accessToken' in value && typeof value.accessToken === 'string' && 'user' in value && value.user && typeof value.user === 'object' && 'id' in value.user && typeof value.user.id === 'string')
}
