<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLenis } from '../composables/useLenis.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePreferredReducedMotion } from '@vueuse/core'
import { Menu, X, Globe, Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme.js'

const { t, locale } = useI18n()
const lenis = useLenis()
const { theme, toggle: toggleTheme } = useTheme()
const reducedMotion = usePreferredReducedMotion()

const navKeys = ['home', 'timeline', 'publications', 'projects', 'stack', 'about', 'contact']
const anchors = { home: '#hero', timeline: '#timeline', publications: '#publications', projects: '#projects', stack: '#stack', about: '#about', contact: '#contact' }
const locales = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
]

const mobileOpen = ref(false)
const langOpen = ref(false)
const activeSection = ref('#hero')
const navRef = ref(null)

function switchLocale(code) {
  locale.value = code
  try { localStorage.setItem('locale', code) } catch {}
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

  if (reducedMotion.value === 'reduce') return

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
  <nav ref="navRef" class="fixed top-0 left-0 right-0 z-50 flex items-center" style="background: color-mix(in srgb, var(--bg-0) 85%, transparent); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-subtle); height: 56px;">
    <div class="max-w-[1184px] mx-auto px-4 w-full flex items-center justify-between">
      <a href="#hero" @click.prevent="scrollTo('#hero')" class="font-mono font-bold text-lg" style="color: var(--text-primary);">M.</a>

      <div class="hidden md:flex items-center gap-6">
        <a
          v-for="key in navKeys"
          :key="key"
          :href="anchors[key]"
          @click.prevent="scrollTo(anchors[key])"
          class="text-sm relative pb-2 transition-colors"
          :class="activeSection === anchors[key] ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'"
        >
          {{ t(`nav.${key}`) }}
          <span v-if="activeSection === anchors[key]" class="absolute left-0 right-0 rounded-sm" style="bottom: -4px; height: 2px; background: var(--accent);" />
        </a>

        <div class="relative ml-2">
          <button @click="langOpen = !langOpen" class="flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors cursor-pointer">
            <Globe :size="14" />
            <span class="font-mono text-xs">{{ locale.toUpperCase() }}</span>
          </button>
          <div v-if="langOpen" class="absolute right-0 top-8 rounded-lg overflow-hidden" style="background: var(--bg-1); border: 1px solid var(--border-default);">
            <button
              v-for="l in locales"
              :key="l.code"
              @click="switchLocale(l.code)"
              class="block w-full px-4 py-2 text-xs font-mono text-left transition-colors cursor-pointer"
              :class="locale === l.code ? 'text-accent bg-bg-elevated' : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'"
            >
              {{ l.label }}
            </button>
          </div>
        </div>
        <button @click="toggleTheme" class="flex items-center justify-center w-11 h-11 text-text-secondary hover:text-accent transition-colors cursor-pointer" :aria-label="theme === 'dark' ? t('theme.toLight') : t('theme.toDark')">
          <Sun v-if="theme === 'dark'" :size="18" />
          <Moon v-else :size="18" />
        </button>
      </div>

      <div class="flex items-center gap-3 md:hidden">
        <div class="relative">
          <button @click="langOpen = !langOpen" class="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors cursor-pointer">
            <Globe :size="14" />
            <span class="font-mono text-xs">{{ locale.toUpperCase() }}</span>
          </button>
          <div v-if="langOpen" class="absolute right-0 top-8 rounded-lg overflow-hidden z-50" style="background: var(--bg-1); border: 1px solid var(--border-default);">
            <button
              v-for="l in locales"
              :key="l.code"
              @click="switchLocale(l.code)"
              class="block w-full px-4 py-2 text-xs font-mono text-left transition-colors cursor-pointer"
              :class="locale === l.code ? 'text-accent bg-bg-elevated' : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'"
            >
              {{ l.label }}
            </button>
          </div>
        </div>
        <button @click="toggleTheme" class="flex items-center justify-center w-11 h-11 text-text-secondary hover:text-accent transition-colors cursor-pointer" :aria-label="theme === 'dark' ? t('theme.toLight') : t('theme.toDark')">
          <Sun v-if="theme === 'dark'" :size="18" />
          <Moon v-else :size="18" />
        </button>
        <button @click="mobileOpen = !mobileOpen" class="text-text-secondary hover:text-accent transition-colors" :aria-label="t('nav.openMenu')" :aria-expanded="mobileOpen">
          <X v-if="mobileOpen" :size="22" aria-hidden="true" />
          <Menu v-else :size="22" aria-hidden="true" />
        </button>
      </div>
    </div>

  </nav>

  <!-- Mobile fullscreen overlay (outside nav for proper z-index) -->
  <Teleport to="body">
    <div
      v-if="mobileOpen"
      class="fixed inset-0 md:hidden flex flex-col items-center justify-center"
      style="background: var(--bg-0); z-index: 9999;"
    >
      <button @click="mobileOpen = false" class="absolute top-5 right-5 cursor-pointer" style="color: var(--text-secondary);" :aria-label="t('nav.closeMenu')">
        <X :size="28" aria-hidden="true" />
      </button>
      <!-- Language switcher in overlay -->
      <div class="absolute top-5 left-5 flex gap-2">
        <button
          v-for="l in locales"
          :key="l.code"
          @click="switchLocale(l.code)"
          class="font-mono text-xs cursor-pointer transition-colors"
          :style="locale === l.code ? 'color: var(--accent);' : 'color: var(--text-secondary);'"
        >
          {{ l.label }}
        </button>
      </div>
      <a
        v-for="key in navKeys"
        :key="key"
        :href="anchors[key]"
        @click.prevent="scrollTo(anchors[key])"
        class="block py-3"
        :style="'font-family: var(--font-display); font-weight: 600; font-size: 2rem; letter-spacing: 0.02em; text-decoration: none; ' + (activeSection === anchors[key] ? 'color: var(--accent);' : 'color: var(--text-primary);')"
      >
        {{ t(`nav.${key}`) }}
      </a>
    </div>
  </Teleport>
</template>
