import { ConvexError, v } from 'convex/values'
import { mutation, query, type QueryCtx } from './_generated/server'
import { owner } from './access'
import type { Doc } from './_generated/dataModel'

const credentials = { deviceToken: v.optional(v.string()) }
const MAX_SOURCE = 200_000
const DEVICE_LIFETIME = 30 * 24 * 60 * 60 * 1000

async function device(ctx: QueryCtx, token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) return null
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))
  const tokenHash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('')
  const record = await ctx.db.query('padDevices').withIndex('by_token', q => q.eq('tokenHash', tokenHash)).unique()
  return record && !record.revoked && record.expiresAt > Date.now() && record.owner === process.env.OWNER_WORKOS_USER_ID ? record : null
}

/** Device credentials authorize only Pad functions, never course materials or annotations. */
async function padOwner(ctx: QueryCtx, deviceToken?: string) {
  if (deviceToken === undefined) return owner(ctx)
  const record = await device(ctx, deviceToken)
  if (!record) throw new ConvexError('Entre novamente para sincronizar.')
  return record.owner
}

export const session = query({
  args: credentials,
  handler: async (ctx, { deviceToken }) => {
    if (deviceToken !== undefined) {
      const record = await device(ctx, deviceToken)
      return record ? { owner: record.owner, name: 'Gabriel', expiresAt: record.expiresAt } : null
    }
    const user = await owner(ctx)
    const identity = await ctx.auth.getUserIdentity()
    return { owner: user, name: identity?.givenName || identity?.name || 'Gabriel', expiresAt: null }
  },
})

export const get = query({
  args: credentials,
  handler: async (ctx, { deviceToken }) => {
    const user = await padOwner(ctx, deviceToken)
    const draft = await ctx.db.query('padDrafts').withIndex('by_owner', q => q.eq('owner', user)).unique()
    return draft ? { source: draft.source, revision: draft.revision, updatedAt: draft.updatedAt } : null
  },
})

export const save = mutation({
  args: { ...credentials, source: v.string(), baseRevision: v.number(), operationId: v.string() },
  handler: async (ctx, args) => {
    const user = await padOwner(ctx, args.deviceToken)
    if (args.source.length > MAX_SOURCE || !Number.isSafeInteger(args.baseRevision) || args.baseRevision < 0 || !/^[a-zA-Z0-9-]{1,80}$/.test(args.operationId))
      throw new ConvexError('Rascunho inválido ou maior que 200 mil caracteres.')
    const existing = await ctx.db.query('padDrafts').withIndex('by_owner', q => q.eq('owner', user)).unique()
    if (existing?.operationId === args.operationId || existing?.source === args.source)
      return { status: 'saved' as const, revision: existing.revision }
    if ((existing?.revision ?? 0) !== args.baseRevision)
      return { status: 'conflict' as const, revision: existing?.revision ?? 0 }
    const revision = (existing?.revision ?? 0) + 1
    const record = { owner: user, source: args.source, revision, operationId: args.operationId, updatedAt: Date.now() }
    if (existing) await ctx.db.patch(existing._id, record)
    else await ctx.db.insert('padDrafts', record)
    return { status: 'saved' as const, revision }
  },
})

const studyFields = {
  id: v.string(), name: v.string(), source: v.string(),
  createdAt: v.number(), updatedAt: v.number(), revision: v.string(),
  deletedAt: v.optional(v.number()),
}
const publicFile = (file: Doc<'padFiles'>) => ({
  id: file.fileId, name: file.name, source: file.source,
  createdAt: file.createdAt, updatedAt: file.updatedAt,
  revision: file.revision, version: file.version,
  ...(file.deletedAt === undefined ? {} : { deletedAt: file.deletedAt }),
})

// Subscribe to small revision records; download source only for files that changed.
export const files = query({
  args: credentials,
  handler: async (ctx, { deviceToken }) => {
    const user = await padOwner(ctx, deviceToken)
    const files = await ctx.db.query('padFiles').withIndex('by_owner_file', q => q.eq('owner', user)).collect()
    return files.map(file => ({ id: file.fileId, version: file.version }))
  },
})

export const file = query({
  args: { ...credentials, id: v.string() },
  handler: async (ctx, { deviceToken, id }) => {
    const user = await padOwner(ctx, deviceToken)
    const file = await ctx.db.query('padFiles').withIndex('by_owner_file', q => q.eq('owner', user).eq('fileId', id)).unique()
    return file ? publicFile(file) : null
  },
})

