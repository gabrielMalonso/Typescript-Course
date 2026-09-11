import { owner, checkDocument } from './access'
import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const list = query({
  args: { document: v.string() },
  handler: async (ctx, args) => {
    const user = await owner(ctx)
    checkDocument(args.document)
    return ctx.db
      .query('annotations')
      .withIndex('by_owner_document', (q) =>
        q.eq('owner', user).eq('document', args.document),
      )
      .collect()
  },
})

// Each annotation has its own revision. Unrelated strokes never overwrite each other.
export const save = mutation({
  args: {
    document: v.string(),
    annotationId: v.string(),
    pageIndex: v.number(),
    payload: v.union(v.string(), v.null()),
    baseRevision: v.number(),
    operationId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await owner(ctx)
    const pageCount = checkDocument(args.document)
    const receipt = await ctx.db
      .query('receipts')
      .withIndex('by_operation', (q) =>
        q.eq('owner', user).eq('operationId', args.operationId),
      )
      .unique()
    if (receipt) return { status: 'saved' as const, revision: receipt.revision }
    if (
      !args.annotationId ||
      args.annotationId.length > 160 ||
      !args.operationId ||
      args.operationId.length > 160 ||
      !Number.isInteger(args.pageIndex) ||
      args.pageIndex < 0 ||
      args.pageIndex >= pageCount ||
      !Number.isInteger(args.baseRevision) ||
      args.baseRevision < 0
    )
      throw new ConvexError('Anotação inválida.')
    if (args.payload !== null) {
      if (args.payload.length > 200_000)
        throw new ConvexError('Anotação muito grande.')
      const data: unknown = JSON.parse(args.payload)
      if (
        !data ||
        typeof data !== 'object' ||
        !('id' in data) ||
        data.id !== args.annotationId ||
        !('pageIndex' in data) ||
        data.pageIndex !== args.pageIndex ||
        !('type' in data) ||
        typeof data.type !== 'number'
      )
        throw new ConvexError('Anotação inválida.')
      if ('_imageKey' in data) {
        if (typeof data._imageKey !== 'string')
          throw new ConvexError('Imagem inválida.')
        const key = data._imageKey
        const image = await ctx.db
          .query('images')
          .withIndex('by_owner_document_key', (q) =>
            q.eq('owner', user).eq('document', args.document).eq('key', key),
          )
          .unique()
        if (!image) throw new ConvexError('A imagem ainda não foi salva.')
      } else if (data.type === 13)
        throw new ConvexError('Imagem sem arquivo associado.')
    }
    const existing = await ctx.db
      .query('annotations')
      .withIndex('by_annotation', (q) =>
        q
          .eq('owner', user)
          .eq('document', args.document)
          .eq('annotationId', args.annotationId),
      )
      .unique()
    if (existing?.operationId === args.operationId)
      return { status: 'saved' as const, revision: existing.revision }
    if ((existing?.revision ?? 0) !== args.baseRevision)
      return { status: 'conflict' as const, revision: existing?.revision ?? 0 }
    const revision = (existing?.revision ?? 0) + 1
    const record = {
      owner: user,
      document: args.document,
      annotationId: args.annotationId,
      pageIndex: args.pageIndex,
      payload: args.payload,
      revision,
      operationId: args.operationId,
      updatedAt: Date.now(),
    }
    if (existing) await ctx.db.patch(existing._id, record)
    else await ctx.db.insert('annotations', record)
    await ctx.db.insert('receipts', {
      owner: user,
      operationId: args.operationId,
      revision,
    })
    return { status: 'saved' as const, revision }
  },
})
