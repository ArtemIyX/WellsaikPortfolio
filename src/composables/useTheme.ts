import { onMounted, ref } from 'vue'

export type ThemePreference = 'light' | 'dark'

const themeCookieName = 'portfolio-theme'
const themeCookieMaxAgeSeconds = 60 * 60 * 24 * 365

const readThemeCookie = (): ThemePreference | undefined => {
  const value = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${themeCookieName}=`))
    ?.split('=')[1]

  return value === 'light' || value === 'dark' ? value : undefined
}

const writeThemeCookie = (preference: ThemePreference): void => {
  document.cookie = `${themeCookieName}=${preference}; Max-Age=${themeCookieMaxAgeSeconds}; Path=/; SameSite=Lax`
}

export const useTheme = () => {
  const theme = ref<ThemePreference>('light')

  const setTheme = (preference: ThemePreference): void => {
    const root = document.documentElement
    theme.value = preference
    root.dataset.theme = preference
    writeThemeCookie(preference)
  }

  onMounted(() => {
    setTheme(readThemeCookie() ?? 'light')
  })

  return { theme, setTheme }
}
