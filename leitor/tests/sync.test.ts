import { describe, expect, it, vi } from 'vitest'
import { AnnotationSync, DOCUMENT, type Pending } from '../src/lab/sync'

function storage(): Storage {
  const data = new Map<string, string>()
  return { get length() { return data.size }, key: i => [...data.keys()][i] ?? null, getItem: k => data.get(k) ?? null, setItem: (k, v) => { data.set(k, v) }, removeItem: k => { data.delete(k) }, clear: () => data.clear() }
}
const settled = () => new Promise(resolve => setTimeout(resolve, 0))

describe('annotation outbox', () => {
  it('restores failed writes after reload, without mixing owners', async () => {
    const disk = storage()
    const offline = new AnnotationSync('owner', disk, async () => { throw new Error('offline') }, () => {})
    offline.enqueue('stroke', 0, 'original')
    await settled()
    expect(disk.length).toBe(1)
    offline.stop()
    const saved: Pending[] = []
    const restored = new AnnotationSync('owner', disk, async op => { saved.push(op); return { status: 'saved', revision: 1 } }, () => {})
    expect(new AnnotationSync('stranger', disk, vi.fn(), () => {}).hasPending).toBe(false)
    await restored.flush()
    expect(saved[0]).toMatchObject({ annotationId: 'stroke', payload: 'original', document: DOCUMENT })
    expect(restored.hasPending).toBe(false)
    expect(disk.length).toBe(0)
  })

  it('serializes rapid edits using consecutive revisions', async () => {
    const operations: Pending[] = []
    const sync = new AnnotationSync('owner', storage(), async op => { operations.push(op); return { status: 'saved', revision: op.baseRevision + 1 } }, () => {})
    sync.receive([{ annotationId: 'stroke', pageIndex: 0, payload: 'old', revision: 4, operationId: 'old' }])
    sync.enqueue('stroke', 0, 'edit')
    sync.enqueue('stroke', 0, null)
    await settled()
    expect(operations.map(x => x.baseRevision)).toEqual([4, 5])
    expect(sync.revisionFor('stroke')).toBe(6)
  })

  it.each([true, false])('requires a decision for conflicts (keep local: %s)', async keep => {
    const disk = storage()
    const writes: Pending[] = []
    let conflict = true
    const sync = new AnnotationSync('owner', disk, async op => {
      writes.push(op)
      return conflict ? { status: 'conflict', revision: 3 } : { status: 'saved', revision: op.baseRevision + 1 }
    }, () => {})
    sync.enqueue('stroke', 0, 'first')
    sync.enqueue('stroke', 0, 'latest')
    await settled()
    expect(sync.hasConflict).toBe(true)
    await sync.flush()
    expect(writes.length).toBe(1)
    conflict = false
    sync.resolveConflict(keep)
    await settled()
    expect(sync.hasPending).toBe(false)
    expect(disk.length).toBe(0)
    if (keep) expect(writes[1]).toMatchObject({ payload: 'latest', baseRevision: 3 })
    else expect(writes.length).toBe(1)
  })

  it('keeps independent drafts from two tabs in separate storage entries', async () => {
    const disk = storage()
    const offline = async () => { throw new Error('offline') }
    const a = new AnnotationSync('owner', disk, offline, () => {})
    const b = new AnnotationSync('owner', disk, offline, () => {})
    a.enqueue('a', 0, 'A'); b.enqueue('b', 1, 'B')
    await settled()
    expect(disk.length).toBe(2)
    const restored = new AnnotationSync('owner', disk, offline, () => {})
    expect(restored.drafts.map(x => x.annotationId).sort()).toEqual(['a', 'b'])
  })
})

it('restores only the selected reading outbox', async () => {
  const disk = storage()
  const offline = async () => { throw new Error('offline') }
  const first = new AnnotationSync('owner', disk, offline, () => {}, 'reading-one@v1')
  const second = new AnnotationSync('owner', disk, offline, () => {}, 'reading-two@v1')
  first.enqueue('same-id', 0, 'one'); second.enqueue('same-id', 0, 'two')
  await settled()
  expect(new AnnotationSync('owner', disk, offline, () => {}, 'reading-one@v1').drafts.map(x => x.payload)).toEqual(['one'])
  expect(new AnnotationSync('owner', disk, offline, () => {}, 'reading-one@v2').drafts).toEqual([])
})
