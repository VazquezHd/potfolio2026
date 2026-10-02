<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
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
  { id: 'contacto', shape: 'signal', depth: 0, opacity: 1 },
]
let renderer, scene, camera, geometry, material, cloud, shapes, positions
let observer,
  reduced,
  anchors = [],
  frame = 0,
  lastTime = 0,
  time = 0,
  rotation = 0
let width = 0,
  scrollY = 0,
  depth = 0,
  opacity = 0.8
let heroColor, blueColor, signalColor
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
  signalColor = new Color(styles.getPropertyValue('--color-particle-signal').trim())
  anchors = stages
    .map((stage, index) => {
      const element = document.getElementById(stage.id)
      return element
        ? {
            ...stage,
            top:
              index === 0
                ? 0
                : Math.max(0, element.getBoundingClientRect().top + window.scrollY - 95),
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
    anchors.findLastIndex((stage) => stage.top <= scrollY),
  )
  const from = anchors[index],
    to = anchors[index + 1] || from
  const blend = from === to ? 0 : clamp((scrollY - from.top) / Math.max(1, to.top - from.top), 0, 1)
  return { from, to, blend, position: index + blend }
}
function render(timestamp) {
  frame = 0
  if (!renderer || document.hidden) return
  const delta = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0
  lastTime = timestamp
  time += delta
  const { from, to, blend, position } = progress()
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
  const targetColor =
    from.shape === 'sphere' ? heroColor.clone().lerp(blueColor, blend) : blueColor.clone()
  if (to.shape === 'signal') targetColor.lerp(signalColor, blend)
  if (from.shape === 'signal') targetColor.copy(signalColor)
  material.color.lerp(targetColor, reduced.matches ? 1 : 1 - Math.exp(-3.1 * delta))
  const signalStrength = clamp((position - (anchors.length - 1.5)) * 2, 0, 1)
  material.opacity = reduced.matches ? 0.8 : opacity + (1 - opacity) * signalStrength
  material.size = reduced.matches ? 0.04 : 0.04 + signalStrength * 0.06
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
  shapes = createParticleShapes(projects.length)
  positions = new Float32Array(shapes.sphere)
  geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  material = new PointsMaterial({
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
  scrollY = window.scrollY
  measure()
  material.color.copy(heroColor)
})
watch(
  () => props.sceneKey,
  () => {
    scrollY = window.scrollY
    measure()
  },
  { flush: 'post' },
)
onUnmounted(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
  reduced?.removeEventListener('change', measure)
  window.removeEventListener('resize', measure)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('visibilitychange', onVisibility)
  geometry?.dispose()
  material?.dispose()
  renderer?.dispose()
  renderer?.forceContextLoss()
})
</script>
<template><div ref="container" class="scroll-particles" aria-hidden="true"></div></template>
