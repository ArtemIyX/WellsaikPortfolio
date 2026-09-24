import { onMounted, onScopeDispose, ref } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

export const useTheme = () => {
  const theme = ref<ThemePreference>('system')
  const resolvedTheme = ref<ResolvedTheme>('light')
  let mediaQuery: MediaQueryList | undefined

  const readResolvedTheme = (): ResolvedTheme => {
    if (theme.value !== 'system') return theme.value
    return mediaQuery?.matches ? 'dark' : 'light'
  }

  const syncResolvedTheme = (): void => {
    resolvedTheme.value = readResolvedTheme()
  }

  const setTheme = (preference: ThemePreference): void => {
    const root = document.documentElement
    theme.value = preference
    syncResolvedTheme()

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
    if (typeof window.matchMedia === 'function') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', syncResolvedTheme)
    }
    syncResolvedTheme()
  })

  onScopeDispose(() => mediaQuery?.removeEventListener('change', syncResolvedTheme))

  return { theme, resolvedTheme, setTheme }
}
