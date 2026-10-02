import { watch } from 'node:fs'
import { resolve } from 'node:path'
import { resolveStaticPath } from './lib/static-path.mjs'
import { mkdir, stat } from 'node:fs/promises'
import { buildSite } from './build.mjs'
import { startServer } from './lib/start-server.mjs'
import { sourceFingerprint } from './lib/source-fingerprint.mjs'
const preview = process.argv.includes('--preview')
const root = resolve('dist')
const sourcePaths = ['src', 'public', 'index.html']
let fingerprint
if (!preview) {
  await mkdir('./dist/assets', { recursive: true })
  fingerprint = await sourceFingerprint(sourcePaths)
  await buildSite()
}
let revision = 0,
  timer,
  rebuilding = false,
  pending = false
async function rebuild() {
  if (rebuilding) {
    pending = true
    return
  }
  rebuilding = true
  try {
    const nextFingerprint = await sourceFingerprint(sourcePaths)
    if (nextFingerprint === fingerprint) return
    await buildSite()
    fingerprint = nextFingerprint
    revision++
    console.log('Cambios compilados.')
  } catch (error) {
    console.error(error)
  } finally {
    rebuilding = false
    if (pending) {
      pending = false
      rebuild()
    }
  }
}
let server
try {
  server = startServer(
    {
      hostname: '127.0.0.1',
      async fetch(request) {
        if (!['GET', 'HEAD'].includes(request.method))
          return new Response('Método no permitido', {
            status: 405,
            headers: { Allow: 'GET, HEAD' },
          })
        const url = new URL(request.url)
        if (!preview && url.pathname === '/__revision')
          return new Response(request.method === 'HEAD' ? null : String(revision), {
            headers: { 'Cache-Control': 'no-store' },
          })
        const path = resolveStaticPath(root, url.pathname)
        if (!path) return new Response('Solicitud inválida', { status: 400 })
        const info = await stat(path).catch(() => null)
        if (!info?.isFile()) return new Response('No encontrado', { status: 404 })
        const file = Bun.file(path)
        if (!(await file.exists())) return new Response('No encontrado', { status: 404 })
        if (!preview && path.endsWith('/index.html')) {
          const reload = `<script>let r=${revision};setInterval(async()=>{try{const n=await(await fetch('/__revision')).text();if(Number(n)!==r)location.reload()}catch{}},1000)</script>`
          return new Response(
            request.method === 'HEAD'
              ? null
              : (await file.text()).replace('</body>', reload + '</body>'),
            { headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' } },
          )
        }
        return new Response(request.method === 'HEAD' ? null : file, {
          headers: { 'Cache-Control': preview ? 'no-cache' : 'no-store' },
        })
      },
    },
    { port: Number(process.env.PORT ?? 5173), strict: process.env.PORT !== undefined },
  )
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
if (process.env.PORT === undefined && server.port !== 5173)
  console.log(`El puerto 5173 está ocupado; se usará ${server.port}.`)
if (!preview) {
  for (const dir of ['src', 'public'])
    watch(dir, { recursive: true }, () => {
      clearTimeout(timer)
      timer = setTimeout(rebuild, 120)
    })
  watch('index.html', () => {
    clearTimeout(timer)
    timer = setTimeout(rebuild, 120)
  })
}
console.log(`Portafolio servido por Bun: http://${server.hostname}:${server.port}`)
