<script setup lang="ts">
import { ref } from 'vue'

import { UiLink, UiSection, UiText } from '@/components/shared'
import type { ContactViewProps } from './ContactView'

const props = defineProps<ContactViewProps>()
const copyMessage = ref('')

const copyEmail = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(props.content.email)
    copyMessage.value = 'Email copied to clipboard.'
  } catch {
    copyMessage.value = 'Copy failed. Use the email link to contact me.'
  }
}
</script>

<template>
  <UiSection id="contact" class="contact-view" spacing="default" width="content" surface="muted" labelledby="contact-title">
    <div class="contact-view__layout">
      <div>
        <UiText as="p" role="label" tone="accent" weight="medium">{{ content.eyebrow }}</UiText>
        <UiText id="contact-title" as="h2" role="heading" max-width="none">{{ content.title }}</UiText>
        <UiText class="contact-view__introduction" tone="muted">{{ content.introduction }}</UiText>
        <p class="contact-view__availability">{{ content.availability }}</p>
        <p class="contact-view__response" tone="subtle">{{ content.responseNote }}</p>
      </div>
      <div class="contact-view__actions">
        <div class="contact-view__email-row">
          <UiLink :href="`mailto:${content.email}`" variant="button-primary">{{ content.email }}</UiLink>
          <button type="button" class="contact-view__copy" @click="copyEmail">Copy email</button>
        </div>
        <p class="contact-view__copy-message" aria-live="polite">{{ copyMessage }}</p>
        <nav aria-label="Professional profiles">
          <ul>
            <li v-for="action in content.actions" :key="action.label">
              <UiLink :href="action.href" :external="action.external" :new-tab="action.newTab" variant="standalone">
                {{ action.label }}
              </UiLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </UiSection>
</template>

<style scoped src="./ContactView.css"></style>
