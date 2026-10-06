<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { theme } from '../composables/usePreferences'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  Points,
  PointsMaterial,
  AdditiveBlending,
  Color,
  CanvasTexture,
} from 'three'
import { projects } from '../data/portfolio'
import { createParticleShapes } from '../lib/particle-shapes'
const props = defineProps({ sceneKey: { type: String, default: '' } })
const container = ref(null)
const stages = [
  { id: 'inicio', shape: 'sphere', depth: 0, opacity: 0.8 },
  { id: 'proyectos', shape: 'clusters', depth: 0, opacity: 0.65 },
  { id: 'sobre-mi', shape: 'organic', depth: -3.5, opacity: 0.5 },
  { id: 'capacidades', shape: 'wave', depth: -3.5, opacity: 0.35 },
  { id: 'proceso', shape: 'tunnel', depth: -3.5, opacity: 0.35 },
  { id: 'contacto', shape: 'sphere', depth: 0, opacity: 0.65 },
]
let renderer, scene, camera, geometry, material, cloud, shapes, positions, sprite
let observer,
  reduced,
  anchors = [],
  frame = 0,
  lastTime = 0,
  time = 0,
  rotation = 0
let width = 0,
  scrollY = 0,
  visualScroll = 0,
  depth = 0,
  opacity = 0.8
let heroColor, blueColor
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
function measure() {
  if (!renderer) return
  width = window.innerWidth
  const height = window.innerHeight
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  geometry.setDrawRange(0, width / height < 1.05 ? 1800 : 4000)
  const styles = getComputedStyle(document.documentElement)
  heroColor = new Color(styles.getPropertyValue('--color-particle-hero').trim())
  blueColor = new Color(styles.getPropertyValue('--color-particle-point').trim())
  const caseIds = [
    '.product-case-header',
    '#caso-problema',
    '#caso-solucion',
    '#caso-proceso',
    '#caso-sistema',
    '#contacto',
  ]
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - height)
  anchors = stages
    .map((stage, index) => {
      const element = props.sceneKey
        ? document.querySelector(caseIds[index])
        : document.getElementById(stage.id)
      return element
        ? {
            ...stage,
            top:
              index === 0
                ? 0
                : Math.min(
                    maxScroll,
                    Math.max(0, element.getBoundingClientRect().top + window.scrollY - 95),
                  ),
          }
        : null
    })
    .filter(Boolean)
  schedule()
}
function progress() {
  if (reduced.matches || anchors.length < 2)
    return { from: stages[0], to: stages[0], blend: 0, position: 0 }
  let index = Math.max(
    0,
    anchors.findLastIndex((stage) => stage.top <= visualScroll),
  )
  const from = anchors[index],
    to = anchors[index + 1] || from
  const blend =
    from === to ? 0 : clamp((visualScroll - from.top) / Math.max(1, to.top - from.top), 0, 1)
  return { from, to, blend, position: index + blend }
}
function render(timestamp) {
  frame = 0
  if (!renderer || document.hidden) return
  const delta = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0
  lastTime = timestamp
  time += delta
  visualScroll += (scrollY - visualScroll) * (reduced.matches ? 1 : 1 - Math.exp(-9 * delta))
  const state = progress()
  const { from, to, position } = state
  const blend = state.blend * state.blend * (3 - 2 * state.blend)
  const intensity = 0.2 + 0.8 * Math.min(1, Math.abs(position - Math.round(position)) * 4)
  const damping = 1 - Math.exp(-6.3 * delta)
  depth += (from.depth + (to.depth - from.depth) * blend - depth) * damping
  opacity += (from.opacity + (to.opacity - from.opacity) * blend - opacity) * damping
  const a = shapes[from.shape],
    b = shapes[to.shape]
  const viewportWidth = 2 * 12 * Math.tan((35 * Math.PI) / 360) * camera.aspect
  const scale = viewportWidth < 7 ? 0.72 : viewportWidth < 10 ? 0.88 : 1
  const organic = from.shape === 'organic' || to.shape === 'organic'
  const organicWeight = from.shape === 'organic' ? 1 - blend : blend
  for (let i = 0; i < geometry.drawRange.count; i++) {
    const offset = i * 3
    let x = a[offset] + (b[offset] - a[offset]) * blend
    if (organic && !reduced.matches) x += Math.sin(time + i) * 0.02 * organicWeight * intensity
    positions[offset] = x * scale
    positions[offset + 1] = (a[offset + 1] + (b[offset + 1] - a[offset + 1]) * blend) * scale
    positions[offset + 2] =
      (a[offset + 2] + (b[offset + 2] - a[offset + 2]) * blend + depth) * scale
  }
  geometry.attributes.position.needsUpdate = true
  if (!reduced.matches) rotation += delta * 0.05 * intensity
  cloud.rotation.y = rotation
  cloud.rotation.z = 0
  const targetColor =
    from.shape === 'sphere' ? heroColor.clone().lerp(blueColor, blend) : blueColor.clone()
  if (to.shape === 'sphere') targetColor.lerp(heroColor, blend)
  material.color.lerp(targetColor, reduced.matches ? 1 : 1 - Math.exp(-3.1 * delta))
  material.opacity = reduced.matches ? 0.8 : opacity
  material.size = 0.04
  renderer.render(scene, camera)
  container.value.dataset.shape = blend > 0.5 ? to.shape : from.shape
  container.value.dataset.motion = reduced.matches ? 'static' : 'scroll'
  if (!reduced.matches) schedule()
}
function schedule() {
  if (!frame && !document.hidden) frame = requestAnimationFrame(render)
}
function onScroll() {
  scrollY = window.scrollY
  schedule()
}
function onVisibility() {
  cancelAnimationFrame(frame)
  frame = 0
  lastTime = 0
  if (!document.hidden) schedule()
}
onMounted(() => {
  try {
    renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
  } catch {
    return
  }
  container.value.appendChild(renderer.domElement)
  scene = new Scene()
  camera = new PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.z = 12
  shapes = createParticleShapes(Math.max(4, projects.length))
  positions = new Float32Array(shapes.sphere)
  geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  const pointCanvas = document.createElement('canvas')
  pointCanvas.width = pointCanvas.height = 32
  const context = pointCanvas.getContext('2d')
  const glow = context.createRadialGradient(16, 16, 0, 16, 16, 16)
  glow.addColorStop(0, 'white')
  glow.addColorStop(0.55, 'white')
  glow.addColorStop(1, 'transparent')
  context.fillStyle = glow
  context.fillRect(0, 0, 32, 32)
  sprite = new CanvasTexture(pointCanvas)
  material = new PointsMaterial({
    map: sprite,

    size: 0.04,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    blending: AdditiveBlending,
    depthWrite: false,
  })
  cloud = new Points(geometry, material)
  cloud.frustumCulled = false
  scene.add(cloud)
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.addEventListener('change', measure)
  observer = new ResizeObserver(measure)
  observer.observe(document.body)
  window.addEventListener('resize', measure)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  scrollY = visualScroll = window.scrollY
  measure()
  material.color.copy(heroColor)
})
watch(
  () => props.sceneKey,
  () => {
    scrollY = visualScroll = window.scrollY
    measure()
  },
  { flush: 'post' },
)
watch(theme, measure, { flush: 'post' })
onUnmounted(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
  reduced?.removeEventListener('change', measure)
  window.removeEventListener('resize', measure)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('visibilitychange', onVisibility)
  geometry?.dispose()
  material?.dispose()
  sprite?.dispose()
  renderer?.dispose()
  renderer?.forceContextLoss()
})
</script>
<template><div ref="container" class="scroll-particles" aria-hidden="true"></div></template>
