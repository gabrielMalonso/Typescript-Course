export type TreeNode =
  | {
      type: 'folder'
      id: string
      name: string
      children: TreeNode[]
    }
  | {
      type: 'file'
      id: string
      name: string
      /** Caminho relativo do curso, sem extensão. Ex: 00-preparacao-do-ambiente/aula/01-teoria */
      slug: string
      chapterId: string
      section: string
    }

export type CatalogDocument = {
  slug: string
  chapterId: string
  chapterTitle: string
  section: string
  fileName: string
  title: string
  content: string
}

export type ChapterProgressStatus = 'concluido' | 'em_andamento' | 'pendente'

export type ChapterProgress = {
  chapterId: string
  label: string
  status: ChapterProgressStatus
}
