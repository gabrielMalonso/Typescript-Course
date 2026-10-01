import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  padFiles: defineTable({
    owner: v.string(),
    fileId: v.string(),
    name: v.string(),
    source: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    revision: v.string(),
    version: v.number(),
    deletedAt: v.optional(v.number()),
  }).index('by_owner_file', ['owner', 'fileId']),
  padDrafts: defineTable({
    owner: v.string(),
    source: v.string(),
    revision: v.number(),
    operationId: v.string(),
    updatedAt: v.number(),
  }).index('by_owner', ['owner']),
  padDevices: defineTable({
    owner: v.string(),
    tokenHash: v.string(),
    name: v.string(),
    expiresAt: v.number(),
    revoked: v.boolean(),
  }).index('by_token', ['tokenHash']).index('by_owner', ['owner']),
  images: defineTable({
    owner: v.string(),
    document: v.string(),
    key: v.string(),
    storageId: v.id('_storage'),
  }).index('by_owner_document_key', ['owner', 'document', 'key']),
  receipts: defineTable({
    owner: v.string(),
    operationId: v.string(),
    revision: v.number(),
  }).index('by_operation', ['owner', 'operationId']),
  annotations: defineTable({
    owner: v.string(),
    document: v.string(),
    annotationId: v.string(),
    pageIndex: v.number(),
    payload: v.union(v.string(), v.null()),
    revision: v.number(),
    operationId: v.string(),
    updatedAt: v.number(),
  })
    .index('by_owner_document', ['owner', 'document'])
    .index('by_annotation', ['owner', 'document', 'annotationId']),
})
