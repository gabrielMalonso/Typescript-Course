import { imageKey, imageMime, MAX_IMAGE_BYTES } from '../../shared/imageFiles'

/** Binary drafts live in IndexedDB; annotation positions remain in the existing outbox. */
export class ImageAssets {
  private uploaded = new Set<string>()
  private memory = new Map<string, ArrayBuffer>()
  private keys = new Map<string, string>()
  private db: Promise<IDBDatabase> | undefined
  private owner: string
  private document: string
  private token: (force: boolean) => Promise<string | null>
  private contexts = new Map<string, ArrayBuffer>()
  constructor(
    owner: string,
    document: string,
    token: (force: boolean) => Promise<string | null>,
  ) {
    this.owner = owner
    this.document = document
    this.token = token
  }
  remember(id: string, key: string) {
    this.keys.set(id, key)
  }
  private diskKey(key: string) {
    return `${this.owner}:${this.document}:${key}`
  }
  private database() {
    return (this.db ??= new Promise((resolve, reject) => {
      const request = indexedDB.open('study-image-drafts', 1)
      request.onupgradeneeded = () => request.result.createObjectStore('files')
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    }))
  }
  private async disk(
    key: string,
    mode: 'get' | 'put' | 'delete',
    data?: ArrayBuffer,
  ): Promise<ArrayBuffer | undefined> {
    const db = await this.database()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(
        'files',
        mode === 'get' ? 'readonly' : 'readwrite',
      )
      const files = transaction.objectStore('files')
      const id = this.diskKey(key)
      const request =
        mode === 'get'
          ? files.get(id)
          : mode === 'put'
            ? files.put(data, id)
            : files.delete(id)
      transaction.oncomplete = () =>
        resolve(
          request.result instanceof ArrayBuffer ? request.result : undefined,
        )
      transaction.onerror = () => reject(transaction.error)
      transaction.onabort = () => reject(transaction.error)
    })
  }
  async prepare(id: string, context: unknown) {
    const known = this.keys.get(id)
    if (known) return known
    if (
      context &&
      typeof context === 'object' &&
      'data' in context &&
      context.data instanceof ArrayBuffer
    )
      this.contexts.set(id, context.data)
    const data = this.contexts.get(id)
    if (!data)
      throw new Error(
        'Não foi possível preparar a imagem. Tente inseri-la novamente.',
      )
    if (data.byteLength > MAX_IMAGE_BYTES)
      throw new Error('A imagem deve ter no máximo 5 MB.')
    if (!imageMime(new Uint8Array(data)))
      throw new Error('Use uma imagem PNG ou JPEG.')
    const key = await imageKey(data)
    this.memory.set(key, data)
    await this.disk(key, 'put', data)
    this.keys.set(id, key)
    this.contexts.delete(id)
    return key
  }
  private async request(key: string, data?: ArrayBuffer) {
    const url = new URL('/reading-image', import.meta.env.VITE_CONVEX_SITE_URL)
    url.searchParams.set('document', this.document)
    url.searchParams.set('key', key)
    const send = async (force: boolean) => {
      const token = await this.token(force)
      if (!token) throw new Error('Entre novamente para acessar a imagem.')
      return fetch(url, {
        method: data ? 'POST' : 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          ...(data
            ? {
                'Content-Type':
                  imageMime(new Uint8Array(data)) ?? 'application/octet-stream',
              }
            : {}),
        },
        body: data,
        cache: 'no-store',
      })
    }
    let response = await send(false)
    if (response.status === 401) response = await send(true)
    if (!response.ok)
      throw new Error('Não foi possível sincronizar a imagem. Tente novamente.')
    return response
  }
  async upload(key: string) {
    if (this.uploaded.has(key)) return
    const data = this.memory.get(key) ?? (await this.disk(key, 'get'))
    if (data) await this.request(key, data)
    else await this.load(key)
    this.uploaded.add(key)
    // Keep cached bytes in this viewer for undo, but remove the durable upload draft.
    await this.disk(key, 'delete')
  }
  async load(key: string) {
    const cached = this.memory.get(key) ?? (await this.disk(key, 'get'))
    if (cached) return cached
    const data = await (await this.request(key)).arrayBuffer()
    this.memory.set(key, data)
    this.uploaded.add(key)
    return data
  }
}

export function payloadImageKey(payload: string | null): string | undefined {
  if (!payload) return undefined
  const value: unknown = JSON.parse(payload)
  if (
    value &&
    typeof value === 'object' &&
    '_imageKey' in value &&
    typeof value._imageKey === 'string'
  )
    return value._imageKey
}
