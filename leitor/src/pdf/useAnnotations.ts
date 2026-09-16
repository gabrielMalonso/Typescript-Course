import { useEffect, useRef, useState } from 'react'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import {
  AnnotationPlugin,
  DocumentManagerPlugin,
  HistoryPlugin,
  type AnnotationScope,
  type PluginRegistry,
} from '@embedpdf/react-pdf-viewer'
import { api } from '../../convex/_generated/api'
import { AnnotationSync, type SyncStatus } from './sync'
import { ImageAssets, payloadImageKey } from './imageAssets'
import { useStudyToken } from '../auth/session'
import { encodeAnnotation } from './annotationPayload'
import { restoreAnnotations } from './restoreAnnotations'

/** Connect one viewer document to the owner's persistent annotation history. */
export function useAnnotations(
  owner: string,
  documentId: string,
  registry: PluginRegistry | null,
) {
  const fetchToken = useStudyToken()
  const [images] = useState(
    () => new ImageAssets(owner, documentId, fetchToken),
  )
  const jobs = useRef(new Map<string, () => Promise<void>>())
  const jobChain = useRef(Promise.resolve())
  const [imageError, setImageError] = useState('')
  const [imageBusy, setImageBusy] = useState(false)
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
      async ({ queuedAt: _queuedAt, ...op }) => {
        const key = payloadImageKey(op.payload)
        if (key) await images.upload(key)
        return save(op)
      },
      setStatus,
      documentId,
    )
    sync.current = controller
    const retry = () => {
      void controller.flush()
    }
    const unload = (event: BeforeUnloadEvent) => {
      if (controller.hasPending || jobs.current.size) {
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
  }, [owner, save, documentId, images])

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
      const controller = sync.current
      const enqueue = (imageKey?: string) => {
        const payload = encodeAnnotation(event, imageKey)
        seen.current.set(event.annotation.id, payload)
        controller?.enqueue(event.annotation.id, event.pageIndex, payload)
      }
      if (event.annotation.type !== 13) {
        enqueue()
        return
      }
      const id = event.annotation.id
      // Serialize creation and subsequent moves so the binary is durable before its metadata.
      const job = async () => {
        const key =
          event.type === 'delete'
            ? undefined
            : await images.prepare(
                id,
                event.type === 'create' ? event.ctx : undefined,
              )
        enqueue(key)
        if (jobs.current.get(id) === job) jobs.current.delete(id)
      }
      jobs.current.set(id, job)
      setImageBusy(true)
      jobChain.current = jobChain.current
        .then(job)
        .then(() => {
          if (!jobs.current.size) setImageError('')
        })
        .catch((error) =>
          setImageError(
            error instanceof Error ? error.message : 'Falha ao salvar imagem.',
          ),
        )
        .finally(() => setImageBusy(jobs.current.size > 0))
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
  }, [registry, documentId, images])

  useEffect(() => {
    if (!scope || !rows || !sync.current) return
    const controller = sync.current
    controller.receive(rows)
    let cancelled = false
    const restore = async () => {
      const failed = await restoreAnnotations({
        rows,
        controller,
        scope,
        images,
        seen: seen.current,
        cancelled: () => cancelled,
        hasImageJob: (id) => jobs.current.has(id),
        setApplying: (value) => { applying.current = value },
        discardHistory: (id) => registry
          ?.getPlugin<HistoryPlugin>('history')
          ?.provides()
          .forDocument(documentId)
          .purgeByMetadata<{ annotationIds?: string[] }>(
            (metadata) => metadata?.annotationIds?.includes(id) ?? false,
          ),
      })
      if (failed && !cancelled)
        setImageError(
          'Uma anotação não pôde ser restaurada. Seus dados continuam salvos.',
        )
      if (!cancelled) void controller.flush()
    }
    void restore()
    return () => {
      cancelled = true
    }
  }, [
    rows,
    scope,
    registry,
    status.pending,
    refresh,
    documentId,
    images,
    imageBusy,
  ])

  const resolveConflict = (keep: boolean) => {
    sync.current?.resolveConflict(keep)
    setRefresh((n) => n + 1)
  }
  const retry = () => {
    setImageError('')
    for (const job of jobs.current.values())
      jobChain.current = jobChain.current
        .then(job)
        .catch((error) => setImageError(String(error)))
        .finally(() => setImageBusy(jobs.current.size > 0))
    setRefresh((n) => n + 1)
    void sync.current?.flush()
  }
  return {
    status: { ...status, error: imageError || status.error },
    failure,
    ready: Boolean(rows && scope && !failure),
    resolveConflict,
    retry,
  }
}
