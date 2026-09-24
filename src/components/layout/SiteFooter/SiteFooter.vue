<script setup lang="ts">
import { UiLink, UiText } from '@/components/shared'

import type { SiteFooterProps } from './SiteFooter'

defineProps<SiteFooterProps>()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__identity">
        <UiText as="p" weight="medium">{{ name }}</UiText>
        <UiText tone="muted">{{ occupation }}</UiText>
      </div>
      <nav class="site-footer__navigation" aria-label="Contact links">
        <ul class="site-footer__list">
          <li v-for="action in actions" :key="action.label">
            <UiLink v-if="action.kind === 'route'" :to="action.to" variant="standalone">
              {{ action.label }}
            </UiLink>
            <UiLink
              v-else
              :href="action.href"
              :external="action.external"
              :new-tab="action.newTab"
              variant="standalone"
            >
              {{ action.label }}
            </UiLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped src="./SiteFooter.css"></style>
