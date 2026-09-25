<script setup lang="ts">
import { UiBox, UiLink, UiText } from '@/components/shared'

import type { ExperienceCardProps } from './ExperienceCard'

const props = defineProps<ExperienceCardProps>()
const titleId = `experience-card-title-${props.entry.id}`
</script>

<template>
  <UiBox
    as="article"
    class="experience-card"
    variant="surface"
    padding="medium"
    radius="medium"
    :aria-labelledby="titleId"
  >
    <div class="experience-card__meta">
      <UiText as="span" role="label" tone="accent" weight="medium">{{ entry.period.label }}</UiText>
      <UiText as="span" role="label" tone="default" weight="medium">
        <UiLink
          v-if="entry.organizationUrl"
          :href="entry.organizationUrl"
          :new-tab="true"
          :show-external-indicator="false"
        >
          {{ entry.organization }}
        </UiLink>
        <template v-else>{{ entry.organization }}</template>
      </UiText>
      <UiText v-if="entry.location" as="span" role="label" tone="subtle">{{
        entry.location
      }}</UiText>
      <UiText v-if="entry.engagement" as="span" role="label" tone="subtle">{{
        entry.engagement
      }}</UiText>
    </div>
    <div class="experience-card__body">
      <UiText :id="titleId" as="h4" role="heading" max-width="none">{{ entry.role }}</UiText>
      <UiText class="experience-card__summary" tone="muted">{{ entry.summary }}</UiText>
      <UiLink v-if="entry.applicationUrl" :href="entry.applicationUrl" :new-tab="true">
        View application
      </UiLink>
      <div class="experience-card__list-group">
        <UiText
          :id="`${titleId}-achievements`"
          as="span"
          role="label"
          tone="subtle"
          weight="medium"
        >
          Achievements
        </UiText>
        <ul :aria-labelledby="`${titleId}-achievements`">
          <li v-for="achievement in entry.achievements" :key="achievement">{{ achievement }}</li>
        </ul>
      </div>
      <div class="experience-card__list-group">
        <UiText
          :id="`${titleId}-technologies`"
          as="span"
          role="label"
          tone="subtle"
          weight="medium"
        >
          Technologies & practices
        </UiText>
        <ul class="experience-card__technologies" :aria-labelledby="`${titleId}-technologies`">
          <li v-for="technology in entry.technologies" :key="technology">{{ technology }}</li>
        </ul>
      </div>
    </div>
  </UiBox>
</template>

<style scoped src="./ExperienceCard.css"></style>
