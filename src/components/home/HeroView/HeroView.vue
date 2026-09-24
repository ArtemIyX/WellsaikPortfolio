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
            <template #leading>
              <svg class="hero-view__email-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.75 5.25h16.5v13.5H3.75z" />
                <path d="m3.75 6 8.25 6.75L20.25 6" />
              </svg>
            </template>
            {{ content.primaryAction.label }}
          </UiLink>
          <UiLink
            v-else
            :href="content.primaryAction.href"
            :external="content.primaryAction.external"
            :new-tab="content.primaryAction.newTab"
            variant="button-primary"
          >
            <template #leading>
              <svg class="hero-view__email-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.75 5.25h16.5v13.5H3.75z" />
                <path d="m3.75 6 8.25 6.75L20.25 6" />
              </svg>
            </template>
            {{ content.primaryAction.label }}
          </UiLink>

          <UiLink
            v-if="content.secondaryAction.kind === 'route'"
            :to="content.secondaryAction.to"
            variant="button-secondary"
            :show-external-indicator="false"
          >
            <template #leading>
              <svg class="hero-view__github-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"
                />
              </svg>
            </template>
            {{ content.secondaryAction.label }}
          </UiLink>
          <UiLink
            v-else
            :href="content.secondaryAction.href"
            :external="content.secondaryAction.external"
            :new-tab="content.secondaryAction.newTab"
            variant="button-secondary"
            :show-external-indicator="false"
          >
            <template #leading>
              <svg class="hero-view__github-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"
                />
              </svg>
            </template>
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
          :aria-label="content.imageAlt"
        >
          <template #media>
            <img
              class="hero-view__portrait-image hero-view__portrait-image--dark"
              :class="{ 'hero-view__portrait-image--visible': theme === 'dark' }"
              :src="content.imageSrc"
              alt=""
              aria-hidden="true"
              :width="content.imageWidth"
              :height="content.imageHeight"
            />
            <img
              class="hero-view__portrait-image hero-view__portrait-image--light"
              :class="{ 'hero-view__portrait-image--visible': theme === 'light' }"
              :src="content.imageLightSrc"
              alt=""
              aria-hidden="true"
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
