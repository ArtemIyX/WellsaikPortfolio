<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { UiBox, UiSection, UiText } from '@/components/shared'

import ExperienceCard from '../ExperienceCard/ExperienceCard.vue'
import type { ExperienceSkillsViewProps } from './ExperienceSkillsView'

defineProps<ExperienceSkillsViewProps>()
const experienceList = ref<HTMLOListElement | null>(null)
const timelineProgress = ref(0)
const activeEntry = ref('')
let entryObserver: IntersectionObserver | undefined

onMounted(() => {
  const entries = Array.from(
    experienceList.value?.querySelectorAll<HTMLElement>('[data-entry-id]') ?? [],
  )
  if (typeof window.IntersectionObserver !== 'function') return
  entryObserver = new IntersectionObserver(
    (observations) => {
      const visible = observations
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible?.target instanceof HTMLElement) {
        activeEntry.value = visible.target.dataset.entryId ?? ''
        const index = entries.indexOf(visible.target)
        timelineProgress.value = entries.length > 1 ? (index / (entries.length - 1)) * 100 : 100
      }
    },
    { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
  )
  entries.forEach((entry) => entryObserver?.observe(entry))
})

onBeforeUnmount(() => entryObserver?.disconnect())
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
          >{{ content.experienceHeading }}</UiText
        >
        <ol
          ref="experienceList"
          class="experience-skills-view__experience-list"
          :style="{ '--timeline-progress': `${timelineProgress}%` }"
        >
          <li
            v-for="(entry, index) in content.entries"
            :key="entry.id"
            class="experience-skills-view__experience-item ui-section__reveal-item"
            :data-status="entry.status"
            :data-entry-id="entry.id"
            :data-active="activeEntry === entry.id ? 'true' : undefined"
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
          <div
            v-for="(group, index) in content.skillGroups"
            :key="group.id"
            class="experience-skills-view__group-reveal ui-section__reveal-item"
            :style="{ '--reveal-index': content.entries.length + index + 2 }"
          >
            <UiBox
              class="experience-skills-view__group"
              variant="surface"
              depth-aware
              padding="medium"
              radius="medium"
              :data-skill-group="group.id"
            >
              <div class="experience-skills-view__group-heading">
                <UiText
                  as="h4"
                  class="experience-skills-view__group-title"
                  role="body"
                  weight="medium"
                >
                  {{ group.title }}
                </UiText>
              </div>
              <ul class="experience-skills-view__skill-list">
                <li
                  v-for="item in group.items"
                  :key="item.name"
                  class="experience-skills-view__skill-item"
                >
                  <span class="experience-skills-view__skill-marker" aria-hidden="true"></span>
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
        </div>
      </aside>
    </div>
  </UiSection>
</template>

<style scoped src="./ExperienceSkillsView.css"></style>
