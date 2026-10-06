import { cp, mkdir, rm } from 'node:fs/promises'
import { vuePlugin } from './vue-plugin.mjs'
export async function buildSite() {
  const result = await Bun.build({
    entrypoints: ['./src/main.js'],
    outdir: './dist/assets',
    naming: 'main.js',
    target: 'browser',
    minify: true,
    plugins: [vuePlugin],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    },
  })
  if (!result.success) throw new Error(result.logs.join('\n'))
  const css = Bun.spawn(
    [
      process.execPath,
      './node_modules/@tailwindcss/cli/dist/index.mjs',
      '-i',
      './src/styles/main.css',
      '-o',
      './dist/assets/style.css',
      '--minify',
    ],
    { stdout: 'inherit', stderr: 'inherit' },
  )
  if (await css.exited) throw new Error('No se pudo compilar Tailwind')
  await cp('./public', './dist', { recursive: true })
  await mkdir('./dist/assets/fonts', { recursive: true })
  await cp(
    './node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',
    './dist/assets/fonts/dm-sans-latin-wght-normal.woff2',
  )
  await cp('./node_modules/@fontsource-variable/dm-sans/LICENSE', './dist/assets/fonts/LICENSE.txt')
  await cp(
    './node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2',
    './dist/assets/fonts/montserrat-latin-wght-normal.woff2',
  )
  await cp(
    './node_modules/@fontsource-variable/montserrat/LICENSE',
    './dist/assets/fonts/Montserrat-LICENSE.txt',
  )
  const tokens = await Bun.file('./src/styles/tokens.css').text()
  const token = (name) => {
    const value = tokens.match(new RegExp(`--color-${name}:\\s*(#[a-fA-F0-9]{6});`))?.[1]
    if (!value) throw new Error(`Falta el token de color ${name}`)
    return value
  }
  const applyTheme = (source) =>
    source
      .replaceAll('__COLOR_BACKGROUND__', token('background'))
      .replaceAll('__COLOR_ACCENT__', token('accent'))
  await mkdir('./dist/assets/icons', { recursive: true })
  await Bun.write(
    './dist/assets/icons/favicon.svg',
    applyTheme(await Bun.file('./src/assets/icons/favicon.svg').text()),
  )
  await Bun.write('./dist/index.html', applyTheme(await Bun.file('./index.html').text()))
}
if (import.meta.main) {
  await rm('./dist', { recursive: true, force: true })
  await mkdir('./dist/assets', { recursive: true })
  await buildSite()
  console.log('Portafolio compilado con Bun en dist/')
}
