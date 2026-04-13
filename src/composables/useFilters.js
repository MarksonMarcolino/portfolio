import { ref, computed } from 'vue'
import { timeline } from '../data/timeline.js'
import { publications } from '../data/publications.js'

const activeFilter = ref(null)
const activeFilterType = ref(null) // 'stack' | 'tag'

export function useFilters() {
  function setFilter(value, type) {
    if (activeFilter.value === value && activeFilterType.value === type) {
      activeFilter.value = null
      activeFilterType.value = null
    } else {
      activeFilter.value = value
      activeFilterType.value = type
    }
  }

  function clearFilter() {
    activeFilter.value = null
    activeFilterType.value = null
  }

  function matchesFilter(entry) {
    if (!activeFilter.value) return true
    if (activeFilterType.value === 'stack') {
      return entry.stack && entry.stack.includes(activeFilter.value)
    }
    if (activeFilterType.value === 'tag') {
      return entry.tags && entry.tags.includes(activeFilter.value)
    }
    return true
  }

  const sortedTimeline = [...timeline].sort((a, b) => {
    const parseDate = (d) => {
      if (!d || d === 'Present') return '9999-12'
      if (d.length === 4) return `${d}-01`
      return d
    }
    return parseDate(b.dateStart).localeCompare(parseDate(a.dateStart))
  })

  const filteredTimeline = computed(() => sortedTimeline)
  const filteredPublications = computed(() => publications)

  const isFiltering = computed(() => activeFilter.value !== null)

  return {
    activeFilter,
    activeFilterType,
    setFilter,
    clearFilter,
    matchesFilter,
    filteredTimeline,
    filteredPublications,
    isFiltering,
  }
}
