import { resolve, sep } from 'node:path'
export function resolveStaticPath(root, pathname) {
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return null
  }
  if (decoded.includes('\0') || decoded.includes('\\')) return null
  const path = resolve(root, '.' + (decoded === '/' ? '/index.html' : decoded))
  return path.startsWith(resolve(root) + sep) ? path : null
}
