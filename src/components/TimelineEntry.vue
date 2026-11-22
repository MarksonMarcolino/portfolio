<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, Calendar, Globe, ExternalLink } from 'lucide-vue-next'
import { useFilters } from '../composables/useFilters.js'

const props = defineProps({ entry: Object })
const { t, te, locale } = useI18n()
const { activeFilter, activeFilterType, setFilter } = useFilters()

const linkIcons = { Globe, ExternalLink }

const description = computed(() => t(`timeline.entries.${props.entry.id}.description`))
const summary = computed(() => {
  const key = `timeline.entries.${props.entry.id}.summary`
  return te(key) ? t(key) : ''
})
const rest = computed(() => description.value.slice(summary.value.length).trim())

function formatDate(d) {
  if (!d) return ''
  if (d === 'Present') return t('common.present')
  const [y, m] = d.split('-')
  if (!m) return y
  return new Intl.DateTimeFormat(locale.value, { month: 'short', year: 'numeric' }).format(new Date(Number(y), Number(m) - 1, 1))
}

const dateRange = computed(() => {
  const { dateStart, dateEnd } = props.entry
  return dateEnd ? `${formatDate(dateStart)} – ${formatDate(dateEnd)}` : formatDate(dateStart)
})

function isActiveStack(s) {
  return activeFilterType.value === 'stack' && activeFilter.value === s
}
</script>

<template>
  <article
    class="card entry"
    :style="{ borderLeft: `4px solid var(${entry.lane === 'research' ? '--research' : '--accent'})` }"
  >
    <p class="entry-lane">{{ t(`lanes.${entry.lane}`) }}</p>
    <h3 class="entry-title">{{ t(`timeline.entries.${entry.id}.title`) }}</h3>

    <div class="entry-meta">
      <span>{{ entry.org }}</span>
      <span v-if="entry.location" class="flex items-center gap-1">
        <MapPin :size="11" />
        {{ entry.location }}
      </span>
      <span class="flex items-center gap-1">
        <Calendar :size="11" />
        <time :datetime="entry.dateStart">{{ formatDate(entry.dateStart) }}</time>
        <template v-if="entry.dateEnd">
          –
          <time :datetime="entry.dateEnd === 'Present' ? undefined : entry.dateEnd">{{ formatDate(entry.dateEnd) }}</time>
        </template>
      </span>
    </div>

    <p v-if="summary" class="entry-body lead">{{ summary }}</p>
    <p v-else-if="description" class="entry-body">{{ description }}</p>

    <details v-if="summary" class="entry-details" :open="entry.dateEnd === 'Present'">
      <summary>
        <span class="entry-toggle" aria-hidden="true" />
        {{ t('timeline.fullDescription') }}
      </summary>
      <p class="entry-body">{{ rest }}</p>
      <template v-if="entry.stack?.length">
        <p class="entry-tools">
          <span style="color: var(--text-primary);">{{ t('timeline.tools') }}</span>
          <template v-for="(s, i) in entry.stack" :key="s">
            <span v-if="i === 0">: </span>
            <span v-else> · </span>
            <button type="button" class="entry-tool" :aria-pressed="isActiveStack(s)" @click.stop="setFilter(s, 'stack')">{{ s }}</button>
          </template>
        </p>
      </template>
    </details>

    <p v-if="!summary && entry.stack?.length" class="entry-tools">
      <span style="color: var(--text-primary);">{{ t('timeline.tools') }}</span>
      <template v-for="(s, i) in entry.stack" :key="s">
        <span v-if="i === 0">: </span>
        <span v-else> · </span>
        <button type="button" class="entry-tool" :aria-pressed="isActiveStack(s)" @click.stop="setFilter(s, 'stack')">{{ s }}</button>
      </template>
    </p>

    <div v-if="entry.tags?.length" class="flex flex-wrap gap-1.5 mt-3">
      <span v-for="tg in entry.tags" :key="tg" class="entry-tag">{{ t(`tags.${tg}`, tg) }}</span>
    </div>

    <a
      v-if="entry.link"
      :href="entry.link"
      target="_blank"
      rel="noopener"
      class="entry-link flex items-center gap-1 self-start mt-3"
    >
      <component :is="linkIcons[entry.linkIcon] || ExternalLink" :size="12" />
      {{ t(`common.${entry.linkLabel}`) }}
    </a>
  </article>
</template>

<style scoped>
.entry {
  padding: 20px;
  min-width: 0;
  overflow-wrap: anywhere;
}

.entry-lane {
  display: none;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.entry-title {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 600;
  line-height: var(--leading-snug);
  color: var(--text-primary);
}

.entry-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
  margin: 8px 0;
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.entry-body {
  margin-top: 8px;
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

.entry-body.lead {
  color: var(--text-primary);
}

.entry-details summary {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  margin-top: 8px;
  cursor: pointer;
  list-style: none;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
}

.entry-details summary::-webkit-details-marker {
  display: none;
}

.entry-toggle {
  position: relative;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
}

.entry-toggle::before,
.entry-toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 1.5px;
  background: currentColor;
  transform: translate(-50%, -50%);
}

.entry-toggle::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.entry-details[open] .entry-toggle::after {
  display: none;
}

.entry-tools {
  margin-top: 12px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.9;
  color: var(--text-secondary);
}

.entry-tool {
  font: inherit;
  color: var(--text-secondary);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.entry-tool:hover,
.entry-tool[aria-pressed='true'] {
  color: var(--accent);
}

.entry-tag {
  border: 1px solid var(--border-default);
  border-radius: 9999px;
  padding: 2px 10px;
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.entry-link {
  color: var(--accent);
  font-size: var(--text-xs);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.entry-link:hover {
  opacity: 0.8;
}

@media (max-width: 899px) {
  .entry-lane {
    display: block;
  }
}

@media (min-width: 900px) {
  .entry-lane {
    display: block;
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
