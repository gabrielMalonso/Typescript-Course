import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { documentLabel, getDocument, getNeighbors, resolveDocumentSlug } from '../content/catalog'
import { ReaderToolbar } from '../components/ReaderToolbar'
import { MarkdownView } from '../components/MarkdownView'
import { Sidebar } from '../components/Sidebar'
import { ThemeToggle } from '../components/ThemeToggle'

const PdfReader = lazy(() => import('../pdf/PdfReader'))

export function Reader() {
  const params = useParams()
  const slug = params['*'] ? decodeURIComponent(params['*']) : ''
  const doc = slug ? getDocument(slug) : undefined
  const { prev, next } = slug ? getNeighbors(slug) : { prev: null, next: null }

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const resolvedSlug = resolveDocumentSlug(slug)
  if (resolvedSlug !== slug) return <Navigate to={`/ler/${resolvedSlug}`} replace />

  if (!doc) {
    return (
      <div className="reader-page">
        <header className="reader-toolbar">
          <Link to="/" className="btn ghost toolbar-btn">
            ← Início
          </Link>
          <div className="toolbar-spacer" />
          <ThemeToggle />
        </header>
        <div className="reader-missing">
          <h1>Arquivo não encontrado</h1>
          <p>Esse caminho não está no catálogo do leitor.</p>
          <Link to="/" className="btn primary">
            Voltar ao início
          </Link>
        </div>
      </div>
    )
  }

  if (doc.kind === 'pdf') return <Suspense fallback={<p role="status">Abrindo leitura…</p>}><PdfReader key={doc.slug} doc={doc} /></Suspense>

  return (
    <div className="reader-page">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSlug={doc.slug}
      />

      <ReaderToolbar doc={doc} sidebarOpen={sidebarOpen} onOpenSidebar={() => setSidebarOpen(true)} showLocation />

      <div className="reader-stage">
        <main className="reader-main">
          <p className="reader-meta">
            {doc.chapterTitle}
            {doc.section !== 'raiz' ? ` · ${doc.section}` : ''}
          </p>
          <MarkdownView content={doc.content} slug={doc.slug} />

          {Number(doc.chapterId.slice(0, 2)) >= 10 ? (
            doc.slug.endsWith('/README') ? null : <nav className="reader-nav" aria-label="Voltar ao percurso">
              <Link to={`/ler/${doc.chapterId}/README`} className="nav-card prev"><span>Voltar ao percurso</span><strong>Guia de estudo</strong></Link>
            </nav>
          ) : <nav className="reader-nav" aria-label="Navegação entre partes">
            {prev ? (
              <Link to={`/ler/${prev.slug}`} className="nav-card prev">
                <span>Anterior</span>
                <strong>{documentLabel(prev)}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/ler/${next.slug}`} className="nav-card next">
                <span>Próximo</span>
                <strong>{documentLabel(next)}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>}
        </main>
      </div>
    </div>
  )
}
