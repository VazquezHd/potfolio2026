import { computed, ref, watch } from 'vue'
import english from '../i18n/en.json'
export const locale = ref('es')
export const theme = ref('dark')
let initialized = false
export function translate(value) {
  if (typeof value !== 'string' || locale.value === 'es') return value
  return english[value.trim()] ?? value
}
export function localize(value) {
  if (typeof value === 'string') return translate(value)
  if (Array.isArray(value)) return value.map(localize)
  if (value && typeof value === 'object')
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item)]))
  return value
}
export function initializePreferences() {
  if (initialized) return
  initialized = true
  try {
    locale.value = localStorage.getItem('portfolio-locale') === 'en' ? 'en' : 'es'
    theme.value = localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'
  } catch {
    /* The defaults also work when storage is unavailable. */
  }
  watch(
    [locale, theme],
    ([language, appearance]) => {
      document.documentElement.lang = language
      document.documentElement.dataset.theme = appearance
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          'content',
          getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim(),
        )
      try {
        localStorage.setItem('portfolio-locale', language)
        localStorage.setItem('portfolio-theme', appearance)
      } catch {
        /* Preferences remain usable for the current visit. */
      }
    },
    { immediate: true, flush: 'sync' },
  )
}
export function usePreferences() {
  return {
    locale,
    theme,
    t: translate,
    localize,
    nextLanguage: computed(() => (locale.value === 'es' ? 'EN' : 'ES')),
    toggleLocale: () => {
      locale.value = locale.value === 'es' ? 'en' : 'es'
    },
    toggleTheme: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    },
  }
}
