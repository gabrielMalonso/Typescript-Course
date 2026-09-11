import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  receipts: defineTable({ owner: v.string(), operationId: v.string(), revision: v.number() }).index('by_operation', ['owner', 'operationId']),
  annotations: defineTable({
    owner: v.string(), document: v.string(), annotationId: v.string(),
    pageIndex: v.number(), payload: v.union(v.string(), v.null()),
    revision: v.number(), operationId: v.string(), updatedAt: v.number(),
  }).index('by_owner_document', ['owner', 'document'])
    .index('by_annotation', ['owner', 'document', 'annotationId']),
})
