<script setup lang="ts">
import { useMotionPreference } from '@/composables/useMotionPreference'

useMotionPreference()
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="route" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </Transition>
  </RouterView>
</template>
