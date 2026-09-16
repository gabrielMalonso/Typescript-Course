import { readFileSync, readdirSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { expect, it } from 'vitest'
import { PdfAnnotationSubtype, PdfBlendMode } from '@embedpdf/models'
import { fixHighlightBlendMode } from '../build/embedpdf-highlight'

const directory = new URL('../node_modules/@embedpdf/snippet/dist/', import.meta.url)
const bundle = readdirSync(directory).find((file) => /^embedpdf-.*\.js$/.test(file))!
const nativeCode = readFileSync(new URL(bundle, directory), 'utf8')

// Execute the installed command's annotation construction, including its actual
// defaults, rather than testing a duplicate implementation of the command.
function createSelectionHighlight(code: string, blendMode?: PdfBlendMode) {
  const command = code.indexOf('"annotation:add-highlight":{')
  const start = code.indexOf('h({id:t,created:new Date', command)
  const end = code.indexOf('),d.selectAnnotation', start)
  expect(command).toBeGreaterThan(-1)
  expect(start).toBeGreaterThan(command)
  expect(end).toBeGreaterThan(start)
  return runInNewContext(code.slice(start, end), {
    h: Object.assign,
    t: 'new-highlight',
    p: { strokeColor: '#FFCD45', opacity: 0.45, blendMode },
    e: { pageIndex: 0, rect: {}, segmentRects: [] },
    n: 'selected text',
    $t: PdfAnnotationSubtype,
    zt: PdfBlendMode,
  })
}

it('uses highlight defaults when text is selected before clicking Realçar', () => {
  expect(createSelectionHighlight(nativeCode, PdfBlendMode.HardLight).blendMode)
    .toBe(PdfBlendMode.Multiply)
  expect(createSelectionHighlight(fixHighlightBlendMode(nativeCode), PdfBlendMode.HardLight))
    .toMatchObject({
      blendMode: PdfBlendMode.HardLight,
      strokeColor: '#FFCD45',
      opacity: 0.45,
      custom: { text: 'selected text' },
    })
})

it('respects later style choices and retains the native fallback', () => {
  const code = fixHighlightBlendMode(nativeCode)
  expect(createSelectionHighlight(code, PdfBlendMode.Normal).blendMode).toBe(PdfBlendMode.Normal)
  expect(createSelectionHighlight(code).blendMode).toBe(PdfBlendMode.Multiply)
})

it('requires review if an EmbedPDF update changes the native command', () => {
  expect(() => fixHighlightBlendMode('changed bundle')).toThrow('review the blend-mode fix')
})
