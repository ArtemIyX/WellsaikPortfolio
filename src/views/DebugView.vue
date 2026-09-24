<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

import { type ThemePreference, useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const colors = [
  { name: 'Background', token: '--color-bg' },
  { name: 'Surface', token: '--color-surface' },
  { name: 'Muted surface', token: '--color-surface-muted' },
  { name: 'Text', token: '--color-text' },
  { name: 'Muted text', token: '--color-text-muted' },
  { name: 'Subtle text', token: '--color-text-subtle' },
  { name: 'Border', token: '--color-border' },
  { name: 'Strong border', token: '--color-border-strong' },
  { name: 'Accent', token: '--color-accent' },
  { name: 'Accent hover', token: '--color-accent-hover' },
  { name: 'Accent soft', token: '--color-accent-soft' },
  { name: 'On accent', token: '--color-on-accent' },
  { name: 'Focus', token: '--color-focus' },
  { name: 'Positive', token: '--color-positive' },
  { name: 'Warning', token: '--color-warning' },
  { name: 'Danger', token: '--color-danger' },
] as const

const resolvedColors = ref<Record<string, string>>({})

const readColors = (): void => {
  const styles = getComputedStyle(document.documentElement)
  resolvedColors.value = Object.fromEntries(
    colors.map(({ token }) => [token, styles.getPropertyValue(token).trim()]),
  )
}

const changeTheme = async (preference: ThemePreference): Promise<void> => {
  setTheme(preference)
  await nextTick()
  readColors()
}

onMounted(readColors)
</script>

<template>
  <main class="debug-view">
    <header class="debug-header">
      <div>
        <p class="eyebrow">Developer sample</p>
        <h1>CSS token laboratory</h1>
        <p class="intro">A live reference for the current theme contract. Change the theme, then use these specimens to tune components against the same semantic tokens.</p>
      </div>
      <a class="back-link" href="/">← Back to portfolio</a>
    </header>

    <section class="debug-section" aria-labelledby="theme-title">
      <div class="section-heading">
        <div><p class="eyebrow">01 / Theme control</p><h2 id="theme-title">Preview every supported mode.</h2></div>
        <span class="active-theme">Active: {{ theme }}</span>
      </div>
      <div class="theme-buttons" role="group" aria-label="Preview theme">
        <button v-for="option in ['system', 'light', 'dark'] as ThemePreference[]" :key="option" class="theme-button" :class="{ 'theme-button--active': theme === option }" type="button" :aria-pressed="theme === option" @click="changeTheme(option)">{{ option }}</button>
      </div>
    </section>

    <section class="debug-section" aria-labelledby="colors-title">
      <div class="section-heading"><div><p class="eyebrow">02 / Semantic colors</p><h2 id="colors-title">Every color token, live.</h2></div><p class="section-note">Values below are resolved from the active theme.</p></div>
      <div class="color-grid">
        <article v-for="color in colors" :key="color.token" class="color-swatch" :style="{ '--swatch-color': 'var(' + color.token + ')' }">
          <div class="color-swatch__sample" aria-hidden="true"></div>
          <div class="color-swatch__details"><strong>{{ color.name }}</strong><code>{{ color.token }}</code><span>{{ resolvedColors[color.token] || '—' }}</span></div>
        </article>
      </div>
    </section>

    <section class="debug-section" aria-labelledby="type-title">
      <div class="section-heading"><div><p class="eyebrow">03 / Typography</p><h2 id="type-title">Mona Sans specimens.</h2></div><p class="section-note">Self-hosted variable font with system fallbacks.</p></div>
      <div class="type-specimens">
        <div class="type-row"><span class="type-label">Regular / 400</span><p class="type-sample type-sample--regular">Readable systems make difficult work feel possible.</p></div>
        <div class="type-row"><span class="type-label">Medium / 500</span><p class="type-sample type-sample--medium">Readable systems make difficult work feel possible.</p></div>
        <div class="type-row"><span class="type-label">Bold / 650</span><p class="type-sample type-sample--bold">Readable systems make difficult work feel possible.</p></div>
        <div class="type-row"><span class="type-label">Data / tabular</span><p class="type-sample type-sample--data">2025 · 120 ms · 68ch · +14.28%</p></div>
      </div>
      <div class="token-list"><code>--font-body</code><span>Mona Sans Variable, Mona Sans, Segoe UI, sans-serif</span><code>--font-size-body</code><span>1rem / line-height 1.65</span><code>--measure</code><span>68ch reading width</span></div>
    </section>
  </main>
</template>

<style scoped>
.debug-view { width: min(100% - 3rem, 78rem); margin: 0 auto; padding-bottom: var(--space-16); }
.debug-header { display: flex; justify-content: space-between; gap: var(--space-8); align-items: end; padding: var(--space-16) 0 var(--space-12); border-bottom: var(--border-width) solid var(--color-border); }
.eyebrow { margin: 0 0 var(--space-4); color: var(--color-accent); font-size: var(--font-size-small); font-weight: var(--font-weight-medium); letter-spacing: .06em; text-transform: uppercase; }.debug-header h1, h2 { margin: 0; letter-spacing: -.04em; }.debug-header h1 { font-size: clamp(2.5rem, 6vw, 5rem); }.intro { max-width: 60ch; margin: var(--space-6) 0 0; color: var(--color-text-muted); }.back-link { flex: 0 0 auto; font-size: var(--font-size-small); }
.debug-section { padding: var(--space-12) 0; border-bottom: var(--border-width) solid var(--color-border); }.section-heading { display: flex; justify-content: space-between; align-items: end; gap: var(--space-8); margin-bottom: var(--space-6); }.section-heading h2 { font-size: clamp(1.7rem, 3vw, 2.7rem); }.section-note, .active-theme { margin: 0; color: var(--color-text-subtle); font-size: var(--font-size-small); }.active-theme { font-variant-numeric: tabular-nums; }.theme-buttons { display: flex; flex-wrap: wrap; gap: var(--space-2); }.theme-button { padding: var(--space-2) var(--space-4); background: var(--color-surface); color: var(--color-text); border: var(--border-width) solid var(--color-border-strong); border-radius: var(--radius-small); cursor: pointer; text-transform: capitalize; }.theme-button:hover, .theme-button--active { background: var(--color-accent); color: var(--color-on-accent); border-color: var(--color-accent); }
.color-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); }.color-swatch { overflow: hidden; background: var(--color-surface); border: var(--border-width) solid var(--color-border); border-radius: var(--radius-small); }.color-swatch__sample { height: 4rem; background: var(--swatch-color); border-bottom: var(--border-width) solid var(--color-border); }.color-swatch__details { display: grid; gap: .2rem; padding: var(--space-3); }.color-swatch__details strong { font-size: var(--font-size-small); }.color-swatch__details code { color: var(--color-accent); font-size: .72rem; }.color-swatch__details span { color: var(--color-text-subtle); font-size: .75rem; }
.type-specimens { border-top: var(--border-width) solid var(--color-border); }.type-row { display: grid; grid-template-columns: 9rem 1fr; align-items: baseline; gap: var(--space-4); padding: var(--space-4) 0; border-bottom: var(--border-width) solid var(--color-border); }.type-label { color: var(--color-text-subtle); font-size: var(--font-size-small); }.type-sample { margin: 0; max-width: none; font-size: clamp(1.1rem, 2.5vw, 2rem); line-height: 1.3; }.type-sample--regular { font-weight: var(--font-weight-regular); }.type-sample--medium { font-weight: var(--font-weight-medium); }.type-sample--bold { font-weight: var(--font-weight-bold); }.type-sample--data { font-variant-numeric: tabular-nums; color: var(--color-accent); }.token-list { display: grid; grid-template-columns: 10rem 1fr; gap: var(--space-2) var(--space-4); margin-top: var(--space-8); color: var(--color-text-muted); font-size: var(--font-size-small); }.token-list code { color: var(--color-accent); font-family: var(--font-body); }
@media (max-width: 52rem) { .color-grid { grid-template-columns: repeat(2, 1fr); } } @media (max-width: 38rem) { .debug-view { width: min(100% - 2rem, 78rem); }.debug-header, .section-heading { display: block; }.back-link, .section-note, .active-theme { display: inline-block; margin-top: var(--space-4); }.color-grid { grid-template-columns: 1fr; }.type-row, .token-list { grid-template-columns: 1fr; gap: var(--space-1); } }
</style>
