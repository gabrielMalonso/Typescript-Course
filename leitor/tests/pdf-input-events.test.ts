import { afterEach, expect, it, vi } from 'vitest'
import { restrictPdfInput } from '../src/pdf/pdfInput'

// Minimal event surfaces exercise the installed listeners without a browser dependency.
class Surface extends EventTarget {
  id = 'document-content'
  scrollLeft = 0
  scrollTop = 0
  matches() { return false }
  append() {}
  remove() {}
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions) {
    // Node's EventTarget needs the options object to match captured listeners.
    super.removeEventListener(type, listener, typeof options === 'boolean' ? { capture: options } : options)
  }
}
function fixture() {
  const root = new Surface(), page = new Surface(), outside = new Surface()
  vi.stubGlobal('window', outside)
  vi.stubGlobal('Element', Surface)
  vi.stubGlobal('HTMLElement', Surface)
  vi.stubGlobal('document', { createElement: () => new Surface() })
  vi.stubGlobal('getComputedStyle', () => ({ overflowY: 'auto' }))
  // Only shadowRoot is read from the container by the adapter.
  const container = Object.assign(new Surface(), { shadowRoot: root })
  const dispose = restrictPdfInput(container as unknown as Element)
  const send = (target: EventTarget, type: string, pointerType: string, pointerId: number, y = 100) => {
    const event = new Event(type, { cancelable: true })
    Object.assign(event, { pointerType, pointerId, clientX: 100, clientY: y,
      composedPath: () => target === root ? [page, root] : [outside] })
    target.dispatchEvent(event)
  }
  return { root, page, outside, dispose, send }
}
afterEach(() => vi.unstubAllGlobals())

it.each(['pointerup', 'pointercancel'])('releases touch and pen outside the page on %s', end => {
  const { root, page, outside, dispose, send } = fixture()
  send(root, 'pointerdown', 'pen', 9)
  send(root, 'pointerdown', 'touch', 1)
  send(outside, end, 'pen', 9)
  send(outside, end, 'touch', 1)
  send(root, 'pointerdown', 'touch', 2)
  send(root, 'pointermove', 'touch', 2, 70)
  expect(page.scrollTop).toBe(30)
  dispose?.()
})

it('clears interrupted contacts on window blur and removes global listeners on unmount', () => {
  const { root, page, outside, dispose, send } = fixture()
  const remove = vi.spyOn(outside, 'removeEventListener')
  send(root, 'pointerdown', 'pen', 9)
  send(root, 'pointerdown', 'touch', 1)
  outside.dispatchEvent(new Event('blur'))
  send(root, 'pointerdown', 'touch', 2)
  send(root, 'pointermove', 'touch', 2, 60)
  expect(page.scrollTop).toBe(40)
  dispose?.()
  expect(remove.mock.calls.map(([type]) => type)).toEqual(['pointerup', 'pointercancel', 'blur'])
  send(root, 'pointermove', 'touch', 2, 20)
  expect(page.scrollTop).toBe(40)
})
