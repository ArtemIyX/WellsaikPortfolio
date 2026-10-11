import { onMounted, ref, type Ref } from 'vue'

import { cookieNames, readCookie, writeCookie } from './cookies'

export type ThemePreference = 'light' | 'dark'

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready?: Promise<void> }
}

export const useTheme = (hasCookieConsent?: Readonly<Ref<boolean>>) => {
  const theme = ref<ThemePreference>('light')

  const applyTheme = (preference: ThemePreference): void => {
    theme.value = preference
    document.documentElement.dataset.theme = preference
  }

  const canPersistTheme = (): boolean => hasCookieConsent?.value === true

  const setTheme = (preference: ThemePreference): void => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const viewTransitionDocument = document as ViewTransitionDocument

    if (typeof viewTransitionDocument.startViewTransition === 'function' && !reducedMotion) {
      try {
        viewTransitionDocument.startViewTransition(() => applyTheme(preference))
      } catch {
        applyTheme(preference)
      }
    } else {
      applyTheme(preference)
    }
    if (canPersistTheme()) writeCookie(cookieNames.theme, preference)
  }

  onMounted(() => {
    const savedTheme = canPersistTheme() ? readCookie(cookieNames.theme) : undefined
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light')
  })

  return { theme, setTheme }
}
