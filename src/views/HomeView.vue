<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { ThemeSelector, UiBox, UiLink } from '@/components/shared'

const { theme, setTheme } = useTheme()

const updateTheme = (value: 'light' | 'dark'): void => setTheme(value)


</script>

<template>

</template>

<style scoped>

</style>
