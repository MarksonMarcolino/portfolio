<script setup>
import { useI18n } from 'vue-i18n'
import {
  Briefcase, Code2, GraduationCap, Award,
  MapPin, Calendar, Globe, ExternalLink
} from 'lucide-vue-next'
import { useFilters } from '../composables/useFilters.js'

defineProps({ entry: Object })
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
  <div class="card h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-start justify-between gap-2 mb-2">
      <div class="flex items-center gap-2 min-w-0">
        <component :is="typeConfig[entry.type]?.icon" :size="16" class="text-accent shrink-0" />
        <h3 class="font-mono text-sm font-semibold text-text-primary truncate">
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

    <!-- Org + Location + Date -->
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

    <!-- Description -->
    <p v-if="t(`timeline.entries.${entry.id}.description`)" class="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-4">
      {{ t(`timeline.entries.${entry.id}.description`) }}
    </p>

    <!-- Stack pills -->
    <div v-if="entry.stack?.length" class="flex flex-wrap gap-1 mb-2">
      <button
        v-for="s in entry.stack"
        :key="s"
        @click.stop="setFilter(s, 'stack')"
        class="pill-stack !text-[0.6rem] !px-1.5 !py-0.5"
        :class="{ active: activeFilter === s && activeFilterType === 'stack' }"
      >
        {{ s }}
      </button>
    </div>

    <!-- Tags -->
    <div v-if="entry.tags?.length" class="flex flex-wrap gap-1 mt-auto mb-3">
      <button
        v-for="tg in entry.tags"
        :key="tg"
        @click.stop="setFilter(tg, 'tag')"
        class="pill-tag !text-[0.6rem] !px-1.5 !py-0.5"
        :class="{ active: activeFilter === tg && activeFilterType === 'tag' }"
      >
        {{ tg }}
      </button>
    </div>

    <!-- Link -->
    <a
      v-if="entry.link"
      :href="entry.link"
      target="_blank"
      rel="noopener"
      class="relative inline-flex items-center gap-1.5 rounded-md p-[1px] transition-all hover:scale-[1.02] cursor-pointer text-xs self-start"
      style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);"
    >
      <span class="flex items-center gap-1.5 bg-surface px-2.5 py-1 rounded-[5px] text-text-primary">
        <component :is="linkIcons[entry.linkIcon] || ExternalLink" :size="11" />
        {{ entry.linkLabel }}
      </span>
    </a>
  </div>
</template>
