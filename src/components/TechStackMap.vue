<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { stackCategories } from '../data/stack.js'
import {
  Cloud, Database, Terminal, Brain, BarChart3,
  Server, Layout, Container, Cpu, BookOpen
} from 'lucide-vue-next'
import WordReveal from './WordReveal.vue'

const { t } = useI18n()
const icons = { Cloud, Database, Terminal, Brain, BarChart3, Server, Layout, Container, Cpu }
const sectionRef = ref(null)

useScrollReveal(sectionRef, '.card', { y: 25, stagger: 0.05 })
</script>

<template>
  <section id="stack" ref="sectionRef" class="relative z-10 py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-end justify-between mb-2">
        <div>
          <div class="section-header">
            <Cpu :size="22" class="text-accent" />
            <WordReveal :text="t('stack.title')" />
          </div>
          <div class="section-underline ml-8" />
        </div>
        <div class="hidden sm:flex items-center gap-4 text-[0.7rem] text-text-muted">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-accent" />
            {{ t('stack.production') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full border border-text-muted" />
            {{ t('stack.knowledge') }}
          </span>
        </div>
      </div>

      <p class="text-text-secondary text-sm mb-10 ml-8">{{ t('stack.subtitle') }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="cat in stackCategories" :key="cat.category" class="card" style="visibility: hidden;">
          <div class="flex items-center gap-2 mb-3">
            <component :is="icons[cat.icon] || Cpu" :size="18" class="text-accent" />
            <h3 class="font-mono text-[0.85rem] font-semibold uppercase tracking-wider gradient-text">
              {{ t(`stack.categories.${cat.category}`) }}
            </h3>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <template v-for="item in cat.items" :key="item.name">
              <span v-if="item.tier === 'production'" class="pill-production">
                {{ item.name }}
              </span>
              <span v-else class="pill-knowledge">
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
