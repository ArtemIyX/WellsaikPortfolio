import { onMounted, ref } from 'vue'

export type ThemePreference = 'light' | 'dark'

export const useTheme = () => {
  const theme = ref<ThemePreference>('light')

  const setTheme = (preference: ThemePreference): void => {
    const root = document.documentElement
    theme.value = preference
    root.dataset.theme = preference
    localStorage.setItem('theme', preference)
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    const initialTheme: ThemePreference = savedTheme === 'dark' ? 'dark' : 'light'
    theme.value = initialTheme
    document.documentElement.dataset.theme = initialTheme
    localStorage.setItem('theme', initialTheme)
  })

  return { theme, setTheme }
}
