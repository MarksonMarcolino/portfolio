<script setup>
import { useI18n } from 'vue-i18n'
import {
  Briefcase, Code2, GraduationCap, Award,
  MapPin, Calendar, Globe, ExternalLink
} from 'lucide-vue-next'
import { useFilters } from '../composables/useFilters.js'

const props = defineProps({ entry: Object, index: Number })
const { t } = useI18n()
const { activeFilter, activeFilterType, setFilter } = useFilters()

const typeConfig = {
  work: { icon: Briefcase, gradient: true },
  project: { icon: Code2, gradient: true },
  education: { icon: GraduationCap, gradient: false },
  certification: { icon: Award, gradient: false },
}

const linkIcons = { Globe, ExternalLink }

function formatDate(start, end) {
  const fmt = (d) => {
    if (!d) return ''
    if (d === 'Present') return t('common.present')
    const [y, m] = d.split('-')
    if (!m) return y
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${months[parseInt(m) - 1]} ${y}`
  }
  if (!end) return fmt(start)
  return `${fmt(start)} – ${fmt(end)}`
}
</script>

<template>
  <div class="relative flex items-start gap-4 lg:gap-0">
    <!-- Timeline dot -->
    <div class="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-2 z-10">
      <div class="relative w-[14px] h-[14px] rounded-full flex items-center justify-center" style="background: #080b12;">
        <div class="absolute inset-0 rounded-full p-[1px]" style="background: linear-gradient(135deg, #00d2ff, #7b2ff7); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;" />
        <component :is="typeConfig[entry.type]?.icon" :size="8" class="text-accent relative z-10" />
      </div>
    </div>

    <!-- Card -->
    <div
      class="ml-7 lg:ml-0 lg:w-[calc(50%-2rem)]"
      :class="index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'"
    >
      <div class="card">
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <component :is="typeConfig[entry.type]?.icon" :size="16" class="text-accent shrink-0" />
            <h3 class="font-mono text-sm font-semibold text-text-primary">
              {{ t(`timeline.entries.${entry.id}.title`) }}
            </h3>
          </div>
          <span
            class="shrink-0 text-[0.65rem] font-mono px-2 py-0.5 rounded-full"
            :class="typeConfig[entry.type]?.gradient ? 'text-white' : 'text-text-secondary'"
            :style="typeConfig[entry.type]?.gradient
              ? 'background: linear-gradient(135deg, #00d2ff, #7b2ff7);'
              : 'border: 1px solid rgba(255,255,255,0.15);'"
          >
            {{ t(`timeline.types.${entry.type}`) }}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary mb-2">
          <span>{{ entry.org }}</span>
          <span v-if="entry.location" class="flex items-center gap-1">
            <MapPin :size="11" />
            {{ entry.location }}
          </span>
          <span class="flex items-center gap-1">
            <Calendar :size="11" />
            {{ formatDate(entry.dateStart, entry.dateEnd) }}
          </span>
        </div>

        <p v-if="t(`timeline.entries.${entry.id}.description`)" class="text-sm text-text-secondary leading-relaxed mb-3">
          {{ t(`timeline.entries.${entry.id}.description`) }}
        </p>

        <div v-if="entry.stack?.length" class="flex flex-wrap gap-1.5 mb-2">
          <button
            v-for="s in entry.stack"
            :key="s"
            @click.stop="setFilter(s, 'stack')"
            class="pill-stack"
            :class="{ active: activeFilter === s && activeFilterType === 'stack' }"
          >
            {{ s }}
          </button>
        </div>

        <div v-if="entry.tags?.length" class="flex flex-wrap gap-1.5 mb-3">
          <button
            v-for="t in entry.tags"
            :key="t"
            @click.stop="setFilter(t, 'tag')"
            class="pill-tag"
            :class="{ active: activeFilter === t && activeFilterType === 'tag' }"
          >
            {{ t }}
          </button>
        </div>

        <a
          v-if="entry.link"
          :href="entry.link"
          target="_blank"
          rel="noopener"
          class="relative inline-flex items-center gap-1.5 rounded-md p-[1px] transition-all hover:scale-[1.02] cursor-pointer text-sm"
          style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);"
        >
          <span class="flex items-center gap-1.5 bg-surface px-3 py-1 rounded-[5px] text-text-primary">
            <component :is="linkIcons[entry.linkIcon] || ExternalLink" :size="13" />
            {{ entry.linkLabel }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
