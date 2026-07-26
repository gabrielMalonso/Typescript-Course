import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDocument, getNeighbors } from '../content/catalog'
import { MarkdownView } from '../components/MarkdownView'
import { Sidebar } from '../components/Sidebar'
import { ThemeToggle } from '../components/ThemeToggle'

export function Reader() {
  const params = useParams()
  const slug = params['*'] ? decodeURIComponent(params['*']) : ''
  const doc = slug ? getDocument(slug) : undefined
  const { prev, next } = slug ? getNeighbors(slug) : { prev: null, next: null }

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

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

  return (
    <div className="reader-page">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSlug={doc.slug}
      />

      <header className="reader-toolbar">
        <button
          type="button"
          className="btn ghost toolbar-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir índice"
          aria-expanded={sidebarOpen}
        >
          ☰ Índice
        </button>
        <div className="reader-crumb">
          <Link to="/">Início</Link>
          <span>/</span>
          <span>{doc.chapterId}</span>
          <span>/</span>
          <span>{doc.fileName}</span>
        </div>
        <div className="toolbar-spacer" />
        <ThemeToggle />
      </header>

      <div className="reader-stage">
        <main className="reader-main">
          <p className="reader-meta">
            {doc.chapterTitle}
            {doc.section !== 'raiz' ? ` · ${doc.section}` : ''}
          </p>
          <MarkdownView content={doc.content} />

          <nav className="reader-nav" aria-label="Navegação entre partes">
            {prev ? (
              <Link to={`/ler/${prev.slug}`} className="nav-card prev">
                <span>Anterior</span>
                <strong>{prev.fileName}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/ler/${next.slug}`} className="nav-card next">
                <span>Próximo</span>
                <strong>{next.fileName}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>
      </div>
    </div>
  )
}
