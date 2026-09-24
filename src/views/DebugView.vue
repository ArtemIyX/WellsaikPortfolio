<script setup lang="ts">
import { ref } from 'vue'
import { useTheme, type ThemePreference } from '@/composables/useTheme'
import { ThemeSelector, UiBox, UiButton, UiLink, UiSection, UiText } from '@/components/shared'

const { theme, setTheme } = useTheme()
const buttonLoading = ref(false)
const startLoading = (): void => { buttonLoading.value = true; window.setTimeout(() => { buttonLoading.value = false }, 800) }
const updateTheme = (value: ThemePreference): void => setTheme(value)
</script>

<template>
  <main class="debug-view">
    <header class="debug-header">
      <div>
        <UiText as="p" role="label" tone="accent">Developer sample</UiText>
        <UiText as="h1" role="display">Shared component specimens.</UiText>
        <UiText class="debug-intro" tone="muted">A live verification surface for the shared portfolio primitives and their semantic theme tokens.</UiText>
      </div>
      <UiLink href="/" variant="standalone">← Back to portfolio</UiLink>
    </header>
    <UiSection spacing="default" divider="bottom" labelledby="theme-title">
      <template #eyebrow>01 / Theme control</template>
      <template #title><UiText as="h2" id="theme-title" role="heading">Preview every supported mode.</UiText></template>
      <template #intro><UiText tone="muted">Active preference: {{ theme }}</UiText></template>
      <ThemeSelector :model-value="theme" @update:model-value="updateTheme" />
      <ThemeSelector class="debug-segmented" :model-value="theme" presentation="segmented" @update:model-value="updateTheme" />
    </UiSection>
    <UiSection spacing="default" divider="bottom" labelledby="button-title">
      <template #eyebrow>02 / UiButton</template>
      <template #title><UiText as="h2" id="button-title" role="heading">Actions keep native button behavior.</UiText></template>
      <div class="specimen-row">
        <UiButton v-for="variant in ['primary', 'secondary', 'quiet', 'danger'] as const" :key="variant" :variant="variant">{{ variant }}</UiButton>
        <UiButton size="small">Small</UiButton><UiButton size="large">Large</UiButton><UiButton disabled>Disabled</UiButton><UiButton :loading="buttonLoading" @click="startLoading">{{ buttonLoading ? 'Saving' : 'Loading' }}</UiButton><UiButton pressed>Pressed</UiButton><UiButton full-width class="full-width-specimen">Full width</UiButton>
      </div>
    </UiSection>
    <UiSection spacing="default" divider="bottom" labelledby="text-title">
      <template #eyebrow>03 / UiText</template>
      <template #title><UiText as="h2" id="text-title" role="heading">Visual roles stay separate from HTML semantics.</UiText></template>
      <div class="text-specimens"><UiText v-for="role in ['display', 'heading', 'body', 'label', 'caption', 'data'] as const" :key="role" :role="role" :as="role === 'display' ? 'div' : 'p'" :tone="role === 'caption' ? 'subtle' : role === 'data' ? 'accent' : 'default'">{{ role === 'data' ? '2025 · 120 ms · +14.28%' : 'Readable systems make difficult work feel possible.' }}</UiText></div>
    </UiSection>
    <UiSection spacing="default" divider="bottom" labelledby="surface-title">
      <template #eyebrow>04 / UiSection and UiBox</template>
      <template #title><UiText as="h2" id="surface-title" role="heading">Framing and surfaces compose through slots.</UiText></template>
      <div class="box-grid"><UiBox v-for="variant in ['surface', 'muted', 'outline', 'accent'] as const" :key="variant" :variant="variant" padding="small" density="compact"><template #header><UiText as="strong" role="label">{{ variant }} box</UiText></template><UiText tone="muted">A neutral content surface with no navigation behavior.</UiText><template #footer><UiText role="caption">footer slot</UiText></template></UiBox></div>
    </UiSection>
    <UiSection spacing="default" divider="bottom" labelledby="link-title">
      <template #eyebrow>05 / UiLink</template>
      <template #title><UiText as="h2" id="link-title" role="heading">Links preserve browser navigation.</UiText></template>
      <div class="specimen-row"><UiLink href="#theme-title" variant="standalone">Internal anchor</UiLink><UiLink href="https://example.com" external new-tab>External</UiLink><UiLink href="/portfolio.pdf" download="portfolio.pdf">Download</UiLink><UiLink href="mailto:hello@wellsaik.dev" variant="button-primary">Email</UiLink><UiLink href="#theme-title" variant="button-secondary">Button secondary</UiLink></div>
    </UiSection>
  </main>
</template>

<style scoped>
.debug-view { width: min(100% - 3rem, 78rem); margin: 0 auto; padding-bottom: var(--space-16); }
.debug-header { display: flex; justify-content: space-between; align-items: end; gap: var(--space-8); padding: var(--space-16) 0 var(--space-12); border-bottom: var(--border-width) solid var(--color-border); }
.debug-header h1 { margin: var(--space-4) 0 var(--space-6); }
.debug-intro { max-width: 60ch; }
.debug-segmented { margin-top: var(--space-4); }
.specimen-row { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3); }
.full-width-specimen { flex-basis: 100%; }
.text-specimens { display: grid; gap: var(--space-4); }
.box-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); }
@media (max-width: 52rem) { .box-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 38rem) { .debug-view { width: min(100% - 2rem, 78rem); } .debug-header { display: block; } .debug-header > *:last-child { display: inline-flex; margin-top: var(--space-4); } .box-grid { grid-template-columns: 1fr; } }
</style>
