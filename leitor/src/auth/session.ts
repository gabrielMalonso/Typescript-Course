import { createContext, useCallback, useContext } from 'react'

export type Session = { user: { id: string }; accessToken: string }
export const SessionContext = createContext<{
  session: Session | null
  loading: boolean
  fetchToken: (force: boolean) => Promise<string | null>
} | null>(null)

export function useConvexSession() {
  const value = useContext(SessionContext)
  if (!value) throw new Error('Missing StudySession')
  const { fetchToken } = value
  const fetchAccessToken = useCallback(
    ({ forceRefreshToken }: { forceRefreshToken: boolean }) =>
      fetchToken(forceRefreshToken),
    [fetchToken],
  )
  return {
    isLoading: value.loading,
    isAuthenticated: Boolean(value.session),
    fetchAccessToken,
  }
}
export function useStudyOwner() {
  const value = useContext(SessionContext)
  if (!value?.session) throw new Error('Missing authenticated owner')
  return value.session.user.id
}

export function useStudyToken() {
  const value = useContext(SessionContext)
  if (!value) throw new Error('Missing StudySession')
  return value.fetchToken
}
