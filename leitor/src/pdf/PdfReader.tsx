import { useEffect, useRef, useState } from 'react'
import {
  PDFViewer,
  ScrollPlugin,
  ZoomMode,
  type PDFViewerConfig,
  type PluginRegistry,
} from '@embedpdf/react-pdf-viewer'
import wasmUrl from '@embedpdf/pdfium/pdfium.wasm?url'
import { useAnnotations } from './useAnnotations'
import { useLocation } from 'react-router-dom'
import { useStudyOwner } from '../auth/session'
import { useTheme } from '../theme/ThemeProvider'
import { Sidebar } from '../components/Sidebar'
import { ReaderToolbar } from '../components/ReaderToolbar'
import { pdfPageFromHash } from './pdfPageLink'
import { readings } from '../../shared/readings'
import type { CatalogDocument } from '../content/types'
import { arrangeViewer } from './pdfLayout'
import { restrictPdfInput } from './pdfInput'
import '../styles/pdf-reader.css'

type PdfDocument = Extract<CatalogDocument, { kind: 'pdf' }>

// Reader keys this component by slug so a new reading gets fresh viewer state.
export default function PdfReader({ doc }: { doc: PdfDocument }) {
  const owner = useStudyOwner()
  const reading = readings.find((item) => item.slug === doc.slug)
  if (!reading) throw new Error('Leitura não cadastrada')
  const documentId = reading.id
  const { theme } = useTheme()
  const { hash, key: navigationKey } = useLocation()
  const [sidebar, setSidebar] = useState(false)
  const [config] = useState<PDFViewerConfig>(() => ({
    documentManager: {
      maxDocuments: 1,
      initialDocuments: [{ url: doc.url, documentId, name: doc.reading.title }],
    },
    wasmUrl: new URL(wasmUrl, window.location.origin).href,
    stamp: { defaultLibrary: false, manifests: [], libraries: [] },
    fonts: { ui: null, signature: null },
    fontFallback: null,
    theme: { preference: theme },
    tabBar: 'never',
    i18n: { defaultLocale: 'pt-BR' },
    zoom: { defaultZoomLevel: ZoomMode.FitWidth },
    disabledCategories: [
      'document-open',
      'document-close',
      'insert-rubber-stamp',
      'insert-signature',
      'redaction',
      'attachment',
      'form',
    ],
    annotations: { annotationAuthor: 'Gabriel Alonso' },
  }))
  const [registry, setRegistry] = useState<PluginRegistry | null>(null)
  const host = useRef<HTMLDivElement>(null)
  const { status, failure, ready, resolveConflict, retry } = useAnnotations(
    owner,
    documentId,
    registry,
  )
  useEffect(() => {
    const container = host.current?.querySelector('embedpdf-container')
    if (!container || !registry) return
    return arrangeViewer(container, theme === 'dark')
  }, [registry, theme])

  useEffect(() => {
    const container = host.current?.querySelector('embedpdf-container')
    if (!container || !registry) return
    return restrictPdfInput(container)
  }, [registry])

  useEffect(() => {
    if (!registry) return
    const scroll = registry.getPlugin<ScrollPlugin>('scroll')?.provides()
    if (!scroll) return
    const navigate = () =>
      scroll
        .forDocument(documentId)
        .scrollToPage({
          pageNumber: pdfPageFromHash(hash, doc.reading.pageCount),
          behavior: 'instant',
        })
    const off = scroll.onLayoutReady((event) => {
      if (event.documentId === documentId && event.isInitial) navigate()
    })
    navigate()
    return off
  }, [registry, documentId, hash, navigationKey, doc.reading.pageCount])

  return (
    <div className={`pdf-reader${theme === 'dark' ? ' is-night' : ''}`}>
      <Sidebar
        open={sidebar}
        onClose={() => setSidebar(false)}
        activeSlug={doc.slug}
      />
      <ReaderToolbar
        doc={doc}
        sidebarOpen={sidebar}
        onOpenSidebar={() => setSidebar(true)}
      />
      {status.error && (
        <div className="pdf-alert" role="alert">
          {status.error}
          <button onClick={retry}>Tentar sincronizar</button>
        </div>
      )}
      {status.conflict && (
        <div className="pdf-alert" role="alert">
          Esta anotação também foi alterada em outro dispositivo.
          <button onClick={() => resolveConflict(true)}>
            Manter minha versão
          </button>
          <button onClick={() => resolveConflict(false)}>
            Usar versão sincronizada
          </button>
        </div>
      )}
      {failure && (
        <div className="pdf-alert" role="alert">
          {failure}
        </div>
      )}
      <div ref={host} className="pdf-embed" inert={!ready}>
        <PDFViewer
          config={config}
          onReady={setRegistry}
          style={{ height: '100%' }}
        />
      </div>
    </div>
  )
}
