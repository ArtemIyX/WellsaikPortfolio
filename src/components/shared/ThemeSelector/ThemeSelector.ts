import type { ThemePreference } from '@/composables/useTheme'

export type ThemeSelectorPresentation = 'select' | 'segmented'

export interface ThemeSelectorProps {
  modelValue: ThemePreference
  presentation?: ThemeSelectorPresentation
  label?: string
  compact?: boolean
}

export const themeOptions: readonly { value: ThemePreference; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]
