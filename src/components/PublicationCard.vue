<script setup>
import { useI18n } from 'vue-i18n'
import { Clock, ArrowRight } from 'lucide-vue-next'

defineProps({ pub: Object })
const { t } = useI18n()
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-12 transition-all duration-200"
    style="padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06);"
  >
    <!-- Left side -->
    <div class="flex-1 min-w-0">
      <!-- Badges -->
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span
          v-if="pub.role === 'lead'"
          style="background: #f0f0f0; color: #0a0a0a; font-family: Inter, sans-serif; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 4px; padding: 2px 8px;"
        >
          {{ t('publications.leadAuthor') }}
        </span>
        <span
          v-else
          style="background: transparent; border: 1px solid rgba(255,255,255,0.15); color: #888; font-family: Inter, sans-serif; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 4px; padding: 3px 10px;"
        >
          {{ t('publications.coAuthor') }}
        </span>

        <span
          v-if="pub.inPress"
          class="inline-flex items-center gap-1"
          style="background: transparent; border: 1px solid rgba(0,210,255,0.3); color: #00d2ff; font-family: Inter, sans-serif; font-size: 0.65rem; border-radius: 4px; padding: 3px 10px;"
        >
          <Clock :size="11" />
          {{ t('publications.inPress') }}
        </span>
      </div>

      <!-- Title -->
      <h3 style="font-family: Inter, sans-serif; font-size: 1rem; font-weight: 600; color: #f0f0f0; margin-bottom: 4px;">
        {{ t(`publications.entries.${pub.id}.title`) }}
      </h3>

      <!-- Venue + year -->
      <p style="font-family: Inter, sans-serif; font-size: 0.75rem; color: #666; margin-bottom: 8px;">
        {{ pub.venue }} &middot; {{ pub.year }}
      </p>

      <!-- Description -->
      <p style="font-family: Inter, sans-serif; font-size: 0.85rem; color: #888; line-height: 1.6; margin-bottom: 10px;">
        {{ t(`publications.entries.${pub.id}.description`) }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in pub.tags"
          :key="tag"
          class="inline-block"
          style="background: transparent; border: 1px solid rgba(255,255,255,0.08); color: #888; font-family: Inter, sans-serif; font-size: 0.65rem; padding: 2px 8px; border-radius: 4px;"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Right side -->
    <a
      :href="pub.url"
      target="_blank"
      rel="noopener"
      class="pub-link flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer whitespace-nowrap"
      style="color: #00d2ff; font-family: Inter, sans-serif; font-size: 0.85rem; text-decoration: none;"
    >
      {{ t('publications.readPaper') }}
      <ArrowRight :size="14" class="pub-arrow" />
    </a>
  </div>
</template>

<style scoped>
.pub-link:hover {
  color: #33dcff;
}
.pub-arrow {
  transition: transform 0.2s ease;
}
.pub-link:hover .pub-arrow {
  transform: translateX(3px);
}
</style>
