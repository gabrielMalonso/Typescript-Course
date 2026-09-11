import { internalMutation, internalQuery } from './_generated/server'
import { v } from 'convex/values'
import { owner, checkDocument } from './access'

const args = { document: v.string(), key: v.string() }
export const find = internalQuery({
  args,
  handler: async (ctx, args) => {
    const user = await owner(ctx)
    checkDocument(args.document)
    return ctx.db
      .query('images')
      .withIndex('by_owner_document_key', (q) =>
        q.eq('owner', user).eq('document', args.document).eq('key', args.key),
      )
      .unique()
  },
})

export const register = internalMutation({
  args: { ...args, storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    const user = await owner(ctx)
    checkDocument(args.document)
    const existing = await ctx.db
      .query('images')
      .withIndex('by_owner_document_key', (q) =>
        q.eq('owner', user).eq('document', args.document).eq('key', args.key),
      )
      .unique()
    // Concurrent retries may upload twice; only discard the newly uploaded duplicate.
    if (existing) {
      await ctx.storage.delete(args.storageId)
      return
    }
    await ctx.db.insert('images', { ...args, owner: user })
  },
})
