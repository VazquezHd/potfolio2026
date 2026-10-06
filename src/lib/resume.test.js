import { test, expect } from 'bun:test'
import { selectResume } from './resume'
import { profile } from '../data/portfolio'
test('CV download follows the selected language and both documents are valid PDFs', async () => {
  expect(selectResume(profile.resumes, 'es')).toEndWith('cv-es-2026.pdf')
  expect(selectResume(profile.resumes, 'en')).toEndWith('cv-en-2026.pdf')
  expect(selectResume(profile.resumes, undefined)).toBe(profile.resumes.es)
  for (const url of Object.values(profile.resumes)) {
    const file = Bun.file(`public${url}`)
    expect(file.size).toBeGreaterThan(1000)
    expect(await file.slice(0, 5).text()).toBe('%PDF-')
  }
})
