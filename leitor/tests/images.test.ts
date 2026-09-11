import { beforeEach, expect, it } from 'vitest'
import { convexTest } from 'convex-test'
import schema from '../convex/schema'
import { api } from '../convex/_generated/api'
import { readings } from '../shared/readings'
import { imageKey, MAX_IMAGE_BYTES } from '../shared/imageFiles'

const modules = import.meta.glob('../convex/**/*.ts')
const document = readings[0].id
const png = Uint8Array.from(
  Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a1ioAAAAASUVORK5CYII=',
    'base64',
  ),
)
const key = await imageKey(png.buffer)
const path = (doc = document, hash = key) =>
  `/reading-image?document=${encodeURIComponent(doc)}&key=${hash}`
beforeEach(() => {
  process.env.OWNER_WORKOS_USER_ID = 'owner'
})

it('requires the owner for upload and download, including a known image key', async () => {
  const t = convexTest(schema, modules)
  const owner = t.withIdentity({ subject: 'owner' })
  expect(
    (await owner.fetch(path(), { method: 'POST', body: png })).status,
  ).toBe(204)
  for (const client of [t, t.withIdentity({ subject: 'stranger' })]) {
    expect((await client.fetch(path())).status).toBe(401)
    expect(
      (await client.fetch(path(), { method: 'POST', body: png })).status,
    ).toBe(401)
  }
  delete process.env.OWNER_WORKOS_USER_ID
  expect((await owner.fetch(path())).status).toBe(401)
})

it('restores exact image bytes, deduplicates uploads and isolates readings', async () => {
  const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
  expect((await t.fetch(path(), { method: 'POST', body: png })).status).toBe(
    204,
  )
  expect((await t.fetch(path(), { method: 'POST', body: png })).status).toBe(
    204,
  )
  const response = await t.fetch(path())
  expect(response.status).toBe(200)
  expect(response.headers.get('content-type')).toBe('image/png')
  expect(response.headers.get('cache-control')).toContain('no-store')
  expect(new Uint8Array(await response.arrayBuffer())).toEqual(png)
  expect((await t.fetch(path(readings[1].id))).status).toBe(404)
  await t.run(async (ctx) => {
    expect(await ctx.db.query('images').collect()).toHaveLength(1)
    expect(await ctx.db.system.query('_storage').collect()).toHaveLength(1)
  })
})

it('rejects tampered hashes, unsupported formats, oversized bodies and unknown documents', async () => {
  const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
  expect(
    (
      await t.fetch(path(document, '0'.repeat(64)), {
        method: 'POST',
        body: png,
      })
    ).status,
  ).toBe(400)
  const text = new TextEncoder().encode('<svg/>')
  expect(
    (
      await t.fetch(path(document, await imageKey(text.buffer)), {
        method: 'POST',
        body: text,
      })
    ).status,
  ).toBe(400)
  expect(
    (
      await t.fetch(path(), {
        method: 'POST',
        body: new Uint8Array(MAX_IMAGE_BYTES + 1),
      })
    ).status,
  ).toBe(413)
  expect(
    (
      await t.fetch(path(), {
        method: 'POST',
        headers: { 'Content-Length': String(MAX_IMAGE_BYTES + 1) },
        body: png,
      })
    ).status,
  ).toBe(413)
  expect(
    (await t.fetch(path('unknown'), { method: 'POST', body: png })).status,
  ).toBe(404)
  await t.run(async (ctx) => {
    expect(await ctx.db.query('images').collect()).toHaveLength(0)
  })
})

it('saves image positions only after the file exists for the same owner and reading', async () => {
  const t = convexTest(schema, modules).withIdentity({ subject: 'owner' })
  const args = {
    document,
    annotationId: 'image',
    pageIndex: 0,
    payload: JSON.stringify({
      id: 'image',
      pageIndex: 0,
      type: 13,
      _imageKey: key,
    }),
    baseRevision: 0,
    operationId: 'create',
  }
  await expect(t.mutation(api.annotations.save, args)).rejects.toThrow()
  await t.fetch(path(), { method: 'POST', body: png })
  expect(await t.mutation(api.annotations.save, args)).toEqual({
    status: 'saved',
    revision: 1,
  })
  await expect(
    t.mutation(api.annotations.save, {
      ...args,
      document: readings[1].id,
      operationId: 'other-reading',
    }),
  ).rejects.toThrow()
  expect(
    await t.mutation(api.annotations.save, {
      ...args,
      baseRevision: 1,
      operationId: 'move',
      payload: JSON.stringify({
        id: 'image',
        pageIndex: 0,
        type: 13,
        _imageKey: key,
        rect: { origin: { x: 100, y: 200 }, size: { width: 200, height: 100 } },
      }),
    }),
  ).toEqual({ status: 'saved', revision: 2 })
  await t.run(async (ctx) => {
    expect(await ctx.db.query('images').collect()).toHaveLength(1)
  })
})
