<script setup lang="ts">
import { UiBox, UiLink, UiText } from '@/components/shared'

import type { PetProjectCardProps } from './PetProjectCard'

const props = defineProps<PetProjectCardProps>()
const titleId = `pet-project-card-title-${props.project.id}`
</script>

<template>
  <UiBox
    as="article"
    class="pet-project-card"
    variant="outline"
    padding="none"
    radius="small"
    :aria-labelledby="titleId"
  >
    <div class="pet-project-card__rail" aria-hidden="true">{{ project.number }}</div>
    <div class="pet-project-card__content">
      <UiText as="p" role="label" tone="accent" weight="medium">{{ project.kind }}</UiText>
      <UiText :id="titleId" as="h3" role="heading" max-width="none">{{ project.title }}</UiText>
      <UiText class="pet-project-card__repository" as="p" role="label" tone="subtle">
        {{ project.repositoryName }}
      </UiText>
      <UiText class="pet-project-card__summary" tone="muted">{{ project.summary }}</UiText>
      <ul class="pet-project-card__metadata" aria-label="Project metadata">
        <li v-for="item in project.metadata" :key="item">{{ item }}</li>
      </ul>
      <div class="pet-project-card__actions" aria-label="Project actions">
        <UiLink
          v-if="project.sourceAction.kind === 'route'"
          :to="project.sourceAction.to"
          :aria-label="`View ${project.repositoryName} source`"
        >
          {{ project.sourceAction.label }}
        </UiLink>
        <UiLink
          v-else
          :href="project.sourceAction.href"
          :external="project.sourceAction.external"
          :new-tab="project.sourceAction.newTab"
          :aria-label="`View ${project.repositoryName} source on GitHub`"
        >
          {{ project.sourceAction.label }}
        </UiLink>
        <template v-if="project.documentationAction">
          <UiLink
            v-if="project.documentationAction.kind === 'route'"
            :to="project.documentationAction.to"
            :aria-label="`Read ${project.repositoryName} documentation`"
          >
            {{ project.documentationAction.label }}
          </UiLink>
          <UiLink
            v-else
            :href="project.documentationAction.href"
            :external="project.documentationAction.external"
            :new-tab="project.documentationAction.newTab"
            :aria-label="`Read ${project.repositoryName} documentation`"
          >
            {{ project.documentationAction.label }}
          </UiLink>
        </template>
      </div>
    </div>
  </UiBox>
</template>

<style scoped src="./PetProjectCard.css"></style>
