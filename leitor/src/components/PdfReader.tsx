import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import type { CatalogDocument } from '../content/types'
import { Sidebar } from './Sidebar'
import '../styles/pdf-reader.css'

GlobalWorkerOptions.workerSrc = workerUrl

type PdfDocument = Extract<CatalogDocument, { kind: 'pdf' }>

export default function PdfReader({ doc }: { doc: PdfDocument }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [page, setPage] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [width, setWidth] = useState(0)
  const [sidebar, setSidebar] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(true)
  const frame = useRef<HTMLDivElement>(null)
  const surface = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const task = getDocument({ url: doc.url })
    let active = true
    task.promise.then(result => {
      if (!active) return
      if (result.numPages !== doc.reading.pageCount) {
        setError('O recorte não corresponde às páginas indicadas no guia.')
        setBusy(false)
      } else setPdf(result)
    }).catch(() => { if (active) { setError('Não foi possível abrir o PDF. Tente recarregar a página.'); setBusy(false) } })
    return () => { active = false; void task.destroy() }
  }, [doc])

  useEffect(() => {
    if (!frame.current) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)))
    observer.observe(frame.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!pdf || !width) return
    let active = true
    let render: ReturnType<Awaited<ReturnType<PDFDocumentProxy['getPage']>>['render']> | undefined
    setBusy(true)
    setError('')
    // Each render owns its canvas; fast navigation cannot reuse a still-busy canvas.
    const canvas = document.createElement('canvas')
    canvas.setAttribute('role', 'img')
    canvas.setAttribute('aria-label', `${doc.reading.title}, página ${doc.reading.printedStart + page - 1}. Texto disponível no PDF original.`)
    pdf.getPage(page).then(async sheet => {
      if (!active) return
      const base = sheet.getViewport({ scale: 1 })
      const viewport = sheet.getViewport({ scale: Math.min(width, 1000) / base.width * zoom })
      const density = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.ceil(viewport.width * density)
      canvas.height = Math.ceil(viewport.height * density)
      canvas.style.width = `${viewport.width}px`
      canvas.style.height = `${viewport.height}px`
      render = sheet.render({ canvas, viewport, transform: [density, 0, 0, density, 0, 0] })
      await render.promise
      if (active) { surface.current?.replaceChildren(canvas); setBusy(false) }
    }).catch(() => { if (active) { setError('Não foi possível exibir esta página. Abra o PDF original abaixo.'); setBusy(false) } })
    return () => { active = false; render?.cancel() }
  }, [pdf, page, width, zoom, doc])

  function turnPage(next: number) {
    setPage(next)
    frame.current?.scrollTo({ left: 0, top: 0 })
    window.scrollTo({ top: 0 })
  }

  const printed = doc.reading.printedStart + page - 1
  return <div className="pdf-reader">
    <Sidebar open={sidebar} onClose={() => setSidebar(false)} activeSlug={doc.slug} />
    <header className="reader-toolbar pdf-toolbar">
      <button className="btn ghost" onClick={() => setSidebar(true)} aria-expanded={sidebar}>☰ Índice</button>
      <Link className="btn ghost" to={`/ler/${doc.chapterId}/README`}>← Guia</Link>
      <div className="toolbar-spacer" />
      <span className="pdf-night-label">Modo noturno</span>
    </header>
    <main>
      <div className="pdf-heading"><p>{doc.reading.book} · {doc.reading.edition}</p><h1>{doc.reading.section}</h1>
        <p>Páginas {doc.reading.printedStart}–{doc.reading.printedStart + doc.reading.pageCount - 1} do livro · Recorte original</p>
      </div>
      <nav className="pdf-controls" aria-label="Controles de leitura">
        <button className="btn ghost" disabled={page === 1} onClick={() => turnPage(page - 1)} aria-label="Página anterior">←</button>
        <span aria-live="polite">Página <strong>{printed}</strong> <span className="pdf-count">· {page}/{doc.reading.pageCount}</span></span>
        <button className="btn ghost" disabled={page === doc.reading.pageCount} onClick={() => turnPage(page + 1)} aria-label="Próxima página">→</button>
        <span className="pdf-controls-divider" />
        <button className="btn ghost" disabled={zoom <= 0.75} onClick={() => setZoom(z => z - 0.25)} aria-label="Diminuir zoom">−</button>
        <button className="btn ghost" onClick={() => setZoom(1)} title="Ajustar à largura">{Math.round(zoom * 100)}%</button>
        <button className="btn ghost" disabled={zoom >= 2} onClick={() => setZoom(z => z + 0.25)} aria-label="Aumentar zoom">+</button>
      </nav>
      <div className="pdf-status" role="status">{error || (busy ? 'Preparando página…' : `Livro: ${printed} · PDF completo: ${doc.reading.sourcePdfStart + page - 1}`)}</div>
      <div className="pdf-frame" ref={frame} aria-busy={busy}><div className="pdf-surface" ref={surface} style={{ visibility: busy || error ? 'hidden' : 'visible' }} /></div>
      <footer className="pdf-footer"><Link to={`/ler/${doc.chapterId}/README`}>← Voltar às orientações do guia</Link><a href={doc.url} target="_blank" rel="noreferrer">Abrir PDF original</a><p>O recorte mantém as páginas completas. Siga a seção indicada no guia; trechos vizinhos podem ficar para depois.</p></footer>
    </main>
  </div>
}
