<script setup lang="ts">
import { computed, onMounted, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

import type { UiLinkRuntimeProps } from './UiLink'
import { isExternalHref } from './UiLink'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<UiLinkRuntimeProps>(), {
  variant: 'inline',
  external: undefined,
  newTab: false,
  showExternalIndicator: true,
  download: false,
  disabled: false,
})
const attrs = useAttrs()
const inferredExternal = computed(() => props.external ?? isExternalHref(props.href))
const hasValidDestination = computed(() => (props.to !== undefined) !== (props.href !== undefined))
const isRouterLink = computed(() => hasValidDestination.value && props.to !== undefined)
const destinationAttrs = computed(() => {
  if (props.disabled || !hasValidDestination.value) return {}
  if (isRouterLink.value) return { to: props.to }

  return {
    href: props.href,
    target: props.newTab ? '_blank' : undefined,
    rel: props.newTab ? 'noopener noreferrer' : undefined,
    download: props.download || undefined,
  }
})
const componentAttrs = computed(() => ({ ...attrs, ...destinationAttrs.value }))

onMounted(() => {
  if (!hasValidDestination.value && import.meta.env.DEV) {
    console.warn('UiLink expects exactly one of `to` or `href`.')
  }
})
</script>

<template>
  <component
    :is="isRouterLink && !disabled ? RouterLink : 'a'"
    v-bind="componentAttrs"
    class="ui-link"
    :class="[`ui-link--${variant}`, { 'ui-link--disabled': disabled }]"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
  >
    <span v-if="$slots.leading" class="ui-link__leading" aria-hidden="true"
      ><slot name="leading"
    /></span>
    <span class="ui-link__label"><slot /></span>
    <span v-if="$slots.trailing" class="ui-link__trailing" aria-hidden="true"
      ><slot name="trailing"
    /></span>
    <span
      v-if="showExternalIndicator && !$slots.trailing && (inferredExternal || newTab)"
      class="ui-link__indicator"
      aria-hidden="true"
      >↗</span
    >
    <span v-if="inferredExternal || newTab" class="ui-link__assistive">{{
      newTab ? ' (opens in a new tab)' : ' (external link)'
    }}</span>
  </component>
</template>

<style scoped src="./UiLink.css"></style>
