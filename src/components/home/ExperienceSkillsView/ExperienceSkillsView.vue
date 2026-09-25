<script setup lang="ts">
import { UiBox, UiSection, UiText } from '@/components/shared'

import ExperienceCard from '../ExperienceCard/ExperienceCard.vue'
import type { ExperienceSkillsViewProps } from './ExperienceSkillsView'

defineProps<ExperienceSkillsViewProps>()
</script>

<template>
  <UiSection
    id="experience"
    class="experience-skills-view"
    spacing="default"
    width="content"
    surface="default"
    labelledby="experience-title"
  >
    <template v-if="content.eyebrow" #eyebrow>
      <UiText as="p" role="label" tone="accent" weight="medium">{{ content.eyebrow }}</UiText>
    </template>
    <template #title>
      <UiText id="experience-title" as="h2" role="heading" max-width="none">
        {{ content.title }}
      </UiText>
    </template>
    <template #intro>
      <UiText>{{ content.introduction }}</UiText>
    </template>

    <div class="experience-skills-view__layout">
      <section aria-labelledby="experience-list-title">
        <UiText id="experience-list-title" as="h3" role="heading">{{
          content.experienceHeading
        }}</UiText>
        <ol class="experience-skills-view__experience-list">
          <li v-for="entry in content.entries" :key="entry.id">
            <ExperienceCard :entry="entry" />
          </li>
        </ol>
      </section>

      <aside aria-labelledby="skills-title" class="experience-skills-view__skills">
        <UiText id="skills-title" as="h3" role="heading">{{ content.skillsHeading }}</UiText>
        <div class="experience-skills-view__groups">
          <UiBox
            v-for="group in content.skillGroups"
            :key="group.id"
            class="experience-skills-view__group"
            variant="outline"
            padding="medium"
          >
            <UiText as="h4" class="experience-skills-view__group-title" role="body" weight="medium">
              {{ group.title }}
            </UiText>
            <ul>
              <li v-for="item in group.items" :key="item.name">
                <span class="experience-skills-view__skill">
                  <UiText as="span" role="label">{{ item.name }}</UiText>
                  <UiText v-if="item.level" as="span" role="label" tone="muted">
                    ({{ item.level }})
                  </UiText>
                </span>
              </li>
            </ul>
          </UiBox>
        </div>
      </aside>
    </div>
  </UiSection>
</template>

<style scoped src="./ExperienceSkillsView.css"></style>
