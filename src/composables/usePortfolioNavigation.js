import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue'
import { projects } from '../data/portfolio'
export function usePortfolioNavigation() {
  const slug = ref('')
  const currentSection = ref('inicio')
  const main = ref(null)
  const active = computed(() => projects.find((project) => project.slug === slug.value))
  const nextProject = computed(
    () =>
      projects[
        (projects.findIndex((project) => project.slug === slug.value) + 1) % projects.length
      ],
  )
  let frame = 0
  let sections = []
  let disposed = false
  function updateCurrentSection() {
    frame = 0
    const atBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
    if (atBottom && sections.some((section) => section.id === 'contacto')) {
      currentSection.value = 'contacto'
      return
    }
    const marker = window.innerHeight * 0.25
    const section = sections.findLast((section) => section.getBoundingClientRect().top <= marker)
    currentSection.value = section?.id || (active.value ? 'proyectos' : 'inicio')
  }
  function scheduleSectionUpdate() {
    if (!frame) frame = requestAnimationFrame(updateCurrentSection)
  }
  function observeSections() {
    sections = [...document.querySelectorAll('main section[id]')]
    updateCurrentSection()
  }
  async function syncRoute() {
    let hash
    try {
      hash = decodeURIComponent(location.hash.slice(1))
    } catch {
      hash = ''
    }
    if (hash === 'contenido') {
      main.value?.focus({ preventScroll: true })
      return
    }
    const isCase = hash.startsWith('proyecto/')
    slug.value = isCase ? hash.split('/')[1] : ''
    if (isCase && !active.value) {
      location.hash = 'proyectos'
      return
    }
    document.title = active.value
      ? `${active.value.name} — Jorge Iván`
      : 'Jorge Iván — Product Designer'
    await nextTick()
    if (disposed) return
    observeSections()
    if (isCase || !hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      main.value?.focus({ preventScroll: true })
    } else {
      document.getElementById(hash)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      })
    }
  }
  onMounted(() => {
    syncRoute()
    window.addEventListener('hashchange', syncRoute)
    window.addEventListener('scroll', scheduleSectionUpdate, { passive: true })
    window.addEventListener('resize', scheduleSectionUpdate)
  })
  onUnmounted(() => {
    disposed = true
    cancelAnimationFrame(frame)
    window.removeEventListener('hashchange', syncRoute)
    window.removeEventListener('scroll', scheduleSectionUpdate)
    window.removeEventListener('resize', scheduleSectionUpdate)
  })
  return { slug, active, nextProject, currentSection, main }
}
