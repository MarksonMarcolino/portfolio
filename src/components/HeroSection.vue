<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLenis } from '../composables/useLenis.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Github, Download } from 'lucide-vue-next'
import { useCV } from '../composables/useCV.js'

const { t } = useI18n()
const lenis = useLenis()
const { downloadCV } = useCV()

const stats = [
  { key: 'experience', value: 15, suffix: '+' },
  { key: 'papers', value: 4, suffix: '' },
  { key: 'products', value: 3, suffix: '' },
  { key: 'languages', value: 3, suffix: '' },
]

const statRefs = ref({})
const heroRef = ref(null)
let gsapCtx

onMounted(() => {
  gsapCtx = gsap.context(() => {
    // Entrance sequence
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo('.hero-label',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })

      .fromTo('.hero-heading-line',
        { opacity: 0, y: 50, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: 'power4.out', stagger: 0.1 },
        '-=0.1')

      .fromTo('.hero-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4')

      .fromTo('.hero-buttons',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3')

      .fromTo('.hero-stat',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08 },
        '-=0.2')

      .fromTo('.hero-photo',
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
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
  }, heroRef.value)
})

onUnmounted(() => gsapCtx?.revert())

function scrollToWork() {
  lenis.scrollTo('#stack')
}
</script>

<template>
  <section id="hero" ref="heroRef" class="relative min-h-screen grid items-center" style="grid-template-columns: 55fr 45fr; padding: 0 clamp(24px, 6vw, 120px); gap: 48px; background: #080b12;">

    <!-- Text column -->
    <div>
      <!-- Available label -->
      <div class="hero-label flex items-center gap-2 mb-6" style="opacity: 0;">
        <span class="inline-block w-1.5 h-1.5 rounded-full" style="background: #22c55e; animation: pulse 2s ease-in-out infinite;"></span>
        <span style="font-family: Inter, sans-serif; font-size: 0.75rem; color: #888;">{{ t('hero.available') }}</span>
      </div>

      <!-- Heading -->
      <div class="hero-heading">
        <div class="hero-heading-line" style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(1rem, 2vw, 1.4rem); color: #666; font-weight: 400; letter-spacing: 0.02em; opacity: 0;">
          Hey, I'm Markson,
        </div>
        <div class="hero-heading-line" style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem, 10vw, 9rem); color: #f0f0f0; line-height: 0.92; letter-spacing: -0.01em; opacity: 0;">
          A DATA
        </div>
        <div class="hero-heading-line" style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem, 10vw, 9rem); color: #00d2ff; line-height: 0.92; letter-spacing: -0.01em; opacity: 0;">
          ENGINEER
        </div>
      </div>

      <!-- Tagline -->
      <p class="hero-tagline" style="font-family: Inter, sans-serif; font-size: 1rem; color: #888; line-height: 1.7; max-width: 440px; margin-top: 24px; opacity: 0;">
        {{ t('hero.tagline') }}
      </p>

      <!-- Buttons -->
      <div class="hero-buttons flex flex-wrap gap-3" style="margin-top: 32px; opacity: 0;">
        <button
          @click="scrollToWork"
          class="flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
          style="background: #f0f0f0; color: #0a0a0a; border: none; border-radius: 4px; padding: 12px 28px; font-family: Inter, sans-serif; font-weight: 500; font-size: 0.875rem;"
        >
          {{ t('hero.viewWork') }}
          <ArrowRight :size="16" />
        </button>
        <a
          href="https://github.com/MarksonMarcolino"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 cursor-pointer transition-all hover:border-white/50"
          style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #f0f0f0; border-radius: 4px; padding: 12px 28px; font-family: Inter, sans-serif; font-weight: 500; font-size: 0.875rem; text-decoration: none;"
        >
          <Github :size="16" />
          GitHub
        </a>
        <button
          @click="downloadCV"
          class="hero-btn flex items-center gap-2 cursor-pointer transition-all hover:border-white/50"
          style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #f0f0f0; border-radius: 4px; padding: 12px 28px; font-family: Inter, sans-serif; font-weight: 500; font-size: 0.875rem;"
        >
          <Download :size="16" />
          {{ t('hero.download_cv') }}
        </button>
      </div>

      <!-- Stats -->
      <div class="hero-stats-row flex items-center gap-0" style="margin-top: 48px;">
        <template v-for="(stat, i) in stats" :key="stat.key">
          <div v-if="i > 0" class="stat-divider h-8 mx-4" style="width: 1px; background: rgba(255,255,255,0.08);"></div>
          <div class="hero-stat" style="opacity: 0;">
            <span
              :ref="el => { if (el) statRefs[stat.key] = el }"
              style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 4vw, 3rem); color: #f0f0f0; display: block;"
            >
              0{{ stat.suffix }}
            </span>
            <span style="font-family: Inter, sans-serif; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: #888;">
              {{ t(`hero.stats.${stat.key}`) }}
            </span>
          </div>
        </template>
      </div>
    </div>

    <!-- Photo column: self-center aligns to the grid row, not viewport -->
    <div class="flex items-center justify-center self-center">
      <div class="hero-photo relative" style="width: clamp(300px, 38vw, 520px); height: clamp(300px, 38vw, 520px); opacity: 0;">
        <!-- Subtle glow behind -->
        <div class="absolute inset-0 rounded-full" style="background: radial-gradient(circle, rgba(0,210,255,0.05) 0%, transparent 70%); transform: scale(1.2);"></div>
        <!-- Photo -->
        <div class="w-full h-full rounded-full overflow-hidden" style="border: 1px solid rgba(255,255,255,0.1);">
          <img
            src="/profile-hero.jpg"
            alt="Markson Rebelo Marcolino"
            class="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (max-width: 767px) {
  #hero {
    grid-template-columns: 1fr !important;
    padding: 80px 20px 40px !important;
    gap: 24px !important;
    text-align: center;
  }
  #hero > div:last-child {
    order: -1;
  }
  .hero-heading-line {
    text-align: center;
  }
  .hero-tagline {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-buttons {
    flex-direction: column;
    width: 100%;
  }
  .hero-buttons > * {
    width: 100%;
    justify-content: center;
  }
  .hero-photo {
    width: 160px !important;
    height: 160px !important;
    margin: 0 auto 24px;
  }
  .hero-stats-row {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    text-align: center;
  }
  .hero-stats-row .stat-divider {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  #hero {
    grid-template-columns: 1fr !important;
    padding: 100px 24px 60px !important;
    gap: 32px !important;
    text-align: center;
  }
  #hero > div:last-child {
    order: -1;
  }
  .hero-heading-line {
    text-align: center;
  }
  .hero-tagline {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-buttons {
    justify-content: center;
  }
  .hero-photo {
    width: 220px !important;
    height: 220px !important;
    margin: 0 auto;
  }
}
</style>
