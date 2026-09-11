import { useCallback, useEffect, useRef, useState } from 'react'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { PDFViewer, AnnotationPlugin, DocumentManagerPlugin, HistoryPlugin, ScrollPlugin, ZoomMode, type AnnotationScope, type PDFViewerConfig, type PluginRegistry, type PdfAnnotationObject } from '@embedpdf/react-pdf-viewer'
import wasmUrl from '@embedpdf/pdfium/pdfium.wasm?url'
import { api } from '../../convex/_generated/api'
import { AnnotationSync, type SyncStatus } from '../lab/sync'
import { useLocation } from 'react-router-dom'
import { useStudyOwner } from '../auth/StudySession'
import { useTheme } from '../theme/ThemeProvider'
import { Sidebar } from './Sidebar'
import { ReaderToolbar } from './ReaderToolbar'
import { pdfPageFromHash } from './pdfPageLink'
import { readings } from '../../shared/readings'
import type { CatalogDocument } from '../content/types'
import { arrangeViewer } from './pdfLayout'
import '../styles/pdf-reader.css'

type PdfDocument = Extract<CatalogDocument, { kind: 'pdf' }>

export default function PdfReader({ doc }: { doc: PdfDocument }) {
  return <ReadingViewer key={doc.slug} doc={doc} />
}

