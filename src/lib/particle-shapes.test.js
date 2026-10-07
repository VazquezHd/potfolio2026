import { test, expect } from 'bun:test'
import { createParticleShapes, createParticleIndices } from './particle-shapes'
test('closing sphere retains its radius and finite coordinates', () => {
  const positions = createParticleShapes(4).sphere
  expect(positions.length).toBe(12000)
  for (let i = 0; i < positions.length; i += 3) {
    const [x, y, z] = positions.slice(i, i + 3)
    expect(Number.isFinite(x + y + z)).toBe(true)
    expect(Math.hypot(x, y, z)).toBeCloseTo(4, 5)
  }
})

test('compact sampling keeps points across the complete sphere', () => {
  const sphere = createParticleShapes(4).sphere
  const indices = createParticleIndices(true)
  expect(indices.length).toBe(2000)
  expect(sphere[indices[0] * 3 + 2]).toBeGreaterThan(3.9)
  expect(sphere[indices.at(-1) * 3 + 2]).toBeLessThan(-3.9)
  expect(createParticleIndices(false).length).toBe(4000)
})
