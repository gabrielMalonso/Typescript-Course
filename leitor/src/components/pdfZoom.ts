/** Keep the point under the gesture fixed as the document changes width. */
export function zoomPosition(oldWidth: number, newWidth: number, viewportWidth: number, left: number, top: number, x: number, y: number) {
  const ratio = newWidth / oldWidth
  const oldInset = Math.max(0, (viewportWidth - oldWidth) / 2)
  const newInset = Math.max(0, (viewportWidth - newWidth) / 2)
  return {
    left: Math.max(0, (left + x - oldInset) * ratio + newInset - x),
    top: Math.max(0, (top + y) * ratio - y),
  }
}

export function clampZoom(value: number) {
  return Math.min(4, Math.max(1, value))
}
