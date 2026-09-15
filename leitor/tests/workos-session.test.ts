import { createHmac } from 'node:crypto'
import { expect, it, vi } from 'vitest'
import { WorkOS } from '@workos-inc/node'
import { sealData } from 'iron-session'

it('the installed WorkOS SDK authenticates the refreshed cookie on the same session object', async () => {
  const key = new TextEncoder().encode('local-test-key-with-at-least-32-characters')
  const password = 'local-cookie-password-with-at-least-32-characters'
  const jwt = (exp: number) => {
    const data = [ { alg: 'HS256' }, { sub: 'owner', sid: 'session', exp } ]
      .map(value => Buffer.from(JSON.stringify(value)).toString('base64url')).join('.')
    return data + '.' + createHmac('sha256', key).update(data).digest('base64url')
  }
  const expired = jwt(1), fresh = jwt(Math.floor(Date.now() / 1000) + 300)
  const user = { id: 'owner' }
  const oldCookie = await sealData({ accessToken: expired, refreshToken: 'refresh', user }, { password })
  const newCookie = await sealData({ accessToken: fresh, refreshToken: 'next', user }, { password })
  const workos = new WorkOS('test-key', { clientId: 'client' })
  const verificationKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
  vi.spyOn(workos.userManagement, 'getJWKS').mockResolvedValue(Object.assign(
    async () => verificationKey,
    { coolingDown: false, fresh: true, reloading: false, reload: async () => {}, jwks: () => undefined },
  ))
  const refresh = vi.spyOn(workos.userManagement, 'authenticateWithRefreshToken')
    .mockResolvedValue({ accessToken: fresh, refreshToken: 'next', sealedSession: newCookie,
      user: { ...user, email: 'owner@example.test', emailVerified: true, firstName: null,
        lastName: null, profilePictureUrl: null, createdAt: '', updatedAt: '',
        externalId: null, lastSignInAt: null, name: null, locale: null, metadata: {}, object: 'user' },
      authenticationMethod: 'Password' })
  const session = workos.userManagement.loadSealedSession({ sessionData: oldCookie, cookiePassword: password })
  expect(await session.authenticate()).toMatchObject({ authenticated: false, reason: 'invalid_jwt' })
  expect(await session.refresh()).toMatchObject({ authenticated: true, sealedSession: newCookie })
  expect(await session.authenticate()).toMatchObject({ authenticated: true, accessToken: fresh, user })
  expect(refresh).toHaveBeenCalledTimes(1)
})
