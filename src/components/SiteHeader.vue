<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Download,
  Home,
  UserRound,
  Layers,
  Workflow,
  Mail,
  Sun,
  Moon,
  Languages,
} from 'lucide-vue-next'
import { usePreferences } from '../composables/usePreferences'
const { locale, theme, nextLanguage, toggleLocale, toggleTheme, t } = usePreferences()
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
    <nav class="floating-nav" :aria-label="`${$t('Navegación de')} ${name}`">
      <a
        v-for="item in navigation"
        :key="item.id"
        :href="`#${item.id}`"
        :aria-label="$t(item.label)"
        :title="$t(item.label)"
        :aria-current="isCurrent(item.id) ? 'location' : undefined"
      >
        <component :is="item.icon" :size="17" aria-hidden="true" />
        <span>{{ $t(item.label) }}</span>
      </a>
    </nav>
    <a
      v-if="resume"
      class="header-contact"
      :href="resume"
      :download="resume.split('/').at(-1)"
      :aria-label="$t('Descarga mi CV')"
      :title="`${$t('CV de Jorge Iván · 2026')} · ${locale === 'es' ? 'Español' : 'English'}`"
    >
      <span>{{ $t('Descarga mi CV') }}</span
      ><Download :size="17" aria-hidden="true" />
    </a>
    <div class="header-preferences" role="group" :aria-label="$t('Idioma y apariencia')">
      <button
        type="button"
        class="preference-button language-button"
        :aria-label="t(locale === 'es' ? 'Cambiar a inglés' : 'Cambiar a español')"
        :title="t(locale === 'es' ? 'Cambiar a inglés' : 'Cambiar a español')"
        @click="toggleLocale"
      >
        <Languages :size="16" aria-hidden="true" /><span>{{ nextLanguage }}</span>
      </button>
      <button
        type="button"
        class="preference-button theme-switch"
        role="switch"
        :aria-checked="theme === 'dark'"
        :aria-label="t('Modo oscuro')"
        :title="t(theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro')"
        @click="toggleTheme"
      >
        <span class="theme-switch-track" aria-hidden="true">
          <Sun class="switch-sun" :size="13" />
          <Moon class="switch-moon" :size="13" />
          <span class="theme-switch-thumb">
            <Sun :size="14" class="thumb-sun" />
            <Moon :size="14" class="thumb-moon" />
          </span>
        </span>
      </button>
    </div>
    <div class="nav-progress" aria-hidden="true">
      <i :style="{ transform: `scaleX(${progress})` }"></i>
    </div>
  </header>
</template>
