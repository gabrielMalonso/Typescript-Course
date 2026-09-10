import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

function compile(file, require) {
  const context = { exports: {}, require, setTimeout, clearTimeout }
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, context)
  return context.exports
}
const math = compile('../src/components/pdfZoom.ts')
const centered = math.zoomPosition(800, 1600, 800, 0, 500, 400, 300)
assert.equal(centered.left, 400)
assert.equal(centered.top, 1300)
const back = math.zoomPosition(1600, 800, 800, centered.left, centered.top, 400, 300)
assert.equal(back.left, 0)
assert.equal(back.top, 500)
assert.equal(math.zoomPosition(1000, 2000, 1400, 0, 0, 700, 100).left, 300)
assert.equal(math.clampZoom(0.2), 1)
assert.equal(math.clampZoom(10), 4)

const listeners = new Map()
const updates = []
let cleanup
const viewport = {
  clientWidth: 800, scrollLeft: 0, scrollTop: 0,
  getBoundingClientRect: () => ({ left: 0, top: 60 }),
  scrollTo(left, top) { this.scrollLeft = left; this.scrollTop = top },
  addEventListener(name, handler) { listeners.set(name, handler) },
  removeEventListener(name) { listeners.delete(name) },
}
const content = { style: {} }
const hook = compile('../src/components/usePdfZoom.ts', name => name === './pdfZoom' ? math : {
  useRef: current => ({ current }),
  useState: value => [value, next => updates.push(next)],
  useEffect: effect => { cleanup = effect() },
})
hook.usePdfZoom({ current: viewport }, { current: content }, 800)
assert.equal(content.style.width, '800px')
let prevented = 0
const event = touches => ({ touches, preventDefault() { prevented++ } })
listeners.get('touchstart')(event([{ clientX: 300, clientY: 360 }]))
assert.equal(prevented, 0, 'One finger keeps native panning')
listeners.get('touchstart')(event([{ clientX: 300, clientY: 360 }, { clientX: 500, clientY: 360 }]))
listeners.get('touchmove')(event([{ clientX: 200, clientY: 360 }, { clientX: 600, clientY: 360 }]))
assert.equal(content.style.width, '1600px')
assert.equal(viewport.scrollLeft, 400)
assert.equal(viewport.scrollTop, 300)
assert.equal(prevented, 2, 'Pinch prevents browser zoom')
assert.equal(updates.at(-1), 800, 'No canvas rerender during pinch')
listeners.get('touchend')(event([]))
assert.equal(updates.at(-1), 1600, 'Refresh canvas resolution after pinch')
listeners.get('wheel')({ ctrlKey: false, preventDefault() { throw Error('Ordinary scroll was blocked') } })
cleanup()
assert.equal(listeners.size, 0, 'All gesture listeners cleaned up')
console.log('PDF zoom: anchors, limits, touch handling, rendering and cleanup passed')
