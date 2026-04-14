<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { timeline } from '../data/timeline.js'
import { publications } from '../data/publications.js'
import { stackCategories } from '../data/stack.js'

const { t } = useI18n()

const parseDate = (d) => {
  if (!d || d === 'Present') return '9999-12'
  if (d.length === 4) return `${d}-01`
  return d
}

const workEntries = computed(() =>
  timeline
    .filter(e => e.type === 'work')
    .sort((a, b) => {
      const sortDate = (entry) => entry.dateEnd ? parseDate(entry.dateEnd) : parseDate(entry.dateStart)
      return sortDate(b).localeCompare(sortDate(a))
    })
)

const educationEntries = computed(() =>
  timeline
    .filter(e => e.type === 'education')
    .sort((a, b) => parseDate(b.dateStart).localeCompare(parseDate(a.dateStart)))
)

const productionStack = computed(() =>
  stackCategories.filter(cat =>
    cat.items.some(i => i.tier === 'production')
  )
)

function formatDate(d) {
  if (!d) return ''
  if (d === 'Present') return t('cv.present')
  const [y, m] = d.split('-')
  if (!m) return y
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m) - 1]} ${y}`
}
</script>

<template>
  <div id="cv-template" style="position: absolute; left: -9999px; top: 0; width: 680px; font-family: Inter, sans-serif; font-size: 13px; color: #1a1a1a; background: #fff; padding: 40px 44px; line-height: 1.6; box-sizing: border-box; word-wrap: break-word; overflow-wrap: break-word;">

    <!-- HEADER -->
    <div style="margin-bottom: 28px;">
      <h1 style="font-size: 26px; font-weight: 700; margin: 0 0 4px; color: #1a1a1a;">
        Markson Rebelo Marcolino
      </h1>
      <p style="color: #666; margin: 0 0 8px; font-size: 14px;">
        {{ t('cv.title') }} · {{ t('cv.location') }}
      </p>
      <div style="font-size: 11px; color: #666; display: flex; gap: 20px; flex-wrap: wrap;">
        <span>markson.marcolino@gmail.com</span>
        <span>linkedin.com/in/marksonmarcolino</span>
        <span>github.com/MarksonMarcolino</span>
      </div>
    </div>

    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0 0 24px;" />

    <!-- SUMMARY -->
    <section style="margin-bottom: 24px;">
      <h2 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin: 0 0 12px;">
        {{ t('cv.summary_label') }}
      </h2>
      <p style="margin: 0; color: #333; font-size: 12px; line-height: 1.7;">
        {{ t('cv.summary') }}
      </p>
    </section>

    <!-- EXPERIENCE -->
    <section style="margin-bottom: 24px;">
      <h2 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin: 0 0 12px;">
        {{ t('cv.experience') }}
      </h2>
      <div v-for="entry in workEntries" :key="entry.id" style="margin-bottom: 14px; page-break-inside: avoid;">
        <div style="display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: baseline;">
          <span style="font-weight: 600; font-size: 13px; color: #1a1a1a;">
            {{ t(`timeline.entries.${entry.id}.title`) }}
          </span>
          <span style="font-size: 10px; color: #888; white-space: nowrap;">
            {{ formatDate(entry.dateStart) }} – {{ entry.dateEnd ? formatDate(entry.dateEnd) : t('cv.present') }}
          </span>
        </div>
        <div style="color: #555; font-size: 11px; margin-bottom: 3px;">
          {{ entry.org }}
          <span v-if="entry.location"> · {{ entry.location }}</span>
        </div>
        <div v-if="t(`timeline.entries.${entry.id}.description`)" style="color: #444; font-size: 11px; line-height: 1.6;">
          {{ t(`timeline.entries.${entry.id}.description`) }}
        </div>
        <div v-if="entry.stack.length" style="color: #555; font-size: 10px; margin-top: 4px;">
          {{ entry.stack.slice(0, 6).join(' · ') }}
        </div>
      </div>
    </section>

    <!-- EDUCATION -->
    <section style="margin-bottom: 24px;">
      <h2 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin: 0 0 12px;">
        {{ t('cv.education') }}
      </h2>
      <div v-for="entry in educationEntries" :key="entry.id" style="margin-bottom: 10px; page-break-inside: avoid;">
        <div style="display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: baseline;">
          <span style="font-weight: 600; font-size: 12px; color: #1a1a1a;">
            {{ t(`timeline.entries.${entry.id}.title`) }}
          </span>
          <span style="font-size: 10px; color: #888; white-space: nowrap;">
            {{ formatDate(entry.dateStart) }} – {{ formatDate(entry.dateEnd) }}
          </span>
        </div>
        <div style="color: #555; font-size: 11px;">
          {{ entry.org }}
        </div>
        <div v-if="t(`timeline.entries.${entry.id}.description`)" style="color: #666; font-size: 11px; margin-top: 2px; font-style: italic;">
          {{ t(`timeline.entries.${entry.id}.description`) }}
        </div>
      </div>
    </section>

    <!-- PUBLICATIONS -->
    <section style="margin-bottom: 24px;">
      <h2 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin: 0 0 12px;">
        {{ t('cv.publications') }}
      </h2>
      <div v-for="pub in publications" :key="pub.id" style="margin-bottom: 10px; page-break-inside: avoid;">
        <div style="font-weight: 600; font-size: 11px; color: #1a1a1a; line-height: 1.5;">
          {{ t(`publications.entries.${pub.id}.title`) }}
        </div>
        <div style="color: #555; font-size: 10px;">
          {{ pub.venue }} · {{ pub.year }} ·
          {{ pub.role === 'lead' ? t('cv.lead_author') : t('cv.co_author') }}
          <span v-if="pub.inPress" style="color: #888;"> · {{ t('cv.in_press') }}</span>
        </div>
      </div>
    </section>

    <!-- SKILLS -->
    <section>
      <h2 style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin: 0 0 12px;">
        {{ t('cv.skills') }}
      </h2>
      <div v-for="cat in productionStack" :key="cat.category" style="margin-bottom: 6px; font-size: 11px; line-height: 1.6;">
        <span style="font-weight: 600; color: #333;">{{ cat.category }}:&nbsp;</span>
        <span style="color: #555;">
          {{ cat.items.filter(i => i.tier === 'production').map(i => i.name).join(', ') }}
        </span>
      </div>
    </section>

  </div>
</template>
