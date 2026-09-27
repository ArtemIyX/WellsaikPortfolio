import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export interface UseRevealOptions {
  threshold?: number
  rootMargin?: string
}

export const useReveal = (
  target: Ref<HTMLElement | null>,
  options: UseRevealOptions = {},
): { isRevealed: Readonly<Ref<boolean>> } => {
  const isRevealed = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false) ||
      !('IntersectionObserver' in window)
    ) {
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
    if (target.value) observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { isRevealed }
}
