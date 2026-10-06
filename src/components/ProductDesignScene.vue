<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-vue-next'
const phases = [
  {
    title: 'Entender',
    label: 'Necesidades y requerimientos',
    detail: 'Entender a la persona antes de definir la solución.',
    badge: 'Requerimientos claros',
  },
  {
    title: 'Conectar',
    label: 'Arquitectura y flujos',
    detail: 'Ordenar decisiones, acciones y estados.',
    badge: 'Recorridos con contexto',
  },
  {
    title: 'Construir',
    label: 'Interfaz y componentes',
    detail: 'Llevar la experiencia a una interfaz funcional.',
    badge: 'UX + UI + desarrollo',
  },
]
const index = ref(0)
const current = computed(() => phases[index.value])
const scene = ref(null)
const container = ref(null)
const automatic = ref(true)
const timerRunning = ref(false)
const duration = 6200
let media,
  frame = 0,
  timer,
  observer,
  active = false,
  focused = false,
  hoveringControls = false,
  explicitlyResumed = false
let targetX = 0,
  targetY = 0,
  tiltX = 0,
  tiltY = 0
function schedule() {
  clearTimeout(timer)
  timerRunning.value = false
  if (
    !media ||
    media.matches ||
    !automatic.value ||
    !active ||
    ((focused || hoveringControls) && !explicitlyResumed) ||
    document.hidden
  )
    return
  timerRunning.value = true
  timer = setTimeout(() => {
    index.value = (index.value + 1) % phases.length
    schedule()
  }, duration)
}
function select(value) {
  explicitlyResumed = false
  index.value = (value + phases.length) % phases.length
  schedule()
}
function toggleAutomatic() {
  automatic.value = !automatic.value
  explicitlyResumed = automatic.value
  schedule()
}
function keyboard(event) {
  if (
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
  )
    return
  event.preventDefault()
  select(
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? phases.length - 1
        : index.value + (event.key === 'ArrowRight' ? 1 : -1),
  )
}
function focusIn() {
  explicitlyResumed = false
  focused = true
  schedule()
}
function focusOut(event) {
  if (!container.value?.contains(event.relatedTarget)) {
    focused = false
    schedule()
  }
}
function controlsHover(value, event) {
  if (event.pointerType === 'mouse') {
    hoveringControls = value
    schedule()
  }
}
function render() {
  frame = 0
  if (!scene.value || media?.matches || !active || document.hidden) return
  tiltX += (targetX - tiltX) * 0.12
  tiltY += (targetY - tiltY) * 0.12
  scene.value.style.setProperty('--scene-tilt-x', `${tiltX.toFixed(2)}deg`)
  scene.value.style.setProperty('--scene-tilt-y', `${tiltY.toFixed(2)}deg`)
  if (Math.abs(targetX - tiltX) + Math.abs(targetY - tiltY) > 0.04)
    frame = requestAnimationFrame(render)
}
function move(event) {
  if (event.pointerType !== 'mouse' || media?.matches) return
  const box = scene.value.getBoundingClientRect()
  targetX = (-(event.clientY - box.top - box.height / 2) / box.height) * 9
  targetY = ((event.clientX - box.left - box.width / 2) / box.width) * 12
  if (!frame) frame = requestAnimationFrame(render)
}
function reset() {
  targetX = targetY = 0
  if (!frame) frame = requestAnimationFrame(render)
}
function preference() {
  cancelAnimationFrame(frame)
  frame = 0
  tiltX = tiltY = targetX = targetY = 0
  scene.value?.style.removeProperty('--scene-tilt-x')
  scene.value?.style.removeProperty('--scene-tilt-y')
  schedule()
}
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', preference)
  document.addEventListener('visibilitychange', schedule)
  observer = new IntersectionObserver(
    ([entry]) => {
      active = entry.isIntersecting
      schedule()
    },
    { rootMargin: '30px' },
  )
  observer.observe(scene.value)
})
onUnmounted(() => {
  clearTimeout(timer)
  cancelAnimationFrame(frame)
  observer?.disconnect()
  media?.removeEventListener('change', preference)
  document.removeEventListener('visibilitychange', schedule)
})
</script>
<template>
  <div
    ref="container"
    class="product-design-scene"
    role="region"
    :aria-label="$t('De las necesidades a una interfaz de producto')"
    @keydown="keyboard"
    @focusin="focusIn"
    @focusout="focusOut"
  >
    <div
      ref="scene"
      class="design-scene-stage"
      :class="`scene-phase-${index}`"
      @pointermove="move"
      @pointerleave="reset"
    >
      <span class="scene-ambient-glow" aria-hidden="true"></span>
      <span class="scene-floating-tag scene-tag-top" aria-hidden="true">{{
        $t(current.badge)
      }}</span>
      <div class="scene-perspective">
        <span class="scene-back-sheet sheet-far" aria-hidden="true"></span>
        <span class="scene-back-sheet sheet-near" aria-hidden="true"></span>
        <Transition name="design-object" mode="out-in">
          <div :key="index" class="design-object">
            <div class="scene-object-bar">
              <span class="scene-window-dots" aria-hidden="true"><i></i><i></i><i></i></span
              ><span>{{
                $t(
                  index === 0
                    ? 'Brief de producto'
                    : index === 1
                      ? 'Flujo de usuario'
                      : 'Interfaz de producto',
                )
              }}</span
              ><span class="scene-object-number">0{{ $t(index + 1) }}</span>
            </div>
            <div v-if="index === 0" class="scene-brief">
              <span class="scene-small-label">{{ $t('Ejemplo de requerimientos') }}</span>
              <h3>{{ $t('Una tarea') }}<br />{{ $t('sin fricción.') }}</h3>
              <div class="scene-requirement">
                <span>01</span>
                <div>
                  <small>{{ $t('Persona') }}</small
                  ><strong>{{ $t('Usuario de producto') }}</strong>
                </div>
              </div>
              <div class="scene-requirement">
                <span>02</span>
                <div>
                  <small>{{ $t('Necesidad') }}</small
                  ><strong>{{ $t('Completar la tarea') }}</strong>
                </div>
              </div>
              <div class="scene-requirement">
                <span>03</span>
                <div>
                  <small>{{ $t('Problema') }}</small
                  ><strong>{{ $t('Pasos y estados confusos') }}</strong>
                </div>
              </div>
            </div>
            <div v-else-if="index === 1" class="scene-flow">
              <span class="scene-small-label">{{ $t('Ejemplo de recorrido') }}</span>
              <h3>{{ $t('Un camino claro.') }}</h3>
              <ol class="scene-flow-path">
                <li>
                  <span>01</span><strong>{{ $t('Identificar') }}</strong
                  ><small>{{ $t('Entender el contexto') }}</small>
                </li>
                <li>
                  <span>02</span><strong>{{ $t('Decidir') }}</strong
                  ><small>{{ $t('Elegir la siguiente acción') }}</small>
                </li>
                <li>
                  <span>03</span><strong>{{ $t('Confirmar') }}</strong
                  ><small>{{ $t('Estado y respuesta') }}</small>
                </li>
              </ol>
              <p class="scene-flow-note">{{ $t('Cada paso conserva el contexto.') }}</p>
            </div>
            <div v-else class="scene-interface">
              <span class="scene-small-label">{{ $t('Ejemplo de sistema') }}</span>
              <h3>{{ $t('La decisión') }}<br />{{ $t('toma forma.') }}</h3>
              <div
                class="scene-ui-sketch"
                :aria-label="$t('Ejemplo ilustrativo de una interfaz con estados')"
              >
                <div class="scene-ui-sidebar" aria-hidden="true"><i></i><i></i><i></i></div>
                <div class="scene-ui-main">
                  <div class="scene-ui-heading">
                    <strong>{{ $t('Actividad') }}</strong
                    ><span>{{ $t('Estado') }}</span>
                  </div>
                  <div class="scene-ui-row">
                    <span class="scene-ui-line"></span><small>{{ $t('Por revisar') }}</small>
                  </div>
                  <div class="scene-ui-row">
                    <span class="scene-ui-line"></span><small>{{ $t('En proceso') }}</small>
                  </div>
                  <div class="scene-ui-row">
                    <span class="scene-ui-line"></span><small>{{ $t('Listo') }}</small>
                  </div>
                </div>
              </div>
              <div class="scene-component-chips">
                <span>{{ $t('UI') }}</span
                ><span>{{ $t('Estados') }}</span
                ><span>{{ $t('Frontend') }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <span class="scene-shadow" aria-hidden="true"></span>
    </div>
    <div class="design-scene-footer">
      <div class="scene-phase-copy">
        <span>{{ $t('Cómo pienso un producto') }}</span
        ><strong>{{ $t(current.label) }}</strong>
        <p>{{ $t(current.detail) }}</p>
      </div>
      <div
        class="scene-navigation"
        @pointerenter="controlsHover(true, $event)"
        @pointerleave="controlsHover(false, $event)"
      >
        <button
          type="button"
          :aria-label="$t('Vista anterior del proceso')"
          @click="select(index - 1)"
        >
          <ArrowLeft :size="17" />
        </button>
        <button
          type="button"
          :aria-label="$t(automatic ? 'Detener cambio automático' : 'Activar cambio automático')"
          :title="$t(automatic ? 'Detener cambio automático' : 'Activar cambio automático')"
          @click="toggleAutomatic"
        >
          <Pause v-if="automatic" :size="15" /><Play v-else :size="15" />
        </button>
        <button
          type="button"
          :aria-label="$t('Vista siguiente del proceso')"
          @click="select(index + 1)"
        >
          <ArrowRight :size="17" />
        </button>
      </div>
    </div>
    <div
      class="scene-phase-picker"
      :aria-label="$t('Explorar mi proceso')"
      @pointerenter="controlsHover(true, $event)"
      @pointerleave="controlsHover(false, $event)"
    >
      <button
        v-for="(phase, position) in phases"
        :key="phase.title"
        type="button"
        :aria-pressed="index === position"
        :class="{ 'phase-timed': index === position && timerRunning }"
        @click="select(position)"
      >
        <span>0{{ $t(position + 1) }}</span> {{ $t(phase.title) }}
      </button>
    </div>
    <p class="sr-only">
      {{
        $t(
          'Visuales ilustrativos de requerimientos, flujos e interfaces. Puedes explorar las tres vistas con los controles.',
        )
      }}
    </p>
  </div>
</template>
