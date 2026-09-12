type Point = { x: number; y: number }
type Input = {
  type: string
  pointerType: string
  pointerId: number
  clientX: number
  clientY: number
}

/** Keep touch navigation separate from annotation tools, even during pen contact. */
export class PdfTouchNavigation {
  private touches = new Map<number, Point>()
  private pens = new Set<number>()
  private palm = false
  get suppressTouchGestures() {
    return this.pens.size > 0 || this.palm
  }
  pointer(event: Input): Point | undefined {
    const down = event.type === 'pointerdown'
    const end = event.type === 'pointerup' || event.type === 'pointercancel'
    if (event.pointerType === 'pen') {
      if (down) {
        this.pens.add(event.pointerId)
        this.palm = this.touches.size > 0
      }
      if (end) this.pens.delete(event.pointerId)
      return
    }
    if (event.pointerType !== 'touch') return
    if (!down && !end && event.type !== 'pointermove') return
    const previous = this.touches.get(event.pointerId)
    if (end) {
      this.touches.delete(event.pointerId)
      if (!this.touches.size) this.palm = false
      return
    }
    if (!down && !previous) return
    this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (this.pens.size) this.palm = true
    if (previous && this.touches.size === 1 && !this.suppressTouchGestures)
      return { x: previous.x - event.clientX, y: previous.y - event.clientY }
  }
}

/** Capture before EmbedPDF strips pointerType from its normalized annotation events.
 * Raw TouchEvents still reach its native pinch zoom; one finger pans the viewport.
 */
export function restrictPdfInput(container: Element) {
  const root = container.shadowRoot
  if (!root) return
  const navigation = new PdfTouchNavigation()
  const style = document.createElement('style')
  style.textContent = '#document-content { touch-action: none !important; }'
  root.append(style)
  let viewport: HTMLElement | undefined
  const inPage = (event: Event) => {
    const path = event.composedPath()
    return (
      path.some(
        (node) => node instanceof Element && node.id === 'document-content',
      ) &&
      !path.some(
        (node) =>
          node instanceof Element &&
          node.matches(
            'button,a,input,textarea,select,[role="button"],[role="menu"],[role="menuitem"],[contenteditable="true"]',
          ),
      )
    )
  }
  const scrollContainer = (event: Event) =>
    event
      .composedPath()
      .find(
        (node): node is HTMLElement =>
          node instanceof HTMLElement &&
          /(auto|scroll)/.test(getComputedStyle(node).overflowY),
      )
  const pointer = (event: PointerEvent) => {
    if (!inPage(event)) return
    if (event.pointerType === 'touch' && event.type === 'pointerdown')
      viewport = scrollContainer(event)
    const delta = navigation.pointer(event)
    if (event.pointerType === 'pen' || event.pointerType === 'mouse') return
    // Prevent compatibility mouse events from invoking an annotation tool a second time.
    if (event.type === 'pointerdown') event.preventDefault()
    event.stopImmediatePropagation()
    if (delta && viewport) {
      viewport.scrollLeft += delta.x
      viewport.scrollTop += delta.y
    }
  }
  const compatibility = (event: MouseEvent) => {
    const touch =
      ('pointerType' in event && event.pointerType === 'touch') ||
      ('sourceCapabilities' in event &&
        event.sourceCapabilities &&
        typeof event.sourceCapabilities === 'object' &&
        'firesTouchEvents' in event.sourceCapabilities &&
        event.sourceCapabilities.firesTouchEvents)
    if (touch && inPage(event)) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }
  const touch = (event: TouchEvent) => {
    if (inPage(event) && navigation.suppressTouchGestures) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }
  const pointerEvents = [
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointercancel',
    'pointerenter',
    'pointerleave',
    'pointerover',
    'pointerout',
  ] as const
  const mouseEvents = [
    'mousedown',
    'mousemove',
    'mouseup',
    'click',
    'dblclick',
  ] as const
  const touchEvents = [
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
  ] as const
  // ShadowRoot's generic overload does not include PointerEvent/TouchEvent maps.
  for (const name of pointerEvents)
    root.addEventListener(name, pointer as EventListener, {
      capture: true,
      passive: false,
    })
  for (const name of mouseEvents)
    root.addEventListener(name, compatibility as EventListener, {
      capture: true,
      passive: false,
    })
  for (const name of touchEvents)
    root.addEventListener(name, touch as EventListener, {
      capture: true,
      passive: false,
    })
  return () => {
    style.remove()
    for (const name of pointerEvents)
      root.removeEventListener(name, pointer as EventListener, true)
    for (const name of mouseEvents)
      root.removeEventListener(name, compatibility as EventListener, true)
    for (const name of touchEvents)
      root.removeEventListener(name, touch as EventListener, true)
  }
}
