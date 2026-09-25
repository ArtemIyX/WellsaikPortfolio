<script setup lang="ts">
import { UiSection, UiText } from '@/components/shared'

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
  </UiSection>
</template>

<style scoped src="./PetProjectsView.css"></style>
