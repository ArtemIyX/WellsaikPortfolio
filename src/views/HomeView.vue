<script setup lang="ts">
import { AboutView, HeroView } from '@/components/home'
import { SiteHeader } from '@/components/layout'
import { useTheme } from '@/composables/useTheme'
import { aboutContent, heroContent, homeBrandLabel, homeNavigation } from '@/content/home'

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
      <HeroView :content="heroContent" />
      <AboutView :content="aboutContent" />
    </main>
  </div>
</template>
