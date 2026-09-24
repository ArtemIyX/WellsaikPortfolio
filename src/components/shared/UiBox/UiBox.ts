export type UiBoxElement = 'div' | 'article' | 'aside' | 'figure'
export type UiBoxVariant = 'surface' | 'muted' | 'outline' | 'accent'
export type UiBoxPadding = 'none' | 'small' | 'medium' | 'large'
export type UiBoxRadius = 'none' | 'small' | 'medium'
export type UiBoxDensity = 'comfortable' | 'compact'

export interface UiBoxProps {
  as?: UiBoxElement
  variant?: UiBoxVariant
  padding?: UiBoxPadding
  radius?: UiBoxRadius
  density?: UiBoxDensity
}
