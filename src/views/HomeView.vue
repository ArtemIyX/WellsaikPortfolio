<script setup lang="ts">
import {
  AboutView,
  EngineeringEvidenceView,
  ExperienceSkillsView,
  FeaturedProjectsView,
  HeroView,
  PetProjectsView,
} from '@/components/home'
import { CookieConsentBanner, SiteFooter, SiteHeader } from '@/components/layout'
import { UiSection, UiText } from '@/components/shared'
import { useCookieConsent } from '@/composables/useCookieConsent'
import { useTheme } from '@/composables/useTheme'
import {
  aboutContent,
  engineeringEvidence,
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

const acceptCookiePreferences = (): void => {
  acceptCookies()
  setTheme(theme.value)
}
</script>

<template>
  <div class="home-view">
    <SiteHeader
      :theme="theme"
      :items="homeNavigation"
      :brand-label="homeBrandLabel"
      @update:theme="setTheme"
    />
    <main id="main-content">
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
          <UiText id="proof-title" as="h2" role="heading">Selected engineering proof</UiText>
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
              <UiText as="strong" role="data" class="proof-strip__value">{{ point.value }}</UiText>
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
      <EngineeringEvidenceView :items="engineeringEvidence" />
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
