<script setup lang="ts">
import { ref } from 'vue'

import { useReveal } from '@/composables/useReveal'

import type { UiSectionProps } from './UiSection'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<UiSectionProps>(), {
  as: 'section',
  spacing: 'default',
  width: 'content',
  surface: 'transparent',
  divider: 'none',
  reveal: false,
})

const sectionElement = ref<HTMLElement | null>(null)
const revealEnabled = props.reveal !== false && props.reveal !== 'none'
const revealVariant = props.reveal === true ? 'rise' : props.reveal
const { isRevealed } = useReveal(sectionElement, { enabled: revealEnabled })
</script>

<template>
  <component
    :is="props.as"
    ref="sectionElement"
    v-bind="$attrs"
    :id="props.id"
    class="ui-section"
    :class="[
      `ui-section--spacing-${props.spacing}`,
      `ui-section--width-${props.width}`,
      `ui-section--surface-${props.surface}`,
      `ui-section--divider-${props.divider}`,
      {
        'ui-section--reveal': revealEnabled,
        'ui-section--revealed': revealEnabled && isRevealed,
        [`ui-section--reveal-${revealVariant}`]: revealEnabled && revealVariant,
      },
    ]"
    :aria-labelledby="props.labelledby"
  >
    <div class="ui-section__inner">
      <div v-if="$slots.eyebrow" class="ui-section__eyebrow ui-section__reveal-item">
        <slot name="eyebrow" />
      </div>
      <div v-if="$slots.title" class="ui-section__title ui-section__reveal-item">
        <slot name="title" />
      </div>
      <div v-if="$slots.intro" class="ui-section__intro ui-section__reveal-item">
        <slot name="intro" />
      </div>
      <div v-if="$slots.actions" class="ui-section__actions ui-section__reveal-item">
        <slot name="actions" />
      </div>
      <div class="ui-section__content"><slot /></div>
    </div>
  </component>
</template>

<style scoped src="./UiSection.css"></style>
