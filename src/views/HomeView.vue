<script setup lang="ts">
import { AboutView, ExperienceSkillsView, FeaturedProjectsView, HeroView } from '@/components/home'
import { CookieConsentBanner, SiteFooter, SiteHeader } from '@/components/layout'
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
} from '@/content/home'

const { hasAcceptedCookies, shouldShowCookieBanner, acceptCookies, rejectCookies } = useCookieConsent()
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
      <FeaturedProjectsView :content="featuredProjectsContent" />
      <ExperienceSkillsView :content="experienceSkillsContent" />
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
