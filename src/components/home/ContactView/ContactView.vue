<script setup lang="ts">
import { UiBox, UiLink, UiSection, UiText } from '@/components/shared'

import type { ContactViewProps } from './ContactView'

defineProps<ContactViewProps>()
</script>

<template>
  <UiSection
    id="contact"
    class="contact-view"
    spacing="default"
    width="content"
    surface="default"
    labelledby="contact-title"
  >
    <div class="contact-view__layout">
      <div class="contact-view__invitation">
        <UiText as="p" role="label" tone="accent" weight="medium">
          {{ content.eyebrow }}
        </UiText>
        <UiText id="contact-title" as="h2" role="heading" max-width="none">
          {{ content.title }}
        </UiText>
        <UiText class="contact-view__introduction" tone="muted">
          {{ content.introduction }}
        </UiText>
        <UiText class="contact-view__availability" role="label" tone="positive" weight="medium">
          <span class="contact-view__status" aria-hidden="true"></span>
          {{ content.availability }}
        </UiText>
        <div class="contact-view__actions">
          <UiLink
            v-if="content.primaryAction.kind === 'route'"
            :to="content.primaryAction.to"
            variant="button-primary"
          >
            {{ content.primaryAction.label }}
          </UiLink>
          <UiLink
            v-else
            :href="content.primaryAction.href"
            :external="content.primaryAction.external"
            :new-tab="content.primaryAction.newTab"
            variant="button-primary"
          >
            {{ content.primaryAction.label }}
          </UiLink>
        </div>
        <UiText class="contact-view__expectation" tone="subtle">
          {{ content.expectationNote }}
        </UiText>
      </div>

      <UiBox as="aside" class="contact-view__details" variant="outline" padding="medium">
        <UiText as="h3" role="heading">Contact details</UiText>
        <UiLink
          v-if="content.primaryAction.kind === 'href'"
          class="contact-view__email"
          :href="content.primaryAction.href"
          :external="content.primaryAction.external"
          :new-tab="content.primaryAction.newTab"
          variant="standalone"
        >
          {{ content.email }}
        </UiLink>
        <dl class="contact-view__facts">
          <template v-for="fact in content.facts" :key="fact.label">
            <UiText as="dt" role="label" tone="subtle">{{ fact.label }}</UiText>
            <UiText as="dd" role="data" weight="medium">{{ fact.value }}</UiText>
          </template>
        </dl>
        <UiText as="h3" role="heading">Professional profiles</UiText>
        <ul class="contact-view__profiles">
          <li v-for="action in content.profileActions" :key="action.label">
            <UiLink v-if="action.kind === 'route'" :to="action.to" variant="standalone">
              {{ action.label }}
            </UiLink>
            <UiLink
              v-else
              :href="action.href"
              :external="action.external"
              :new-tab="action.newTab"
              variant="standalone"
            >
              {{ action.label }}
            </UiLink>
          </li>
        </ul>
      </UiBox>
    </div>
  </UiSection>
</template>

<style scoped src="./ContactView.css"></style>
