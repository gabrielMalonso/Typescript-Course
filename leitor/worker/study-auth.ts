import { WorkOS } from '@workos-inc/node'
import { sealData, unsealData } from 'iron-session'

export type AuthEnv = { WORKOS_API_KEY: string; WORKOS_CLIENT_ID: string; OWNER_WORKOS_USER_ID: string; STUDY_COOKIE_PASSWORD: string }
type LoginState = { nonce: string; verifier: string; returnTo: string }
const clients = new Map<string, WorkOS>()
const noStore = { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' }

export function safeReturnTo(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\r\n]/.test(value) || value.startsWith('/auth/')) return '/'
  return value
}
function cookieName(request: Request) { return new URL(request.url).protocol === 'https:' ? '__Host-study-session' : 'study-session' }
function readCookie(request: Request, name: string) { return request.headers.get('cookie')?.split(';').map(x => x.trim()).find(x => x.startsWith(name + '='))?.slice(name.length + 1) ?? '' }
function cookie(request: Request, name: string, value: string, age: number) {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${age}${new URL(request.url).protocol === 'https:' ? '; Secure' : ''}`
}
function redirect(location: string, headers?: Headers) { const h = new Headers(headers); h.set('Location', location); return new Response(null, { status: 303, headers: h }) }
function sameOrigin(request: Request) {
  const site = request.headers.get('sec-fetch-site')
  if (site === 'cross-site' || site === 'same-site') return false
  // Form navigation with no-referrer can send Origin: null. Fetch Metadata still identifies its origin.
  if (site === 'same-origin') return true
  return !request.headers.get('origin') || request.headers.get('origin') === new URL(request.url).origin
}
function loginPage(returnTo: string, failed: boolean) {
  const nonce = crypto.randomUUID()
  return new Response(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Entrar · Leitor de Aulas</title><style>body{margin:0;background:#f7f5f0;color:#24313b;font:17px/1.6 system-ui}main{max-width:420px;margin:12vh auto;padding:32px}h1{font:36px/1.2 Georgia,serif}a{display:inline-block;background:#244b61;color:white;padding:12px 24px;border-radius:8px;text-decoration:none}small{display:block;margin-top:24px;color:#586570}@media(prefers-color-scheme:dark){body{background:#191e23;color:#f0eee8}small{color:#b5bdc6}}</style><main><h1>Leitor de Aulas</h1><p>${failed ? 'Não foi possível confirmar o acesso. Entre com a conta autorizada.' : 'Entre para continuar seus estudos.'}</p><a href="/auth/iniciar?returnTo=${encodeURIComponent(returnTo)}">Entrar com Google</a><small>Acesso exclusivo de Gabriel Alonso.</small></main><script nonce="${nonce}">if(location.hash){const a=document.querySelector('main a');const u=new URL(a.href);const target=u.searchParams.get('returnTo');if(!target.includes('#')){u.searchParams.set('returnTo',target+location.hash);a.href=u.href;}}</script></html>`, { headers: { ...noStore, 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': `default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'` } })
}

/** Protect requests reaching the Worker. Sites serves static assets behind its own owner-only policy. */
export async function withStudyAccess(request: Request, env: AuthEnv, next: () => Promise<Response>): Promise<Response> {
  const url = new URL(request.url), headers = new Headers(noStore)
  if (!env.WORKOS_API_KEY || !env.WORKOS_CLIENT_ID || !env.OWNER_WORKOS_USER_ID || !env.STUDY_COOKIE_PASSWORD || env.STUDY_COOKIE_PASSWORD.length < 32) return new Response('Acesso temporariamente indisponível.', { status: 503, headers })
  let workos = clients.get(env.WORKOS_CLIENT_ID)
  if (!workos) { workos = new WorkOS(env.WORKOS_API_KEY, { clientId: env.WORKOS_CLIENT_ID }); clients.set(env.WORKOS_CLIENT_ID, workos) }
  const name = cookieName(request)
  const flowName = name + '-login'
  if (url.pathname === '/auth/entrar') return loginPage(safeReturnTo(url.searchParams.get('returnTo')), url.searchParams.has('error'))
  if (url.pathname === '/auth/iniciar') {
    const verifier = crypto.randomUUID() + crypto.randomUUID()
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
    const challenge = btoa(String.fromCharCode(...new Uint8Array(digest))).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
    const state: LoginState = { nonce: crypto.randomUUID(), verifier, returnTo: safeReturnTo(url.searchParams.get('returnTo')) }
    const sealed = await sealData(state, { password: env.STUDY_COOKIE_PASSWORD, ttl: 600 })
    headers.append('Set-Cookie', cookie(request, flowName, sealed, 600))
    return redirect(workos.userManagement.getAuthorizationUrl({ provider: 'GoogleOAuth', redirectUri: url.origin + '/auth/retorno', state: state.nonce, codeChallenge: challenge, codeChallengeMethod: 'S256' }), headers)
  }
  if (url.pathname === '/auth/retorno') {
    headers.append('Set-Cookie', cookie(request, flowName, '', 0))
    try {
      const state = await unsealData<Partial<LoginState>>(readCookie(request, flowName), { password: env.STUDY_COOKIE_PASSWORD, ttl: 600 })
      const code = url.searchParams.get('code')
      if (!state.nonce || state.nonce !== url.searchParams.get('state') || !state.verifier || !code) throw new Error('Invalid login flow')
      const result = await workos.userManagement.authenticateWithCodeAndVerifier({ code, codeVerifier: state.verifier, session: { sealSession: true, cookiePassword: env.STUDY_COOKIE_PASSWORD } })
      if (result.user.id !== env.OWNER_WORKOS_USER_ID || !result.sealedSession) throw new Error('Restricted account')
      headers.append('Set-Cookie', cookie(request, name, result.sealedSession, 60 * 60 * 24 * 30))
      return redirect(safeReturnTo(state.returnTo ?? null), headers)
    } catch { return redirect('/auth/entrar?error=1', headers) }
  }
  if (url.pathname.startsWith('/auth/') && !sameOrigin(request)) return new Response('Forbidden', { status: 403, headers })
  const session = workos.userManagement.loadSealedSession({ sessionData: readCookie(request, name), cookiePassword: env.STUDY_COOKIE_PASSWORD })
  let auth = await session.authenticate().catch(() => ({ authenticated: false as const, reason: 'invalid_session_cookie' as const }))
  if ((!auth.authenticated && auth.reason === 'invalid_jwt') || (auth.authenticated && url.pathname === '/auth/sessao' && url.searchParams.has('refresh'))) {
    const refreshed = await session.refresh()
    if (refreshed.authenticated && refreshed.sealedSession) {
      headers.append('Set-Cookie', cookie(request, name, refreshed.sealedSession, 60 * 60 * 24 * 30))
      auth = await session.authenticate()
    } else if (!refreshed.authenticated && refreshed.retryable) return new Response('Tente novamente em instantes.', { status: 503, headers })
  }
  if (!auth.authenticated || auth.user.id !== env.OWNER_WORKOS_USER_ID) {
    if (url.pathname === '/auth/sessao' || !request.headers.get('accept')?.includes('text/html')) return new Response('Unauthorized', { status: 401, headers })
    return redirect('/auth/entrar?returnTo=' + encodeURIComponent(safeReturnTo(url.pathname + url.search)), headers)
  }
  if (url.pathname === '/auth/sessao') return Response.json({ user: { id: auth.user.id }, accessToken: auth.accessToken }, { headers })
  if (url.pathname === '/auth/sair') {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers })
    headers.append('Set-Cookie', cookie(request, name, '', 0))
    return redirect(await session.getLogoutUrl({ returnTo: url.origin + '/auth/entrar' }), headers)
  }
  const response = await next()
  const protectedResponse = new Response(response.body, response)
  headers.forEach((value, key) => { if (key === 'set-cookie') protectedResponse.headers.append(key, value); else protectedResponse.headers.set(key, value) })
  return protectedResponse
}
