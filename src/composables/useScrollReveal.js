import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(containerRef, selector, options = {}) {
  const {
    y = 40,
    duration = 0.7,
    ease = 'power3.out',
    stagger = 0.1,
    start = 'top 88%',
  } = options

  let ctx

  onMounted(() => {
    ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(selector, { autoAlpha: 1 })
        return
      }
      gsap.fromTo(
        selector,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: containerRef.value,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, containerRef.value)
  })

  onUnmounted(() => ctx?.revert())
}
