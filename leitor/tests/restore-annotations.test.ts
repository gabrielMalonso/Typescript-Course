import { expect, it, vi } from 'vitest'
import { restoreAnnotations } from '../src/pdf/restoreAnnotations'
import type { AnnotationRecord, Pending } from '../src/pdf/sync'

function row(id: string, text = id): AnnotationRecord {
  return { annotationId: id, pageIndex: 0, revision: 1, operationId: id,
    payload: JSON.stringify({ id, type: 3, pageIndex: 0, rect: {}, contents: text }) }
}
function draft(record: AnnotationRecord): Pending {
  return { ...record, document: 'book', baseRevision: 0, queuedAt: 1 }
}
function setup(rows: AnnotationRecord[] = [], drafts: Pending[] = []) {
  return {
    rows,
    controller: { drafts, hasPendingFor: (id: string) => drafts.some(x => x.annotationId === id), revisionFor: () => 0 },
    scope: { getAnnotationById: vi.fn(() => null), deleteAnnotation: vi.fn(), updateAnnotation: vi.fn(), importAnnotations: vi.fn() },
    images: { load: vi.fn(async () => new ArrayBuffer(1)), remember: vi.fn() },
    seen: new Map<string, string | null>(), cancelled: () => false,
    hasImageJob: () => false, setApplying: vi.fn(), discardHistory: vi.fn(),
  }
}

it('does not replay older offline edits or discard their undo history', async () => {
  const first = row('note', 'first'), latest = row('note', 'latest')
  const options = setup([], [draft(first), draft(latest)])
  options.seen.set('note', latest.payload)
  expect(await restoreAnnotations(options)).toBe(false)
  expect(options.scope.importAnnotations).not.toHaveBeenCalled()
  expect(options.scope.updateAnnotation).not.toHaveBeenCalled()
  expect(options.discardHistory).not.toHaveBeenCalled()
})

it('restores only the final local state after reopening a reading', async () => {
  const latest = row('note', 'latest')
  const options = setup([], [draft(row('note', 'first')), draft(latest)])
  await restoreAnnotations(options)
  expect(options.scope.importAnnotations).toHaveBeenCalledTimes(1)
  expect(options.seen.get('note')).toBe(latest.payload)
  expect(options.discardHistory).not.toHaveBeenCalled()
})

it('restores later annotations and local drafts when an image fails, then retries it', async () => {
  const image = row('image')
  image.payload = JSON.stringify({ id: 'image', type: 13, pageIndex: 0, rect: {}, _imageKey: 'key' })
  const options = setup([image, row('remote')], [draft(row('local'))])
  options.images.load.mockRejectedValueOnce(new Error('offline'))
  expect(await restoreAnnotations(options)).toBe(true)
  expect([...options.seen.keys()]).toEqual(['remote', 'local'])
  expect(options.discardHistory.mock.calls).toEqual([['remote']])
  expect(await restoreAnnotations(options)).toBe(false)
  expect(options.seen.has('image')).toBe(true)
  expect(options.scope.importAnnotations).toHaveBeenCalledTimes(3)
})

it('stops suppressing user edits if the viewer rejects one record', async () => {
  const options = setup([row('bad'), row('good')])
  options.scope.importAnnotations.mockImplementationOnce(() => { throw new Error('viewer error') })
  expect(await restoreAnnotations(options)).toBe(true)
  expect([...options.seen.keys()]).toEqual(['good'])
  expect(options.setApplying.mock.calls).toEqual([[true], [false], [true], [false]])
})

it('does not import an image after the reading has unmounted', async () => {
  const image = row('image')
  image.payload = JSON.stringify({ id: 'image', type: 13, pageIndex: 0, rect: {}, _imageKey: 'key' })
  const options = setup([image])
  let cancelled = false
  options.cancelled = () => cancelled
  options.images.load.mockImplementation(async () => { cancelled = true; return new ArrayBuffer(1) })
  await restoreAnnotations(options)
  expect(options.scope.importAnnotations).not.toHaveBeenCalled()
  expect(options.setApplying).not.toHaveBeenCalled()
})
