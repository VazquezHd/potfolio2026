<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
const props = defineProps({ projects: { type: Array, required: true } })
const selected = ref(0)
const stage = ref(null)
const dragging = ref(false)
const current = computed(() => props.projects[selected.value])
let pointerStart = null
let suppressClick = false
let clickTimer
function select(index) {
  if (!suppressClick && props.projects.length)
    selected.value = (index + props.projects.length) % props.projects.length
}
function step(direction) {
  if (props.projects.length)
    selected.value = (selected.value + direction + props.projects.length) % props.projects.length
}
async function keyboard(event) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  if (event.key === 'Home') selected.value = 0
  else if (event.key === 'End') selected.value = props.projects.length - 1
  else step(event.key === 'ArrowRight' ? 1 : -1)
  if (event.target.classList.contains('carousel-select')) {
    await nextTick()
    stage.value
      ?.querySelectorAll('.carousel-select')
      [selected.value]?.focus({ preventScroll: true })
  }
}
function pointerDown(event) {
  if (event.button !== 0 || event.target.closest('a')) return
  pointerStart = { x: event.clientX, y: event.clientY }
  dragging.value = true
  const captureTarget = event.target.closest('.carousel-select') || event.currentTarget
  captureTarget.setPointerCapture(event.pointerId)
}
function pointerUp(event) {
  if (pointerStart) {
    const dx = event.clientX - pointerStart.x
    const dy = event.clientY - pointerStart.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      step(dx < 0 ? 1 : -1)
      suppressClick = true
      clearTimeout(clickTimer)
      clickTimer = setTimeout(() => {
        suppressClick = false
      }, 250)
    }
  }
  cancelPointer()
}
function cancelPointer() {
  pointerStart = null
  dragging.value = false
}
watch(
  () => props.projects,
  () => {
    selected.value = 0
  },
)
onUnmounted(() => clearTimeout(clickTimer))
</script>
<template>
  <div
    v-if="current"
    class="project-carousel"
    role="region"
    aria-roledescription="carrusel"
    aria-label="Proyectos seleccionados"
    @keydown="keyboard"
  >
    <div
      ref="stage"
      class="carousel-stage"
      :class="{ dragging }"
      @pointerdown="pointerDown"
      @pointerup="pointerUp"
      @pointercancel="cancelPointer"
    >
      <article
        v-for="(project, index) in projects"
        :key="project.slug"
        class="carousel-card"
        :class="{ 'is-selected': selected === index, 'is-before': index < selected }"
        :aria-label="project.name"
      >
        <button
          type="button"
          class="carousel-select"
          :aria-label="`Mostrar ${project.name}`"
          :aria-pressed="selected === index"
          @click="select(index)"
        >
          <img
            :src="project.image"
            :alt="project.imageAlt"
            :width="project.imageWidth"
            :height="project.imageHeight"
            :loading="index === 0 ? 'eager' : 'lazy'"
            decoding="async"
            draggable="false"
          />
          <span class="carousel-card-number" aria-hidden="true">{{ project.number }}</span>
        </button>
        <div class="carousel-card-copy">
          <span class="carousel-category">Caso de producto</span>
          <h3>{{ project.name }}</h3>
          <div
            class="carousel-card-detail"
            :inert="selected !== index"
            :aria-hidden="selected !== index"
          >
            <p>{{ project.subtitle }}</p>
            <a :href="`#proyecto/${project.slug}`" class="carousel-case-link"
              >Explorar el caso <ArrowUpRight :size="18" aria-hidden="true"
            /></a>
          </div>
        </div>
      </article>
    </div>
    <div class="carousel-controls">
      <div class="carousel-pagination" aria-label="Elegir proyecto">
        <button
          v-for="(project, index) in projects"
          :key="project.slug"
          type="button"
          :aria-label="`Seleccionar ${project.name}`"
          :aria-current="selected === index ? 'true' : undefined"
          @click="select(index)"
        >
          <span>{{ project.number }}</span>
        </button>
      </div>
      <span class="carousel-hint">Selecciona o desliza</span>
      <div class="carousel-arrows">
        <button
          type="button"
          aria-label="Proyecto anterior"
          :disabled="projects.length < 2"
          @click="step(-1)"
        >
          <ArrowLeft :size="19" />
        </button>
        <button
          type="button"
          aria-label="Proyecto siguiente"
          :disabled="projects.length < 2"
          @click="step(1)"
        >
          <ArrowRight :size="19" />
        </button>
      </div>
    </div>
    <p class="sr-only" role="status" aria-live="polite">
      Proyecto {{ selected + 1 }} de {{ projects.length }}: {{ current.name }}
    </p>
  </div>
</template>
