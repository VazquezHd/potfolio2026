<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Download, Home, UserRound, Layers, Workflow, Mail } from 'lucide-vue-next'
const props = defineProps({
  name: { type: String, required: true },
  currentSection: { type: String, default: 'inicio' },
  isCase: Boolean,
  projectCount: { type: String, required: true },
  resume: { type: String, default: '' },
})
const navigation = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'sobre-mi', label: 'Sobre mí', icon: UserRound },
  { id: 'proyectos', label: 'Proyectos', icon: Layers },
  { id: 'proceso', label: 'Proceso', icon: Workflow },
  { id: 'contacto', label: 'Contacto', icon: Mail },
]
const progress = ref(0)
const scrolled = ref(false)
const isCurrent = (id) =>
  props.currentSection === 'contacto'
    ? id === 'contacto'
    : props.isCase
      ? id === 'proyectos'
      : props.currentSection === id
function updateProgress() {
  scrolled.value = window.scrollY > 24
  const limit = document.documentElement.scrollHeight - window.innerHeight
  progress.value = limit > 0 ? Math.min(1, Math.max(0, window.scrollY / limit)) : 0
}
onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>
<template>
  <div class="nav-backdrop" :class="{ 'is-visible': scrolled }" aria-hidden="true"></div>
  <header class="site-header floating-header" :class="{ 'is-scrolled': scrolled }">
    <nav class="floating-nav" :aria-label="`Navegación de ${name}`">
      <a
        v-for="item in navigation"
        :key="item.id"
        :href="`#${item.id}`"
        :aria-label="item.label"
        :title="item.label"
        :aria-current="isCurrent(item.id) ? 'location' : undefined"
      >
        <component :is="item.icon" :size="17" aria-hidden="true" />
        <span>{{ item.label }}</span>
      </a>
    </nav>
    <a
      v-if="resume"
      class="header-contact"
      :href="resume"
      download="Jorge-Ivan-Vazquez-CV-2024.pdf"
      aria-label="Descarga mi CV"
      title="Currículum de Jorge Iván (2024)"
    >
      <span>Descarga mi CV</span><Download :size="17" aria-hidden="true" />
    </a>
    <div class="nav-progress" aria-hidden="true">
      <i :style="{ transform: `scaleX(${progress})` }"></i>
    </div>
  </header>
</template>
