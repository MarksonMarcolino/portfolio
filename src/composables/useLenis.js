import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const lenis = reduced
  ? {
      scrollTo(t) {
        const el = typeof t === 'string' ? document.querySelector(t) : t
        el ? el.scrollIntoView() : window.scrollTo(0, 0)
      },
      on() {},
      raf() {},
    }
  : new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

if (!reduced) {
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
}

export function useLenis() {
  return lenis
}
