<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { stages } from '../data/stages.js'

const props = defineProps({
  stage: { type: String, default: null },
})

const { t } = useI18n()
const info = computed(() => stages.find((s) => s.id === props.stage))
const color = computed(() => (info.value?.side === 'research' ? 'var(--research)' : 'var(--bronze)'))
</script>

<template>
  <span v-if="info" class="stage-tag" :style="{ color }">
    <span class="stage-dot" :style="{ background: color }" aria-hidden="true" />
    {{ info.n }} · {{ t(`stages.${info.id}.label`) }}
  </span>
</template>

<style scoped>
.stage-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
}

.stage-dot {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
}
</style>