export const saveFile = mutation({
  args: { ...credentials, file: v.object(studyFields), baseVersion: v.number() },
  handler: async (ctx, { deviceToken, file, baseVersion }) => {
    const user = await padOwner(ctx, deviceToken)
    const validId = (value: string) => /^[a-zA-Z0-9-]{1,80}$/.test(value)
    const validDate = (value: number) => Number.isSafeInteger(value) && value >= 0 && value <= 8.64e15
    if (!validId(file.id) || !validId(file.revision) || !file.name.trim() || file.name.length > 120
      || file.source.length > MAX_SOURCE || !validDate(file.createdAt) || !validDate(file.updatedAt)
      || (file.deletedAt !== undefined && (!validDate(file.deletedAt) || file.source !== ''))
      || !Number.isSafeInteger(baseVersion) || baseVersion < 0)
      throw new ConvexError('Arquivo inválido ou maior que 200 mil caracteres.')
    const existing = await ctx.db.query('padFiles').withIndex('by_owner_file', q => q.eq('owner', user).eq('fileId', file.id)).unique()
    if (existing?.revision === file.revision) {
      if (existing.source !== file.source || existing.name !== file.name || existing.deletedAt !== file.deletedAt)
        throw new ConvexError('Uma revisão não pode representar conteúdos diferentes.')
      return { status: 'saved' as const, file: publicFile(existing) }
    }
    // Deleted IDs stay terminal, including writes from older/offline app versions.
    if (existing?.deletedAt !== undefined)
      return { status: file.deletedAt === undefined ? 'conflict' as const : 'saved' as const, file: publicFile(existing) }
    if ((existing?.version ?? 0) !== baseVersion)
      return { status: 'conflict' as const, file: existing ? publicFile(existing) : null }
    const version = (existing?.version ?? 0) + 1
    const record = {
      owner: user, fileId: file.id, name: file.name, source: file.source,
      createdAt: existing?.createdAt ?? file.createdAt, updatedAt: file.updatedAt,
      revision: file.revision, version,
      ...(file.deletedAt === undefined ? {} : { deletedAt: file.deletedAt }),
    }
    if (existing) await ctx.db.patch(existing._id, record)
    else await ctx.db.insert('padFiles', record)
    return { status: 'saved' as const, file: { ...file, createdAt: record.createdAt, version } }
  },
})

// The native app creates a random secret locally; only its hash travels in the login URL.
// No anonymous writes or bearer credentials in browser history are needed to pair a device.
export const connect = mutation({
  args: { tokenHash: v.string(), name: v.string() },
  handler: async (ctx, { tokenHash, name }) => {
    const user = await owner(ctx)
    if (!/^[a-f0-9]{64}$/.test(tokenHash) || name.length < 1 || name.length > 80) throw new ConvexError('Dispositivo inválido.')
    const existing = await ctx.db.query('padDevices').withIndex('by_token', q => q.eq('tokenHash', tokenHash)).unique()
    // A revoked/expired link can never reactivate a credential.
    if (existing) throw new ConvexError('Este link já foi usado. Inicie uma nova entrada no aplicativo.')
    await ctx.db.insert('padDevices', { owner: user, tokenHash, name, expiresAt: Date.now() + DEVICE_LIFETIME, revoked: false })
  },
})

export const devices = query({
  args: {},
  handler: async ctx => {
    const user = await owner(ctx)
    return (await ctx.db.query('padDevices').withIndex('by_owner', q => q.eq('owner', user)).collect())
      .filter(d => !d.revoked && d.expiresAt > Date.now())
      .map(d => ({ id: d._id, name: d.name, expiresAt: d.expiresAt }))
  },
})

export const revoke = mutation({
  args: { id: v.id('padDevices') },
  handler: async (ctx, { id }) => {
    const user = await owner(ctx)
    const record = await ctx.db.get(id)
    if (!record || record.owner !== user) throw new ConvexError('Dispositivo não encontrado.')
    await ctx.db.patch(id, { revoked: true })
  },
})

export const disconnect = mutation({
  args: { deviceToken: v.string() },
  handler: async (ctx, { deviceToken }) => {
    const record = await device(ctx, deviceToken)
    if (record) await ctx.db.patch(record._id, { revoked: true })
  },
})
