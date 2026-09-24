import { onMounted, ref } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'

export const useTheme = () => {
  const theme = ref<ThemePreference>('system')

  const setTheme = (preference: ThemePreference): void => {
    const root = document.documentElement
    theme.value = preference

    if (preference === 'system') {
      root.removeAttribute('data-theme')
      localStorage.removeItem('theme')
      return
    }

    root.dataset.theme = preference
    localStorage.setItem('theme', preference)
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') theme.value = savedTheme
  })

  return { theme, setTheme }
}
