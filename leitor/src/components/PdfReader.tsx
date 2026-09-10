import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { pdfPageFromHash, pdfPagesBeforeTargetSettled } from './pdfPageLink'
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import type { CatalogDocument } from '../content/types'
import { Sidebar } from './Sidebar'
import { ReaderToolbar } from './ReaderToolbar'
import { useTheme } from '../theme/ThemeProvider'
import { usePdfZoom } from './usePdfZoom'
import '../styles/pdf-reader.css'

GlobalWorkerOptions.workerSrc = workerUrl

type PdfDocument = Extract<CatalogDocument, { kind: 'pdf' }>

function PdfPage({ pdf, page, width, doc, onSettled }: { pdf: PDFDocumentProxy; page: number; width: number; doc: PdfDocument; onSettled: (page: number) => void }) {
  const surface = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!width) return
    let active = true
    let render: ReturnType<Awaited<ReturnType<PDFDocumentProxy['getPage']>>['render']> | undefined
    setBusy(true)
    setError(false)
    // Each render owns its canvas, including while the viewport is being resized.
    const canvas = document.createElement('canvas')
    canvas.setAttribute('role', 'img')
    canvas.setAttribute('aria-label', `${doc.reading.title}, página ${doc.reading.printedStart + page - 1}`)
    pdf.getPage(page).then(async sheet => {
      if (!active) return
      const base = sheet.getViewport({ scale: 1 })
      const viewport = sheet.getViewport({ scale: width / base.width })
      const density = Math.min(window.devicePixelRatio || 1, 2, 2400 / viewport.width)
      canvas.width = Math.ceil(viewport.width * density)
      canvas.height = Math.ceil(viewport.height * density)
      canvas.style.width = '100%'
      canvas.style.height = 'auto'
      render = sheet.render({ canvas, viewport, transform: [density, 0, 0, density, 0, 0] })
      await render.promise
      if (active) { surface.current?.replaceChildren(canvas); setBusy(false); onSettled(page) }
    }).catch(() => { if (active) { setError(true); setBusy(false); onSettled(page) } })
    return () => { active = false; render?.cancel() }
  }, [pdf, page, width, doc, onSettled])

  return <section data-pdf-page={page} className="pdf-page" aria-label={`Página ${doc.reading.printedStart + page - 1}`} aria-busy={busy}>
    {busy && !surface.current?.firstChild && <p className="pdf-status" role="status">Preparando página…</p>}
    {error && <p className="pdf-status" role="alert">Não foi possível exibir esta página. <a href={`${doc.url}#page=${page}`} target="_blank" rel="noreferrer">Abrir PDF original</a></p>}
    <div className="pdf-surface" ref={surface} style={{ visibility: error ? 'hidden' : 'visible' }} />
  </section>
}

export default function PdfReader({ doc }: { doc: PdfDocument }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [width, setWidth] = useState(0)
  const [sidebar, setSidebar] = useState(false)
  const { theme } = useTheme()
  const [error, setError] = useState('')
  const frame = useRef<HTMLElement>(null)
  const document = useRef<HTMLDivElement>(null)
  const renderWidth = usePdfZoom(frame, document, width)
  const { hash, key: navigationKey } = useLocation()
  const [settledPages, setSettledPages] = useState<ReadonlySet<number>>(() => new Set())
  const lastNavigation = useRef<string | null>(null)
  const onPageSettled = useCallback((page: number) => {
    setSettledPages(current => current.has(page) ? current : new Set([...current, page]))
  }, [])

  useEffect(() => {
    if (lastNavigation.current === navigationKey) return
    const page = pdfPageFromHash(hash, doc.reading.pageCount)
    // Earlier pages must have their final heights before scrolling to the target.
    if (!pdfPagesBeforeTargetSettled(page, settledPages)) return
    const viewport = frame.current
    const target = document.current?.querySelector<HTMLElement>(`[data-pdf-page="${page}"]`)
    if (!viewport || !target) return
    viewport.scrollTo({ left: 0, top: viewport.scrollTop + target.getBoundingClientRect().top - viewport.getBoundingClientRect().top })
    lastNavigation.current = navigationKey
  }, [hash, navigationKey, settledPages, doc.reading.pageCount])


  useEffect(() => {
    const task = getDocument({ url: doc.url })
    let active = true
    task.promise.then(result => {
      if (!active) return
      if (result.numPages !== doc.reading.pageCount) setError('O recorte não corresponde às páginas indicadas no guia.')
      else setPdf(result)
    }).catch(() => { if (active) setError('Não foi possível abrir o PDF. Tente recarregar a página.') })
    return () => { active = false; void task.destroy() }
  }, [doc])

  useEffect(() => {
    if (!frame.current) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)))
    observer.observe(frame.current)
    return () => observer.disconnect()
  }, [])

  return <div className={`pdf-reader${theme === 'dark' ? ' is-night' : ''}`}>
    <Sidebar open={sidebar} onClose={() => setSidebar(false)} activeSlug={doc.slug} />
    <ReaderToolbar doc={doc} sidebarOpen={sidebar} onOpenSidebar={() => setSidebar(true)} />
    <main className="pdf-frame" ref={frame} aria-label={`${doc.reading.book} — ${doc.reading.section}`}>
      <div className="pdf-document" ref={document}>
      {error ? <p className="pdf-status" role="alert">{error} <a href={doc.url} target="_blank" rel="noreferrer">Abrir PDF original</a></p>
        : pdf ? Array.from({ length: pdf.numPages }, (_, index) => <PdfPage key={index + 1} pdf={pdf} page={index + 1} width={renderWidth} doc={doc} onSettled={onPageSettled} />)
        : <p className="pdf-status" role="status">Abrindo leitura…</p>}
      </div>
    </main>
  </div>
}
