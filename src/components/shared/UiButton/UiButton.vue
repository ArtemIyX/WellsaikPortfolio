<script setup lang="ts">
import { computed } from 'vue'

import type { UiButtonProps } from './UiButton'
import { uiButtonDefaults } from './UiButton'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<UiButtonProps>(), uiButtonDefaults)
const emit = defineEmits<{ click: [event: MouseEvent] }>()

const isDisabled = computed(() => props.disabled || props.loading)

const handleClick = (event: MouseEvent): void => {
  if (!isDisabled.value) emit('click', event)
}
</script>

<template>
  <button
    v-bind="$attrs"
    class="ui-button"
    :class="[`ui-button--${variant}`, `ui-button--${size}`, { 'ui-button--full-width': fullWidth }]"
    :type="type"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    :aria-pressed="pressed"
    @click="handleClick"
  >
    <span v-if="$slots.leading" class="ui-button__leading" aria-hidden="true"
      ><slot name="leading"
    /></span>
    <span class="ui-button__label"><slot /></span>
    <span v-if="loading" class="ui-button__loading" aria-hidden="true"
      ><slot name="loading"><span class="ui-button__spinner" /></slot
    ></span>
    <span v-else-if="$slots.trailing" class="ui-button__trailing" aria-hidden="true"
      ><slot name="trailing"
    /></span>
    <span v-if="loading" class="ui-button__loading-label"
      ><slot name="loading-label">Loading</slot></span
    >
  </button>
</template>

<style scoped src="./UiButton.css"></style>
