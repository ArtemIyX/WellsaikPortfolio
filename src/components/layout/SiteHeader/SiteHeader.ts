import type { ThemePreference } from '@/composables/useTheme'
import type { NavigationItem } from '@/content/home'

export interface SiteHeaderProps {
  theme: ThemePreference
  items: readonly NavigationItem[]
  brandLabel: string
}
