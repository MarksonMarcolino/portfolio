<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useFilters } from '../composables/useFilters.js'
import { projects } from '../data/projects.js'
import { Rocket, Globe, ExternalLink, ChevronDown, ChevronUp } from 'lucide-vue-next'
import WordReveal from './WordReveal.vue'

const { t } = useI18n()
const { activeFilter, activeFilterType, setFilter, isFiltering, matchesFilter } = useFilters()
const sectionRef = ref(null)
const expandedCards = ref(new Set())

const linkIcons = { Globe, ExternalLink }

useScrollReveal(sectionRef, '.project-card', { y: 30, stagger: 0.08 })

const statusConfig = {
  live: {
    label: 'Live',
    bg: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.3)',
    color: '#22c55e',
    dot: true,
  },
  'open-source': {
    label: 'Open Source',
    bg: 'rgba(0,210,255,0.08)',
    border: 'rgba(0,210,255,0.2)',
    color: '#00d2ff',
    dot: false,
  },
  wip: {
    label: 'In Progress',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    color: '#f59e0b',
    dot: false,
  },
}

function toggleExpand(id) {
  const next = new Set(expandedCards.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedCards.value = next
}

function matchProject(project) {
  if (!activeFilter.value) return true
  if (activeFilterType.value === 'stack') {
    return project.stack && project.stack.includes(activeFilter.value)
  }
  if (activeFilterType.value === 'tag') {
    return project.tags && project.tags.includes(activeFilter.value)
  }
  return true
}
</script>

<template>
  <section id="projects" ref="sectionRef" class="relative z-10 py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="mb-2">
        <div class="section-header">
          <Rocket :size="22" class="text-accent" />
          <WordReveal :text="t('projects.title')" />
        </div>
        <div class="section-underline ml-8" />
      </div>
      <p class="text-text-secondary text-sm mb-10 ml-8">{{ t('projects.subtitle') }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          class="project-card transition-all duration-300"
          :class="[
            project.id === 'serena' ? 'md:col-span-2' : '',
            isFiltering && !matchProject(project) ? 'dimmed' : ''
          ]"
          style="visibility: hidden;"
        >
          <div class="card h-full flex flex-col">
            <!-- Top row: status + year -->
            <div class="flex items-center justify-between mb-3">
              <span
                class="inline-flex items-center gap-1.5 text-[0.68rem] font-mono px-2.5 py-1 rounded-full"
                :style="{
                  background: statusConfig[project.status].bg,
                  border: `1px solid ${statusConfig[project.status].border}`,
                  color: statusConfig[project.status].color,
                }"
              >
                <span
                  v-if="statusConfig[project.status].dot"
                  class="w-1.5 h-1.5 rounded-full animate-pulse"
                  :style="{ background: statusConfig[project.status].color }"
                />
                {{ statusConfig[project.status].label }}
              </span>
              <span class="font-mono text-[0.68rem]" class="text-text-muted">{{ project.year }}</span>
            </div>

            <!-- Featured label for Serena -->
            <span
              v-if="project.id === 'serena'"
              class="text-[0.6rem] uppercase tracking-[0.12em] mb-1"
              style="color: #444; font-family: Inter, sans-serif;"
            >
              {{ t('projects.featured') }}
            </span>

            <!-- Name -->
            <h3 class="text-[1.1rem] font-bold text-text-primary" style="font-family: Inter, sans-serif;">
              {{ project.name }}
            </h3>

            <!-- Role -->
            <p class="text-[0.8rem] mt-0.5" class="text-text-secondary">{{ project.role }}</p>

            <!-- Description -->
            <p
              class="text-[0.85rem] mt-2.5 leading-relaxed"
              :class="project.id === 'serena' || expandedCards.has(project.id) ? '' : 'line-clamp-3'"
              class="text-text-secondary"
            >
              {{ t(`projects.entries.${project.id}.description`) }}
            </p>
            <button
              v-if="project.id !== 'serena' && project.description.length > 120"
              @click="toggleExpand(project.id)"
              class="text-[0.7rem] text-text-muted hover:text-accent transition-colors mt-1 flex items-center gap-1 cursor-pointer"
            >
              <component :is="expandedCards.has(project.id) ? ChevronUp : ChevronDown" :size="12" />
              {{ expandedCards.has(project.id) ? t('projects.showLess') : t('projects.showMore') }}
            </button>

            <!-- Stack pills -->
            <div class="flex flex-wrap gap-1.5 mt-auto pt-3">
              <button
                v-for="s in project.stack.slice(0, 5)"
                :key="s"
                @click.stop="setFilter(s, 'stack')"
                class="pill-stack !text-[0.6rem] !px-1.5 !py-0.5"
                :class="{ active: activeFilter === s && activeFilterType === 'stack' }"
              >
                {{ s }}
              </button>
              <span v-if="project.stack.length > 5" class="text-[0.6rem] text-text-muted self-center">
                +{{ project.stack.length - 5 }}
              </span>
            </div>

            <!-- Footer: tags + link -->
            <div class="flex items-end justify-between mt-3 gap-2">
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="tg in project.tags"
                  :key="tg"
                  @click.stop="setFilter(tg, 'tag')"
                  class="pill-tag !text-[0.6rem] !px-1.5 !py-0.5"
                  :class="{ active: activeFilter === tg && activeFilterType === 'tag' }"
                >
                  {{ tg }}
                </button>
              </div>
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-1 text-accent text-xs shrink-0 hover:gap-2 transition-all cursor-pointer"
              >
                {{ project.linkLabel }}
                <component :is="linkIcons[project.linkIcon] || ExternalLink" :size="13" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
