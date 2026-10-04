<script setup lang="ts">
import { UiLink, UiSection, UiText } from '@/components/shared'
import type { EngineeringEvidenceViewProps } from './EngineeringEvidenceView'

defineProps<EngineeringEvidenceViewProps>()
</script>

<template>
  <UiSection
    id="evidence"
    class="engineering-evidence-view"
    reveal
    spacing="default"
    width="content"
    labelledby="evidence-title"
  >
    <template #title
      ><UiText id="evidence-title" as="h2" role="heading" max-width="none"
        >Engineering evidence in action</UiText
      ></template
    >
    <ul class="engineering-evidence-view__list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="ui-section__reveal-item"
        :style="{ '--reveal-index': index + 2 }"
      >
        <UiText as="h3" role="heading">{{ item.title }}</UiText>
        <UiText tone="muted">{{ item.detail }}</UiText>
        <UiLink :to="item.action.to" variant="standalone">{{ item.action.label }}</UiLink>
      </li>
    </ul>
  </UiSection>
</template>

<style scoped src="./EngineeringEvidenceView.css"></style>
