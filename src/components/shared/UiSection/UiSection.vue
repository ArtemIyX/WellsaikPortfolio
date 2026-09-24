<script setup lang="ts">
import type { UiSectionProps } from './UiSection'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<UiSectionProps>(), {
  as: 'section', spacing: 'default', width: 'content', surface: 'transparent', divider: 'none',
})
</script>

<template>
  <component :is="as" v-bind="$attrs" :id="id" class="ui-section" :class="[`ui-section--spacing-${spacing}`, `ui-section--width-${width}`, `ui-section--surface-${surface}`, `ui-section--divider-${divider}`]" :aria-labelledby="labelledby">
    <div class="ui-section__inner">
      <div v-if="$slots.eyebrow" class="ui-section__eyebrow"><slot name="eyebrow" /></div>
      <div v-if="$slots.title" class="ui-section__title"><slot name="title" /></div>
      <div v-if="$slots.intro" class="ui-section__intro"><slot name="intro" /></div>
      <div v-if="$slots.actions" class="ui-section__actions"><slot name="actions" /></div>
      <div class="ui-section__content"><slot /></div>
    </div>
  </component>
</template>

<style scoped src="./UiSection.css"></style>
