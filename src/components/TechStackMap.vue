<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { stackCategories } from '../data/stack.js'
import { stages } from '../data/stages.js'
import { BookOpen } from 'lucide-vue-next'
import SectionHeader from './SectionHeader.vue'
import StageTag from './StageTag.vue'

const { t } = useI18n()
const sectionRef = ref(null)

useScrollReveal(sectionRef, '.stack-card', { y: 25, stagger: 0.05 })

const groups = computed(() => {
  const all = stackCategories.flatMap((c) => c.items)
  const order = [...stages.map((s) => s.id), null]
  return order
    .map((stage) => {
      const items = all.filter((i) => (i.stage ?? null) === stage)
      return {
        stage,
        items: [
          ...items.filter((i) => i.tier === 'production'),
          ...items.filter((i) => i.tier !== 'production'),
        ],
      }
    })
    .filter((g) => g.items.length)
})
</script>

<template>
  <section id="stack" ref="sectionRef" class="relative z-10 pt-10 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-end justify-between" style="margin-bottom: 40px;">
        <SectionHeader :title="t('stack.title')" :subtitle="t('stack.subtitle')" />
        <div class="hidden sm:flex items-center gap-4" style="font-family: var(--font-sans); font-size: var(--text-xs); color: var(--text-faint);">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background: var(--text-primary);" />
            {{ t('stack.production') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background: var(--border-strong);" />
            {{ t('stack.knowledge') }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5 items-stretch">
        <div
          v-for="g in groups"
          :key="g.stage ?? 'platform'"
          class="stack-card card p-5 h-full"
          style="visibility: hidden;"
        >
          <h3 class="mb-3">
            <StageTag v-if="g.stage" :stage="g.stage" />
            <span v-else class="platform-heading">{{ t('stack.groups.platform') }}</span>
          </h3>
          <div class="flex flex-wrap gap-1.5">
            <template v-for="item in g.items" :key="item.name">
              <span
                v-if="item.tier === 'production'"
                class="chip chip-production inline-block rounded transition-colors duration-200 cursor-default"
              >
                {{ item.name }}
              </span>
              <span
                v-else
                class="chip chip-knowledge inline-flex items-center gap-1 rounded transition-colors duration-200"
              >
                <BookOpen :size="10" />
                {{ item.name }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platform-heading {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.chip {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  padding: 3px 10px;
  cursor: default;
}
.chip-production {
  background: var(--bg-2);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
}
.chip-production:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.chip-knowledge {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-faint);
}
.chip-knowledge:hover {
  color: var(--text-primary);
}
</style>
