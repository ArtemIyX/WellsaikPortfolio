<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { ProofMetricProps } from './ProofMetric'

const props = defineProps<ProofMetricProps>()
const metricElement = ref<HTMLElement | null>(null)
const displayedValue = ref(props.numericValue ?? props.value)
let observer: IntersectionObserver | undefined
let frame = 0

const formatNumber = (value: number): string => new Intl.NumberFormat('de-DE').format(value)

const animate = (): void => {
  if (props.numericValue === undefined) return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    displayedValue.value = `${formatNumber(props.numericValue)}${props.numericSuffix ?? ''}`
    return
  }

  const startedAt = performance.now()
  const duration = 620
  const update = (now: number): void => {
    const progress = Math.min((now - startedAt) / duration, 1)
    const eased = 1 - (1 - progress) ** 3
    displayedValue.value = `${formatNumber(Math.round(props.numericValue! * eased))}${props.numericSuffix ?? ''}`
    if (progress < 1) frame = requestAnimationFrame(update)
  }
  frame = requestAnimationFrame(update)
}

onMounted(() => {
  if (props.numericValue === undefined || !metricElement.value) return
  if (typeof window.IntersectionObserver !== 'function') {
    animate()
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      animate()
      observer?.disconnect()
    },
    { threshold: 0.5 },
  )
  observer.observe(metricElement.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="metricElement" class="proof-metric">
    <span v-if="numericValue !== undefined" aria-hidden="true">{{ displayedValue }}</span>
    <span v-else aria-hidden="true">{{ value }}</span>
    <span class="sr-only">{{ value }}</span>
  </span>
</template>
