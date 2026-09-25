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
          :href="project.sourceAction.href"
          :external="project.sourceAction.external"
          :new-tab="project.sourceAction.newTab"
          :show-external-indicator="false"
          :aria-label="`View ${project.repositoryName} on GitHub`"
        >
          <template #leading>
            <svg class="pet-project-card__github-icon" viewBox="0 0 24 24" focusable="false">
              <path
                fill="currentColor"
                d="M12 2C6.477 2 2 6.478 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.683-.217.683-.481 0-.237-.009-1.025-.013-1.86-2.782.604-3.369-1.179-3.369-1.179-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.911.831.091-.646.349-1.087.635-1.337-2.221-.253-4.555-1.111-4.555-4.944 0-1.092.39-1.984 1.029-2.683-.103-.253-.446-1.271.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.756a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.545 1.379.202 2.397.099 2.65.64.699 1.028 1.591 1.028 2.683 0 3.842-2.338 4.688-4.566 4.935.359.309.678.915.678 1.845 0 1.333-.012 2.407-.012 2.735 0 .267.18.578.688.48A10.003 10.003 0 0 0 22 12c0-5.522-4.477-10-10-10Z"
              />
            </svg>
          </template>
          {{ project.sourceAction.label }}
        </UiLink>
      </div>
    </div>
  </UiBox>
</template>

<style scoped src="./PetProjectCard.css"></style>
