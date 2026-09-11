import { readings } from '../shared/readings'
import { ConvexError } from 'convex/values'
import type { QueryCtx } from './_generated/server'

export async function owner(ctx: Pick<QueryCtx, 'auth'>) {
  const identity = await ctx.auth.getUserIdentity()
  if (
    !identity ||
    !process.env.OWNER_WORKOS_USER_ID ||
    identity.subject !== process.env.OWNER_WORKOS_USER_ID
  ) {
    throw new ConvexError('Acesso restrito ao proprietário.')
  }
  return identity.subject
}

export function checkDocument(document: string) {
  const reading = readings.find((item) => item.id === document)
  if (!reading) throw new ConvexError('Documento não autorizado.')
  return reading.pages
}
