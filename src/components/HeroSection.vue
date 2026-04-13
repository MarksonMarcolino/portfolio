<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, ChevronDown, Github } from 'lucide-vue-next'

const { t, locale } = useI18n()

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

onMounted(() => { tick(); initCanvas() })
onUnmounted(() => { clearTimeout(timer); cancelAnimationFrame(animFrame) })

function scrollToWork() {
  if (window.__lenis) window.__lenis.scrollTo('#stack')
  else document.querySelector('#stack')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center pt-14">
    <canvas ref="canvas" class="absolute inset-0 z-0 pointer-events-none" />

    <div class="relative z-10 max-w-2xl mx-auto px-4 text-center">
      <h1 class="font-mono font-bold gradient-text mb-4" style="font-size: clamp(2rem, 5vw, 4rem);">
        Markson Rebelo Marcolino
      </h1>

      <div class="font-mono text-xl md:text-2xl text-accent mb-6 h-8">
        <span class="cursor-blink">{{ displayText }}</span>
      </div>

      <p class="text-text-secondary text-base leading-relaxed max-w-[480px] mx-auto mb-8 whitespace-pre-line">{{ t('hero.tagline') }}</p>

      <div class="inline-flex items-center gap-2 text-sm mb-8 px-4 py-1.5 rounded-full" style="border: 1px solid rgba(0,210,255,0.3);">
        <MapPin :size="14" class="text-accent" />
        <span class="text-text-secondary">{{ t('hero.location') }}</span>
      </div>

      <div class="flex flex-wrap justify-center gap-3">
        <button
          @click="scrollToWork"
          class="px-7 py-3 rounded-lg text-sm font-medium text-white transition-all hover:opacity-85 hover:scale-[1.02] cursor-pointer"
          style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);"
        >
          {{ t('hero.viewWork') }}
        </button>
        <a
          href="https://github.com/MarksonMarcolino"
          target="_blank"
          rel="noopener"
          class="relative inline-flex rounded-lg p-[2px] transition-all hover:scale-[1.02] cursor-pointer"
          style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);"
        >
          <span class="flex items-center gap-2 bg-bg px-7 py-3 rounded-[6px] text-sm text-text-primary">
            <Github :size="16" />
            GitHub
          </span>
        </a>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <ChevronDown :size="24" class="text-text-muted bounce-down" />
    </div>
  </section>
</template>
