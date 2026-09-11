import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { PDFViewer, AnnotationPlugin, DocumentManagerPlugin, InteractionManagerPlugin, HistoryPlugin, PdfAnnotationSubtype, type AnnotationScope, type PDFViewerConfig, type PluginRegistry, type PdfAnnotationObject, type Position } from '@embedpdf/react-pdf-viewer'
import wasmUrl from '@embedpdf/pdfium/pdfium.wasm?url'
import { api } from '../../convex/_generated/api'
import { AnnotationSync, DOCUMENT, type SyncStatus } from './sync'

const config: PDFViewerConfig = {
  documentManager: { maxDocuments: 1, initialDocuments: [{ url: '/laboratorio/anotacoes-v1.pdf', documentId: 'laboratorio-anotacoes-v1', name: 'Caderno de testes' }] },
  wasmUrl: new URL(wasmUrl, window.location.origin).href, stamp: { defaultLibrary: false, manifests: [], libraries: [] }, fonts: { ui: null, signature: null }, fontFallback: null,
  theme: { preference: 'light' }, tabBar: 'never',
  disabledCategories: ['document-open', 'document-close', 'redaction', 'signature', 'attachment', 'annotation-stamp', 'form'],
  annotations: { annotationAuthor: 'Gabriel Alonso' },
}

