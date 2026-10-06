<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-vue-next'
const props = defineProps({ screens: { type: Array, required: true } })
const index = ref(0)
const screen = computed(() => props.screens[index.value])
const mobile = computed(() => screen.value?.layout === 'mobile')
const viewport = ref(null)
const inlineZoom = ref(false)
const thumbnails = ref(null)
const focusStyle = computed(() => {
  const s = screen.value
  const f = s?.focus
  if (!f) return {}
  const x = s.width > f.width ? (f.x / (s.width - f.width)) * 100 : 50
  const y = s.height > f.height ? (f.y / (s.height - f.height)) * 100 : 50
  return {
    backgroundImage: `url("${s.image}")`,
    backgroundSize: `${(s.width / f.width) * 100}% auto`,
    backgroundPosition: `${x}% ${y}%`,
    aspectRatio: `${f.width} / ${f.height}`,
  }
})
async function select(value) {
  if (!props.screens.length) return
  index.value = (value + props.screens.length) % props.screens.length
  inlineZoom.value = false
  await nextTick()
  viewport.value?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  const item = thumbnails.value?.querySelectorAll('button')[index.value]
  if (item)
    thumbnails.value.scrollTo({
      left:
        item.offsetLeft -
        thumbnails.value.offsetLeft -
        (thumbnails.value.clientWidth - item.clientWidth) / 2,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
}
async function toggleInlineZoom() {
  const element = viewport.value
  const image = element?.querySelector('img')
  const x = image?.clientWidth
    ? (element.scrollLeft + element.clientWidth / 2) / image.clientWidth
    : 0.5
  const y = image?.clientHeight
    ? (element.scrollTop + element.clientHeight / 2) / image.clientHeight
    : 0.5
  inlineZoom.value = !inlineZoom.value
  await nextTick()
  if (element && image) {
    element.scrollLeft = x * image.clientWidth - element.clientWidth / 2
    element.scrollTop = y * image.clientHeight - element.clientHeight / 2
  }
}
function keyboard(event) {
  if (
    viewer.value?.open ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.target.closest('.gallery-browser-viewport')
  )
    return
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  select(
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? props.screens.length - 1
        : index.value + (event.key === 'ArrowRight' ? 1 : -1),
  )
}
watch(
  () => props.screens,
  () => {
    index.value = Math.min(index.value, props.screens.length - 1)
    inlineZoom.value = false
  },
)
const selected = ref(null)
const zoomed = ref(false)
const viewer = ref(null)
let previousOverflow = ''
async function openScreen() {
  selected.value = screen.value
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
  <div
    v-if="screen"
    class="gallery-showcase"
    role="region"
    :aria-label="$t('Pantallas y decisiones del producto')"
    @keydown="keyboard"
  >
    <div ref="thumbnails" class="gallery-thumbnails" :aria-label="$t('Elegir pantalla')">
      <button
        v-for="(item, position) in screens"
        :key="item.image"
        type="button"
        :aria-label="`${$t('Ver pantalla:')} ${item.title}`"
        :aria-pressed="index === position"
        @click="select(position)"
      >
        <span class="gallery-thumb-image"
          ><img
            :src="item.image"
            :alt="$t('')"
            loading="lazy"
            decoding="async"
            :class="{ portrait: item.layout === 'mobile' }"
        /></span>
        <span class="gallery-thumb-title">{{ $t(item.title) }}</span>
      </button>
    </div>
    <figure class="gallery-feature">
      <figcaption class="gallery-feature-caption">
        <span class="case-kicker"
          >{{ $t(String(index + 1).padStart(2, '0')) }} /
          {{ $t(String(screens.length).padStart(2, '0')) }} · {{ $t(screen.skill) }}</span
        >
        <h3>{{ $t(screen.title) }}</h3>
        <p v-if="screen.problem" class="gallery-feature-problem">{{ $t(screen.problem) }}</p>
        <p>{{ $t(screen.description) }}</p>
      </figcaption>
      <div v-if="mobile" class="gallery-mobile-stage">
        <div class="gallery-phone-frame">
          <img
            :key="screen.image"
            :src="screen.image"
            :alt="screen.alt"
            :width="screen.width"
            :height="screen.height"
            decoding="async"
          />
        </div>
        <div v-if="screen.focus" class="gallery-focus-panel">
          <p class="case-kicker">{{ $t('Detalle del recorrido') }}</p>
          <h4>{{ $t(screen.focusLabel || screen.skill) }}</h4>
          <div
            class="gallery-focus-crop"
            :style="focusStyle"
            role="img"
            :aria-label="`${$t('Detalle ampliado:')} ${screen.focusLabel || screen.title}`"
          ></div>
          <p class="gallery-focus-note">
            {{ $t('Este detalle complementa la pantalla completa.') }}
          </p>
        </div>
      </div>
      <div v-else class="gallery-browser-frame">
        <div class="gallery-browser-bar" aria-hidden="true">
          <span class="gallery-browser-dots"><i></i><i></i><i></i></span
          ><span>{{ $t(screen.skill) }}</span
          ><span>{{ $t('Vista del diseño') }}</span>
        </div>
        <div
          ref="viewport"
          class="gallery-browser-viewport"
          :class="{ 'is-zoomed': inlineZoom }"
          tabindex="0"
          :aria-label="`${$t('Captura desplazable:')} ${screen.title}`"
        >
          <img
            :key="screen.image"
            :src="screen.image"
            :alt="screen.alt"
            :width="screen.width"
            :height="screen.height"
            decoding="async"
          />
        </div>
      </div>
      <div class="gallery-feature-footer">
        <p>
          {{
            $t(
              mobile
                ? 'Pantalla completa y detalle de la tarea.'
                : 'Desplázate dentro de la captura para ver el resto.',
            )
          }}
        </p>
        <button
          v-if="!mobile"
          type="button"
          class="gallery-inline-zoom"
          :aria-pressed="inlineZoom"
          @click="toggleInlineZoom"
        >
          {{ $t(inlineZoom ? 'Vista completa' : 'Acercar aquí') }}
        </button>
        <button type="button" class="gallery-expand" @click="openScreen">
          {{ $t('Ampliar') }} <Maximize2 :size="15" aria-hidden="true" />
        </button>
        <div class="gallery-feature-arrows">
          <button type="button" :aria-label="$t('Pantalla anterior')" @click="select(index - 1)">
            <ArrowLeft :size="18" /></button
          ><button type="button" :aria-label="$t('Pantalla siguiente')" @click="select(index + 1)">
            <ArrowRight :size="18" />
          </button>
        </div>
      </div>
    </figure>
    <p class="sr-only" role="status" aria-live="polite">
      {{ $t('Pantalla') }} {{ $t(index + 1) }} {{ $t('de') }} {{ $t(screens.length) }}:
      {{ $t(screen.title) }}
    </p>
    <dialog
      ref="viewer"
      class="screen-viewer"
      aria-labelledby="viewer-title"
      @close="restoreScroll"
    >
      <template v-if="selected">
        <div class="viewer-toolbar">
          <h2 id="viewer-title">{{ $t(selected.title) }}</h2>
          <div>
            <button type="button" @click="zoomed = !zoomed">
              {{ $t(zoomed ? 'Ajustar' : 'Ver detalle') }}</button
            ><button type="button" @click="viewer.close()">{{ $t('Cerrar') }}</button>
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
          {{ $t(zoomed ? 'Desplázate para explorar la captura. ' : '')
          }}{{ $t('Esc para cerrar.') }}
          <a :href="selected.image" target="_blank" rel="noopener noreferrer">{{
            $t('Abrir original')
          }}</a>
        </p>
      </template>
    </dialog>
  </div>
</template>
