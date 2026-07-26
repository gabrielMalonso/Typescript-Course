import type { CatalogDocument, TreeNode } from './types'

const rawModules = import.meta.glob('@course/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const EXCLUDED_NAME_PATTERNS = [
  /(^|\/)\.context\//,
  /correcoes\.md$/i,
  /resultado\.md$/i,
  /gabarito/i,
  /respostas-prova/i,
  /notas-professor/i,
  /historico-avaliacoes/i,
  /perfil-aluno/i,
  /estado-atual/i,
  /prompts-agentes/i,
]

const FOLDER_ORDER = ['aula', 'exercicios', 'avaliacao', 'extras']

function shouldInclude(modulePath: string): boolean {
  const normalized = modulePath.replace(/\\/g, '/')

  if (!normalized.endsWith('.md')) return false
  if (EXCLUDED_NAME_PATTERNS.some((re) => re.test(normalized))) return false

  const chapterMatch = normalized.match(/\/(\d{2}-[^/]+)\/(.+)$/)
  if (!chapterMatch) return false

  const rest = chapterMatch[2]

  if (/^README\.md$/i.test(rest)) return true
  if (rest.startsWith('aula/') && rest.endsWith('.md')) return true
  if (rest.startsWith('extras/') && rest.endsWith('.md')) return true
  if (rest === 'exercicios/lista.md') return true
  if (rest === 'avaliacao/prova.md') return true

  return false
}

function humanizeSlug(slugPart: string): string {
  return slugPart
    .replace(/^\d{2}-/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

function toCourseRelative(modulePath: string): string | null {
  const normalized = modulePath.replace(/\\/g, '/')
  const match = normalized.match(/\/(\d{2}-[^/]+\/.+)$/)
  return match ? match[1] : null
}

function buildDocuments(): CatalogDocument[] {
  const docs: CatalogDocument[] = []

  for (const [modulePath, content] of Object.entries(rawModules)) {
    if (!shouldInclude(modulePath)) continue

    const relative = toCourseRelative(modulePath)
    if (!relative) continue

    const withoutExt = relative.replace(/\.md$/i, '')
    const parts = withoutExt.split('/')
    const chapterId = parts[0]

    const isReadme = parts.length === 2 && parts[1].toLowerCase() === 'readme'
    const section = isReadme ? 'raiz' : parts[1]
    const fileName = isReadme ? 'README.md' : `${parts[parts.length - 1]}.md`

    docs.push({
      slug: withoutExt,
      chapterId,
      chapterTitle: humanizeSlug(chapterId),
      section,
      fileName,
      title: extractTitle(content, fileName),
      content,
    })
  }

  return docs.sort((a, b) => a.slug.localeCompare(b.slug, 'pt-BR', { numeric: true }))
}

function sortNodes(nodes: TreeNode[]): TreeNode[] {
  return nodes
    .map((node) =>
      node.type === 'folder' ? { ...node, children: sortNodes(node.children) } : node,
    )
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
      if (a.type === 'folder' && b.type === 'folder') {
        const ai = FOLDER_ORDER.indexOf(a.name)
        const bi = FOLDER_ORDER.indexOf(b.name)
        if (ai !== -1 || bi !== -1) {
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
        }
      }
      return a.name.localeCompare(b.name, 'pt-BR', { numeric: true })
    })
}

function buildTree(documents: CatalogDocument[]): TreeNode[] {
  const chapters = new Map<string, Extract<TreeNode, { type: 'folder' }>>()

  for (const doc of documents) {
    let chapter = chapters.get(doc.chapterId)
    if (!chapter) {
      chapter = {
        type: 'folder',
        id: doc.chapterId,
        name: doc.chapterId,
        children: [],
      }
      chapters.set(doc.chapterId, chapter)
    }

    if (doc.section === 'raiz') {
      chapter.children.push({
        type: 'file',
        id: doc.slug,
        name: doc.fileName,
        slug: doc.slug,
        chapterId: doc.chapterId,
        section: doc.section,
      })
      continue
    }

    let sectionFolder = chapter.children.find(
      (n): n is Extract<TreeNode, { type: 'folder' }> =>
        n.type === 'folder' && n.name === doc.section,
    )

    if (!sectionFolder) {
      sectionFolder = {
        type: 'folder',
        id: `${doc.chapterId}/${doc.section}`,
        name: doc.section,
        children: [],
      }
      chapter.children.push(sectionFolder)
    }

    sectionFolder.children.push({
      type: 'file',
      id: doc.slug,
      name: doc.fileName,
      slug: doc.slug,
      chapterId: doc.chapterId,
      section: doc.section,
    })
  }

  return sortNodes([...chapters.values()])
}

export const documents = buildDocuments()
export const documentMap = new Map(documents.map((d) => [d.slug, d]))
export const fileTree = buildTree(documents)

export function getDocument(slug: string): CatalogDocument | undefined {
  return documentMap.get(slug)
}

export function getNeighbors(slug: string): {
  prev: CatalogDocument | null
  next: CatalogDocument | null
} {
  const index = documents.findIndex((d) => d.slug === slug)
  if (index === -1) return { prev: null, next: null }

  const current = documents[index]
  const sameSection = documents.filter(
    (d) => d.chapterId === current.chapterId && d.section === current.section,
  )
  const localIndex = sameSection.findIndex((d) => d.slug === slug)

  if (localIndex !== -1 && sameSection.length > 1) {
    return {
      prev: localIndex > 0 ? sameSection[localIndex - 1] : null,
      next: localIndex < sameSection.length - 1 ? sameSection[localIndex + 1] : null,
    }
  }

  return {
    prev: index > 0 ? documents[index - 1] : null,
    next: index < documents.length - 1 ? documents[index + 1] : null,
  }
}

export function chapterCount(): number {
  return new Set(documents.map((d) => d.chapterId)).size
}
