import type { ChapterProgress } from '../content/types'
import progressData from '../content/progress.json'

const statusLabel: Record<ChapterProgress['status'], string> = {
  concluido: 'Concluído',
  em_andamento: 'Em andamento',
  pendente: 'Pendente',
}

export function ProgressSummary() {
  const items = progressData as ChapterProgress[]

  const done = items.filter((i) => i.status === 'concluido').length
  const total = items.length

  return (
    <section className="progress-card">
      <div className="progress-card-head">
        <h2>Progresso</h2>
        <p>
          {done} de {total} capítulos registrados
        </p>
      </div>
      <ul className="progress-list">
        {items.map((item) => (
          <li key={item.chapterId} className={`progress-item status-${item.status}`}>
            <span className="progress-dot" aria-hidden />
            <div>
              <strong>{item.label}</strong>
              <span>{statusLabel[item.status]}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
