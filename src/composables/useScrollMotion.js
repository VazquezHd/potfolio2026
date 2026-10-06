import { nextTick, onMounted, onUnmounted, watch } from 'vue'

// Keep depth inside each section's reserved space and reveal complete groups together.
export function useScrollMotion(route) {
  let entries = [],
    revealElements = [],
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
    ['.about-art', 0.18, 24, '--scroll-shift'],
    ['.about-copy', 0.06, 12, '--scroll-shift'],
    [
      '.project-carousel, .related-products-grid, .gallery-showcase, .case-lead-screen',
      0.09,
      22,
      '--scroll-shift',
    ],
    ['.expertise-grid, .process-compact', 0.055, 12, '--scroll-shift'],
    ['.related-product-preview', 0.12, 32, '--image-shift'],
  ]
  const reveals =
    '.hero-copy, .hero-art, .hero-bottom, .section-heading, .project-carousel, .about-art, .about-copy, .career-summary, .expertise-grid, .independent-work, .process-compact, .contact-copy, .contact-actions, .case-intro-grid, .case-chapter > h2, .case-three-grid, .case-flow-panel, .case-system-grid, .gallery-showcase, .related-products-grid'
  function reset() {
    for (const entry of entries) entry.element.style.removeProperty(entry.property)
    for (const element of revealElements) element.classList.remove('motion-waiting')
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
            ? Math.min(entry.maxRange, 14)
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
  function track(animation) {
    animations.add(animation)
    animation.onfinish = animation.oncancel = () => animations.delete(animation)
  }
  function reveal(element) {
    const waiting = element.classList.contains('motion-waiting')
    element.classList.remove('motion-waiting')
    element.classList.add('motion-entered')
    if (media.matches) return
    const artwork = element.matches('.hero-art, .about-art, .hero-bottom')
    track(
      element.animate(
        [
          { opacity: waiting ? 0 : 0.55, transform: artwork ? 'scale(.98)' : 'translateY(28px)' },
          { opacity: 1, transform: artwork ? 'scale(1)' : 'translateY(0)' },
        ],
        { duration: 1050, easing: 'cubic-bezier(.22, 1, .36, 1)' },
      ),
    )
    for (const ink of element.querySelectorAll('.motion-heading-ink')) {
      track(
        ink.animate([{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }], {
          duration: 1150,
          easing: 'cubic-bezier(.2, .8, .2, 1)',
        }),
      )
    }
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
        if (disposed) return
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
    revealElements = [...document.querySelectorAll(reveals)]
    for (const element of revealElements) {
      if (!media.matches && element.getBoundingClientRect().top >= window.innerHeight * 0.9)
        element.classList.add('motion-waiting')
    }
    revealObserver = new IntersectionObserver(
      (changes) => {
        if (disposed || document.hidden) return
        for (const change of changes) {
          if (!change.isIntersecting) continue
          revealObserver.unobserve(change.target)
          reveal(change.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    )
    for (const element of revealElements) revealObserver.observe(element)
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
      for (const element of revealElements) {
        const rect = element.getBoundingClientRect()
        if (
          element.classList.contains('motion-waiting') &&
          rect.top < window.innerHeight - 24 &&
          rect.bottom > 0
        ) {
          revealObserver?.unobserve(element)
          reveal(element)
        }
      }
      schedule()
    }
  }
  function focusReveal(event) {
    const element = event.target.closest?.('.motion-waiting')
    if (element) {
      revealObserver?.unobserve(element)
      reveal(element)
    }
  }
  onMounted(() => {
    media = matchMedia('(prefers-reduced-motion: reduce)')
    media.addEventListener('change', preferenceChange)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', visibilityChange)
    document.addEventListener('focusin', focusReveal)
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
    document.removeEventListener('focusin', focusReveal)
  })
}