export function LabViewer({ owner, onSignOut }: { owner: string; onSignOut: () => void }) {
  const rows = useQuery(api.annotations.list, { document: DOCUMENT })
  const save = useMutation(api.annotations.save)
  const [status, setStatus] = useState<SyncStatus>({ pending: 0, error: '', conflict: false })
  const [scope, setScope] = useState<AnnotationScope | null>(null)
  const [registry, setRegistry] = useState<PluginRegistry | null>(null)
  const [input, setInput] = useState('mouse')
  const [eraser, setEraser] = useState(false)
  const [failure, setFailure] = useState('')
  const host = useRef<HTMLDivElement>(null)
  const sync = useRef<AnnotationSync | null>(null)
  const applying = useRef(false)
  const seen = useRef(new Map<string, string | null>())
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const controller = new AnnotationSync(owner, localStorage, ({ queuedAt: _queuedAt, ...op }) => save(op), setStatus)
    sync.current = controller
    const retry = () => { void controller.flush() }
    const unload = (event: BeforeUnloadEvent) => { if (controller.hasPending) { event.preventDefault(); event.returnValue = '' } }
    window.addEventListener('online', retry)
    window.addEventListener('beforeunload', unload)
    return () => { controller.stop(); sync.current = null; window.removeEventListener('online', retry); window.removeEventListener('beforeunload', unload) }
  }, [owner, save])

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
    // onReady can follow the small test PDF's annotation load.
    if (documents.getActiveDocument() && current.getState()) setScope(current)
    return () => { off(); offError() }
  }, [registry])

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
  }, [rows, scope, registry, status.pending, refresh])

  useEffect(() => {
    const element = host.current
    if (!element) return
    // Capture before the viewer's shadow DOM while keeping its toolbar usable.
    const filter = (event: PointerEvent) => {
      const control = event.composedPath().some(target => target instanceof Element && target.matches('button, input, select, textarea, a, [role="button"], [role="menuitem"], [contenteditable="true"]'))
      if (!control && (event.pointerType === 'touch' || (input === 'pen' && event.pointerType !== 'pen'))) {
        event.stopImmediatePropagation()
        event.preventDefault()
      }
    }
    for (const name of (['pointerdown', 'pointermove', 'pointerup'] as const)) element.addEventListener(name, filter, { capture: true })
    return () => { for (const name of (['pointerdown', 'pointermove', 'pointerup'] as const)) element.removeEventListener(name, filter, { capture: true }) }
  }, [input])

  useEffect(() => {
    if (!registry || !scope) return
    const interaction = registry.getPlugin<InteractionManagerPlugin>('interaction-manager')?.provides()
    if (!interaction) return
    interaction.registerMode({ id: 'lab-eraser', scope: 'page', exclusive: true, cursor: 'crosshair' })
    let drawing = false
    const removeAt = (pageIndex: number, point: Position) => {
      for (const { object, commitState } of scope.getAnnotations({ pageIndex })) {
        if (commitState !== 'deleted' && object.type === PdfAnnotationSubtype.INK && object.inkList.some(line => line.points.some((p, i) => nearSegment(point, p, line.points[Math.max(0, i - 1)], Math.max(7, object.strokeWidth))))) scope.deleteAnnotation(pageIndex, object.id)
      }
    }
    const unregister = [0, 1].map(pageIndex => interaction.registerHandlers({ documentId: DOCUMENT, pageIndex, modeId: 'lab-eraser', handlers: {
      onPointerDown: point => { drawing = true; removeAt(pageIndex, point) },
      onPointerMove: point => { if (drawing) removeAt(pageIndex, point) },
      onPointerUp: () => { drawing = false }, onPointerCancel: () => { drawing = false },
    } }))
    const off = interaction.onModeChange(event => { if (event.documentId === DOCUMENT) setEraser(event.activeMode === 'lab-eraser') })
    return () => { unregister.forEach(fn => fn()); off() }
  }, [registry, scope])

  const resolve = (keep: boolean) => { sync.current?.resolveConflict(keep); setRefresh(n => n + 1) }
  const erase = () => {
    const interaction = registry?.getPlugin<InteractionManagerPlugin>('interaction-manager')?.provides().forDocument(DOCUMENT)
    scope?.setActiveTool(null)
    if (eraser) interaction?.activateDefaultMode(); else interaction?.activate('lab-eraser')
  }
  return <main className="annotation-lab">
    <header className="lab-header"><a href="/">← Aulas</a><h1>Caderno de testes</h1><span role="status">{!rows || !scope ? 'Abrindo…' : status.conflict ? 'Revisão necessária' : status.pending ? `${status.pending} alteração(ões) pendente(s)` : 'Sincronizado'}</span><button disabled={status.pending > 0} onClick={onSignOut}>Sair</button></header>
    <div className="lab-controls">
      <label>Entrada <select value={input} onChange={e => setInput(e.target.value)}><option value="mouse">Mouse ou caneta</option><option value="pen">Somente caneta</option></select></label>
      <button disabled={!scope} aria-pressed={eraser} onClick={erase}>Borracha de traços</button>
      <span>{input === 'pen' ? 'Toques na página bloqueados durante a escrita.' : 'Use a barra do PDF para escolher a ferramenta.'}</span>
    </div>
    {status.error && <div className="lab-alert" role="alert">{status.error}<button onClick={() => void sync.current?.flush()}>Tentar sincronizar</button></div>}
    {status.conflict && <div className="lab-alert" role="alert">Esta anotação também foi alterada em outro dispositivo.<button onClick={() => resolve(true)}>Manter minha versão</button><button onClick={() => resolve(false)}>Usar versão sincronizada</button></div>}
    {failure && <div className="lab-alert" role="alert">{failure}</div>}
    <div ref={host} className="lab-viewer" inert={!rows || !scope || Boolean(failure)}><PDFViewer config={config} onReady={onReady} style={{ height: '100%' }} /></div>
  </main>
}

// The serialized object comes from EmbedPDF; validate its envelope at this boundary.
function decodeAnnotation(payload: string): PdfAnnotationObject {
  const value: unknown = JSON.parse(payload)
  if (!value || typeof value !== 'object' || !('id' in value) || typeof value.id !== 'string' || !('type' in value) || typeof value.type !== 'number' || !('pageIndex' in value) || !Number.isInteger(value.pageIndex) || !('rect' in value)) throw new Error('Invalid annotation')
  return value as PdfAnnotationObject
}

function nearSegment(p: Position, a: Position, b: Position, radius: number) {
  const dx = b.x - a.x, dy = b.y - a.y
  const t = dx || dy ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy))) : 0
  return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy) <= radius
}
