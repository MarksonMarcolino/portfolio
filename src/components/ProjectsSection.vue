<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useFilters } from '../composables/useFilters.js'
import { projects } from '../data/projects.js'
import { Globe, ExternalLink } from 'lucide-vue-next'

const { t } = useI18n()
const { activeFilter, activeFilterType, setFilter, isFiltering } = useFilters()
const sectionRef = ref(null)
const expandedCards = ref(new Set())
const expandedStacks = ref(new Set())

const linkIcons = { Globe, ExternalLink }

useScrollReveal(sectionRef, '.project-card', { y: 30, stagger: 0.08 })

const statusConfig = {
  live: { labelKey: 'common.live', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', color: '#22c55e', dot: true },
  'open-source': { labelKey: 'common.openSource', bg: 'rgba(0,210,255,0.06)', border: 'rgba(0,210,255,0.2)', color: '#00d2ff', dot: false },
  wip: { labelKey: 'common.inProgress', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.2)', color: '#f59e0b', dot: false },
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
      <div style="margin-bottom: 40px;">
        <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem); color: #f0f0f0; line-height: 1; font-weight: 400;">
          {{ t('projects.title') }}
        </h2>
        <p style="font-family: Inter, sans-serif; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #888; margin-top: 4px;">
          {{ t('projects.subtitle') }}
        </p>
      </div>

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
            style="background: #111; border: 1px solid rgba(255,255,255,0.08);"
            @mouseenter="(e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }"
            @mouseleave="(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }"
          >
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
                  class="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                  :style="{ background: statusConfig[project.status].color }"
                />
                {{ t(statusConfig[project.status].labelKey) }}
              </span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #444;">{{ project.year }}</span>
            </div>

            <!-- Featured label -->
            <span
              v-if="project.id === 'serena'"
              style="font-family: Inter, sans-serif; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.12em; color: #444; display: block; margin-bottom: 4px;"
            >
              {{ t('projects.featured') }}
            </span>

            <!-- Name -->
            <h3 :style="{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: project.id === 'serena' ? '1.4rem' : '1rem', fontWeight: 700, color: '#f0f0f0' }">
              {{ project.name }}
            </h3>

            <!-- Role -->
            <p style="font-family: Inter, sans-serif; font-size: 0.8rem; color: #888; margin-top: 2px;">{{ t(`projects.roles.${project.role}`) }}</p>

            <!-- Description -->
            <p
              class="mt-2.5"
              :class="project.id === 'serena' || expandedCards.has(project.id) ? '' : 'line-clamp-3'"
              style="font-family: Inter, sans-serif; font-size: 0.85rem; color: #888; line-height: 1.6;"
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
                style="background: rgba(240,240,240,0.06); border: 1px solid rgba(240,240,240,0.15); color: #f0f0f0; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; padding: 3px 10px; border-radius: 4px;"
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
                style="border: 1px solid rgba(255,255,255,0.06); color: #444; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; padding: 3px 10px; border-radius: 4px; background: none;"
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
                  style="background: transparent; border: 1px solid rgba(255,255,255,0.08); color: #888; font-family: Inter, sans-serif; font-size: 0.65rem; padding: 2px 8px; border-radius: 4px;"
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
                style="color: #00d2ff; font-size: 0.75rem;"
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
  color: #00d2ff;
  font-family: Inter, sans-serif;
  font-size: 0.8rem;
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
