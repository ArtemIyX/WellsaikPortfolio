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
    reveal
    spacing="default"
    width="content"
    surface="default"
    divider="bottom"
    labelledby="experience-list-title"
  >
    <template v-if="content.eyebrow" #eyebrow>
      <UiText as="p" role="label" tone="accent" weight="medium">{{ content.eyebrow }}</UiText>
    </template>
    <div class="experience-skills-view__layout">
      <section aria-labelledby="experience-list-title">
        <UiText
          id="experience-list-title"
          as="h3"
          role="heading"
          class="ui-section__reveal-item"
          :style="{ '--reveal-index': 0 }"
          >{{
          content.experienceHeading
        }}</UiText>
        <ol class="experience-skills-view__experience-list">
          <li
            v-for="(entry, index) in content.entries"
            :key="entry.id"
            class="experience-skills-view__experience-item ui-section__reveal-item"
            :data-status="entry.status"
            :aria-current="entry.status === 'current' ? 'true' : undefined"
            :style="{ '--reveal-index': index + 1 }"
          >
            <span class="experience-skills-view__timeline-mark" aria-hidden="true"></span>
            <ExperienceCard :entry="entry" />
          </li>
        </ol>
      </section>

      <aside aria-labelledby="skills-title" class="experience-skills-view__skills">
        <UiText
          id="skills-title"
          as="h3"
          role="heading"
          class="ui-section__reveal-item"
          :style="{ '--reveal-index': content.entries.length + 1 }"
          >{{ content.skillsHeading }}</UiText
        >
        <div class="experience-skills-view__groups">
          <UiBox
            v-for="(group, index) in content.skillGroups"
            :key="group.id"
            class="experience-skills-view__group ui-section__reveal-item"
            variant="outline"
            depth-aware
            padding="medium"
            :style="{ '--reveal-index': content.entries.length + index + 2 }"
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
