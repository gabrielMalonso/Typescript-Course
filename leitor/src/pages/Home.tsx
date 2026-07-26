import { Link } from 'react-router-dom'
import { chapterCount, documents, fileTree } from '../content/catalog'
import { FileTree, TreeShell } from '../components/FileTree'
import { ProgressSummary } from '../components/ProgressSummary'
import { ThemeToggle } from '../components/ThemeToggle'

export function Home() {
  const firstDoc = documents[0]

  return (
    <div className="home-page">
      <div className="home-topbar">
        <ThemeToggle />
      </div>

      <header className="home-hero">
        <p className="home-eyebrow">Curso de TypeScript</p>
        <h1>Leitor de Aulas</h1>
        <p className="home-lead">
          Navegue pelo índice no estilo explorador e leia as aulas com tipografia
          confortável no computador ou no celular. Os arquivos Markdown do curso
          continuam sendo a fonte da verdade — este app só os apresenta melhor.
        </p>
        <div className="home-actions">
          {firstDoc ? (
            <Link className="btn primary" to={`/ler/${firstDoc.slug}`}>
              Começar a ler
            </Link>
          ) : null}
          <a className="btn ghost" href="#indice">
            Ir ao índice
          </a>
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
            <FileTree nodes={fileTree} defaultExpandedIds={fileTree.map((n) => n.id)} />
          </TreeShell>
        </section>
        <ProgressSummary />
      </div>
    </div>
  )
}
