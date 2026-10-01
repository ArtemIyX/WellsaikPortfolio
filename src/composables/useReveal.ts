import { onBeforeUnmount, onMounted, ref, type ComponentPublicInstance, type Ref } from 'vue'

export interface UseRevealOptions {
  enabled?: boolean
  threshold?: number
  rootMargin?: string
}

type RevealTarget = HTMLElement | ComponentPublicInstance | null

const resolveElement = (target: RevealTarget): HTMLElement | null => {
  if (target instanceof HTMLElement) return target

  return target?.$el instanceof HTMLElement ? target.$el : null
}

export const useReveal = (
  target: Ref<RevealTarget>,
  options: UseRevealOptions = {},
): { isRevealed: Readonly<Ref<boolean>> } => {
  const isRevealed = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!options.enabled) return

    if (
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false) ||
      typeof window.IntersectionObserver !== 'function'
    ) {
      isRevealed.value = true
      return
    }

    const element = resolveElement(target.value)

    if (!element) {
      isRevealed.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        isRevealed.value = true
        observer?.disconnect()
      },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' },
    )
    observer.observe(element)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { isRevealed }
}
