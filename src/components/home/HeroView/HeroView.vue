<script setup lang="ts">
import { UiBox, UiLink, UiSection, UiText } from '@/components/shared'

import type { HeroViewProps } from './HeroView'

defineProps<HeroViewProps>()
</script>

<template>
  <UiSection id="hero" class="hero-view" spacing="hero" width="content" labelledby="hero-title">
    <div class="hero-view__grid">
      <div class="hero-view__copy">
        <UiText as="p" role="label" tone="accent" weight="medium">
          {{ content.eyebrow }}
        </UiText>
        <UiText id="hero-title" as="h1" role="display" max-width="none">
          {{ content.title }}
        </UiText>
        <UiText class="hero-view__summary" tone="muted">
          {{ content.summary }}
        </UiText>

        <div class="hero-view__actions" aria-label="Portfolio actions">
          <UiLink
            v-if="content.primaryAction.kind === 'route'"
            :to="content.primaryAction.to"
            variant="button-primary"
          >
            {{ content.primaryAction.label }}
          </UiLink>
          <UiLink
            v-else
            :href="content.primaryAction.href"
            :external="content.primaryAction.external"
            :new-tab="content.primaryAction.newTab"
            variant="button-primary"
          >
            {{ content.primaryAction.label }}
          </UiLink>

          <UiLink
            v-if="content.secondaryAction.kind === 'route'"
            :to="content.secondaryAction.to"
            variant="button-secondary"
          >
            {{ content.secondaryAction.label }}
          </UiLink>
          <UiLink
            v-else
            :href="content.secondaryAction.href"
            :external="content.secondaryAction.external"
            :new-tab="content.secondaryAction.newTab"
            variant="button-secondary"
          >
            {{ content.secondaryAction.label }}
          </UiLink>
        </div>

        <UiText class="hero-view__availability" role="label" tone="positive" weight="medium">
          <span class="hero-view__status" aria-hidden="true"></span>
          {{ content.availability }}
        </UiText>
      </div>

      <div class="hero-view__portrait-wrap">
        <div class="hero-view__portrait-offset" aria-hidden="true"></div>
        <UiBox
          as="figure"
          class="hero-view__portrait"
          variant="outline"
          padding="none"
          radius="none"
        >
          <template #media>
            <img
              :src="content.imageSrc"
              :alt="content.imageAlt"
              :width="content.imageWidth"
              :height="content.imageHeight"
            />
          </template>
        </UiBox>
      </div>
    </div>
  </UiSection>
</template>

<style scoped src="./HeroView.css"></style>
