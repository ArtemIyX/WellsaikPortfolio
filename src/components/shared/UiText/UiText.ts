export type UiTextElement = 'p' | 'span' | 'div' | 'strong' | 'small' | 'h1' | 'h2' | 'h3' | 'h4'
export type UiTextRole = 'display' | 'heading' | 'body' | 'label' | 'caption' | 'data'
export type UiTextTone = 'default' | 'muted' | 'subtle' | 'accent' | 'positive' | 'warning' | 'danger'
export type UiTextWeight = 'regular' | 'medium' | 'bold'
export type UiTextAlign = 'start' | 'center' | 'end'
export type UiTextMaxWidth = 'none' | 'reading' | 'compact'

export interface UiTextProps {
  as?: UiTextElement
  role?: UiTextRole
  tone?: UiTextTone
  weight?: UiTextWeight
  align?: UiTextAlign
  maxWidth?: UiTextMaxWidth
}
