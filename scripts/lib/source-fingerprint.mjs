import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function sourceFingerprint(paths) {
  const hash = createHash('sha256')
  async function visit(path) {
    let entries
    try {
      entries = await readdir(path, { withFileTypes: true })
    } catch (error) {
      if (error.code === 'ENOENT') return
      if (error.code !== 'ENOTDIR') throw error
      hash.update(JSON.stringify(path))
      hash.update(await readFile(path))
      return
    }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name.startsWith('.')) continue
      await visit(join(path, entry.name))
    }
  }
  for (const path of paths) await visit(path)
  return hash.digest('hex')
}
