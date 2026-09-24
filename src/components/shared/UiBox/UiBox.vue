<script setup lang="ts">
import type { UiBoxProps } from './UiBox'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<UiBoxProps>(), {
  as: 'div',
  variant: 'surface',
  padding: 'medium',
  radius: 'small',
  density: 'comfortable',
})
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="ui-box"
    :class="[
      `ui-box--${variant}`,
      `ui-box--padding-${padding}`,
      `ui-box--radius-${radius}`,
      `ui-box--density-${density}`,
    ]"
  >
    <div v-if="$slots.media" class="ui-box__media"><slot name="media" /></div>
    <div v-if="$slots.header" class="ui-box__header"><slot name="header" /></div>
    <div v-if="$slots.default" class="ui-box__content"><slot /></div>
    <div v-if="$slots.footer" class="ui-box__footer"><slot name="footer" /></div>
  </component>
</template>

<style scoped src="./UiBox.css"></style>
