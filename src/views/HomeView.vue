<script setup lang="ts">
import { AboutView, ExperienceSkillsView, FeaturedProjectsView, HeroView } from '@/components/home'
import { SiteFooter, SiteHeader } from '@/components/layout'
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

const { theme, setTheme } = useTheme()
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
  </div>
</template>
