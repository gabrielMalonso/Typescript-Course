import { describe, expect, it } from 'vitest'
import { canonicalCoursePath } from '../src/content/paths'
import { readings } from '../shared/readings'

describe('numbered course folders', () => {
  it.each([
    ['01-leituras-do-livro/clrs-11.2', 'leituras/clrs-11.2'],
    ['02-aulas-do-curso/01-set', 'aula/01-set'],
    ['03-pratica/atividades', 'pratica/atividades'],
  ])('preserves published paths for %s', (physical, published) => {
    expect(canonicalCoursePath(`11-set-map-e-hashing/${physical}`)).toBe(`11-set-map-e-hashing/${published}`)
    expect(canonicalCoursePath(`11-set-map-e-hashing/${published}`)).toBe(`11-set-map-e-hashing/${published}`)
  })
  it('keeps PDF annotation identities on their original slugs', () => {
    const chapter = readings.filter((reading) => reading.slug.startsWith('11-set-map-e-hashing/'))
    expect(chapter).toHaveLength(3)
    for (const reading of chapter) {
      expect(reading.slug).toContain('/leituras/')
      expect(reading.id).toMatch(new RegExp(`^${reading.slug}@`))
    }
  })
})
