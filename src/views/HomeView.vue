<script setup lang="ts">
import {
  AboutView,
  ContactView,
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
  contactContent,
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
      <UiSection id="proof" class="proof-strip" spacing="compact" width="content" labelledby="proof-title">
        <UiText id="proof-title" as="h2" role="heading" class="sr-only">Selected engineering proof</UiText>
        <ul class="proof-strip__list">
          <li v-for="point in proofPoints" :key="point.label" class="proof-strip__item">
            <UiText as="strong" role="data" class="proof-strip__value">{{ point.value }}</UiText>
            <UiText as="span" role="label" weight="medium">{{ point.label }}</UiText>
            <UiText as="span" tone="subtle">{{ point.detail }}</UiText>
          </li>
        </ul>
      </UiSection>
      <FeaturedProjectsView :content="featuredProjectsContent" />
      <EngineeringEvidenceView :items="engineeringEvidence" />
      <ExperienceSkillsView :content="experienceSkillsContent" />
      <PetProjectsView :content="petProjectsContent" />
      <AboutView :content="aboutContent" />
      <ContactView :content="contactContent" />
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
