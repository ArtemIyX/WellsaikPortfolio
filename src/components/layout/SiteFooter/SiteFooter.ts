import type { NavigationItem } from '@/content/home'

export interface SiteFooterProps {
  actions: readonly NavigationItem[]
  name: string
  occupation: string
}
