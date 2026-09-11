import { describe, expect, it } from 'vitest'
import { pdfPageFromHash } from '../src/pdf/pdfPageLink'

describe('reading page links', () => {
  it('counts pages inside the excerpt, starting at one', () => {
    expect(pdfPageFromHash('#page=4', 4)).toBe(4)
    expect(pdfPageFromHash('#page=1', 4)).toBe(1)
  })
  it.each(['', '#page=0', '#page=5', '#page=-1', '#page=1.5', '#page=bad'])(
    'opens the first page for invalid fragment %s',
    (hash) => {
      expect(pdfPageFromHash(hash, 4)).toBe(1)
    },
  )
})
