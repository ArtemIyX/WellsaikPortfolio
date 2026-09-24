<script setup lang="ts">
import type { ThemePreference } from '@/composables/useTheme'

import type { ThemeSelectorProps } from './ThemeSelector'
import { themeOptions } from './ThemeSelector'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<ThemeSelectorProps>(), {
  presentation: 'select',
  label: 'Color theme',
  compact: false,
})
const emit = defineEmits<{ 'update:modelValue': [value: ThemePreference] }>()

const update = (value: string): void => {
  if (value === 'system' || value === 'light' || value === 'dark') emit('update:modelValue', value)
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="theme-selector"
    :class="[
      { 'theme-selector--compact': compact },
      { 'theme-selector--expanded': presentation === 'segmented' },
    ]"
    role="group"
    :aria-label="label"
  >
    <button
      v-for="option in themeOptions"
      :key="option.value"
      class="theme-selector__button"
      type="button"
      :aria-label="`${label}: ${option.label}`"
      :aria-pressed="modelValue === option.value"
      :title="option.label"
      @click="update(option.value)"
    >
      <svg v-if="option.value === 'system'" class="theme-selector__icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
      <svg v-else-if="option.value === 'light'" class="theme-selector__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
      <svg v-else class="theme-selector__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.4A8.5 8.5 0 0 1 8.6 3.5 8.5 8.5 0 1 0 20.5 15.4Z" /></svg>
      <span v-if="!compact || presentation === 'segmented'" class="theme-selector__text"><slot :name="option.value">{{ option.label }}</slot></span>
    </button>
  </div>
</template>

<style scoped src="./ThemeSelector.css"></style>
