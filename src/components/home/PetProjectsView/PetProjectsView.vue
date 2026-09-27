<script setup lang="ts">
import { computed, ref } from 'vue'
import { UiSection, UiText } from '@/components/shared'

import PetProjectCard from '../PetProjectCard/PetProjectCard.vue'
import type { PetProjectsViewProps } from './PetProjectsView'

const props = defineProps<PetProjectsViewProps>()
const activeFilter = ref<'All' | 'Rendering' | 'Networking' | 'Blueprint tooling' | 'Architecture'>('All')
const filters = ['All', 'Rendering', 'Networking', 'Blueprint tooling', 'Architecture'] as const
const visibleProjects = computed(() =>
  activeFilter.value === 'All'
    ? props.content.projects
    : props.content.projects.filter((project) => project.category === activeFilter.value),
)
</script>

<template>
  <UiSection
    id="pet-projects"
    class="pet-projects-view"
    spacing="default"
    width="content"
    divider="bottom"
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

    <div class="pet-projects-view__filters" aria-label="Filter repositories">
      <UiText as="span" role="label" tone="subtle">Filter by area</UiText>
      <div class="pet-projects-view__filter-list" role="group" aria-label="Repository areas">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          :class="{ 'pet-projects-view__filter--active': activeFilter === filter }"
          :aria-pressed="activeFilter === filter"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
      <p class="pet-projects-view__filter-status" aria-live="polite">
        Showing {{ visibleProjects.length }} repositories
      </p>
    </div>

    <ol class="pet-projects-view__list">
      <li v-for="project in visibleProjects" :key="project.id">
        <PetProjectCard :project="project" />
      </li>
    </ol>
  </UiSection>
</template>

<style scoped src="./PetProjectsView.css"></style>
