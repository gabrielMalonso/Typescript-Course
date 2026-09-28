import { chapterCount, documents, fileTree } from '../content/catalog'
import { FileTree, TreeShell } from '../components/FileTree'
import { ThemeToggle } from '../components/ThemeToggle'

export function Home() {
  return (
    <div className="home-page">
      <div className="home-topbar">
        <ThemeToggle />
      </div>

      <header className="home-hero">
        <h1>Leitor de Aulas</h1>
        <div className="home-actions">
          <a className="btn ghost" href="/pad/">Abrir TypeScript Pad</a>
        </div>
        <dl className="home-stats">
          <div>
            <dt>Capítulos</dt>
            <dd>{chapterCount()}</dd>
          </div>
          <div>
            <dt>Arquivos</dt>
            <dd>{documents.length}</dd>
          </div>
        </dl>
      </header>

      <div className="home-grid">
        <section id="indice" className="home-index">
          <TreeShell title="Índice do curso">
            <FileTree nodes={fileTree} />
          </TreeShell>
        </section>
      </div>
    </div>
  )
}
