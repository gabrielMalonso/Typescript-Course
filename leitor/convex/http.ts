import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { internal } from './_generated/api'
import { owner, checkDocument } from './access'
import { imageKey, imageMime, MAX_IMAGE_BYTES } from '../shared/imageFiles'

const origins = new Set([
  'https://leitor-typescript-gabriel.gabrielm-alonso.chatgpt.site',
  'http://localhost:3003',
  'http://localhost:3002',
])
const files = httpAction(async (ctx, request) => {
  const origin = request.headers.get('origin')
  const headers = new Headers({
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
    Vary: 'Origin',
  })
  if (origin && origins.has(origin))
    headers.set('Access-Control-Allow-Origin', origin)
  if (request.method === 'OPTIONS') {
    if (!origin || !origins.has(origin))
      return new Response(null, { status: 403 })
    headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return new Response(null, { status: 204, headers })
  }
  try {
    await owner(ctx)
  } catch {
    return new Response('Unauthorized', { status: 401, headers })
  }
  const url = new URL(request.url)
  const document = url.searchParams.get('document') ?? ''
  const key = url.searchParams.get('key') ?? ''
  try {
    checkDocument(document)
  } catch {
    return new Response('Not found', { status: 404, headers })
  }
  if (!/^[a-f0-9]{64}$/.test(key))
    return new Response('Invalid image', { status: 400, headers })
  const existing = await ctx.runQuery(internal.images.find, { document, key })
  if (request.method === 'GET') {
    const blob = existing ? await ctx.storage.get(existing.storageId) : null
    if (!blob) return new Response('Not found', { status: 404, headers })
    headers.set('Content-Type', blob.type)
    return new Response(blob, { headers })
  }
  if (existing) return new Response(null, { status: 204, headers })
  if (Number(request.headers.get('content-length')) > MAX_IMAGE_BYTES)
    return new Response('Imagem maior que 5 MB.', { status: 413, headers })
  // Bound streamed requests as well as requests carrying Content-Length.
  const reader = request.body?.getReader()
  if (!reader) return new Response('Empty image', { status: 400, headers })
  const chunks: Uint8Array[] = []
  let length = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    length += value.byteLength
    if (length > MAX_IMAGE_BYTES) {
      await reader.cancel()
      return new Response('Imagem maior que 5 MB.', { status: 413, headers })
    }
    chunks.push(value)
  }
  const bytes = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.length
  }
  const mime = imageMime(bytes)
  if (!mime || (await imageKey(bytes.buffer)) !== key)
    return new Response('Invalid image', { status: 400, headers })
  const storageId = await ctx.storage.store(new Blob([bytes], { type: mime }))
  try {
    await ctx.runMutation(internal.images.register, {
      document,
      key,
      storageId,
    })
  } catch (error) {
    await ctx.storage.delete(storageId)
    throw error
  }
  return new Response(null, { status: 204, headers })
})
const http = httpRouter()
for (const method of ['GET', 'POST', 'OPTIONS'] as const)
  http.route({ path: '/reading-image', method, handler: files })
export default http
