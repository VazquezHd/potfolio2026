<script setup>
import { ref, computed, nextTick, onUnmounted } from 'vue'
const props = defineProps({ screens: { type: Array, required: true } })
const rows = computed(() => {
  const result = []
  let pair = []
  const flush = () => {
    if (pair.length) {
      result.push({ screens: pair, wide: false })
      pair = []
    }
  }
  for (const screen of props.screens) {
    if (screen.layout === 'wide') {
      flush()
      result.push({ screens: [screen], wide: true })
    } else {
      pair.push(screen)
      if (pair.length === 2) flush()
    }
  }
  flush()
  return result
})
const selected = ref(null)
const zoomed = ref(false)
const viewer = ref(null)
let previousOverflow = ''
async function openScreen(event, screen) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  selected.value = screen
  zoomed.value = false
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  viewer.value.showModal()
}
function restoreScroll() {
  document.body.style.overflow = previousOverflow
  selected.value = null
}
onUnmounted(() => {
  if (selected.value) document.body.style.overflow = previousOverflow
})
</script>
<template>
  <div class="project-gallery">
    <div
      v-for="row in rows"
      :key="row.screens[0].image"
      class="gallery-row"
      :class="{ 'is-wide': row.wide }"
    >
      <figure v-for="screen in row.screens" :key="screen.image" class="project-screen">
        <figcaption>
          <h3>{{ screen.title }}</h3>
          <p class="screen-problem" :aria-hidden="!screen.problem || undefined">
            {{ screen.problem }}
          </p>
          <p class="screen-description">{{ screen.description }}</p>
        </figcaption>
        <a
          :href="screen.image"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Ampliar: ${screen.title}`"
          class="screen-link"
          @click="openScreen($event, screen)"
        >
          <span class="screen-preview"
            ><img
              :src="screen.image"
              :alt="screen.alt"
              :width="screen.width"
              :height="screen.height"
              loading="lazy"
              decoding="async"
          /></span>
          <span class="screen-meta"
            ><small v-if="screen.skill">{{ screen.skill }}</small
            ><span>Ver captura completa ↗</span></span
          >
        </a>
      </figure>
    </div>
    <dialog
      ref="viewer"
      class="screen-viewer"
      aria-labelledby="viewer-title"
      @close="restoreScroll"
    >
      <template v-if="selected">
        <div class="viewer-toolbar">
          <h2 id="viewer-title">{{ selected.title }}</h2>
          <div>
            <button type="button" @click="zoomed = !zoomed">
              {{ zoomed ? 'Ajustar' : 'Ver detalle' }}</button
            ><button type="button" @click="viewer.close()">Cerrar</button>
          </div>
        </div>
        <div class="viewer-image" :class="{ zoomed }">
          <img
            :src="selected.image"
            :alt="selected.alt"
            :width="selected.width"
            :height="selected.height"
          />
        </div>
        <p class="viewer-hint">
          {{ zoomed ? 'Desplázate para explorar la captura. ' : '' }}Esc para cerrar.
          <a :href="selected.image" target="_blank" rel="noopener noreferrer">Abrir original</a>
        </p>
      </template>
    </dialog>
  </div>
</template>
