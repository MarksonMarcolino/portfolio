import { computed, toValue } from 'vue'

export function useTimelineRows(entries) {
  return computed(() => {
    const byYear = new Map()
    for (const entry of toValue(entries)) {
      const year = entry.dateStart.slice(0, 4)
      if (!byYear.has(year)) byYear.set(year, { year, engineering: [], research: [] })
      byYear.get(year)[entry.lane].push(entry)
    }
    const newestFirst = (a, b) => b.dateStart.localeCompare(a.dateStart)
    return [...byYear.values()]
      .sort((a, b) => b.year.localeCompare(a.year))
      .map((row) => ({
        ...row,
        engineering: row.engineering.sort(newestFirst),
        research: row.research.sort(newestFirst),
      }))
  })
}
