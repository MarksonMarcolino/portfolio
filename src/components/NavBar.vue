<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLenis } from '../composables/useLenis.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, Globe } from 'lucide-vue-next'

const { t, locale } = useI18n()
const lenis = useLenis()

const navKeys = ['home', 'stack', 'projects', 'timeline', 'publications', 'about', 'contact']
const anchors = { home: '#hero', stack: '#stack', projects: '#projects', timeline: '#timeline', publications: '#publications', about: '#about', contact: '#contact' }
const locales = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
]

const mobileOpen = ref(false)
const langOpen = ref(false)
const activeSection = ref('#hero')
const navRef = ref(null)

function switchLocale(code) {
  locale.value = code
  localStorage.setItem('locale', code)
  langOpen.value = false
}

function scrollTo(href) {
  mobileOpen.value = false
  lenis.scrollTo(href)
}

function onScroll() {
  const atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 50)
  if (atBottom) {
    activeSection.value = '#contact'
    return
  }
  const sections = Object.values(anchors)
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.querySelector(sections[i])
    if (el && el.getBoundingClientRect().top <= 100) {
      activeSection.value = sections[i]
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  gsap.from(navRef.value, {
    y: -60,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 0.1,
  })

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      gsap.to(navRef.value, {
        height: self.direction === 1 ? 48 : 56,
        duration: 0.3,
        ease: 'power2.out',
      })
    },
  })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav ref="navRef" class="fixed top-0 left-0 right-0 z-50 flex items-center" style="background: rgba(8, 11, 18, 0.8); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.05); height: 56px;">
    <div class="max-w-6xl mx-auto px-4 w-full flex items-center justify-between">
      <a href="#hero" @click.prevent="scrollTo('#hero')" class="font-mono font-bold text-lg" style="color: #f0f0f0;">M.</a>

      <div class="hidden md:flex items-center gap-6">
        <a
          v-for="key in navKeys"
          :key="key"
          :href="anchors[key]"
          @click.prevent="scrollTo(anchors[key])"
          class="text-sm relative pb-2"
          :style="activeSection === anchors[key] ? 'color: #f0f0f0;' : 'color: #888; transition: color 0.2s ease;'"
          @mouseenter="(e) => { if (activeSection !== anchors[key]) e.target.style.color = '#f0f0f0' }"
          @mouseleave="(e) => { if (activeSection !== anchors[key]) e.target.style.color = '#888' }"
        >
          {{ t(`nav.${key}`) }}
          <span v-if="activeSection === anchors[key]" class="absolute left-0 right-0 rounded-sm" style="bottom: -4px; height: 2px; background: #00d2ff;" />
        </a>

        <div class="relative ml-2">
          <button @click="langOpen = !langOpen" class="flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors cursor-pointer">
            <Globe :size="14" />
            <span class="font-mono text-xs">{{ locale.toUpperCase() }}</span>
          </button>
          <div v-if="langOpen" class="absolute right-0 top-8 rounded-lg overflow-hidden" style="background: #0f1520; border: 1px solid rgba(255,255,255,0.06);">
            <button
              v-for="l in locales"
              :key="l.code"
              @click="switchLocale(l.code)"
              class="block w-full px-4 py-2 text-xs font-mono text-left transition-colors cursor-pointer"
              :class="locale === l.code ? 'text-accent bg-surface-elevated' : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'"
            >
              {{ l.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 md:hidden">
        <div class="relative">
          <button @click="langOpen = !langOpen" class="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors cursor-pointer">
            <Globe :size="14" />
            <span class="font-mono text-xs">{{ locale.toUpperCase() }}</span>
          </button>
          <div v-if="langOpen" class="absolute right-0 top-8 rounded-lg overflow-hidden z-50" style="background: #0f1520; border: 1px solid rgba(255,255,255,0.06);">
            <button
              v-for="l in locales"
              :key="l.code"
              @click="switchLocale(l.code)"
              class="block w-full px-4 py-2 text-xs font-mono text-left transition-colors cursor-pointer"
              :class="locale === l.code ? 'text-accent bg-surface-elevated' : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'"
            >
              {{ l.label }}
            </button>
          </div>
        </div>
        <button @click="mobileOpen = !mobileOpen" class="text-text-secondary hover:text-accent transition-colors">
          <X v-if="mobileOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
      style="background: #0a0a0a; transition: transform 0.3s ease;"
    >
      <button @click="mobileOpen = false" class="absolute top-4 right-4 cursor-pointer" style="color: #888;">
        <X :size="28" />
      </button>
      <a
        v-for="key in navKeys"
        :key="key"
        :href="anchors[key]"
        @click.prevent="scrollTo(anchors[key])"
        class="block py-3"
        :style="'font-family: Bebas Neue, sans-serif; font-size: 2rem; letter-spacing: 0.02em; ' + (activeSection === anchors[key] ? 'color: #00d2ff;' : 'color: #f0f0f0; transition: color 0.2s ease;')"
      >
        {{ t(`nav.${key}`) }}
      </a>
    </div>
  </nav>
</template>
