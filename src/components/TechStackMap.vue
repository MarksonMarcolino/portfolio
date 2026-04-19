<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { stackCategories } from '../data/stack.js'
import { BookOpen } from 'lucide-vue-next'
import SectionHeader from './SectionHeader.vue'

const { t } = useI18n()
const sectionRef = ref(null)

useScrollReveal(sectionRef, '.stack-card', { y: 25, stagger: 0.05 })
</script>

<template>
  <section id="stack" ref="sectionRef" class="relative z-10 pt-10 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-end justify-between" style="margin-bottom: 40px;">
        <SectionHeader :title="t('stack.title')" :subtitle="t('stack.subtitle')" />
        <div class="hidden sm:flex items-center gap-4" style="font-family: Inter, sans-serif; font-size: 0.7rem; color: #444;">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background: #f0f0f0;" />
            {{ t('stack.production') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background: #444;" />
            {{ t('stack.knowledge') }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-5 items-stretch">
        <div
          v-for="cat in stackCategories"
          :key="cat.category"
          class="stack-card rounded-xl p-5 transition-all duration-200 h-full"
          style="background: #111; border: 1px solid rgba(255,255,255,0.08); visibility: hidden;"
          @mouseenter="(e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }"
          @mouseleave="(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }"
        >
          <h3 class="mb-3" style="font-family: Inter, sans-serif; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #888;">
            {{ t(`stack.categories.${cat.category}`) }}
          </h3>
          <div class="flex flex-wrap gap-1.5">
            <template v-for="item in cat.items" :key="item.name">
              <span
                v-if="item.tier === 'production'"
                class="inline-block rounded transition-colors duration-200 cursor-default"
                style="background: rgba(240,240,240,0.06); border: 1px solid rgba(240,240,240,0.15); color: #f0f0f0; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; padding: 3px 10px;"
                @mouseenter="(e) => { e.target.style.borderColor = 'rgba(0,210,255,0.5)'; e.target.style.color = '#00d2ff' }"
                @mouseleave="(e) => { e.target.style.borderColor = 'rgba(240,240,240,0.15)'; e.target.style.color = '#f0f0f0' }"
              >
                {{ item.name }}
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1 rounded transition-colors duration-200"
                style="background: transparent; border: 1px solid rgba(255,255,255,0.06); color: #444; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; padding: 3px 10px; cursor: default;"
                @mouseenter="(e) => { e.currentTarget.style.color = '#666' }"
                @mouseleave="(e) => { e.currentTarget.style.color = '#444' }"
              >
                <BookOpen :size="10" />
                {{ item.name }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
