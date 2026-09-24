import type { HeroContent } from '@/content/home'
import type { ThemePreference } from '@/composables/useTheme'

export interface HeroViewProps {
  content: HeroContent
  theme: ThemePreference
}
