export type UiSectionElement = 'section' | 'div' | 'article'
export type UiSectionSpacing = 'compact' | 'default' | 'hero'
export type UiSectionWidth = 'full' | 'content' | 'reading'
export type UiSectionSurface = 'transparent' | 'default' | 'muted'
export type UiSectionDivider = 'none' | 'top' | 'bottom' | 'both'

export interface UiSectionProps {
  as?: UiSectionElement
  id?: string
  spacing?: UiSectionSpacing
  width?: UiSectionWidth
  surface?: UiSectionSurface
  divider?: UiSectionDivider
  labelledby?: string
}
