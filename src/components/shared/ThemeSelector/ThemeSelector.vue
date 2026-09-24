<script setup lang="ts">
import type { ThemePreference } from '@/composables/useTheme'

import type { ThemeSelectorProps } from './ThemeSelector'
import { themeOptions } from './ThemeSelector'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<ThemeSelectorProps>(), {
  presentation: 'select', label: 'Color theme', compact: false,
})
const emit = defineEmits<{ 'update:modelValue': [value: ThemePreference] }>()

const update = (value: string): void => {
  if (value === 'system' || value === 'light' || value === 'dark') emit('update:modelValue', value)
}
</script>

<template>
  <div v-if="presentation === 'segmented'" v-bind="$attrs" class="theme-selector" :class="{ 'theme-selector--compact': compact }" role="group" :aria-label="label">
    <button v-for="option in themeOptions" :key="option.value" class="theme-selector__button" type="button" :aria-pressed="modelValue === option.value" @click="update(option.value)">
      <slot :name="option.value">{{ option.label }}</slot>
    </button>
  </div>
  <label v-else class="theme-selector" :class="{ 'theme-selector--compact': compact }">
    <span class="theme-selector__label">{{ label }}</span>
    <select v-bind="$attrs" class="theme-selector__select" :aria-label="label" :value="modelValue" @change="update(($event.target as HTMLSelectElement).value)">
      <option v-for="option in themeOptions" :key="option.value" :value="option.value"><slot :name="option.value">{{ option.label }}</slot></option>
    </select>
  </label>
</template>

<style scoped src="./ThemeSelector.css"></style>
