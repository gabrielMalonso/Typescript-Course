import type { Plugin } from 'vite'

// EmbedPDF 2.15's selection-menu command hardcodes Multiply instead of using
// the highlight tool's defaults. Patch only that command, not comment anchors.
const nativeHighlight =
  'type:$t.HIGHLIGHT,blendMode:zt.Multiply,strokeColor:p.strokeColor'
const configuredHighlight =
  'type:$t.HIGHLIGHT,blendMode:p.blendMode??zt.Multiply,strokeColor:p.strokeColor'

export function fixHighlightBlendMode(code: string): string {
  if (code.split(nativeHighlight).length !== 2)
    throw new Error('EmbedPDF highlight command changed; review the blend-mode fix.')
  return code.replace(nativeHighlight, configuredHighlight)
}

export function embedpdfHighlight(): Plugin {
  return {
    name: 'study-embedpdf-highlight',
    enforce: 'pre',
    transform(code, id) {
      if (!/\/@embedpdf\/snippet\/dist\/embedpdf-[^/]+\.js$/.test(id.split('?')[0]))
        return
      return { code: fixHighlightBlendMode(code), map: null }
    },
  }
}
