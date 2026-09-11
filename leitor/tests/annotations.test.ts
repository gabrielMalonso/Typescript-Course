import { describe, it, expect, beforeEach } from 'vitest'
import { convexTest } from 'convex-test'
import schema from '../convex/schema'
import { api } from '../convex/_generated/api'
const modules = import.meta.glob('../convex/**/*.ts')
const document = 'laboratorio-anotacoes-v1'
const args = { document, annotationId: 'a', pageIndex: 0, payload: JSON.stringify({ id: 'a', pageIndex: 0, type: 15 }), baseRevision: 0, operationId: 'one' }
beforeEach(() => { process.env.OWNER_WORKOS_USER_ID = 'owner' })
describe('private annotations', () => {
  it('rejects anonymous and other identities on reads and writes', async () => {
    const t = convexTest(schema, modules)
    for (const client of [t, t.withIdentity({ subject: 'stranger' })]) {
      expect(await client.query(api.annotations.access, {})).toEqual({ allowed: false })
      await expect(client.query(api.annotations.list, { document })).rejects.toThrow()
      await expect(client.mutation(api.annotations.save, args)).rejects.toThrow()
    }
  })
  it('fails closed when owner configuration is missing', async () => {
    delete process.env.OWNER_WORKOS_USER_ID
    const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
    await expect(t.mutation(api.annotations.save, args)).rejects.toThrow()
  })
  it('persists strokes, detects stale edits, preserves unrelated edits and deduplicates retries', async () => {
    const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
    expect(await t.mutation(api.annotations.save, args)).toEqual({ status: 'saved', revision: 1 })
    expect(await t.mutation(api.annotations.save, { ...args, operationId: 'stale' })).toEqual({ status: 'conflict', revision: 1 })
    expect(await t.mutation(api.annotations.save, { ...args, payload: null, baseRevision: 1, operationId: 'delete' })).toEqual({ status: 'saved', revision: 2 })
    expect(await t.mutation(api.annotations.save, args)).toEqual({ status: 'saved', revision: 1 })
    expect((await t.query(api.annotations.list, { document }))[0].payload).toBeNull()
    await t.mutation(api.annotations.save, { ...args, annotationId: 'b', payload: JSON.stringify({ id: 'b', pageIndex: 0, type: 15 }), operationId: 'other' })
    expect(await t.query(api.annotations.list, { document })).toHaveLength(2)
  })
  it('rejects other documents and invalid page or payload envelopes', async () => {
    const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
    for (const bad of [{ document: 'course' }, { pageIndex: 2 }, { payload: '{}' }, { payload: 'bad JSON' }]) await expect(t.mutation(api.annotations.save, { ...args, ...bad })).rejects.toThrow()
  })
})

it('isolates the same annotation ID across readings and validates each file length', async () => {
  const { readings } = await import('../shared/readings')
  const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
  const [first, second] = readings
  await t.mutation(api.annotations.save, { ...args, document: first.id })
  expect(await t.query(api.annotations.list, { document: second.id })).toHaveLength(0)
  await t.mutation(api.annotations.save, { ...args, document: second.id, operationId: 'second-book' })
  expect(await t.query(api.annotations.list, { document: first.id })).toHaveLength(1)
  await expect(t.mutation(api.annotations.save, { ...args, document: second.id, pageIndex: second.pages, operationId: 'past-end' })).rejects.toThrow()
})
