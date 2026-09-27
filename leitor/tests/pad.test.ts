import { beforeEach, describe, expect, it, vi } from 'vitest'
import { convexTest } from 'convex-test'
import schema from '../convex/schema'
import { api } from '../convex/_generated/api'

const modules = import.meta.glob('../convex/**/*.ts')
beforeEach(() => { vi.stubEnv('OWNER_WORKOS_USER_ID', 'owner') })
const args = { source: 'const value = 1', baseRevision: 0, operationId: 'first' }
const token = 'a'.repeat(64)
const hash = async () => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))), b => b.toString(16).padStart(2, '0')).join('')

describe('Pad authorization and revisions', () => {
  it('rejects anonymous users and other accounts', async () => {
    const t = convexTest(schema, modules)
    for (const user of [t, t.withIdentity({ subject: 'other' })]) {
      await expect(user.query(api.pad.get, {})).rejects.toThrow()
      await expect(user.mutation(api.pad.save, args)).rejects.toThrow()
      await expect(user.mutation(api.pad.connect, { tokenHash: await hash(), name: 'Tablet' })).rejects.toThrow()
    }
  })
  it('shares one draft, detects offline conflicts and accepts repeated saves', async () => {
    const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
    expect(await t.mutation(api.pad.save, args)).toEqual({ status: 'saved', revision: 1 })
    expect(await t.mutation(api.pad.save, args)).toEqual({ status: 'saved', revision: 1 })
    expect(await t.mutation(api.pad.save, { ...args, operationId: 'other', source: 'offline' })).toEqual({ status: 'conflict', revision: 1 })
    expect((await t.query(api.pad.get, {}))?.source).toBe(args.source)
    await expect(t.mutation(api.pad.save, { ...args, source: 'x'.repeat(200_001) })).rejects.toThrow()
  })
  it('pairs only through the owner and lets the device access Pad without a web session', async () => {
    const t = convexTest(schema, modules)
    const owner = t.withIdentity({ subject: 'owner' })
    expect(await t.query(api.pad.session, { deviceToken: token })).toBeNull()
    await owner.mutation(api.pad.connect, { tokenHash: await hash(), name: 'Tablet' })
    expect(await t.query(api.pad.session, { deviceToken: token })).toMatchObject({ owner: 'owner' })
    await t.mutation(api.pad.save, { ...args, deviceToken: token })
    expect((await owner.query(api.pad.get, {}))?.source).toBe(args.source)
    await expect(t.query(api.annotations.list, { document: 'anything' })).rejects.toThrow()
    await t.mutation(api.pad.disconnect, { deviceToken: token })
    expect(await t.query(api.pad.session, { deviceToken: token })).toBeNull()
    await expect(t.query(api.pad.get, { deviceToken: token })).rejects.toThrow()
    await expect(owner.mutation(api.pad.connect, { tokenHash: await hash(), name: 'Replay' })).rejects.toThrow()
  })
  it('allows remote revocation and rejects expired device credentials', async () => {
    const t = convexTest(schema, modules)
    const owner = t.withIdentity({ subject: 'owner' })
    await owner.mutation(api.pad.connect, { tokenHash: await hash(), name: 'Tablet' })
    const [record] = await owner.query(api.pad.devices, {})
    await t.run(ctx => ctx.db.patch(record.id, { expiresAt: Date.now() - 1 }))
    expect(await t.query(api.pad.session, { deviceToken: token })).toBeNull()
    await owner.mutation(api.pad.revoke, { id: record.id })
    expect(await owner.query(api.pad.devices, {})).toEqual([])
  })
})
