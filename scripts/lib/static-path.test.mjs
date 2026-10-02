import { test, expect } from 'bun:test'
import { resolveStaticPath } from './static-path.mjs'
const root = '/tmp/portfolio-dist'
test('serves the entry page and nested project assets', () => {
  expect(resolveStaticPath(root, '/')).toBe(`${root}/index.html`)
  expect(resolveStaticPath(root, '/assets/images/projects/chuchito.png')).toBe(
    `${root}/assets/images/projects/chuchito.png`,
  )
})
test('rejects traversal and malformed paths before accessing files', () => {
  for (const pathname of [
    '/../secret',
    '/%2e%2e/secret',
    '/%2f../secret',
    '/%00file',
    '/%zz',
    '/\\secret',
  ]) {
    expect(resolveStaticPath(root, pathname)).toBeNull()
  }
})
