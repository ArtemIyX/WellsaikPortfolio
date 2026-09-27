<script setup lang="ts">
import { UiLink, UiSection, UiText } from '@/components/shared'
import type { EngineeringEvidenceViewProps } from './EngineeringEvidenceView'

defineProps<EngineeringEvidenceViewProps>()
</script>

<template>
  <UiSection id="evidence" class="engineering-evidence-view" spacing="default" width="content" labelledby="evidence-title">
    <template #eyebrow><UiText as="p" role="label" tone="accent" weight="medium">Selected engineering evidence</UiText></template>
    <template #title><UiText id="evidence-title" as="h2" role="heading" max-width="none">Proof that connects systems to outcomes.</UiText></template>
    <ul class="engineering-evidence-view__list">
      <li v-for="item in items" :key="item.id">
        <UiText as="h3" role="heading">{{ item.title }}</UiText>
        <UiText tone="muted">{{ item.detail }}</UiText>
        <UiLink :to="item.action.to" variant="standalone">{{ item.action.label }}</UiLink>
      </li>
    </ul>
  </UiSection>
</template>

<style scoped src="./EngineeringEvidenceView.css"></style>
