import { test, expect } from 'bun:test'
import { mkdtemp, mkdir, writeFile, utimes, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { sourceFingerprint } from './source-fingerprint.mjs'

test('ignores metadata events but detects edits, additions and deletions', async () => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-watch-'))
  try {
    const source = join(root, 'src')
    await mkdir(source)
    const file = join(source, 'main.js')
    await writeFile(file, 'original')
    const original = await sourceFingerprint([source])
    await utimes(file, new Date(), new Date())
    expect(await sourceFingerprint([source])).toBe(original)
    await writeFile(join(source, '.DS_Store'), 'metadata')
    expect(await sourceFingerprint([source])).toBe(original)
    await writeFile(file, 'modified')
    const modified = await sourceFingerprint([source])
    expect(modified).not.toBe(original)
    const added = join(source, 'other.js')
    await writeFile(added, 'new')
    expect(await sourceFingerprint([source])).not.toBe(modified)
    await rm(added)
    expect(await sourceFingerprint([source])).toBe(modified)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
