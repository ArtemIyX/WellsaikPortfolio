<script setup lang="ts">
import { computed, onMounted, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

import type { UiLinkProps } from './UiLink'
import { isExternalHref } from './UiLink'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<UiLinkProps>(), {
  variant: 'inline',
  external: undefined,
  newTab: false,
  download: false,
  disabled: false,
})
const attrs = useAttrs()
const inferredExternal = computed(() => props.external ?? isExternalHref(props.href))
const hasValidDestination = computed(() => (props.to !== undefined) !== (props.href !== undefined))
const isRouterLink = computed(() => hasValidDestination.value && props.to !== undefined)
const target = computed(() => (props.newTab ? '_blank' : undefined))
const rel = computed(() => (props.newTab ? 'noopener noreferrer' : undefined))

onMounted(() => {
  if (!hasValidDestination.value && import.meta.env.DEV) {
    console.warn('UiLink expects exactly one of `to` or `href`.')
  }
})
</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : 'a'"
    v-bind="attrs"
    class="ui-link"
    :class="[`ui-link--${variant}`, { 'ui-link--disabled': disabled }]"
    :to="isRouterLink && hasValidDestination && !disabled ? to : undefined"
    :href="!isRouterLink && hasValidDestination && !disabled ? href : undefined"
    :target="target"
    :rel="rel"
    :download="download || undefined"
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
      v-if="!$slots.trailing && (inferredExternal || newTab)"
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
