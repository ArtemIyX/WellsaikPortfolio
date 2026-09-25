<script setup lang="ts">
import { UiBox, UiButton, UiText } from '@/components/shared'

const emit = defineEmits<{ accept: []; reject: [] }>()

const acceptCookies = (): void => emit('accept')
const rejectCookies = (): void => emit('reject')
</script>

<template>
  <UiBox
    as="aside"
    class="cookie-consent-banner"
    variant="surface"
    padding="medium"
    radius="medium"
    role="dialog"
    aria-labelledby="cookie-consent-title"
    aria-describedby="cookie-consent-description"
  >
    <UiText id="cookie-consent-title" as="h2" role="heading">Cookie preferences</UiText>
    <UiText id="cookie-consent-description" tone="muted">
      This site can use a preference cookie to remember your light or dark theme. Accept to enable
      it, or reject to continue without non-essential cookies.
    </UiText>
    <div class="cookie-consent-banner__actions">
      <UiButton class="cookie-consent-banner__accept" variant="secondary" @click="acceptCookies">
        Accept cookies
      </UiButton>
      <UiButton class="cookie-consent-banner__reject" variant="secondary" @click="rejectCookies">
        Reject cookies
      </UiButton>
    </div>
  </UiBox>
</template>

<style scoped src="./CookieConsentBanner.css"></style>
