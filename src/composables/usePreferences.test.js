import { test, expect, afterEach } from 'bun:test'
import { locale, theme, translate, localize } from './usePreferences'
import { projects } from '../data/portfolio'
afterEach(() => {
  locale.value = 'es'
  theme.value = 'dark'
})
test('defaults are Spanish and dark', () => {
  expect(locale.value).toBe('es')
  expect(theme.value).toBe('dark')
})
test('English localizes every project without changing routes, image paths or palette values', () => {
  locale.value = 'en'
  const translated = localize(projects)
  expect(translated.map((p) => p.name)).toEqual([
    'School management',
    'Detention management',
    'Asset forfeiture',
    'Citizen wallet',
  ])
  translated.forEach((p, i) => {
    expect(p.slug).toBe(projects[i].slug)
    expect(p.image).toBe(projects[i].image)
    expect(p.caseStudy.palette.map((c) => c.value)).toEqual(
      projects[i].caseStudy.palette.map((c) => c.value),
    )
    expect(p.gallery.length).toBe(projects[i].gallery.length)
    p.gallery.forEach((s, n) => {
      expect(s.image).toBe(projects[i].gallery[n].image)
      expect(s.title).not.toBe(projects[i].gallery[n].title)
    })
  })
})
test('translation preserves numeric values and personal names and restores Spanish', () => {
  locale.value = 'en'
  expect(translate(2026)).toBe(2026)
  expect(translate('Jorge Iván')).toBe('Jorge Iván')
  expect(translate('Ver mi trabajo')).toBe('View my work')
  locale.value = 'es'
  expect(translate('Ver mi trabajo')).toBe('Ver mi trabajo')
})
