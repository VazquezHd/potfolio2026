# Portafolio de Jorge Iván Vázquez Hernández

Vue 3 y Tailwind CSS 4. Bun gestiona dependencias, compila y sirve el sitio. Español e inglés, temas claro y oscuro y diseño responsive. La primera visita inicia en español y oscuro; las preferencias se recuerdan localmente.

## Uso

Requiere Bun 1.3.14 o superior.

```sh
bun install
bun run dev
```

La vista previa está en http://127.0.0.1:5173. Los cambios en `src/`, `public/` e `index.html` recargan la página. Si el puerto 5173 está ocupado, el servidor prueba los siguientes hasta el 5182 y muestra la URL disponible. Para fijar un puerto: `PORT=3000 bun run dev`; si ese puerto está ocupado, muestra un mensaje sin cambiarlo.

```sh
bun run check
bun run test
bun run format:check
bun run build
bun run preview
```

`dist/` contiene el sitio listo para hosting estático. No está publicado externamente.

## Estructura

- `src/components/`: navegación, tarjetas y fondo de partículas.
- `src/composables/`: rutas hash, foco y observación de secciones.
- `src/data/portfolio.js`: perfil, proyectos y proceso.
- `src/styles/tokens.css`: única fuente de colores de la interfaz y partículas.
- `src/styles/main.css`: estilos globales y responsive.
- `src/assets/icons/`: plantilla del favicon; el build aplica los tokens.
- `public/assets/images/projects/`: imágenes que utiliza el sitio.
- `scripts/`: compilación Vue/Bun, Tailwind, servidor y validaciones.
- `docs/`: fuentes y capturas de documentación, excluidas de la web compilada.

Los estilos de los componentes se mantienen en `src/styles/`. El compilador avisa si se añade un bloque `<style>` a un componente, para evitar descartarlo silenciosamente.

## Paleta

Edita los tokens semánticos de `src/styles/tokens.css`: fondo, superficies, acento, texto y bordes. CSS los consume con `var(--color-…)`; Canvas los lee con `getComputedStyle`. El favicon y `theme-color` se generan desde esos mismos tokens al compilar.

## Contenido y accesibilidad

La selección actual empieza con Gestión escolar, preparado desde la sección redi del archivo de Figma. El usuario confirma el alcance del rol administrador; las decisiones describen las pantallas y no se inventan investigación ni métricas. Los seis proyectos anteriores están archivados en docs/archive/. Las fuentes están en `docs/sources.md`. El CV descargable es de 2024 y está guardado en `public/assets/documents/`.

Las imágenes incluyen texto alternativo, carga diferida en las tarjetas y contenedores con relación de aspecto estable. La navegación incluye enlace para saltar al contenido, estado activo, controles accesibles y una selección activa que reconoce el final de la página.

Las partículas se dibujan en 3D con Three.js/WebGL, cámara de 35° y mezcla aditiva. Usan 4.000 puntos en escritorio y 1.800 en móvil. Las formas se precalculan y cambian continuamente con el scroll: esfera, grupos de esferas, superficie orgánica, onda, túnel y señal. La animación se detiene con la página oculta, respeta `prefers-reduced-motion` y no captura interacciones.

## Mantenimiento

`bun run check` detecta imágenes ausentes, slugs repetidos, colores fuera de los tokens y capturas en la raíz. `bun run test` verifica el acceso del servidor a archivos estáticos y el rechazo de rutas malformadas o fuera del directorio público. Prettier mantiene el formato del código.

La tipografía DM Sans se sirve localmente desde `dist/assets/fonts/`, junto con su licencia. Su paquete fuente es `@fontsource-variable/dm-sans`; el build copia únicamente el archivo variable latino necesario para los textos en español.

El movimiento de profundidad se gestiona en `useScrollMotion.js`: un listener pasivo, elementos cercanos al viewport y un único ciclo de actualización. Respeta `prefers-reduced-motion` y se detiene al ocultar la pestaña. Las partículas interpolan el scroll y terminan de nuevo en una esfera con puntos finos y rotación suave.

Las galerías se organizan por filas con pistas compartidas para títulos y descripciones. Las miniaturas usan un encuadre uniforme; el visor conserva cada captura completa y su resolución original. El parallax se aplica por fila para mantener la alineación durante el scroll. Las cards de otros productos se calculan excluyendo el caso actual y admiten tres productos relacionados cuando el portafolio tenga cuatro casos.

Las traducciones se mantienen en `src/i18n/en.json`. `usePreferences.js` centraliza idioma, tema y persistencia; la UI usa `$t` y los datos se localizan de forma reactiva. Las imágenes y el CV conservan el idioma de sus archivos originales.
