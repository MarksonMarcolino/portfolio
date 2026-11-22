import { ref } from 'vue'

const theme = ref(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  try { localStorage.setItem('theme', theme.value) } catch {}
}

export function useTheme() {
  return { theme, toggle }
}
