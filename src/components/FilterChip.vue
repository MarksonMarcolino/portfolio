<script setup>
import { ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { X } from 'lucide-vue-next'
import { useFilters } from '../composables/useFilters.js'

const props = defineProps({ section: { type: String, required: true } })
const { t } = useI18n()
const { activeFilter, clearFilter, isFiltering } = useFilters()
const chip = ref(null)

async function clear() {
  const hadFocus = document.activeElement === chip.value
  clearFilter()
  if (!hadFocus) return
  await nextTick()
  document.querySelector(`#${props.section} h2`)?.focus()
}
</script>

<template>
  <button
    v-if="isFiltering"
    ref="chip"
    type="button"
    aria-pressed="true"
    @click="clear"
    class="flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
    style="font-size: var(--text-xs); color: var(--text-primary); background: var(--bg-2); border: 1px solid var(--border-default); border-radius: 4px; padding: 4px 12px;"
  >
    {{ t('timeline.filtering') }}: {{ activeFilter }}
    <X :size="12" aria-hidden="true" />
  </button>
</template>
