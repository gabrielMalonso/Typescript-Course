import { Link } from 'react-router-dom'
import { chapterCount, documents, fileTree } from '../content/catalog'
import { FileTree, TreeShell } from '../components/FileTree'
import { ProgressSummary } from '../components/ProgressSummary'
import { ThemeToggle } from '../components/ThemeToggle'

export function Home() {
  const firstDoc = documents.find((doc) => doc.slug === '11-set-map-e-hashing/README') ?? documents[0]

  return (
    <div className="home-page">
      <div className="home-topbar">
        <ThemeToggle />
      </div>

      <header className="home-hero">
        <p className="home-eyebrow">Ciência da Computação e Engenharia de Software</p>
        <h1>Leitor de Aulas</h1>
        <p className="home-lead">
          Formação pessoal com TypeScript como linguagem principal. Capítulo 10 — Complexidade e Big O concluído.
          Capítulo 11 em andamento: fundamentos estudados; continue com Set e Map na prática.
          O capítulo 09 está praticamente concluído, com fechamento formal pendente.
        </p>
        <div className="home-actions">
          {firstDoc ? (
            <Link className="btn primary" to={`/ler/${firstDoc.slug}#etapa-3`}>
              Continuar capítulo 11
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
            <FileTree nodes={fileTree} />
          </TreeShell>
        </section>
        <ProgressSummary />
      </div>
    </div>
  )
}
