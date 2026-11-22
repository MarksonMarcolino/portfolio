<script setup>
import { useI18n } from 'vue-i18n'
import TimelineEntry from './TimelineEntry.vue'
import { useFilters } from '../composables/useFilters.js'
import { useTimelineRows } from '../composables/useTimelineRows.js'

const props = defineProps({ entries: { type: Array, required: true } })
const { t } = useI18n()
const { isFiltering, matchesFilter } = useFilters()
const rows = useTimelineRows(() => props.entries)
const lanes = ['engineering', 'research']
</script>

<template>
  <div class="lanes">
    <div class="lane-row lane-head" aria-hidden="true">
      <div class="lane-label">
        <span class="lane-dot" style="background: var(--accent);" />
        {{ t('lanes.engineering') }}
      </div>
      <div />
      <div class="lane-label">
        <span class="lane-dot" style="background: var(--research);" />
        {{ t('lanes.research') }}
      </div>
    </div>

    <div v-for="row in rows" :key="row.year" class="lane-row">
      <div class="lane-axis">
        <span class="lane-year">{{ row.year }}</span>
        <span class="lane-line" />
      </div>
      <div v-for="lane in lanes" :key="lane" class="lane-cell" :class="`lane-${lane}`">
        <div
          v-for="entry in row[lane]"
          :key="entry.id"
          class="transition-all duration-300 motion-reduce:transition-none"
          :class="{ dimmed: isFiltering && !matchesFilter(entry) }"
        >
          <TimelineEntry :entry="entry" />
        </div>
        <div v-if="!row[lane].length" class="lane-empty" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lanes {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.lane-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 72px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.lane-head {
  display: none;
}

.lane-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
  color: var(--text-secondary);
}

.lane-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
}

.lane-cell {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.lane-engineering {
  grid-column: 1;
  grid-row: 1;
}

.lane-research {
  grid-column: 3;
  grid-row: 1;
}

.lane-axis {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 8px;
}

.lane-year {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.lane-line {
  flex: 1;
  width: 2px;
  background: var(--edge);
  opacity: 0.45;
}

.lane-cell > .dimmed:focus-within {
  opacity: 1;
  filter: none;
  transform: none;
}

.lane-empty {
  min-height: 48px;
  border: 1px dashed var(--border-default);
  border-radius: var(--radius-md);
}

@media (min-width: 900px) {
  .lane-head {
    display: grid;
  }
}

@media (max-width: 899px) {
  .lane-row:not(.lane-head) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lane-axis {
    order: -1;
    align-items: flex-start;
  }

  .lane-line,
  .lane-empty {
    display: none;
  }

  .lane-cell {
    gap: 12px;
  }
}
</style>
