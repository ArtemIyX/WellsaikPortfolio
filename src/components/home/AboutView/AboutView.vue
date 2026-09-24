<script setup lang="ts">
import { UiBox, UiLink, UiSection, UiText } from '@/components/shared'

import type { AboutViewProps } from './AboutView'

defineProps<AboutViewProps>()
</script>

<template>
  <UiSection
    id="about"
    class="about-view"
    spacing="default"
    width="content"
    surface="muted"
    labelledby="about-title"
  >
    <div class="about-view__layout">
      <div class="about-view__story">
        <UiText as="p" role="label" tone="accent" weight="medium">
          {{ content.eyebrow }}
        </UiText>
        <UiText id="about-title" as="h2" role="heading" max-width="none">
          {{ content.title }}
        </UiText>
        <div class="about-view__paragraphs">
          <UiText v-for="(paragraph, index) in content.paragraphs" :key="index" tone="muted">
            {{ paragraph }}
          </UiText>
        </div>
        <UiText class="about-view__personal-note" tone="subtle">
          {{ content.personalNote }}
        </UiText>
        <div class="about-view__actions">
          <UiLink
            v-if="content.contactAction.kind === 'route'"
            :to="content.contactAction.to"
            variant="button-primary"
          >
            {{ content.contactAction.label }}
          </UiLink>
          <UiLink
            v-else
            :href="content.contactAction.href"
            :external="content.contactAction.external"
            :new-tab="content.contactAction.newTab"
            variant="button-primary"
          >
            {{ content.contactAction.label }}
          </UiLink>
        </div>
      </div>

      <UiBox as="aside" class="about-view__details" variant="outline" padding="medium">
        <UiText as="h3" role="heading">Profile summary</UiText>
        <dl class="about-view__facts">
          <template v-for="fact in content.facts" :key="fact.label">
            <UiText as="dt" role="label" tone="subtle">{{ fact.label }}</UiText>
            <UiText as="dd" role="data" weight="medium">{{ fact.value }}</UiText>
          </template>
        </dl>
      </UiBox>
    </div>
  </UiSection>
</template>

<style scoped src="./AboutView.css"></style>
