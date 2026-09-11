/** EmbedPDF 2.15 renders its native toolbar slots above #document-content.
 * Reorder their flex items without moving library-owned nodes or changing commands.
 */
export function arrangeViewer(container: Element, dark: boolean) {
  const root = container.shadowRoot
  if (!root) return
  if ('setTheme' in container && typeof container.setTheme === 'function') container.setTheme(dark ? 'dark' : 'light')
  const style = document.createElement('style')
  style.textContent = `
    [data-study-layout] { padding-bottom: env(safe-area-inset-bottom, 0px); }
    #document-content { order: 0; min-height: 0; }
    [data-study-bar] { flex-shrink: 0; border-top: 1px solid var(--ep-border-subtle); }
    [data-study-popup] { top: var(--study-popup-top) !important; max-height: var(--study-popup-height); overflow-y: auto; }
    ${dark ? '#document-content img[src^="blob:"] { filter: invert(1) hue-rotate(180deg) brightness(.9); }' : ''}
    @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }
  `
  root.append(style)
  const arrange = () => {
    const content = root.getElementById('document-content')
    const layout = content?.parentElement
    if (!content || !layout) return
    layout.setAttribute('data-study-layout', '')
    let order = 1
    for (const child of layout.children) {
      if (child === content) break
      if (child instanceof HTMLElement) { child.setAttribute('data-study-bar', ''); const value = String(order++); if (child.style.order !== value) child.style.order = value }
    }
  }
  const positionMenus = () => {
    const bounds = root.getElementById('document-content')?.getBoundingClientRect()
    if (!bounds) return
    for (const menu of root.querySelectorAll<HTMLElement>('[data-epdf-i][style*="position: fixed"]')) {
      const height = Math.max(80, bounds.height - 16)
      const top = Math.max(bounds.top + 8, Math.min(parseFloat(menu.style.top) || bounds.top, bounds.bottom - 8 - Math.min(menu.scrollHeight, height)))
      if (!menu.hasAttribute('data-study-popup')) menu.setAttribute('data-study-popup', '')
      for (const [key, value] of [['--study-popup-top', `${top}px`], ['--study-popup-height', `${height}px`]]) {
        if (menu.style.getPropertyValue(key) !== value) menu.style.setProperty(key, value)
      }
    }
  }
  let frame = 0
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { arrange(); positionMenus() }) }
  arrange()
  const observer = new MutationObserver(schedule)
  observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] })
  window.addEventListener('resize', schedule)
  return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('resize', schedule); style.remove() }
}
