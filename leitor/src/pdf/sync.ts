export type AnnotationRecord = {
  annotationId: string
  pageIndex: number
  payload: string | null
  revision: number
  operationId: string
}
export type Pending = Omit<AnnotationRecord, 'revision'> & {
  baseRevision: number
  document: string
  queuedAt: number
}
type SaveResult = { status: 'saved' | 'conflict'; revision: number }
export type SyncStatus = { pending: number; error: string; conflict: boolean }

/** One storage key per operation avoids two tabs overwriting each other's outbox. */
export class AnnotationSync {
  private pending: Pending[] = []
  private revisions = new Map<string, number>()
  private running = false
  private stopped = false
  private conflictRevision: number | null = null
  private error = ''
  private readonly prefix: string
  private readonly document: string
  private storage: Storage
  private save: (pending: Pending) => Promise<SaveResult>
  private changed: (state: SyncStatus) => void
  constructor(
    owner: string,
    storage: Storage,
    save: (pending: Pending) => Promise<SaveResult>,
    changed: (state: SyncStatus) => void,
    document: string,
  ) {
    this.document = document
    this.storage = storage
    this.save = save
    this.changed = changed
    this.prefix = `pdf-outbox:${owner}:${document}:`
    try {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        if (!key?.startsWith(this.prefix)) continue
        const value: unknown = JSON.parse(storage.getItem(key) ?? 'null')
        if (!isPending(value) || value.document !== document)
          throw new Error('Rascunho inválido')
        this.pending.push(value)
      }
      this.pending.sort(
        (a, b) =>
          a.queuedAt - b.queuedAt || a.operationId.localeCompare(b.operationId),
      )
    } catch {
      this.error =
        'Não foi possível recuperar os rascunhos locais. Não feche esta página.'
    }
  }
  get drafts() {
    return this.pending
  }
  get hasPending() {
    return this.pending.length > 0
  }
  get hasConflict() {
    return this.conflictRevision !== null
  }
  hasPendingFor(id: string) {
    return this.pending.some((p) => p.annotationId === id)
  }
  revisionFor(id: string) {
    return this.revisions.get(id) ?? 0
  }
  receive(rows: AnnotationRecord[]) {
    for (const row of rows)
      this.revisions.set(
        row.annotationId,
        Math.max(this.revisions.get(row.annotationId) ?? 0, row.revision),
      )
    this.emit()
  }
  enqueue(annotationId: string, pageIndex: number, payload: string | null) {
    const previous = this.pending
      .filter((p) => p.annotationId === annotationId)
      .at(-1)
    const operation: Pending = {
      document: this.document,
      annotationId,
      pageIndex,
      payload,
      operationId: crypto.randomUUID(),
      baseRevision: previous
        ? previous.baseRevision + 1
        : (this.revisions.get(annotationId) ?? 0),
      queuedAt: Math.max(Date.now(), (this.pending.at(-1)?.queuedAt ?? 0) + 1),
    }
    this.pending.push(operation)
    this.persist(operation)
    this.emit()
    void this.flush()
  }
  private persist(op: Pending) {
    try {
      this.storage.setItem(this.prefix + op.operationId, JSON.stringify(op))
    } catch {
      this.error =
        'Sem espaço para o rascunho local. Mantenha a página aberta até sincronizar.'
    }
  }
  async flush() {
    if (this.running || this.stopped || this.hasConflict) return
    this.running = true
    try {
      while (this.pending.length && !this.stopped) {
        const op = this.pending[0]
        const result = await this.save(op)
        if (result.status === 'conflict') {
          this.conflictRevision = result.revision
          break
        }
        this.revisions.set(
          op.annotationId,
          Math.max(result.revision, this.revisions.get(op.annotationId) ?? 0),
        )
        this.storage.removeItem(this.prefix + op.operationId)
        this.pending.shift()
        this.error = ''
        this.emit()
      }
    } catch {
      this.error =
        'Alterações pendentes. Reconecte ou tente sincronizar novamente.'
    } finally {
      this.running = false
      this.emit()
    }
  }
  resolveConflict(keepLocal: boolean) {
    if (!this.pending.length || this.conflictRevision === null) return
    const first = this.pending[0]
    const affected = this.pending.filter(
      (p) => p.annotationId === first.annotationId,
    )
    this.pending = this.pending.filter(
      (p) => p.annotationId !== first.annotationId,
    )
    for (const op of affected)
      this.storage.removeItem(this.prefix + op.operationId)
    this.revisions.set(first.annotationId, this.conflictRevision)
    this.conflictRevision = null
    if (keepLocal) {
      const latest = affected[affected.length - 1]
      this.enqueue(latest.annotationId, latest.pageIndex, latest.payload)
    }
    this.emit()
    void this.flush()
  }
  stop() {
    this.stopped = true
  }
  private emit() {
    if (!this.stopped)
      this.changed({
        pending: this.pending.length,
        error: this.error,
        conflict: this.hasConflict,
      })
  }
}

function isPending(v: unknown): v is Pending {
  if (!v || typeof v !== 'object') return false
  return (
    'document' in v &&
    typeof v.document === 'string' &&
    'annotationId' in v &&
    typeof v.annotationId === 'string' &&
    'operationId' in v &&
    typeof v.operationId === 'string' &&
    'pageIndex' in v &&
    Number.isInteger(v.pageIndex) &&
    'payload' in v &&
    (v.payload === null || typeof v.payload === 'string') &&
    'baseRevision' in v &&
    Number.isInteger(v.baseRevision) &&
    'queuedAt' in v &&
    typeof v.queuedAt === 'number'
  )
}