function ReadingViewer({ doc }: { doc: PdfDocument }) {
  const owner = useStudyOwner()
  const reading = readings.find(item => item.slug === doc.slug)
  if (!reading) throw new Error('Leitura não cadastrada')
  const DOCUMENT = reading.id
  const { theme } = useTheme()
  const { hash, key: navigationKey } = useLocation()
  const [sidebar, setSidebar] = useState(false)
  const [config] = useState<PDFViewerConfig>(() => ({
    documentManager: { maxDocuments: 1, initialDocuments: [{ url: doc.url, documentId: DOCUMENT, name: doc.reading.title }] },
    wasmUrl: new URL(wasmUrl, window.location.origin).href,
    stamp: { defaultLibrary: false, manifests: [], libraries: [] }, fonts: { ui: null, signature: null }, fontFallback: null,
    theme: { preference: theme }, tabBar: 'never', i18n: { defaultLocale: 'pt-BR' },
    zoom: { defaultZoomLevel: ZoomMode.FitWidth },
    disabledCategories: ['document-open', 'document-close', 'redaction', 'insert', 'attachment', 'annotation-stamp', 'form'],
    annotations: { annotationAuthor: 'Gabriel Alonso' },
  }))
  const { isAuthenticated } = useConvexAuth()
  const rows = useQuery(api.annotations.list, isAuthenticated ? { document: DOCUMENT } : 'skip')
  const save = useMutation(api.annotations.save)
  const [status, setStatus] = useState<SyncStatus>({ pending: 0, error: '', conflict: false })
  const [scope, setScope] = useState<AnnotationScope | null>(null)
  const [registry, setRegistry] = useState<PluginRegistry | null>(null)
  const [failure, setFailure] = useState('')
  const host = useRef<HTMLDivElement>(null)
  const sync = useRef<AnnotationSync | null>(null)
  const applying = useRef(false)
  const seen = useRef(new Map<string, string | null>())
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const controller = new AnnotationSync(owner, localStorage, ({ queuedAt: _queuedAt, ...op }) => save(op), setStatus, DOCUMENT)
    sync.current = controller
    const retry = () => { void controller.flush() }
    const unload = (event: BeforeUnloadEvent) => { if (controller.hasPending) { event.preventDefault(); event.returnValue = '' } }
    window.addEventListener('online', retry)
    window.addEventListener('beforeunload', unload)
    return () => { controller.stop(); sync.current = null; window.removeEventListener('online', retry); window.removeEventListener('beforeunload', unload) }
  }, [owner, save, DOCUMENT])

  const onReady = useCallback((ready: PluginRegistry) => { setRegistry(ready) }, [])
  useEffect(() => {
    if (!registry) return
    const annotations = registry.getPlugin<AnnotationPlugin>('annotation')?.provides()
    const documents = registry.getPlugin<DocumentManagerPlugin>('document-manager')?.provides()
    if (!annotations || !documents) { setFailure('O leitor não conseguiu iniciar as ferramentas.'); return }
    const current = annotations.forDocument(DOCUMENT)
    const off = annotations.onAnnotationEvent(event => {
      if (event.documentId !== DOCUMENT) return
      if (event.type === 'loaded') { setScope(current); return }
      if (event.committed || applying.current) return
      const payload = event.type === 'delete' ? null : JSON.stringify(event.annotation)
      seen.current.set(event.annotation.id, payload)
      sync.current?.enqueue(event.annotation.id, event.pageIndex, payload)
    })
    const offError = documents.onDocumentError(() => setFailure('Não foi possível abrir o PDF. Recarregue a página.'))
    // A cached PDF may finish loading before the registry callback.
    if (documents.getActiveDocument() && current.getState()) setScope(current)
    return () => { off(); offError() }
  }, [registry, DOCUMENT])

  useEffect(() => {
    if (!scope || !rows || !sync.current) return
    const controller = sync.current
    controller.receive(rows)
    applying.current = true
    try {
      const apply = (id: string, page: number, payload: string | null) => {
        if (seen.current.get(id) === payload) return
        const existing = scope.getAnnotationById(id)
        if (payload === null) { if (existing && existing.commitState !== 'deleted') scope.deleteAnnotation(page, id) }
        else {
          const annotation = decodeAnnotation(payload)
          if (existing && existing.commitState !== 'deleted') scope.updateAnnotation(page, id, annotation)
          else scope.importAnnotations([{ annotation }])
        }
        // Undo must not restore a stale version over a change from another device.
        registry?.getPlugin<HistoryPlugin>('history')?.provides().forDocument(DOCUMENT).purgeByMetadata<{ annotationIds?: string[] }>(metadata => metadata?.annotationIds?.includes(id) ?? false)
        seen.current.set(id, payload)
      }
      for (const row of rows) {
        if (!controller.hasPendingFor(row.annotationId) && row.revision >= controller.revisionFor(row.annotationId)) apply(row.annotationId, row.pageIndex, row.payload)
      }
      for (const draft of controller.drafts) apply(draft.annotationId, draft.pageIndex, draft.payload)
    } catch { setFailure('Uma anotação não pôde ser restaurada. Seus dados continuam salvos.'); }
    finally { applying.current = false }
    void controller.flush()
  }, [rows, scope, registry, status.pending, refresh, DOCUMENT])

  useEffect(() => {
    const container = host.current?.querySelector('embedpdf-container')
    if (!container || !registry) return
    return arrangeViewer(container, theme === 'dark')
  }, [registry, theme])

  useEffect(() => {
    if (!registry) return
    const scroll = registry.getPlugin<ScrollPlugin>('scroll')?.provides()
    if (!scroll) return
    const navigate = () => scroll.forDocument(DOCUMENT).scrollToPage({ pageNumber: pdfPageFromHash(hash, doc.reading.pageCount), behavior: 'instant' })
    const off = scroll.onLayoutReady(event => { if (event.documentId === DOCUMENT && event.isInitial) navigate() })
    navigate()
    return off
  }, [registry, DOCUMENT, hash, navigationKey, doc.reading.pageCount])

  const resolve = (keep: boolean) => { sync.current?.resolveConflict(keep); setRefresh(n => n + 1) }
  return <div className={`pdf-reader${theme === 'dark' ? ' is-night' : ''}`}>
    <Sidebar open={sidebar} onClose={() => setSidebar(false)} activeSlug={doc.slug} />
    <ReaderToolbar doc={doc} sidebarOpen={sidebar} onOpenSidebar={() => setSidebar(true)} />
    {status.error && <div className="pdf-alert" role="alert">{status.error}<button onClick={() => void sync.current?.flush()}>Tentar sincronizar</button></div>}
    {status.conflict && <div className="pdf-alert" role="alert">Esta anotação também foi alterada em outro dispositivo.<button onClick={() => resolve(true)}>Manter minha versão</button><button onClick={() => resolve(false)}>Usar versão sincronizada</button></div>}
    {failure && <div className="pdf-alert" role="alert">{failure}</div>}
    <div ref={host} className="pdf-embed" inert={!rows || !scope || Boolean(failure)}><PDFViewer config={config} onReady={onReady} style={{ height: '100%' }} /></div>
  </div>
}

// The serialized object comes from EmbedPDF; validate its envelope at this boundary.
function decodeAnnotation(payload: string): PdfAnnotationObject {
  const value: unknown = JSON.parse(payload)
  if (!value || typeof value !== 'object' || !('id' in value) || typeof value.id !== 'string' || !('type' in value) || typeof value.type !== 'number' || !('pageIndex' in value) || !Number.isInteger(value.pageIndex) || !('rect' in value)) throw new Error('Invalid annotation')
  return value as PdfAnnotationObject
}
