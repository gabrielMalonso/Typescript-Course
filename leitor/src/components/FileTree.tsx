import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { TreeNode } from '../content/types'

type FileTreeProps = {
  nodes: TreeNode[]
  activeSlug?: string
  defaultExpandedIds?: string[]
  onNavigate?: () => void
}

function folderContainsSlug(node: TreeNode, slug?: string): boolean {
  if (!slug) return false
  if (node.type === 'file') return node.slug === slug
  return node.children.some((child) => folderContainsSlug(child, slug))
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span className={`tree-chevron${open ? ' is-open' : ''}`} aria-hidden>
      ▸
    </span>
  )
}

function FolderIcon() {
  return <span className="tree-icon folder" aria-hidden />
}

function FileIcon() {
  return <span className="tree-icon file" aria-hidden />
}

function TreeItem({
  node,
  activeSlug,
  depth,
  forcedOpen,
  onNavigate,
}: {
  node: TreeNode
  activeSlug?: string
  depth: number
  forcedOpen: boolean
  onNavigate?: () => void
}) {
  const containsActive = node.type === 'folder' && folderContainsSlug(node, activeSlug)
  const [open, setOpen] = useState(forcedOpen || containsActive || depth < 1)

  useEffect(() => {
    if (containsActive) setOpen(true)
  }, [containsActive, activeSlug])

  if (node.type === 'file') {
    const isActive = node.slug === activeSlug
    return (
      <li className={`tree-item file${isActive ? ' is-active' : ''}`}>
        <Link
          to={`/ler/${node.slug}`}
          className="tree-row"
          style={{ paddingLeft: `${0.5 + depth * 0.85}rem` }}
          onClick={onNavigate}
        >
          <FileIcon />
          <span className="tree-label">{node.name}</span>
        </Link>
      </li>
    )
  }

  return (
    <li className="tree-item folder">
      <button
        type="button"
        className="tree-row tree-folder-btn"
        style={{ paddingLeft: `${0.5 + depth * 0.85}rem` }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Chevron open={open} />
        <FolderIcon />
        <span className="tree-label">{node.name}</span>
      </button>
      {open && (
        <ul className="tree-children">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              activeSlug={activeSlug}
              depth={depth + 1}
              forcedOpen={false}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function FileTree({
  nodes,
  activeSlug,
  defaultExpandedIds = [],
  onNavigate,
}: FileTreeProps) {
  return (
    <ul className="file-tree">
      {nodes.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          activeSlug={activeSlug}
          depth={0}
          forcedOpen={defaultExpandedIds.includes(node.id)}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  )
}

export function TreeShell({
  title,
  children,
  footer,
}: {
  title: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="tree-shell">
      <div className="tree-shell-header">{title}</div>
      <div className="tree-shell-body">{children}</div>
      {footer ? <div className="tree-shell-footer">{footer}</div> : null}
    </div>
  )
}
