import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import postcss from 'postcss'
import { parse } from '@vue/compiler-sfc'
import { projects } from '../src/data/portfolio.js'
const failures = []
if (
  !(await Bun.file('src/styles/main.css').text()).includes('@import "tailwindcss"') &&
  !(await Bun.file('src/styles/main.css').text()).includes("@import 'tailwindcss'")
)
  failures.push('Falta la importación de Tailwind')
async function walk(dir) {
  const result = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...(await walk(path)))
    else result.push(path)
  }
  return result
}
async function validImage(path) {
  const file = Bun.file(path)
  if (!(await file.exists()) || file.size < 8) return false
  if (path.endsWith('.png')) {
    const signature = new Uint8Array(await file.slice(0, 8).arrayBuffer())
    return [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => signature[index] === byte)
  }
  return true
}
const slugs = new Set()
for (const project of projects) {
  if (slugs.has(project.slug)) failures.push(`Slug repetido: ${project.slug}`)
  slugs.add(project.slug)
  if (
    !project.image.startsWith('/assets/images/projects/') ||
    !(await validImage(`public${project.image}`))
  )
    failures.push(`Imagen inválida: ${project.slug}`)
  for (const screen of project.gallery || []) {
    if (!(await validImage(`public${screen.image}`)) || !screen.alt.trim())
      failures.push(`Pantalla inválida: ${project.slug} ${screen.title}`)
  }
  if (!project.imageAlt.trim()) failures.push(`Falta texto alternativo: ${project.slug}`)
}
for (const file of await walk('src')) {
  const source = await Bun.file(file).text()
  if (file.endsWith('.vue')) {
    const { errors } = parse(source, { filename: file })
    for (const error of errors) failures.push(`${file}: ${error}`)
  }
  if (file.endsWith('.css')) {
    const ast = postcss.parse(source, { from: file })
    if (!file.endsWith('/tokens.css'))
      ast.walkDecls((declaration) => {
        if (/#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i.test(declaration.value))
          failures.push(`Color fuera de tokens: ${file} ${declaration.prop}`)
      })
  }
  if (file.endsWith('.vue') && /rgba?\(|#[\da-f]{6}\b/i.test(source))
    failures.push(`Color fijo en componente: ${file}`)
}
for (const file of await readdir('.'))
  if (/\.(png|jpe?g|webp)$/i.test(file)) failures.push(`Imagen en la raíz: ${file}`)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('Estructura, paleta, componentes e imágenes correctos.')
