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
    <div class="pet-project-card__content">
      <UiText :id="titleId" as="h3" role="heading" max-width="none">
        <UiLink
          class="pet-project-card__title-link"
          :href="project.githubAction.href"
          :external="project.githubAction.external"
          :new-tab="project.githubAction.newTab"
          :show-external-indicator="false"
          :aria-label="`View ${project.title} on GitHub`"
        >
          {{ project.title }}
        </UiLink>
      </UiText>
      <UiText class="pet-project-card__summary" tone="muted">{{ project.summary }}</UiText>
      <ul class="pet-project-card__metadata" aria-label="Project metadata">
        <li v-for="item in project.metadata" :key="item">{{ item }}</li>
      </ul>
    </div>
  </UiBox>
</template>

<style scoped src="./PetProjectCard.css"></style>
