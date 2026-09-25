<script setup lang="ts">
import { UiLink, UiSection, UiText } from '@/components/shared'

import PetProjectCard from '../PetProjectCard/PetProjectCard.vue'
import type { PetProjectsViewProps } from './PetProjectsView'

defineProps<PetProjectsViewProps>()
</script>

<template>
  <UiSection
    id="pet-projects"
    class="pet-projects-view"
    spacing="default"
    width="content"
    labelledby="pet-projects-title"
  >
    <template #title>
      <UiText id="pet-projects-title" as="h2" role="heading" max-width="none">
        {{ content.title }}
      </UiText>
    </template>
    <template #intro>
      <UiText>{{ content.introduction }}</UiText>
    </template>

    <ol class="pet-projects-view__list">
      <li v-for="project in content.projects" :key="project.id">
        <PetProjectCard :project="project" />
      </li>
    </ol>

    <div class="pet-projects-view__all-action">
      <UiLink v-if="content.allProjectsAction.kind === 'route'" :to="content.allProjectsAction.to">
        {{ content.allProjectsAction.label }}
      </UiLink>
      <UiLink
        v-else
        :href="content.allProjectsAction.href"
        :external="content.allProjectsAction.external"
        :new-tab="content.allProjectsAction.newTab"
      >
        {{ content.allProjectsAction.label }}
      </UiLink>
    </div>
  </UiSection>
</template>

<style scoped src="./PetProjectsView.css"></style>
