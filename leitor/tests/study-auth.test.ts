import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sealData } from 'iron-session'
import { safeReturnTo, withStudyAccess } from '../worker/study-auth'
const mocks = vi.hoisted(() => ({ identity: '', exchange: vi.fn(), authorize: vi.fn(() => 'https://api.workos.com/authorize') }))
vi.mock('@workos-inc/node', () => ({ WorkOS: class {
  userManagement = {
    loadSealedSession: ({ sessionData }: { sessionData: string }) => ({
      authenticate: async () => sessionData === 'valid' ? { authenticated: true, user: { id: mocks.identity }, accessToken: 'short-token' } : { authenticated: false, reason: 'invalid_session_cookie' },
      getLogoutUrl: async () => 'https://api.workos.com/logout',
    }),
    authenticateWithCodeAndVerifier: mocks.exchange,
    getAuthorizationUrl: mocks.authorize,
  }
} }))
const env = { WORKOS_API_KEY: 'test-key', WORKOS_CLIENT_ID: 'client', OWNER_WORKOS_USER_ID: 'owner', STUDY_COOKIE_PASSWORD: 'a-secret-for-test-sessions-at-least-32-chars' }
const origin = 'https://study.example'
const next = vi.fn(async () => new Response('private content'))
beforeEach(() => { mocks.identity = 'owner'; mocks.exchange.mockReset(); mocks.authorize.mockClear(); next.mockClear() })
describe('whole-site authorization', () => {
  it('automatically starts AuthKit while preserving the reading destination and avoiding error loops', async () => {
    const response = await withStudyAccess(new Request(origin + '/ler/book?mode=read', { headers: { accept: 'text/html' } }), env, next)
    expect(response.headers.get('location')).toBe('/auth/entrar?returnTo=%2Fler%2Fbook%3Fmode%3Dread')
    const landing = await withStudyAccess(new Request(origin + response.headers.get('location')), env, next)
    const html = await landing.text()
    expect(html).toContain('location.replace(u.href)')
    expect(html).toContain('target+location.hash')
    expect(html).toContain('<main hidden>')
    const start = await withStudyAccess(new Request(origin + '/auth/iniciar?returnTo=%2Fler%2Fbook%23page%3D3'), env, next)
    expect(start.headers.get('location')).toBe('https://api.workos.com/authorize')
    expect(mocks.authorize).toHaveBeenCalledWith(expect.objectContaining({ provider: 'authkit', codeChallengeMethod: 'S256', redirectUri: origin + '/auth/retorno' }))
    expect(start.headers.get('set-cookie')).toContain('HttpOnly')
    const failed = await withStudyAccess(new Request(origin + '/auth/entrar?error=1'), env, next)
    expect(await failed.text()).not.toContain('location.replace')
    expect(next).not.toHaveBeenCalled()
  })
  it('blocks pages, PDFs and bundles before their content is served', async () => {
    for (const path of ['/', '/ler/book', '/assets/book.pdf', '/assets/catalog.js', '/laboratorio/anotacoes-v1.pdf']) {
      const response = await withStudyAccess(new Request(origin + path), env, next)
      expect(response.status).toBe(401)
      expect(await response.text()).not.toContain('private content')
    }
    expect(next).not.toHaveBeenCalled()
  })
  it('rejects another account and forged cookies', async () => {
    mocks.identity = 'stranger'
    for (const token of ['valid', 'forged']) expect((await withStudyAccess(new Request(origin, { headers: { cookie: '__Host-study-session=' + token } }), env, next)).status).toBe(401)
    expect(next).not.toHaveBeenCalled()
  })
  it('fails closed with missing configuration and preserves safe return URLs', async () => {
    expect((await withStudyAccess(new Request(origin), { ...env, STUDY_COOKIE_PASSWORD: '' }, next)).status).toBe(503)
    for (const value of ['//evil.test', '/\\evil.test', 'https://evil.test', '/auth/iniciar', '/\r\nLocation:evil']) expect(safeReturnTo(value)).toBe('/')
    expect(safeReturnTo('/ler/book#page=3')).toBe('/ler/book#page=3')
  })
  it('does not cache authenticated pages or expose refresh tokens', async () => {
    const response = await withStudyAccess(new Request(origin + '/assets/book.pdf', { headers: { cookie: '__Host-study-session=valid' } }), env, next)
    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('private, no-store')
    const token = await withStudyAccess(new Request(origin + '/auth/sessao', { headers: { cookie: '__Host-study-session=valid' } }), env, next)
    expect(await token.json()).toEqual({ user: { id: 'owner' }, accessToken: 'short-token' })
  })
  it('rejects cross-origin session requests and GET logout', async () => {
    const headers = { cookie: '__Host-study-session=valid', origin: 'https://evil.test' }
    expect((await withStudyAccess(new Request(origin + '/auth/sessao', { headers }), env, next)).status).toBe(403)
    expect((await withStudyAccess(new Request(origin + '/auth/sair', { headers: { cookie: headers.cookie } }), env, next)).status).toBe(405)
  })
  it('accepts same-origin logout forms with an opaque Origin header', async () => {
    const response = await withStudyAccess(new Request(origin + '/auth/sair', { method: 'POST', headers: { cookie: '__Host-study-session=valid', origin: 'null', 'sec-fetch-site': 'same-origin' } }), env, next)
    expect(response.status).toBe(303)
    expect(response.headers.get('set-cookie')).toContain('Max-Age=0')
  })
  it('binds the callback to its sealed PKCE state and sets HttpOnly cookies', async () => {
    const sealed = await sealData({ nonce: 'state', verifier: 'verifier', returnTo: '/ler/book' }, { password: env.STUDY_COOKIE_PASSWORD, ttl: 600 })
    const headers = { cookie: '__Host-study-session-login=' + sealed }
    const bad = await withStudyAccess(new Request(origin + '/auth/retorno?code=code&state=wrong', { headers }), env, next)
    expect(bad.headers.get('location')).toBe('/auth/entrar?error=1')
    expect(mocks.exchange).not.toHaveBeenCalled()
    mocks.exchange.mockResolvedValue({ user: { id: 'owner' }, sealedSession: 'sealed-cookie' })
    const ok = await withStudyAccess(new Request(origin + '/auth/retorno?code=code&state=state', { headers }), env, next)
    expect(ok.headers.get('location')).toBe('/ler/book')
    expect(ok.headers.get('set-cookie')).toContain('__Host-study-session=sealed-cookie; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000; Secure')
    expect(mocks.exchange).toHaveBeenCalledWith(expect.objectContaining({ code: 'code', codeVerifier: 'verifier' }))
  })
})
