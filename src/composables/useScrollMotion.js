import { nextTick, onMounted, onUnmounted, watch } from 'vue'

// Scroll depth stays inside reserved space; image depth stays inside clipped frames.
export function useScrollMotion(route) {
  let entries = [],
    visible = new Set(),
    observer,
    revealObserver,
    resizeObserver,
    media
  let frame = 0,
    disposed = false,
    height = 0,
    generation = 0
  const animations = new Set()
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
  const targets = [
    ['.hero-art', 0.18, 32, '--scroll-shift'],
    ['.about-art', 0.14, 20, '--scroll-shift'],
    [
      '.project-carousel, .related-products-grid, .gallery-showcase, .case-lead-screen',
      0.055,
      18,
      '--scroll-shift',
    ],
    [
      '.gallery-row:not(.is-wide) .screen-preview, .related-product-preview',
      0.12,
      32,
      '--image-shift',
    ],
  ]
  const reveals =
    '.hero-copy, .section-heading, .about-copy, .expertise-grid, .process-compact, .contact-copy, .case-intro-grid, .case-chapter > h2, .case-three-grid, .case-flow-panel, .case-system-grid, .gallery-showcase'
  function reset() {
    for (const entry of entries) entry.element.style.removeProperty(entry.property)
    for (const animation of animations) animation.cancel()
    animations.clear()
    cancelAnimationFrame(frame)
    frame = 0
  }
  function measure() {
    height = window.innerHeight
    for (const entry of entries) {
      const rect = entry.element.getBoundingClientRect()
      entry.center =
        rect.top +
        window.scrollY +
        rect.height / 2 -
        (entry.property === '--scroll-shift' ? entry.current : 0)
      entry.range =
        entry.property === '--image-shift'
          ? Math.min(entry.maxRange, rect.height * 0.06)
          : window.innerWidth <= 700
            ? Math.min(entry.maxRange, 16)
            : entry.maxRange
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
      entry.current += (target - entry.current) * 0.14
      if (Math.abs(target - entry.current) > 0.08) moving = true
      entry.element.style.setProperty(entry.property, `${entry.current.toFixed(2)}px`)
    }
    if (moving) schedule()
  }
  function schedule() {
    if (!frame && !media.matches && !document.hidden) frame = requestAnimationFrame(render)
  }
  async function collect() {
    const run = ++generation
    await nextTick()
    if (disposed || run !== generation) return
    observer?.disconnect()
    revealObserver?.disconnect()
    reset()
    visible.clear()
    entries = targets.flatMap(([selector, speed, range, property]) =>
      [...document.querySelectorAll(selector)].map((element) => ({
        element,
        speed,
        range,
        maxRange: range,
        property,
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
      if (entry.property === '--scroll-shift') entry.element.classList.add('scroll-depth')
      observer.observe(entry.element)
    }
    revealObserver = new IntersectionObserver(
      (changes) => {
        for (const change of changes) {
          if (!change.isIntersecting) continue
          revealObserver.unobserve(change.target)
          if (media.matches || document.hidden) continue
          change.target.classList.add('motion-entered')
          const animation = change.target.animate(
            [
              { opacity: 0.45, transform: 'translateY(20px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 850, easing: 'cubic-bezier(.22, 1, .36, 1)' },
          )
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        }
      },
      { threshold: 0.12 },
    )
    for (const element of document.querySelectorAll(reveals)) revealObserver.observe(element)
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
      for (const animation of animations) animation.pause()
    } else {
      for (const animation of animations) animation.play()
      schedule()
    }
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
    generation++
    reset()
    observer?.disconnect()
    revealObserver?.disconnect()
    resizeObserver?.disconnect()
    media?.removeEventListener('change', preferenceChange)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', measure)
    document.removeEventListener('visibilitychange', visibilityChange)
  })
}
