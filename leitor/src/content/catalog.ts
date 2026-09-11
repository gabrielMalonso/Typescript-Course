import type { CatalogDocument, TreeNode, ReadingMetadata } from './types'

const rawModules = import.meta.glob(
  [
    '@course/[0-9][0-9]-*/README.md',
    '@course/[0-9][0-9]-*/notas.md',
    '@course/[0-9][0-9]-*/pratica/atividades.md',
    '@course/[0-9][0-9]-*/aula/*.md',
    '@course/[0-9][0-9]-*/extras/*.md',
    '@course/[0-9][0-9]-*/exercicios/lista*.md',
    '@course/[0-9][0-9]-*/avaliacao/prova.md',
    '@course/[0-9][0-9]-*/pratica/0[1-3]-*.md',
    '@course/[0-9][0-9]-*/pratica/debugging.md',
    '@course/[0-9][0-9]-*/pratica/leetcode.md',
    '@course/[0-9][0-9]-*/pratica/lab.md',
    '@course/[0-9][0-9]-*/checkpoint/perguntas.md',
    '@course/[0-9][0-9]-*/revisao/*.md',
    '@course/[0-9][0-9]-*/recursos/referencias.md',
  ],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
) as Record<string, string>

const EXCLUDED_NAME_PATTERNS = [
  /(^|\/)\.context\//,
  /correcoes\.md$/i,
  /resultado\.md$/i,
  /gabarito/i,
  /respostas?[^/]*\.md$/i,
  /(?:^|\/)solucoes(?:\/|\.md$)/i,
  /notas-professor/i,
  /historico-avaliacoes/i,
  /perfil-aluno/i,
  /estado-atual/i,
  /prompts-agentes/i,
]

// As seções novas convivem com os caminhos históricos, sem mover materiais.
const FOLDER_ORDER = [
  'leituras', 'aula', 'pratica', 'checkpoint', 'revisao', 'recursos',
  'exercicios', 'avaliacao', 'extras',
]

function shouldInclude(modulePath: string): boolean {
  const normalized = modulePath.replace(/\\/g, '/')

  if (!normalized.endsWith('.md')) return false
  if (EXCLUDED_NAME_PATTERNS.some((re) => re.test(normalized))) return false

  const chapterMatch = normalized.match(/\/(\d{2}-[^/]+)\/(.+)$/)
  if (!chapterMatch) return false

  const rest = chapterMatch[2]

  if (/^(?:README|notas)\.md$/i.test(rest)) return true
  if (rest === 'pratica/atividades.md') return true
  if (rest.startsWith('aula/') && rest.endsWith('.md')) return true
  if (rest.startsWith('extras/') && rest.endsWith('.md')) return true
  if (/^exercicios\/lista[^/]*\.md$/i.test(rest)) return true
  if (rest === 'avaliacao/prova.md') return true
  if (/^pratica\/(?:0[1-3]-[^/]+|debugging|leetcode|lab)\.md$/i.test(rest)) return true
  if (rest === 'checkpoint/perguntas.md') return true
  if (/^revisao\/(?:resumo|erros-comuns|revisitar)\.md$/i.test(rest)) return true
  if (rest === 'recursos/referencias.md') return true

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

function isReadingMetadata(value: unknown): value is ReadingMetadata {
  if (!value || typeof value !== 'object') return false
  return ['title', 'book', 'edition', 'section'].every(key => key in value && typeof Reflect.get(value, key) === 'string')
    && ['printedStart', 'sourcePdfStart', 'pageCount'].every(key => key in value && Number.isInteger(Reflect.get(value, key)) && Reflect.get(value, key) > 0)
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

    const section = parts.length === 2 ? 'raiz' : parts[1]
    const fileName = `${parts[parts.length - 1]}.md`

    docs.push({
      slug: withoutExt,
      chapterId,
      chapterTitle: humanizeSlug(chapterId),
      section,
      fileName,
      title: extractTitle(content, fileName),
      kind: 'markdown',
      content,
    })
  }

  const pdfs = import.meta.glob<string>('@course/[0-9][0-9]-*/leituras/*.pdf', { query: '?url', import: 'default', eager: true })
  const metadata = import.meta.glob<unknown>('@course/[0-9][0-9]-*/leituras/*.json', { import: 'default', eager: true })
  for (const [path, url] of Object.entries(pdfs)) {
    const relative = toCourseRelative(path)
    const reading = metadata[path.replace(/\.pdf$/, '.json')]
    if (!relative || !isReadingMetadata(reading)) throw new Error(`Metadados de leitura inválidos: ${path}`)
    const chapterId = relative.split('/')[0]
    docs.push({ kind: 'pdf', slug: relative.replace(/\.pdf$/, ''), chapterId,
      chapterTitle: humanizeSlug(chapterId), section: 'leituras',
      fileName: relative.split('/').at(-1) ?? reading.title, title: reading.title, url, reading })
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
        name: documentLabel(doc),
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
      name: documentLabel(doc),
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


// Links salvos do piloto anterior continuam levando ao capítulo reconstruído.
const replacedChapter10Slugs = new Set([
  '10-complexidade-e-big-o/aula/01-do-problema-a-contagem',
  '10-complexidade-e-big-o/aula/02-big-o-e-crescimento',
  '10-complexidade-e-big-o/aula/03-memoria-e-custos-escondidos',
  '10-complexidade-e-big-o/aula/04-experimentos',
  '10-complexidade-e-big-o/pratica/01-fundamentos',
  '10-complexidade-e-big-o/pratica/02-aplicacao',
  '10-complexidade-e-big-o/pratica/03-desafios',
  '10-complexidade-e-big-o/pratica/debugging',
  '10-complexidade-e-big-o/pratica/leetcode',
  '10-complexidade-e-big-o/checkpoint/perguntas',
  '10-complexidade-e-big-o/revisao/resumo',
  '10-complexidade-e-big-o/revisao/erros-comuns',
  '10-complexidade-e-big-o/revisao/revisitar',
  '10-complexidade-e-big-o/recursos/referencias',
])

export function resolveDocumentSlug(slug: string): string {
  return replacedChapter10Slugs.has(slug) ? '10-complexidade-e-big-o/README' : slug
}

export function getDocument(slug: string): CatalogDocument | undefined {
  return documentMap.get(resolveDocumentSlug(slug))
}

export function getNeighbors(slug: string): {
  prev: CatalogDocument | null
  next: CatalogDocument | null
} {
  slug = resolveDocumentSlug(slug)
  const chapterId = documentMap.get(slug)?.chapterId
  if (chapterId && documentMap.has(`${chapterId}/pratica/atividades`)) {
    const ordered = [`${chapterId}/README`, `${chapterId}/notas`, `${chapterId}/pratica/atividades`]
      .map((path) => documentMap.get(path))
      .filter((doc): doc is CatalogDocument => doc !== undefined)
    const position = ordered.findIndex((doc) => doc.slug === slug)
    if (position !== -1) return { prev: ordered[position - 1] ?? null, next: ordered[position + 1] ?? null }
  }
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


export function documentLabel(doc: CatalogDocument): string {
  return Number(doc.chapterId.slice(0, 2)) >= 10 && doc.fileName === 'README.md' ? 'Guia de estudo' : doc.fileName
}
