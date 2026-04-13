<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLenis } from '../composables/useLenis.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, ChevronDown, Github, Calendar, BookOpen, Rocket, Languages } from 'lucide-vue-next'

const { t, locale } = useI18n()
const lenis = useLenis()

const roleKeys = ['dataEngineer', 'mlResearcher', 'fullStackBuilder', 'openSourceAuthor']
const displayText = ref('')
const roleIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
let timer = null

function getRoles() {
  return roleKeys.map(k => t(`hero.roles.${k}`))
}

function tick() {
  const roles = getRoles()
  const current = roles[roleIndex.value]
  if (!isDeleting.value) {
    displayText.value = current.substring(0, charIndex.value + 1)
    charIndex.value++
    if (charIndex.value === current.length) {
      timer = setTimeout(() => { isDeleting.value = true; tick() }, 2000)
      return
    }
    timer = setTimeout(tick, 80)
  } else {
    displayText.value = current.substring(0, charIndex.value - 1)
    charIndex.value--
    if (charIndex.value === 0) {
      isDeleting.value = false
      roleIndex.value = (roleIndex.value + 1) % roles.length
      timer = setTimeout(tick, 300)
      return
    }
    timer = setTimeout(tick, 40)
  }
}

watch(locale, () => {
  clearTimeout(timer)
  charIndex.value = 0
  isDeleting.value = false
  displayText.value = ''
  tick()
})

const stats = [
  { key: 'experience', value: 15, suffix: '+', icon: Calendar },
  { key: 'papers', value: 4, suffix: '', icon: BookOpen },
  { key: 'products', value: 3, suffix: '', icon: Rocket },
  { key: 'languages', value: 3, suffix: '', icon: Languages },
]

const statRefs = ref({})

const canvas = ref(null)
let animFrame = null
let nodes = []

function initCanvas() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  const resize = () => { canvas.value.width = window.innerWidth; canvas.value.height = window.innerHeight }
  resize()
  window.addEventListener('resize', resize)

  nodes = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.value.width,
    y: Math.random() * canvas.value.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(0, 210, 255, ${0.12 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    for (const node of nodes) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 210, 255, 0.4)'
      ctx.fill()
      node.x += node.vx
      node.y += node.vy
      if (node.x < 0 || node.x > canvas.value.width) node.vx *= -1
      if (node.y < 0 || node.y > canvas.value.height) node.vy *= -1
    }
    animFrame = requestAnimationFrame(draw)
  }
  draw()
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animFrame)
    else draw()
  })
}

onMounted(() => {
  tick()
  initCanvas()

  // Hero entrance sequence
  const tl = gsap.timeline({ delay: 0.3 })

  tl.fromTo('.hero-name',
    { autoAlpha: 0, y: 40, skewY: 2 },
    { autoAlpha: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power4.out' })

    .fromTo('.hero-typewriter',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3')

    .fromTo('.hero-tagline',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3')

    .fromTo('.hero-location',
      { autoAlpha: 0, y: 15 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2')

    .fromTo('.hero-btn',
      { autoAlpha: 0, y: 15 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
      '-=0.2')

    .fromTo('.hero-stat',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08 },
      '-=0.2')

    .fromTo('.hero-photo',
      { autoAlpha: 0, scale: 0.92 },
      { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
      '-=0.8')

  // Stats counter animation
  stats.forEach((stat) => {
    const el = statRefs.value[stat.key]
    if (!el) return
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + stat.suffix
          },
        })
      },
    })
  })
})

onUnmounted(() => { clearTimeout(timer); cancelAnimationFrame(animFrame) })

function scrollToWork() {
  lenis.scrollTo('#stack')
}
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center pt-14">
    <canvas ref="canvas" class="absolute inset-0 z-0 pointer-events-none" />

    <div class="relative z-10 max-w-5xl mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <!-- Text column -->
        <div class="text-center lg:text-left lg:flex-1 order-2 lg:order-1">
          <h1 class="hero-name font-mono font-bold gradient-text mb-4 invisible" style="font-size: clamp(2rem, 5vw, 3.5rem);">
            Markson Rebelo Marcolino
          </h1>

          <div class="hero-typewriter font-mono text-xl md:text-2xl text-accent mb-6 h-8 invisible">
            <span class="cursor-blink">{{ displayText }}</span>
          </div>

          <p class="hero-tagline text-text-secondary text-base leading-relaxed max-w-[480px] mx-auto lg:mx-0 mb-6 whitespace-pre-line invisible">{{ t('hero.tagline') }}</p>

          <div class="hero-location inline-flex items-center gap-2 text-sm mb-8 px-4 py-1.5 rounded-full invisible" style="border: 1px solid rgba(0,210,255,0.3);">
            <MapPin :size="14" class="text-accent" />
            <span class="text-text-secondary">{{ t('hero.location') }}</span>
          </div>

          <div class="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
            <button
              @click="scrollToWork"
              class="hero-btn px-7 py-3 rounded-lg text-sm font-medium text-white transition-all hover:opacity-85 hover:scale-[1.02] cursor-pointer invisible"
              style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);"
            >
              {{ t('hero.viewWork') }}
            </button>
            <a
              href="https://github.com/MarksonMarcolino"
              target="_blank"
              rel="noopener"
              class="hero-btn relative inline-flex rounded-lg p-[2px] transition-all hover:scale-[1.02] cursor-pointer invisible"
              style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);"
            >
              <span class="flex items-center gap-2 bg-bg px-7 py-3 rounded-[6px] text-sm text-text-primary">
                <Github :size="16" />
                GitHub
              </span>
            </a>
          </div>

          <!-- Stats row -->
          <div class="flex flex-wrap justify-center lg:justify-start gap-8">
            <div v-for="stat in stats" :key="stat.key" class="hero-stat text-center invisible">
              <div class="flex items-center justify-center gap-1.5 mb-1">
                <component :is="stat.icon" :size="16" class="text-accent" />
                <span
                  :ref="el => { if (el) statRefs[stat.key] = el }"
                  class="font-mono text-2xl font-bold gradient-text"
                >
                  0{{ stat.suffix }}
                </span>
              </div>
              <div class="text-xs text-text-muted">{{ t(`hero.stats.${stat.key}`) }}</div>
            </div>
          </div>
        </div>

        <!-- Photo column -->
        <div class="order-1 lg:order-2 shrink-0">
          <div class="hero-photo photo-circle w-40 h-40 lg:w-[280px] lg:h-[280px] invisible"
               style="box-shadow: 0 0 60px rgba(0, 210, 255, 0.15);">
            <img
              src="/profile.jpg"
              alt="Markson Rebelo Marcolino"
              class="w-full h-full object-cover relative z-0"
              style="object-position: 50% 25%;"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <ChevronDown :size="24" class="text-text-muted bounce-down" />
    </div>
  </section>
</template>
