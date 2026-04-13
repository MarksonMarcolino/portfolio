<script setup>
import { useI18n } from 'vue-i18n'
import { BookOpen, Calendar, Clock, ExternalLink } from 'lucide-vue-next'
import { useFilters } from '../composables/useFilters.js'

defineProps({ pub: Object })
const { t } = useI18n()
const { activeFilter, activeFilterType, setFilter } = useFilters()
</script>

<template>
  <div class="card flex flex-col">
    <div class="flex items-start gap-2 mb-3">
      <BookOpen :size="18" class="text-accent shrink-0 mt-0.5" />
      <h3 class="font-mono text-sm font-semibold text-text-primary leading-snug">
        {{ t(`publications.entries.${pub.id}.title`) }}
      </h3>
    </div>

    <div class="flex flex-wrap items-center gap-2 mb-3">
      <span
        v-if="pub.role === 'lead'"
        class="text-[0.7rem] px-3 py-0.5 rounded-full text-white font-medium"
        style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);"
      >
        {{ t('publications.leadAuthor') }}
      </span>
      <span
        v-else
        class="text-[0.7rem] px-3 py-0.5 rounded-full text-text-secondary"
        style="border: 1px solid rgba(255,255,255,0.15);"
      >
        {{ t('publications.coAuthor') }}
      </span>

      <span
        v-if="pub.inPress"
        class="text-[0.7rem] px-3 py-0.5 rounded-full text-amber flex items-center gap-1"
        style="border: 1px solid rgba(245,158,11,0.4);"
      >
        <Clock :size="12" />
        {{ t('publications.inPress') }}
      </span>
    </div>

    <div class="flex items-center gap-1.5 text-xs text-text-muted mb-3">
      <Calendar :size="12" />
      <span>{{ pub.venue }} &middot; {{ pub.year }}</span>
    </div>

    <p class="text-sm text-text-secondary leading-relaxed mb-3">
      {{ t(`publications.entries.${pub.id}.description`) }}
    </p>

    <div class="mt-auto pt-2">
      <div class="flex flex-wrap gap-1.5 mb-4">
        <button
          v-for="tag in pub.tags"
          :key="tag"
          @click.stop="setFilter(tag, 'tag')"
          class="pill-tag"
          :class="{ active: activeFilter === tag && activeFilterType === 'tag' }"
        >
          {{ tag }}
        </button>
      </div>

      <a
        :href="pub.url"
      target="_blank"
      rel="noopener"
      class="relative inline-flex items-center gap-1.5 rounded-md p-[1px] transition-all hover:scale-[1.02] cursor-pointer text-sm group"
      style="background: linear-gradient(135deg, #00d2ff, #7b2ff7);"
    >
      <span class="flex items-center gap-1.5 bg-surface px-4 py-1.5 rounded-[5px] text-text-primary group-hover:bg-transparent group-hover:text-white transition-all">
        <ExternalLink :size="13" />
        {{ t('publications.readPaper') }}
      </span>
    </a>
    </div>
  </div>
</template>
