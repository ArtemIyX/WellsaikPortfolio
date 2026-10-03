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
    depth-aware
    padding="medium"
    radius="medium"
    :aria-labelledby="titleId"
  >
    <div class="experience-card__header">
      <div class="experience-card__identity">
        <UiText
          :id="titleId"
          as="h4"
          class="experience-card__role"
          role="body"
          max-width="none"
          weight="medium"
        >
          {{ entry.role }}
        </UiText>
        <UiText as="p" class="experience-card__context" role="body" tone="muted" max-width="none">
          <UiLink
            v-if="entry.organizationUrl"
            :href="entry.organizationUrl"
            :new-tab="true"
            :show-external-indicator="false"
          >
            {{ entry.organization }}
          </UiLink>
          <template v-else>{{ entry.organization }}</template>
          <template v-if="entry.location">
            <span aria-hidden="true"> · </span>{{ entry.location }}
          </template>
          <template v-if="entry.engagement">
            <span aria-hidden="true"> · </span>{{ entry.engagement }}
          </template>
        </UiText>
      </div>
      <div class="experience-card__chronology">
        <UiText as="p" class="experience-card__period" role="data" tone="subtle" max-width="none">
          {{ entry.period.label }}
        </UiText>
        <UiText
          v-if="entry.status === 'current'"
          as="p"
          class="experience-card__status"
          role="label"
          tone="accent"
          weight="medium"
          max-width="none"
        >
          Current
        </UiText>
      </div>
    </div>
    <div class="experience-card__content">
      <UiText class="experience-card__summary" tone="muted">{{ entry.summary }}</UiText>
      <dl v-if="entry.evidence?.length" class="experience-card__evidence">
        <div v-for="item in entry.evidence" :key="item.label">
          <dt>{{ item.label }}</dt>
          <dd>{{ item.value }}</dd>
        </div>
      </dl>
      <div class="experience-card__impact">
        <UiText :id="`${titleId}-achievements`" as="p" role="label" tone="subtle" weight="medium">
          Selected impact
        </UiText>
        <ul :aria-labelledby="`${titleId}-achievements`">
          <li v-for="achievement in entry.achievements" :key="achievement">{{ achievement }}</li>
        </ul>
      </div>
      <UiText as="p" class="experience-card__stack" role="label" tone="muted" max-width="none">
        <span>Core stack:</span> {{ entry.technologies.join(' · ') }}
      </UiText>
      <UiLink v-if="entry.applicationUrl" :href="entry.applicationUrl" :new-tab="true">
        {{ entry.applicationLabel ?? 'View product' }}
      </UiLink>
    </div>
  </UiBox>
</template>

<style scoped src="./ExperienceCard.css"></style>
