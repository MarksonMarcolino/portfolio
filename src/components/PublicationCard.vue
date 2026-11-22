<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StageTag from './StageTag.vue'

const props = defineProps({ pub: Object })
const { t } = useI18n()
const doi = computed(() => props.pub.url.replace('https://doi.org/', ''))
</script>

<template>
  <div class="pub-entry" style="padding: 20px 0; border-bottom: 1px solid var(--border-subtle);">
    <div class="pub-year" style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-muted);">
      {{ pub.year }}
    </div>

    <div class="min-w-0">
      <h3 style="font-family: var(--font-sans); font-size: 17px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">
        {{ t(`publications.entries.${pub.id}.title`) }}
      </h3>
      <p style="font-family: var(--font-sans); font-size: var(--text-xs); color: var(--text-muted); margin-bottom: 8px;">
        {{ pub.venue }}
      </p>
      <p style="font-family: var(--font-sans); font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: 10px;">
        {{ t(`publications.entries.${pub.id}.description`) }}
      </p>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in pub.tags"
          :key="tag"
          class="inline-block"
          style="background: transparent; border: 1px solid var(--border-subtle); color: var(--text-secondary); font-family: var(--font-sans); font-size: var(--text-xs); padding: 2px 8px; border-radius: 4px;"
        >
          {{ t(`tags.${tag}`, tag) }}
        </span>
      </div>
    </div>

    <div class="pub-side">
      <StageTag :stage="pub.stage" />
      <span
        v-if="pub.role === 'lead'"
        style="font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; color: var(--text-primary);"
      >
        {{ t('publications.leadAuthor') }}
      </span>
      <span
        v-else
        style="font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; color: var(--text-secondary);"
      >
        {{ t('publications.coAuthor') }}
      </span>
      <a
        :href="pub.url"
        target="_blank"
        rel="noopener"
        class="pub-link"
      >
        {{ doi }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.pub-entry {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) 210px;
  gap: 24px;
  align-items: start;
}
.pub-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}
.pub-link {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-decoration: none;
  word-break: break-all;
}
.pub-link:hover {
  color: var(--text-primary);
}
@media (max-width: 899px) {
  .pub-entry {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
  .pub-side {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 16px;
  }
}
</style>
