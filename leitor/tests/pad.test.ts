import { beforeEach, describe, expect, it, vi } from 'vitest'
import { convexTest } from 'convex-test'
import schema from '../convex/schema'
import { api } from '../convex/_generated/api'

const modules = import.meta.glob('../convex/**/*.ts')
beforeEach(() => { vi.stubEnv('OWNER_WORKOS_USER_ID', 'owner') })
const args = { source: 'const value = 1', baseRevision: 0, operationId: 'first' }
const token = 'a'.repeat(64)
const hash = async () => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))), b => b.toString(16).padStart(2, '0')).join('')
const study = { id: 'study-1', name: 'Arrays', source: 'const items = [1, 2]', createdAt: 100, updatedAt: 100, revision: 'edit-1' }

describe('Pad authorization and revisions', () => {
  it('rejects anonymous users and other accounts', async () => {
    const t = convexTest(schema, modules)
    for (const user of [t, t.withIdentity({ subject: 'other' })]) {
      await expect(user.query(api.pad.get, {})).rejects.toThrow()
      await expect(user.mutation(api.pad.save, args)).rejects.toThrow()
      await expect(user.query(api.pad.files, {})).rejects.toThrow()
      await expect(user.query(api.pad.file, { id: study.id })).rejects.toThrow()
      await expect(user.mutation(api.pad.saveFile, { file: study, baseVersion: 0 })).rejects.toThrow()
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
    await t.mutation(api.pad.saveFile, { file: study, baseVersion: 0, deviceToken: token })
    expect(await owner.query(api.pad.file, { id: study.id })).toMatchObject(study)
    expect(await t.query(api.pad.files, { deviceToken: token })).toEqual([{ id: study.id, version: 1 }])
    expect((await owner.query(api.pad.get, {}))?.source).toBe(args.source)
    await expect(t.query(api.annotations.list, { document: 'anything' })).rejects.toThrow()
    await t.mutation(api.pad.disconnect, { deviceToken: token })
    expect(await t.query(api.pad.session, { deviceToken: token })).toBeNull()
    await expect(t.query(api.pad.get, { deviceToken: token })).rejects.toThrow()
    await expect(t.query(api.pad.files, { deviceToken: token })).rejects.toThrow()
    await expect(t.mutation(api.pad.saveFile, { file: study, baseVersion: 1, deviceToken: token })).rejects.toThrow()
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

  it('stores separate studies, accepts retries and returns the winning revision on conflicts', async () => {
    const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
    const first = { file: study, baseVersion: 0 }
    expect(await t.mutation(api.pad.saveFile, first)).toEqual({ status: 'saved', file: { ...study, version: 1 } })
    expect(await t.mutation(api.pad.saveFile, first)).toEqual({ status: 'saved', file: { ...study, version: 1 } })
    const renamed = { ...study, name: 'Map', revision: 'edit-2', updatedAt: 200, createdAt: 999 }
    expect(await t.mutation(api.pad.saveFile, { file: renamed, baseVersion: 1 })).toEqual({ status: 'saved', file: { ...renamed, createdAt: 100, version: 2 } })
    const conflict = await t.mutation(api.pad.saveFile, { file: { ...study, source: 'offline edit', revision: 'edit-3' }, baseVersion: 1 })
    expect(conflict).toEqual({ status: 'conflict', file: { ...renamed, createdAt: 100, version: 2 } })
    await t.mutation(api.pad.saveFile, { file: { ...study, id: 'study-2' }, baseVersion: 0 })
    expect(await t.query(api.pad.files, {})).toEqual([{ id: 'study-1', version: 2 }, { id: 'study-2', version: 1 }])
    expect(await t.query(api.pad.file, { id: 'missing' })).toBeNull()
  })

  it('rejects invalid study payloads and revision reuse with changed contents', async () => {
    const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
    await t.mutation(api.pad.saveFile, { file: study, baseVersion: 0 })
    for (const file of [
      { ...study, source: 'changed without a new revision' },
      { ...study, source: 'x'.repeat(200_001) },
      { ...study, name: ' ' },
      { ...study, name: 'x'.repeat(121) },
      { ...study, id: '../invalid' },
      { ...study, updatedAt: 9e15 },
    ]) await expect(t.mutation(api.pad.saveFile, { file, baseVersion: 1 })).rejects.toThrow()
    await expect(t.mutation(api.pad.saveFile, { file: study, baseVersion: -1 })).rejects.toThrow()
    expect(await t.query(api.pad.file, { id: study.id })).toMatchObject(study)
  })

  it('never reads or overwrites records belonging to another owner', async () => {
    const t = convexTest(schema, modules)
    await t.run(ctx => ctx.db.insert('padFiles', { owner: 'other', fileId: study.id, name: 'Private', source: 'private', revision: 'private', version: 1, createdAt: 100, updatedAt: 100 }))
    const owner = t.withIdentity({ subject: 'owner' })
    expect(await owner.query(api.pad.files, {})).toEqual([])
    expect(await owner.query(api.pad.file, { id: study.id })).toBeNull()
    await owner.mutation(api.pad.saveFile, { file: study, baseVersion: 0 })
    expect((await owner.query(api.pad.files, {}))).toHaveLength(1)
    const other = await t.run(ctx => ctx.db.query('padFiles').withIndex('by_owner_file', q => q.eq('owner', 'other')).unique())
    expect(other?.source).toBe('private')
  })
})
