<script setup lang="ts">
import { UiSection, UiText } from '@/components/shared'

import ProjectCard from '../ProjectCard/ProjectCard.vue'
import type { FeaturedProjectsViewProps } from './FeaturedProjectsView'

defineProps<FeaturedProjectsViewProps>()
</script>

<template>
  <UiSection
    id="projects"
    class="featured-projects-view"
    spacing="default"
    width="content"
    labelledby="projects-title"
  >
    <template v-if="content.eyebrow" #eyebrow>
      <UiText as="p" role="label" tone="accent" weight="medium">{{ content.eyebrow }}</UiText>
    </template>
    <template #title>
      <UiText id="projects-title" as="h2" role="heading" max-width="none">
        {{ content.title }}
      </UiText>
    </template>
    <template #intro>
      <UiText>{{ content.introduction }}</UiText>
    </template>

    <ol class="featured-projects-view__list">
      <li v-for="(project, index) in content.projects" :key="project.id">
        <ProjectCard :project="project" :media-side="index % 2 === 0 ? 'start' : 'end'" />
      </li>
    </ol>
  </UiSection>
</template>

<style scoped src="./FeaturedProjectsView.css"></style>
