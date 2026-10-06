import { nextTick, onMounted, onUnmounted, watch } from 'vue'

// One passive scroll listener; only elements near the viewport are animated.
export function useScrollMotion(route) {
  let entries = [],
    visible = new Set(),
    observer,
    resizeObserver,
    media
  let frame = 0,
    disposed = false,
    height = 0
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
  const targets = [
    ['.hero-art, .about-art', 0.09, 32],
    ['.project-list, .related-products-grid, .gallery-row, .case-lead-screen', 0.055, 18],
  ]
  function reset() {
    for (const entry of entries) entry.element.style.removeProperty('--scroll-shift')
    cancelAnimationFrame(frame)
    frame = 0
  }
  function measure() {
    height = window.innerHeight
    for (const entry of entries) {
      const rect = entry.element.getBoundingClientRect()
      entry.center = rect.top + window.scrollY + rect.height / 2 - entry.current
      entry.range = window.innerWidth <= 700 ? Math.min(entry.maxRange, 16) : entry.maxRange
    }
    schedule()
  }
  function render() {
    frame = 0
    if (media.matches || document.hidden) return
    const center = window.scrollY + height / 2
    let moving = false
    for (const entry of visible) {
      const target = clamp((center - entry.center) * entry.speed, -entry.range, entry.range)
      entry.current += (target - entry.current) * 0.16
      if (Math.abs(target - entry.current) > 0.08) moving = true
      entry.element.style.setProperty('--scroll-shift', `${entry.current.toFixed(2)}px`)
    }
    if (moving) schedule()
  }
  function schedule() {
    if (!frame && !media.matches && !document.hidden) frame = requestAnimationFrame(render)
  }
  async function collect() {
    await nextTick()
    if (disposed) return
    observer?.disconnect()
    reset()
    visible.clear()
    entries = targets.flatMap(([selector, speed, range]) =>
      [...document.querySelectorAll(selector)].map((element) => ({
        element,
        speed,
        range,
        maxRange: range,
        current: 0,
        center: 0,
      })),
    )
    const lookup = new Map(entries.map((entry) => [entry.element, entry]))
    observer = new IntersectionObserver(
      (changes) => {
        for (const change of changes) {
          const entry = lookup.get(change.target)
          if (change.isIntersecting) visible.add(entry)
          else visible.delete(entry)
        }
        schedule()
      },
      { rootMargin: '100px' },
    )
    for (const entry of entries) {
      entry.element.classList.add('scroll-depth')
      observer.observe(entry.element)
    }
    measure()
  }
  function preferenceChange() {
    reset()
    for (const entry of entries) entry.current = 0
    measure()
  }
  function visibilityChange() {
    if (document.hidden) {
      cancelAnimationFrame(frame)
      frame = 0
    } else schedule()
  }
  onMounted(() => {
    media = matchMedia('(prefers-reduced-motion: reduce)')
    media.addEventListener('change', preferenceChange)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', visibilityChange)
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(document.querySelector('main'))
    collect()
  })
  watch(route, collect, { flush: 'post' })
  onUnmounted(() => {
    disposed = true
    reset()
    observer?.disconnect()
    resizeObserver?.disconnect()
    media?.removeEventListener('change', preferenceChange)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', measure)
    document.removeEventListener('visibilitychange', visibilityChange)
  })
}
