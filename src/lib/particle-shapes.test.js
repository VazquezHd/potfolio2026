import { test, expect } from 'bun:test'
import { createParticleShapes } from './particle-shapes'
test('closing sphere retains its radius and finite coordinates', () => {
  const positions = createParticleShapes(4).sphere
  expect(positions.length).toBe(12000)
  for (let i = 0; i < positions.length; i += 3) {
    const [x, y, z] = positions.slice(i, i + 3)
    expect(Number.isFinite(x + y + z)).toBe(true)
    expect(Math.hypot(x, y, z)).toBeCloseTo(4, 5)
  }
})
