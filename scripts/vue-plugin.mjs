import { parse, compileScript } from '@vue/compiler-sfc'
import { createHash } from 'node:crypto'
import { dirname } from 'node:path'
export const vuePlugin = {
  name: 'vue-sfc',
  setup(build) {
    build.onLoad({ filter: /\.vue$/ }, async ({ path }) => {
      const source = await Bun.file(path).text()
      const { descriptor, errors } = parse(source, { filename: path })
      if (errors.length) throw new Error(errors.join('\n'))
      if (descriptor.styles.length)
        throw new Error(
          `${path}: añade los estilos a src/styles/ para mantener una hoja de estilos compartida.`,
        )
      const id = createHash('sha256').update(path).digest('hex').slice(0, 8)
      const compiled = compileScript(descriptor, { id, inlineTemplate: true })
      return { contents: compiled.content, loader: 'js', resolveDir: dirname(path) }
    })
  },
}
