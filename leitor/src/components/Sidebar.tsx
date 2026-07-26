import { Link } from 'react-router-dom'
import { fileTree } from '../content/catalog'
import { FileTree, TreeShell } from './FileTree'

type SidebarProps = {
  open: boolean
  onClose: () => void
  activeSlug?: string
}

export function Sidebar({ open, onClose, activeSlug }: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-backdrop${open ? ' is-visible' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={`sidebar${open ? ' is-open' : ''}`} aria-label="Índice do curso">
        <div className="sidebar-top">
          <Link to="/" className="sidebar-home" onClick={onClose}>
            ← Início
          </Link>
          <button type="button" className="sidebar-close" onClick={onClose} aria-label="Fechar índice">
            ✕
          </button>
        </div>
        <TreeShell title="Explorador">
          <FileTree nodes={fileTree} activeSlug={activeSlug} onNavigate={onClose} />
        </TreeShell>
      </aside>
    </>
  )
}
