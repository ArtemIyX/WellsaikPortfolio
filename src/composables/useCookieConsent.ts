import { computed, ref } from 'vue'

import { cookieNames, readCookie, removeCookie, writeCookie } from './cookies'

export const useCookieConsent = () => {
  const hasAcceptedCookies = ref(readCookie(cookieNames.consent) === 'accepted')
  const hasDismissedCookieBanner = ref(false)

  if (!hasAcceptedCookies.value) removeCookie(cookieNames.theme)

  const shouldShowCookieBanner = computed(
    () => !hasAcceptedCookies.value && !hasDismissedCookieBanner.value,
  )

  const acceptCookies = (): void => {
    writeCookie(cookieNames.consent, 'accepted')
    hasAcceptedCookies.value = true
  }

  const rejectCookies = (): void => {
    removeCookie(cookieNames.consent)
    removeCookie(cookieNames.theme)
    hasDismissedCookieBanner.value = true
  }

  return { hasAcceptedCookies, shouldShowCookieBanner, acceptCookies, rejectCookies }
}
