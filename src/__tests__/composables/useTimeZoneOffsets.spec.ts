import { describe, expect, it } from 'vitest'

import { formatUtcOffset } from '@/composables/useTimeZoneOffsets'

describe('formatUtcOffset', () => {
  it('formats Riga standard time as UTC+2', () => {
    expect(formatUtcOffset('Europe/Riga', new Date('2026-01-15T12:00:00Z'))).toBe('UTC+2')
  })

  it('formats Riga daylight-saving time as UTC+3', () => {
    expect(formatUtcOffset('Europe/Riga', new Date('2026-07-15T12:00:00Z'))).toBe('UTC+3')
  })
})
