const COUNT = 4000
const GOLDEN_ANGLE = Math.PI * (1 + Math.sqrt(5))
function randomGenerator(seed = 1234) {
  return () => {
    const value = Math.sin(seed++) * 10000
    return value - Math.floor(value)
  }
}
function sphere(index, radius, count = COUNT) {
  const polar = Math.acos(1 - (2 * (index + 0.5)) / count)
  const azimuth = GOLDEN_ANGLE * (index + 0.5)
  return [
    radius * Math.sin(polar) * Math.cos(azimuth),
    radius * Math.sin(polar) * Math.sin(azimuth),
    radius * Math.cos(polar),
  ]
}
const noise = (x, y, z) => Math.sin(x * 0.5) * Math.cos(y * 0.3) * Math.sin(z * 0.7)
export function createParticleShapes(projectCount) {
  const random = randomGenerator()
  const shapes = {}
  for (const name of ['sphere', 'organic', 'tunnel', 'clusters', 'wave']) {
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      let x, y, z
      if (name === 'sphere') [x, y, z] = sphere(i, 4)
      if (name === 'organic') {
        ;[x, y, z] = sphere(i, 5)
        x += noise(x * 0.8, y * 0.8, i * 0.1) * 2.5
        y += noise(y * 0.8, z * 0.8, i * 0.1) * 2.5
        z += noise(z * 0.8, x * 0.8, i * 0.1) * 2.5
      }
      if (name === 'tunnel') {
        const angle = i * 0.1,
          radius = 3 + random() * 2
        x = Math.cos(angle) * radius + random() - 0.5
        y = Math.sin(angle) * radius + random() - 0.5
        z = (i / COUNT) * 25 - 12.5
      }
      if (name === 'clusters') {
        const orbit = ((i % projectCount) / projectCount) * Math.PI * 2
        const polar = Math.acos(1 - 2 * random()),
          azimuth = Math.PI * 2 * random()
        x = Math.cos(orbit) * 5 + 1.5 * Math.sin(polar) * Math.cos(azimuth)
        y = Math.sin(orbit) * 5 + 1.5 * Math.sin(polar) * Math.sin(azimuth)
        z = 1.5 * Math.cos(polar)
      }
      if (name === 'wave') {
        const side = Math.sqrt(COUNT)
        x = ((i % side) - side / 2) * 0.5
        z = (Math.floor(i / side) - side / 2) * 0.5
        y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 1.5
      }
      positions.set([x, y, z], i * 3)
    }
    shapes[name] = positions
  }
  return shapes
}

// Sample the full shape on compact screens instead of keeping only its upper half.
export function createParticleIndices(compact = false) {
  const stride = compact ? 2 : 1
  return Uint16Array.from({ length: COUNT / stride }, (_, i) => i * stride)
}
