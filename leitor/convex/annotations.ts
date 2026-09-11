import { readings } from '../shared/readings'
import { ConvexError, v } from 'convex/values'
import { mutation, query, type QueryCtx } from './_generated/server'

async function owner(ctx: Pick<QueryCtx, 'auth'>) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity || !process.env.OWNER_WORKOS_USER_ID || identity.subject !== process.env.OWNER_WORKOS_USER_ID) {
    throw new ConvexError('Acesso restrito ao proprietário.')
  }
  return identity.subject
}

export const access = query({ args: {}, handler: async ctx => {
  const identity = await ctx.auth.getUserIdentity()
  return { allowed: Boolean(identity && process.env.OWNER_WORKOS_USER_ID && identity.subject === process.env.OWNER_WORKOS_USER_ID) }
} })

function checkDocument(document: string) {
  if (document === 'laboratorio-anotacoes-v1') return 2
  const reading = readings.find(item => item.id === document)
  if (!reading) throw new ConvexError('Documento não autorizado.')
  return reading.pages
}

export const list = query({ args: { document: v.string() }, handler: async (ctx, args) => {
  const user = await owner(ctx)
  checkDocument(args.document)
  return ctx.db.query('annotations').withIndex('by_owner_document', q => q.eq('owner', user).eq('document', args.document)).collect()
} })

// Each annotation has its own revision. Unrelated strokes never overwrite each other.
export const save = mutation({
  args: {
    document: v.string(), annotationId: v.string(), pageIndex: v.number(),
    payload: v.union(v.string(), v.null()), baseRevision: v.number(), operationId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await owner(ctx)
    const pageCount = checkDocument(args.document)
    const receipt = await ctx.db.query('receipts').withIndex('by_operation', q => q.eq('owner', user).eq('operationId', args.operationId)).unique()
    if (receipt) return { status: 'saved' as const, revision: receipt.revision }
    if (!args.annotationId || args.annotationId.length > 160 || !args.operationId || args.operationId.length > 160 || !Number.isInteger(args.pageIndex) || args.pageIndex < 0 || args.pageIndex >= pageCount || !Number.isInteger(args.baseRevision) || args.baseRevision < 0) throw new ConvexError('Anotação inválida.')
    if (args.payload !== null) {
      if (args.payload.length > 200_000) throw new ConvexError('Anotação muito grande.')
      const data: unknown = JSON.parse(args.payload)
      if (!data || typeof data !== 'object' || !('id' in data) || data.id !== args.annotationId || !('pageIndex' in data) || data.pageIndex !== args.pageIndex || !('type' in data) || typeof data.type !== 'number') throw new ConvexError('Anotação inválida.')
    }
    const existing = await ctx.db.query('annotations').withIndex('by_annotation', q => q.eq('owner', user).eq('document', args.document).eq('annotationId', args.annotationId)).unique()
    if (existing?.operationId === args.operationId) return { status: 'saved' as const, revision: existing.revision }
    if ((existing?.revision ?? 0) !== args.baseRevision) return { status: 'conflict' as const, revision: existing?.revision ?? 0 }
    const revision = (existing?.revision ?? 0) + 1
    const record = { owner: user, document: args.document, annotationId: args.annotationId, pageIndex: args.pageIndex, payload: args.payload, revision, operationId: args.operationId, updatedAt: Date.now() }
    if (existing) await ctx.db.patch(existing._id, record)
    else await ctx.db.insert('annotations', record)
    await ctx.db.insert('receipts', { owner: user, operationId: args.operationId, revision })
    return { status: 'saved' as const, revision }
  },
})
