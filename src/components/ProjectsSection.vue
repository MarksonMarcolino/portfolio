<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useFilters } from '../composables/useFilters.js'
import { projects } from '../data/projects.js'
import { Globe, ExternalLink } from 'lucide-vue-next'
import SectionHeader from './SectionHeader.vue'

const { t } = useI18n()
const { activeFilter, activeFilterType, setFilter, isFiltering } = useFilters()
const sectionRef = ref(null)
const expandedCards = ref(new Set())
const expandedStacks = ref(new Set())

const linkIcons = { Globe, ExternalLink }

useScrollReveal(sectionRef, '.project-card', { y: 30, stagger: 0.08 })

const statusConfig = {
  live: { labelKey: 'common.live', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', color: 'var(--status-live)', dot: true },
  'open-source': { labelKey: 'common.openSource', bg: 'transparent', border: 'var(--border-default)', color: 'var(--accent)', dot: false },
  wip: { labelKey: 'common.inProgress', bg: 'transparent', border: 'var(--border-default)', color: 'var(--text-secondary)', dot: true, dotColor: 'var(--status-progress)' },
}

function toggleExpand(id) {
  const next = new Set(expandedCards.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedCards.value = next
}

function toggleStack(id) {
  const next = new Set(expandedStacks.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedStacks.value = next
}

function matchProject(project) {
  if (!activeFilter.value) return true
  if (activeFilterType.value === 'stack') return project.stack?.includes(activeFilter.value)
  if (activeFilterType.value === 'tag') return project.tags?.includes(activeFilter.value)
  return true
}
</script>

<template>
  <section id="projects" ref="sectionRef" class="relative z-10 pb-20 px-4" style="padding-top: clamp(80px, 10vw, 120px);">
    <div class="max-w-6xl mx-auto">
      <!-- Title -->
      <SectionHeader :title="t('projects.title')" :subtitle="t('projects.subtitle')" style="margin-bottom: 40px;" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 items-stretch">
        <div
          v-for="project in projects"
          :key="project.id"
          class="project-card transition-all duration-300"
          :class="[
            project.id === 'serena' ? 'md:col-span-2' : '',
            isFiltering && !matchProject(project) ? 'dimmed' : ''
          ]"
          style="visibility: hidden;"
        >
          <div
            class="h-full flex flex-col rounded-xl p-5 transition-all duration-200"
            style="background: var(--bg-1); border: 1px solid var(--border-default);"
            @mouseenter="(e) => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }"
            @mouseleave="(e) => { e.currentTarget.style.background = 'var(--bg-1)'; e.currentTarget.style.borderColor = 'var(--border-default)' }"
          >
            <!-- Featured label (eyebrow, above status) -->
            <span
              v-if="project.id === 'serena'"
              style="font-family: var(--font-sans); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); display: block; margin-bottom: 8px;"
            >
              {{ t('projects.featured') }}
            </span>

            <!-- Top row: status + year -->
            <div class="flex items-center justify-between mb-3">
              <span
                class="inline-flex items-center gap-1.5"
                :style="{
                  background: statusConfig[project.status].bg,
                  border: `1px solid ${statusConfig[project.status].border}`,
                  color: statusConfig[project.status].color,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  borderRadius: '4px',
                  padding: '3px 10px',
                }"
              >
                <span
                  v-if="statusConfig[project.status].dot"
                  class="inline-block w-1.5 h-1.5 rounded-full"
                  :style="{ background: statusConfig[project.status].dotColor || statusConfig[project.status].color }"
                />
                {{ t(statusConfig[project.status].labelKey) }}
              </span>
              <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint);">{{ project.current ? `${project.year} – ${t('common.present')}` : project.year }}</span>
            </div>

            <!-- Name -->
            <h3 :style="{ fontFamily: 'var(--font-mono)', fontSize: project.id === 'serena' ? 'var(--display-sm)' : 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }">
              {{ project.name }}
            </h3>

            <!-- Role -->
            <p style="font-family: var(--font-sans); font-size: var(--text-sm); color: var(--text-secondary); margin-top: 2px;">{{ t(`projects.roles.${project.role}`) }}</p>

            <!-- Description -->
            <p
              class="mt-2.5"
              :class="project.id === 'serena' || expandedCards.has(project.id) ? '' : 'line-clamp-3'"
              style="font-family: var(--font-sans); font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;"
            >
              {{ t(`projects.entries.${project.id}.description`) }}
            </p>
            <button
              v-if="project.id !== 'serena' && project.description.length > 120"
              @click="toggleExpand(project.id)"
              class="read-more-btn"
            >
              {{ expandedCards.has(project.id) ? t('projects.showLess') : t('projects.readMore') }}
            </button>

            <!-- Stack pills -->
            <div class="flex flex-wrap gap-1.5 mt-auto pt-3">
              <span
                v-for="s in (expandedStacks.has(project.id) ? project.stack : project.stack.slice(0, 5))"
                :key="s"
                class="inline-block rounded transition-colors duration-200 cursor-pointer"
                style="background: rgba(240,240,240,0.06); border: 1px solid rgba(240,240,240,0.15); color: var(--text-primary); font-family: var(--font-mono); font-size: var(--text-xs); padding: 3px 10px; border-radius: 4px;"
                @click.stop="setFilter(s, 'stack')"
                @mouseenter="(e) => { e.target.style.borderColor = 'rgba(0,210,255,0.5)'; e.target.style.color = '#00d2ff' }"
                @mouseleave="(e) => { e.target.style.borderColor = 'rgba(240,240,240,0.15)'; e.target.style.color = '#f0f0f0' }"
              >
                {{ s }}
              </span>
              <button
                v-if="project.stack.length > 5"
                @click.stop="toggleStack(project.id)"
                class="inline-block rounded cursor-pointer transition-colors duration-200"
                style="border: 1px solid rgba(255,255,255,0.06); color: var(--text-faint); font-family: var(--font-mono); font-size: var(--text-xs); padding: 3px 10px; border-radius: 4px; background: none;"
                @mouseenter="(e) => { e.target.style.color = '#00d2ff'; e.target.style.borderColor = 'rgba(0,210,255,0.3)' }"
                @mouseleave="(e) => { e.target.style.color = '#444'; e.target.style.borderColor = 'rgba(255,255,255,0.06)' }"
              >
                {{ expandedStacks.has(project.id) ? t('projects.showLess') : t('projects.moreCount', { n: project.stack.length - 5 }) }}
              </button>
            </div>

            <!-- Footer: tags + link -->
            <div class="flex items-end mt-3 gap-2" :class="project.link ? 'justify-between' : 'justify-start'">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tg in project.tags"
                  :key="tg"
                  class="inline-block rounded"
                  style="background: transparent; border: 1px solid rgba(255,255,255,0.08); color: var(--text-secondary); font-family: var(--font-sans); font-size: var(--text-xs); padding: 2px 8px; border-radius: 4px;"
                >
                  {{ t(`tags.${tg}`, tg) }}
                </span>
              </div>
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-1 shrink-0 transition-all duration-200 cursor-pointer"
                style="color: var(--accent); font-size: var(--text-xs);"
                @mouseenter="(e) => e.currentTarget.style.gap = '6px'"
                @mouseleave="(e) => e.currentTarget.style.gap = '4px'"
              >
                {{ t(`common.${project.linkLabel}`) }}
                <component :is="linkIcons[project.linkIcon] || ExternalLink" :size="13" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.read-more-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  display: block;
  transition: color 0.2s ease;
}
.read-more-btn:hover {
  color: #33dcff;
}
</style>
