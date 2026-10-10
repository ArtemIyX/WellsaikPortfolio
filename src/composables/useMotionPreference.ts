import { computed, onBeforeUnmount, onMounted, ref, type ComputedRef } from 'vue'

export type MotionMode = 'full' | 'reduced'

export interface MotionPreference {
  mode: ComputedRef<MotionMode>
  reduced: ComputedRef<boolean>
  pageVisible: Readonly<typeof pageVisible>
  finePointer: Readonly<typeof finePointer>
  reducedData: Readonly<typeof reducedData>
}

const pageVisible = ref(true)
const finePointer = ref(false)
const reducedData = ref(false)

export const useMotionPreference = (): MotionPreference => {
  const systemReduced = ref(false)
  let mediaQuery: MediaQueryList | undefined
  let onMediaChange: ((event: MediaQueryListEvent) => void) | undefined
  let handleVisibilityChange: (() => void) | undefined

  const mode = computed<MotionMode>(() =>
    document.documentElement.dataset.motion === 'reduced' || systemReduced.value
      ? 'reduced'
      : 'full',
  )
  const reduced = computed(() => mode.value === 'reduced')

  const updateCapabilities = (): void => {
    finePointer.value = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false
    reducedData.value =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ??
      false
  }

  onMounted(() => {
    mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    systemReduced.value = mediaQuery?.matches ?? false
    onMediaChange = (event) => {
      systemReduced.value = event.matches
    }
    mediaQuery?.addEventListener('change', onMediaChange)
    document.documentElement.dataset.motion = systemReduced.value ? 'reduced' : 'full'
    updateCapabilities()

    handleVisibilityChange = (): void => {
      pageVisible.value = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('resize', updateCapabilities, { passive: true })
  })

  onBeforeUnmount(() => {
    if (mediaQuery && onMediaChange) mediaQuery.removeEventListener('change', onMediaChange)
    if (handleVisibilityChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('resize', updateCapabilities)
  })

  return { mode, reduced, pageVisible, finePointer, reducedData }
}
