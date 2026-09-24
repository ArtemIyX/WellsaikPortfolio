<script setup lang="ts">
import { ThemeSelector, UiLink } from '@/components/shared'
import type { ThemePreference } from '@/composables/useTheme'

import type { SiteHeaderProps } from './SiteHeader'

defineProps<SiteHeaderProps>()

const emit = defineEmits<{ 'update:theme': [value: ThemePreference] }>()

const updateTheme = (value: ThemePreference): void => emit('update:theme', value)
</script>

<template>
  <header class="site-header">
    <UiLink class="site-header__skip-link" href="#main-content">Skip to main content</UiLink>
    <div class="site-header__inner">
      <UiLink class="site-header__brand" :to="{ name: 'home' }" variant="standalone">
        {{ brandLabel }}
      </UiLink>

      <div class="site-header__controls">
        <nav class="site-header__navigation" aria-label="Primary navigation">
          <ul class="site-header__navigation-list">
            <li v-for="item in items" :key="item.label">
              <UiLink
                v-if="item.kind === 'route'"
                class="site-header__navigation-link"
                :to="item.to"
                variant="standalone"
              >
                {{ item.label }}
              </UiLink>
              <UiLink
                v-else
                class="site-header__navigation-link"
                :href="item.href"
                :external="item.external"
                :new-tab="item.newTab"
                variant="standalone"
              >
                {{ item.label }}
              </UiLink>
            </li>
          </ul>
        </nav>

        <ThemeSelector
          :model-value="theme"
          compact
          label="Color theme"
          @update:model-value="updateTheme"
        />
      </div>
    </div>
  </header>
</template>

<style scoped src="./SiteHeader.css"></style>
