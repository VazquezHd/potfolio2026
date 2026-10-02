import { test, expect } from 'bun:test'
import { startServer } from './start-server.mjs'
const occupied = () => Object.assign(new Error('ocupado'), { code: 'EADDRINUSE' })
test('tries the next port when the default is occupied', () => {
  const attempted = []
  const server = startServer(
    { hostname: '127.0.0.1' },
    {
      serve: (options) => {
        attempted.push(options.port)
        if (options.port < 5175) throw occupied()
        return options
      },
    },
  )
  expect(attempted).toEqual([5173, 5174, 5175])
  expect(server.port).toBe(5175)
})
test('respects an explicitly requested port and gives a useful error', () => {
  expect(() =>
    startServer(
      {},
      {
        port: 5173,
        strict: true,
        serve: () => {
          throw occupied()
        },
      },
    ),
  ).toThrow('El puerto 5173 está ocupado')
})
test('does not hide errors unrelated to port conflicts', () => {
  expect(() =>
    startServer(
      {},
      {
        serve: () => {
          throw new Error('Permiso denegado')
        },
      },
    ),
  ).toThrow('Permiso denegado')
})
test('validates ports and bounds retries', () => {
  expect(() => startServer({}, { port: NaN })).toThrow('PORT debe ser')
  let attempts = 0
  expect(() =>
    startServer(
      {},
      {
        serve: () => {
          attempts++
          throw occupied()
        },
      },
    ),
  ).toThrow('5173–5182')
  expect(attempts).toBe(10)
})
