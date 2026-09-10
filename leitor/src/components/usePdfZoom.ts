import { useEffect, useRef, useState, type RefObject } from 'react'
import { clampZoom, zoomPosition } from './pdfZoom'

export function usePdfZoom(frame: RefObject<HTMLElement | null>, document: RefObject<HTMLDivElement | null>, width: number) {
  const zoom = useRef(1)
  const [renderWidth, setRenderWidth] = useState(0)

  useEffect(() => {
    const viewport = frame.current
    const content = document.current
    if (!viewport || !content || !width) return
    const baseWidth = Math.min(width, 1000)
    content.style.width = `${baseWidth * zoom.current}px`
    setRenderWidth(baseWidth * zoom.current)
    let pinch: { distance: number; zoom: number } | undefined
    let timer: ReturnType<typeof setTimeout> | undefined

    function apply(next: number, clientX: number, clientY: number) {
      if (!viewport || !content) return
      next = clampZoom(next)
      const rect = viewport.getBoundingClientRect()
      const position = zoomPosition(baseWidth * zoom.current, baseWidth * next, viewport.clientWidth,
        viewport.scrollLeft, viewport.scrollTop, clientX - rect.left, clientY - rect.top)
      content.style.width = `${baseWidth * next}px`
      zoom.current = next
      viewport.scrollTo(position.left, position.top)
    }

    function finish() {
      pinch = undefined
      setRenderWidth(baseWidth * zoom.current)
    }

    function touchStart(event: TouchEvent) {
      if (event.touches.length !== 2) return
      event.preventDefault()
      const [a, b] = event.touches
      pinch = { distance: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), zoom: zoom.current }
    }
    function touchMove(event: TouchEvent) {
      if (!pinch || event.touches.length !== 2) return
      event.preventDefault()
      const [a, b] = event.touches
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
      if (pinch.distance > 0) apply(pinch.zoom * distance / pinch.distance, (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2)
    }
    function touchEnd(event: TouchEvent) {
      if (pinch && event.touches.length < 2) finish()
    }
    function wheel(event: WheelEvent) {
      if (!event.ctrlKey) return
      event.preventDefault()
      apply(zoom.current * Math.exp(-event.deltaY * 0.01), event.clientX, event.clientY)
      clearTimeout(timer)
      timer = setTimeout(finish, 150)
    }

    viewport.addEventListener('touchstart', touchStart, { passive: false })
    viewport.addEventListener('touchmove', touchMove, { passive: false })
    viewport.addEventListener('touchend', touchEnd)
    viewport.addEventListener('touchcancel', finish)
    viewport.addEventListener('wheel', wheel, { passive: false })
    return () => {
      clearTimeout(timer)
      viewport.removeEventListener('touchstart', touchStart)
      viewport.removeEventListener('touchmove', touchMove)
      viewport.removeEventListener('touchend', touchEnd)
      viewport.removeEventListener('touchcancel', finish)
      viewport.removeEventListener('wheel', wheel)
    }
  }, [frame, document, width])

  return renderWidth
}
