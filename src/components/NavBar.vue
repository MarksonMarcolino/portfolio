<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, Globe } from 'lucide-vue-next'

const { t, locale } = useI18n()

const navKeys = ['home', 'stack', 'timeline', 'publications', 'about', 'contact']
const anchors = { home: '#hero', stack: '#stack', timeline: '#timeline', publications: '#publications', about: '#about', contact: '#contact' }
const locales = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
]

const mobileOpen = ref(false)
const langOpen = ref(false)
const activeSection = ref('#hero')

function switchLocale(code) {
  locale.value = code
  localStorage.setItem('locale', code)
  langOpen.value = false
}

function scrollTo(href) {
  mobileOpen.value = false
  if (window.__lenis) {
    window.__lenis.scrollTo(href)
  } else {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

function onScroll() {
  const sections = Object.values(anchors)
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.querySelector(sections[i])
    if (el && el.getBoundingClientRect().top <= 100) {
      activeSection.value = sections[i]
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50" style="background: rgba(8, 11, 18, 0.8); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.05);">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="#hero" @click.prevent="scrollTo('#hero')" class="font-mono font-bold text-lg gradient-text">M.</a>

      <div class="hidden md:flex items-center gap-6">
        <a
          v-for="key in navKeys"
          :key="key"
          :href="anchors[key]"
          @click.prevent="scrollTo(anchors[key])"
          class="text-sm transition-colors relative pb-1"
          :class="activeSection === anchors[key] ? 'gradient-text' : 'text-text-secondary hover:text-text-primary'"
        >
          {{ t(`nav.${key}`) }}
          <span v-if="activeSection === anchors[key]" class="absolute bottom-0 left-0 right-0 h-0.5 rounded" style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);" />
        </a>

        <!-- Language switcher -->
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
        <!-- Mobile lang switcher -->
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

    <div v-if="mobileOpen" class="md:hidden" style="background: rgba(8, 11, 18, 0.95); backdrop-filter: blur(16px); border-top: 1px solid rgba(255,255,255,0.05);">
      <a
        v-for="key in navKeys"
        :key="key"
        :href="anchors[key]"
        @click.prevent="scrollTo(anchors[key])"
        class="block px-4 py-3 text-sm transition-colors"
        :class="activeSection === anchors[key] ? 'gradient-text' : 'text-text-secondary hover:text-text-primary'"
      >
        {{ t(`nav.${key}`) }}
      </a>
    </div>
  </nav>
</template>
