<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import {
  AboutView,
  ExperienceSkillsView,
  FeaturedProjectsView,
  HeroView,
  PetProjectsView,
  ProofMetric,
} from '@/components/home'
import { CookieConsentBanner, SiteFooter, SiteHeader } from '@/components/layout'
import { UiSection, UiText } from '@/components/shared'
import { useCookieConsent } from '@/composables/useCookieConsent'
import { useTheme } from '@/composables/useTheme'
import {
  aboutContent,
  experienceSkillsContent,
  featuredProjectsContent,
  heroContent,
  homeFooterActions,
  homeFooterName,
  homeFooterOccupation,
  homeBrandLabel,
  homeNavigation,
  petProjectsContent,
  proofPoints,
} from '@/content/home'

const { hasAcceptedCookies, shouldShowCookieBanner, acceptCookies, rejectCookies } =
  useCookieConsent()
const { theme, setTheme } = useTheme(hasAcceptedCookies)
const homeElement = ref<HTMLElement | null>(null)
const activeSection = ref('hero')
let sectionObserver: IntersectionObserver | undefined
let pointerFrame = 0

const updatePointerField = (event: PointerEvent): void => {
  if (event.pointerType !== 'mouse' || document.documentElement.dataset.motion === 'reduced') return
  if (pointerFrame) cancelAnimationFrame(pointerFrame)
  pointerFrame = requestAnimationFrame(() => {
    const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2))
    homeElement.value?.style.setProperty('--pointer-x', x.toFixed(3))
    homeElement.value?.style.setProperty('--pointer-y', y.toFixed(3))
    pointerFrame = 0
  })
}

const resetPointerField = (): void => {
  homeElement.value?.style.setProperty('--pointer-x', '0')
  homeElement.value?.style.setProperty('--pointer-y', '0')
}

onMounted(() => {
  const sections = ['hero', 'proof', 'projects', 'experience', 'pet-projects', 'about']
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => Boolean(section))
  if (typeof window.IntersectionObserver === 'function') {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target.id) activeSection.value = visible.target.id
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((section) => sectionObserver?.observe(section))
  }
  homeElement.value?.addEventListener('pointermove', updatePointerField, { passive: true })
  homeElement.value?.addEventListener('pointerleave', resetPointerField, { passive: true })
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
  if (pointerFrame) cancelAnimationFrame(pointerFrame)
  homeElement.value?.removeEventListener('pointermove', updatePointerField)
  homeElement.value?.removeEventListener('pointerleave', resetPointerField)
})

const acceptCookiePreferences = (): void => {
  acceptCookies()
  setTheme(theme.value)
}
</script>

<template>
  <div ref="homeElement" class="home-view" :data-active-section="activeSection">
    <SiteHeader
      :theme="theme"
      :items="homeNavigation"
      :brand-label="homeBrandLabel"
      @update:theme="setTheme"
    />
    <main id="main-content">
      <div class="home-view__signal" aria-hidden="true">
        <svg viewBox="0 0 1000 520" preserveAspectRatio="none">
          <path d="M24 32 C220 160 340 76 500 240 S780 360 976 488" />
          <circle cx="24" cy="32" r="5" />
        </svg>
      </div>
      <HeroView :content="heroContent" :theme="theme" />
      <UiSection
        id="proof"
        class="proof-strip"
        reveal
        spacing="compact"
        width="content"
        labelledby="proof-title"
      >
        <header class="proof-strip__header ui-section__reveal-item" style="--reveal-index: 0">
          <UiText id="proof-title" as="h2" role="heading">Engineering</UiText>
          <UiText tone="subtle">
            Measured outcomes and systems, linked to the work behind them.
          </UiText>
        </header>
        <ul class="proof-strip__list">
          <li
            v-for="(point, index) in proofPoints"
            :key="point.label"
            class="proof-strip__item ui-section__reveal-item"
            :style="{ '--reveal-index': index }"
          >
            <RouterLink
              class="proof-strip__surface"
              :to="point.action.to"
              :data-proof-id="point.analyticsId"
              :aria-label="`${point.value} ${point.label}. ${point.action.label}`"
            >
              <UiText as="strong" role="data" class="proof-strip__value">
                <ProofMetric
                  :value="point.value"
                  :numeric-value="point.numericValue"
                  :numeric-suffix="point.numericSuffix"
                />
              </UiText>
              <UiText as="span" role="label" weight="medium" class="proof-strip__label">
                {{ point.label }}
              </UiText>
              <UiText as="span" tone="subtle" class="proof-strip__detail">
                {{ point.detail }}
              </UiText>
              <span class="proof-strip__action">
                <span>View evidence</span><span aria-hidden="true">→</span>
              </span>
            </RouterLink>
          </li>
        </ul>
      </UiSection>
      <FeaturedProjectsView :content="featuredProjectsContent" />
      <ExperienceSkillsView :content="experienceSkillsContent" />
      <PetProjectsView :content="petProjectsContent" />
      <AboutView :content="aboutContent" />
    </main>
    <SiteFooter
      :actions="homeFooterActions"
      :name="homeFooterName"
      :occupation="homeFooterOccupation"
    />
    <CookieConsentBanner
      v-if="shouldShowCookieBanner"
      @accept="acceptCookiePreferences"
      @reject="rejectCookies"
    />
  </div>
</template>

<style scoped src="./HomeView.css"></style>
