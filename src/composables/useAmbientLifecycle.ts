import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export interface AmbientLifecycleOptions {
  maxCycles?: number
  rootMargin?: string
}

export const useAmbientLifecycle = (
  target: Ref<HTMLElement | null>,
  options: AmbientLifecycleOptions = {},
): { active: Readonly<Ref<boolean>>; cycle: () => void } => {
  const active = ref(false)
  const cycles = ref(0)
  let observer: IntersectionObserver | undefined
  let handleVisibility: (() => void) | undefined

  const cycle = (): void => {
    cycles.value += 1
    if (cycles.value >= (options.maxCycles ?? 2)) active.value = false
  }

  onMounted(() => {
    const updateVisibility = (): void => {
      active.value = !document.hidden && cycles.value < (options.maxCycles ?? 2)
    }
    handleVisibility = updateVisibility
    document.addEventListener('visibilitychange', updateVisibility)

    if (typeof window.IntersectionObserver !== 'function') {
      active.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        active.value = Boolean(entry?.isIntersecting) && !document.hidden
      },
      { rootMargin: options.rootMargin ?? '0px 0px -10% 0px' },
    )
    if (target.value) observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    if (handleVisibility) document.removeEventListener('visibilitychange', handleVisibility)
  })

  return { active, cycle }
}
