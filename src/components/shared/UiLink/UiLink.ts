import type { RouteLocationRaw } from 'vue-router'

export type UiLinkVariant = 'inline' | 'standalone' | 'button-primary' | 'button-secondary'
export type UiLinkDownload = boolean | string

interface UiLinkCommonProps {
  variant?: UiLinkVariant
  external?: boolean
  newTab?: boolean
  download?: UiLinkDownload
  disabled?: boolean
}

export type UiLinkProps = UiLinkCommonProps &
  ({ to: RouteLocationRaw; href?: never } | { to?: never; href: string })

export const isExternalHref = (href: string | undefined): boolean =>
  href?.startsWith('http://') === true || href?.startsWith('https://') === true
