import type { AnnotationScope } from '@embedpdf/react-pdf-viewer'
import { decodeAnnotation } from './annotationPayload'
import { payloadImageKey, type ImageAssets } from './imageAssets'
import type { AnnotationRecord, AnnotationSync } from './sync'

type RestoreOptions = {
  rows: AnnotationRecord[]
  controller: Pick<AnnotationSync, 'drafts' | 'hasPendingFor' | 'revisionFor'>
  scope: Pick<AnnotationScope, 'getAnnotationById' | 'deleteAnnotation' | 'updateAnnotation' | 'importAnnotations'>
  images: Pick<ImageAssets, 'load' | 'remember'>
  seen: Map<string, string | null>
  cancelled: () => boolean
  hasImageJob: (id: string) => boolean
  setApplying: (value: boolean) => void
  discardHistory: (id: string) => void
}

/** Restore independent records despite a failed image, keeping only the latest local draft. */
export async function restoreAnnotations(options: RestoreOptions): Promise<boolean> {
  const { rows, controller, scope, images, seen, cancelled, hasImageJob,
    setApplying, discardHistory } = options
  let failed = false
  const apply = async (
    id: string, page: number, payload: string | null, draft = false,
  ) => {
    if (cancelled() || seen.get(id) === payload) return
    try {
      const key = payloadImageKey(payload)
      const data = key ? await images.load(key) : undefined
      if (cancelled() || hasImageJob(id) || (!draft && controller.hasPendingFor(id)))
        return
      if (key) images.remember(id, key)
      setApplying(true)
      try {
        const existing = scope.getAnnotationById(id)
        if (payload === null) {
          if (existing && existing.commitState !== 'deleted')
            scope.deleteAnnotation(page, id)
        } else {
          const annotation = decodeAnnotation(payload)
          if (existing && existing.commitState !== 'deleted')
            scope.updateAnnotation(page, id, annotation)
          else scope.importAnnotations([
            { annotation, ...(data ? { ctx: { data } } : {}) },
          ])
        }
        // Only remote changes invalidate the user's local undo history.
        if (!draft) discardHistory(id)
        seen.set(id, payload)
      } finally {
        setApplying(false)
      }
    } catch {
      failed = true
    }
  }
  for (const row of rows) {
    if (!controller.hasPendingFor(row.annotationId) &&
      row.revision >= controller.revisionFor(row.annotationId))
      await apply(row.annotationId, row.pageIndex, row.payload)
  }
  const latest = new Map(controller.drafts.map((draft) => [draft.annotationId, draft]))
  for (const draft of latest.values())
    await apply(draft.annotationId, draft.pageIndex, draft.payload, true)
  return failed
}
