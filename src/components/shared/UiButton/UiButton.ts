export type UiButtonVariant = 'primary' | 'secondary' | 'quiet' | 'danger'
export type UiButtonSize = 'small' | 'medium' | 'large'
export type UiButtonType = 'button' | 'submit' | 'reset'

export interface UiButtonProps {
  variant?: UiButtonVariant
  size?: UiButtonSize
  type?: UiButtonType
  disabled?: boolean
  loading?: boolean
  pressed?: boolean
  fullWidth?: boolean
}

export const uiButtonDefaults = {
  variant: 'secondary',
  size: 'medium',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
} as const satisfies Required<Omit<UiButtonProps, 'pressed'>>
