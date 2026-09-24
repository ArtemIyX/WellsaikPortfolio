<script setup lang="ts">
import { computed } from 'vue'

import { UiBox, UiLink, UiText } from '@/components/shared'
import { defaultProjectDetailLabels } from '@/content/home'

import type { ProjectCardProps } from './ProjectCard'

const props = withDefaults(defineProps<ProjectCardProps>(), { mediaSide: 'start' })

const titleId = `project-card-title-${props.project.id}`
const detailLabels = computed(() => ({ ...defaultProjectDetailLabels, ...props.project.labels }))
</script>

<template>
  <UiBox
    as="article"
    class="project-card"
    :class="`project-card--media-${mediaSide}`"
    variant="surface"
    padding="none"
    radius="medium"
    density="compact"
    :aria-labelledby="titleId"
  >
    <template #media>
      <img
        :src="project.image.src"
        :alt="project.image.alt"
        :width="project.image.width"
        :height="project.image.height"
        loading="lazy"
        decoding="async"
      />
    </template>

    <div class="project-card__content">
      <div class="project-card__meta">
        <UiText as="span" role="label" tone="accent" weight="medium">{{ project.number }}</UiText>
        <UiText as="span" role="label" tone="muted">{{ project.category }}</UiText>
      </div>
      <UiText :id="titleId" as="h3" role="heading" max-width="none">{{ project.title }}</UiText>
      <UiText class="project-card__summary" tone="muted">{{ project.summary }}</UiText>

      <dl class="project-card__details">
        <div>
          <UiText as="dt" role="label" tone="subtle" weight="medium">{{
            detailLabels.problem
          }}</UiText>
          <dd>
            <slot name="problem" :detail="project.problem">
              <UiText v-if="project.problem.text">{{ project.problem.text }}</UiText>
              <ul v-if="project.problem.items" class="project-card__detail-list">
                <li v-for="item in project.problem.items" :key="item">{{ item }}</li>
              </ul>
            </slot>
          </dd>
        </div>
        <div>
          <UiText as="dt" role="label" tone="subtle" weight="medium">{{
            detailLabels.role
          }}</UiText>
          <dd>
            <slot name="role" :detail="project.role">
              <UiText v-if="project.role.text">{{ project.role.text }}</UiText>
              <ul v-if="project.role.items" class="project-card__detail-list">
                <li v-for="item in project.role.items" :key="item">{{ item }}</li>
              </ul>
            </slot>
          </dd>
        </div>
        <div>
          <UiText as="dt" role="label" tone="subtle" weight="medium">{{
            detailLabels.outcome
          }}</UiText>
          <dd>
            <slot name="outcome" :detail="project.outcome">
              <UiText v-if="project.outcome.text">{{ project.outcome.text }}</UiText>
              <ul v-if="project.outcome.items" class="project-card__detail-list">
                <li v-for="item in project.outcome.items" :key="item">{{ item }}</li>
              </ul>
            </slot>
          </dd>
        </div>
      </dl>

      <div class="project-card__technologies">
        <UiText as="h4" role="label" tone="subtle" weight="medium">{{
          detailLabels.technologies
        }}</UiText>
        <slot name="technologies" :technologies="project.technologies">
          <ul>
            <li v-for="technology in project.technologies" :key="technology">{{ technology }}</li>
          </ul>
        </slot>
      </div>

      <div class="project-card__actions" aria-label="Project actions">
        <UiLink
          v-if="project.liveAction.kind === 'route'"
          :to="project.liveAction.to"
          variant="button-primary"
        >
          {{ project.liveAction.label }}
        </UiLink>
        <UiLink
          v-else
          :href="project.liveAction.href"
          :external="project.liveAction.external"
          :new-tab="project.liveAction.newTab"
          variant="button-primary"
        >
          {{ project.liveAction.label }}
        </UiLink>
        <template v-if="project.sourceAction">
          <UiLink
            v-if="project.sourceAction.kind === 'route'"
            :to="project.sourceAction.to"
            variant="button-secondary"
          >
            {{ project.sourceAction.label }}
          </UiLink>
          <UiLink
            v-else
            :href="project.sourceAction.href"
            :external="project.sourceAction.external"
            :new-tab="project.sourceAction.newTab"
            variant="button-secondary"
          >
            {{ project.sourceAction.label }}
          </UiLink>
        </template>
      </div>
    </div>
  </UiBox>
</template>

<style scoped src="./ProjectCard.css"></style>
