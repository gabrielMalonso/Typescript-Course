import { documentLabel } from '../content/catalog'
import { Link } from 'react-router-dom'
import type { CatalogDocument } from '../content/types'
import { CopyMarkdownButton } from './CopyMarkdownButton'
import { ThemeToggle } from './ThemeToggle'

type ReaderToolbarProps = {
  doc: CatalogDocument
  sidebarOpen: boolean
  onOpenSidebar: () => void
  showLocation?: boolean
}

export function ReaderToolbar({ doc, sidebarOpen, onOpenSidebar, showLocation = false }: ReaderToolbarProps) {
  return <header className="reader-toolbar">
    <button type="button" className="btn ghost toolbar-btn" onClick={onOpenSidebar} aria-label="Abrir índice" aria-expanded={sidebarOpen}>
      ☰ Índice
    </button>
    {showLocation && <div className="reader-crumb">
      <Link to="/">Início</Link><span>/</span><span>{doc.chapterId}</span><span>/</span><span>{documentLabel(doc)}</span>
    </div>}
    <div className="toolbar-spacer" />
    <div className="toolbar-actions">
      {doc.kind === 'markdown' && <CopyMarkdownButton content={doc.content} />}
      <ThemeToggle />
    </div>
  </header>
}
