<script setup lang="ts">
import type { UiTextProps } from './UiText'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<UiTextProps>(), {
  as: 'p', role: 'body', tone: 'default', align: 'start', maxWidth: 'reading',
})
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="ui-text"
    :class="[`ui-text--role-${role}`, `ui-text--tone-${tone}`, `ui-text--align-${align}`, `ui-text--width-${maxWidth}`, weight && `ui-text--weight-${weight}`]"
  >
    <slot />
  </component>
</template>

<style scoped src="./UiText.css"></style>
