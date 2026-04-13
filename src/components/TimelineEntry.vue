<script setup>
import { useI18n } from 'vue-i18n'
import { MapPin, Calendar, Globe, ExternalLink } from 'lucide-vue-next'
import { useFilters } from '../composables/useFilters.js'

defineProps({ entry: Object })
const { t } = useI18n()
const { activeFilter, activeFilterType, setFilter } = useFilters()

const typeLabels = { work: 'Work', project: 'Project', education: 'Education', certification: 'Certification' }
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
  <div
    class="flex flex-col rounded-xl p-5 transition-all duration-200 overflow-hidden"
    style="background: #111; border: 1px solid rgba(255,255,255,0.08); min-height: 320px; height: auto;"
    @mouseenter="(e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)' }"
    @mouseleave="(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 style="font-family: Inter, sans-serif; font-size: 0.95rem; font-weight: 600; color: #f0f0f0; line-height: 1.3; margin-bottom: 4px; white-space: normal; overflow: visible; display: block; width: 100%; word-break: break-word;">
        {{ t(`timeline.entries.${entry.id}.title`) }}
      </h3>
      <span
        class="shrink-0"
        style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #888; font-family: Inter, sans-serif; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 4px; padding: 2px 8px;"
      >
        {{ t(`timeline.types.${entry.type}`) }}
      </span>
    </div>

    <!-- Org + Location + Date -->
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2" style="font-size: 0.75rem; color: #888;">
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
    <p
      v-if="t(`timeline.entries.${entry.id}.description`)"
      class="mb-3 line-clamp-4"
      style="font-family: Inter, sans-serif; font-size: 0.8rem; color: #888; line-height: 1.6;"
    >
      {{ t(`timeline.entries.${entry.id}.description`) }}
    </p>

    <!-- Stack pills -->
    <div v-if="entry.stack?.length" class="flex flex-wrap gap-1 mb-2">
      <span
        v-for="s in entry.stack"
        :key="s"
        class="inline-block cursor-pointer transition-colors duration-200"
        style="background: rgba(240,240,240,0.06); border: 1px solid rgba(240,240,240,0.15); color: #f0f0f0; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; padding: 2px 8px; border-radius: 4px;"
        @click.stop="setFilter(s, 'stack')"
        @mouseenter="(e) => { e.target.style.borderColor = 'rgba(0,210,255,0.5)'; e.target.style.color = '#00d2ff' }"
        @mouseleave="(e) => { e.target.style.borderColor = 'rgba(240,240,240,0.15)'; e.target.style.color = '#f0f0f0' }"
      >
        {{ s }}
      </span>
    </div>

    <!-- Tags -->
    <div v-if="entry.tags?.length" class="flex flex-wrap gap-1 mt-auto mb-3">
      <span
        v-for="tg in entry.tags"
        :key="tg"
        class="inline-block"
        style="background: transparent; border: 1px solid rgba(255,255,255,0.08); color: #888; font-family: Inter, sans-serif; font-size: 0.65rem; padding: 2px 8px; border-radius: 4px;"
      >
        {{ t(`tags.${tg}`, tg) }}
      </span>
    </div>

    <!-- Link -->
    <a
      v-if="entry.link"
      :href="entry.link"
      target="_blank"
      rel="noopener"
      class="flex items-center gap-1 self-start transition-colors duration-200 cursor-pointer"
      style="color: #00d2ff; font-size: 0.75rem; text-decoration: none;"
      @mouseenter="(e) => e.currentTarget.style.color = '#33dcff'"
      @mouseleave="(e) => e.currentTarget.style.color = '#00d2ff'"
    >
      <component :is="linkIcons[entry.linkIcon] || ExternalLink" :size="12" />
      {{ t(`common.${entry.linkLabel}`) }}
    </a>
  </div>
</template>
