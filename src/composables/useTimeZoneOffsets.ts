import { onMounted, onUnmounted, ref, type Ref } from 'vue'

const refreshIntervalMilliseconds = 60 * 60 * 1000

export const formatUtcOffset = (timeZone: string, date = new Date()): string | undefined => {
  try {
    const offset = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset',
    })
      .formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value
    const match = offset?.match(/^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/)

    if (!match) return undefined

    const sign = match[1]
    const hours = match[2]
    const minutes = match[3] ?? '00'

    if (!sign || !hours) return undefined

    const normalizedHours = Number.parseInt(hours, 10)
    return minutes === '00'
      ? `UTC${sign}${normalizedHours}`
      : `UTC${sign}${normalizedHours}:${minutes}`
  } catch {
    return undefined
  }
}

export const useTimeZoneOffsets = (
  timeZones: readonly string[],
): Readonly<Ref<Record<string, string>>> => {
  const offsets = ref<Record<string, string>>({})

  const refreshOffsets = (): void => {
    const nextOffsets: Record<string, string> = {}

    for (const timeZone of timeZones) {
      const offset = formatUtcOffset(timeZone)
      if (offset) nextOffsets[timeZone] = offset
    }

    offsets.value = nextOffsets
  }

  refreshOffsets()

  let refreshTimer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    refreshOffsets()
    refreshTimer = setInterval(refreshOffsets, refreshIntervalMilliseconds)
  })

  onUnmounted(() => {
    if (refreshTimer !== undefined) clearInterval(refreshTimer)
  })

  return offsets
}
