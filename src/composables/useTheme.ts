import { onMounted, ref, type Ref } from 'vue'

import { cookieNames, readCookie, writeCookie } from './cookies'

export type ThemePreference = 'light' | 'dark'

export const useTheme = (hasCookieConsent?: Readonly<Ref<boolean>>) => {
  const theme = ref<ThemePreference>('light')

  const applyTheme = (preference: ThemePreference): void => {
    theme.value = preference
    document.documentElement.dataset.theme = preference
  }

  const canPersistTheme = (): boolean => hasCookieConsent?.value === true

  const setTheme = (preference: ThemePreference): void => {
    applyTheme(preference)
    if (canPersistTheme()) writeCookie(cookieNames.theme, preference)
  }

  onMounted(() => {
    const savedTheme = canPersistTheme() ? readCookie(cookieNames.theme) : undefined
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light')
  })

  return { theme, setTheme }
}
