import { ref } from 'vue'

const theme = ref(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('theme', theme.value)
}

export function useTheme() {
  return { theme, toggle }
}
