import { useEffect, useRef, useState } from 'react'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import {
  AnnotationPlugin,
  DocumentManagerPlugin,
  HistoryPlugin,
  type AnnotationScope,
  type PluginRegistry,
  type PdfAnnotationObject,
} from '@embedpdf/react-pdf-viewer'
import { api } from '../../convex/_generated/api'
import { AnnotationSync, type SyncStatus } from './sync'

/** Connect one viewer document to the owner's persistent annotation history. */
export function useAnnotations(
  owner: string,
  documentId: string,
  registry: PluginRegistry | null,
) {
  const { isAuthenticated } = useConvexAuth()
  const rows = useQuery(
    api.annotations.list,
    isAuthenticated ? { document: documentId } : 'skip',
  )
  const save = useMutation(api.annotations.save)
  const [status, setStatus] = useState<SyncStatus>({
    pending: 0,
    error: '',
    conflict: false,
  })
  const [scope, setScope] = useState<AnnotationScope | null>(null)
  const [failure, setFailure] = useState('')
  const sync = useRef<AnnotationSync | null>(null)
  const applying = useRef(false)
  const seen = useRef(new Map<string, string | null>())
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const controller = new AnnotationSync(
      owner,
      localStorage,
      ({ queuedAt: _queuedAt, ...op }) => save(op),
      setStatus,
      documentId,
    )
    sync.current = controller
    const retry = () => {
      void controller.flush()
    }
    const unload = (event: BeforeUnloadEvent) => {
      if (controller.hasPending) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    window.addEventListener('online', retry)
    window.addEventListener('beforeunload', unload)
    return () => {
      controller.stop()
      sync.current = null
      window.removeEventListener('online', retry)
      window.removeEventListener('beforeunload', unload)
    }
  }, [owner, save, documentId])

  useEffect(() => {
    if (!registry) return
    const annotations = registry
      .getPlugin<AnnotationPlugin>('annotation')
      ?.provides()
    const documents = registry
      .getPlugin<DocumentManagerPlugin>('document-manager')
      ?.provides()
    if (!annotations || !documents) {
      setFailure('O leitor não conseguiu iniciar as ferramentas.')
      return
    }
    const current = annotations.forDocument(documentId)
    const off = annotations.onAnnotationEvent((event) => {
      if (event.documentId !== documentId) return
      if (event.type === 'loaded') {
        setScope(current)
        return
      }
      if (event.committed || applying.current) return
      const payload =
        event.type === 'delete' ? null : JSON.stringify(event.annotation)
      seen.current.set(event.annotation.id, payload)
      sync.current?.enqueue(event.annotation.id, event.pageIndex, payload)
    })
    const offError = documents.onDocumentError(() =>
      setFailure('Não foi possível abrir o PDF. Recarregue a página.'),
    )
    // A cached PDF may finish loading before the registry callback.
    if (documents.getActiveDocument() && current.getState()) setScope(current)
    return () => {
      off()
      offError()
    }
  }, [registry, documentId])

  useEffect(() => {
    if (!scope || !rows || !sync.current) return
    const controller = sync.current
    controller.receive(rows)
    applying.current = true
    try {
      const apply = (id: string, page: number, payload: string | null) => {
        if (seen.current.get(id) === payload) return
        const existing = scope.getAnnotationById(id)
        if (payload === null) {
          if (existing && existing.commitState !== 'deleted')
            scope.deleteAnnotation(page, id)
        } else {
          const annotation = decodeAnnotation(payload)
          if (existing && existing.commitState !== 'deleted')
            scope.updateAnnotation(page, id, annotation)
          else scope.importAnnotations([{ annotation }])
        }
        // Undo must not restore a stale version over a change from another device.
        registry
          ?.getPlugin<HistoryPlugin>('history')
          ?.provides()
          .forDocument(documentId)
          .purgeByMetadata<{ annotationIds?: string[] }>(
            (metadata) => metadata?.annotationIds?.includes(id) ?? false,
          )
        seen.current.set(id, payload)
      }
      for (const row of rows) {
        if (
          !controller.hasPendingFor(row.annotationId) &&
          row.revision >= controller.revisionFor(row.annotationId)
        )
          apply(row.annotationId, row.pageIndex, row.payload)
      }
      for (const draft of controller.drafts)
        apply(draft.annotationId, draft.pageIndex, draft.payload)
    } catch {
      setFailure(
        'Uma anotação não pôde ser restaurada. Seus dados continuam salvos.',
      )
    } finally {
      applying.current = false
    }
    void controller.flush()
  }, [rows, scope, registry, status.pending, refresh, documentId])

  const resolveConflict = (keep: boolean) => {
    sync.current?.resolveConflict(keep)
    setRefresh((n) => n + 1)
  }
  const retry = () => {
    void sync.current?.flush()
  }
  return {
    status,
    failure,
    ready: Boolean(rows && scope && !failure),
    resolveConflict,
    retry,
  }
}

// The serialized object comes from EmbedPDF; validate its envelope at this boundary.
function decodeAnnotation(payload: string): PdfAnnotationObject {
  const value: unknown = JSON.parse(payload)
  if (
    !value ||
    typeof value !== 'object' ||
    !('id' in value) ||
    typeof value.id !== 'string' ||
    !('type' in value) ||
    typeof value.type !== 'number' ||
    !('pageIndex' in value) ||
    !Number.isInteger(value.pageIndex) ||
    !('rect' in value)
  )
    throw new Error('Invalid annotation')
  return value as PdfAnnotationObject
}
