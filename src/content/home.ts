import type { RouteLocationRaw } from 'vue-router'

export interface RouteNavigationItem {
  label: string
  kind: 'route'
  to: RouteLocationRaw
}

export interface HrefNavigationItem {
  label: string
  kind: 'href'
  href: string
  external?: boolean
  newTab?: boolean
}

export type NavigationItem = RouteNavigationItem | HrefNavigationItem

export interface HeroContent {
  eyebrow: string
  title: string
  summary: string
  availability: string
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  primaryAction: NavigationItem
  secondaryAction: NavigationItem
}

export interface AboutFact {
  label: string
  value: string
}

export interface AboutContent {
  eyebrow: string
  title: string
  paragraphs: readonly string[]
  facts: readonly AboutFact[]
  skills: readonly string[]
  personalNote: string
  contactAction: NavigationItem
}

export const homeBrandLabel = 'Developer Name'

export const homeNavigation: readonly NavigationItem[] = [
  { label: 'Home', kind: 'route', to: { name: 'home', hash: '#hero' } },
  { label: 'About', kind: 'route', to: { name: 'home', hash: '#about' } },
  { label: 'Contact', kind: 'href', href: 'mailto:developer@example.com' },
]

export const heroContent: HeroContent = {
  eyebrow: 'Software Developer · City, Country',
  title: 'I build thoughtful digital products for people and businesses.',
  summary:
    "Placeholder introduction describing the developer's focus, approach, and the value their work creates.",
  availability: 'Available for selected opportunities',
  imageSrc: '/images/portrait-placeholder.svg',
  imageAlt: `Placeholder portrait for ${homeBrandLabel}`,
  imageWidth: 800,
  imageHeight: 1000,
  primaryAction: {
    label: 'Get in touch',
    kind: 'href',
    href: 'mailto:developer@example.com',
  },
  secondaryAction: {
    label: 'View code profile',
    kind: 'href',
    href: 'https://example.com',
    external: true,
    newTab: true,
  },
}

export const aboutContent: AboutContent = {
  eyebrow: 'About',
  title: 'A developer focused on useful, carefully made software.',
  paragraphs: [
    "Placeholder biography describing the developer's current focus and the kinds of products they enjoy building.",
    'Placeholder explanation of how the developer approaches collaboration, accessibility, maintainability, and thoughtful delivery.',
  ],
  facts: [
    { label: 'Based in', value: 'City, Country' },
    { label: 'Primary focus', value: 'Product development' },
    { label: 'Currently', value: 'Open to selected opportunities' },
  ],
  skills: [
    'Frontend systems',
    'Backend services',
    'Accessible interfaces',
    'Design systems',
    'Testing strategy',
    'Performance',
    'Developer experience',
    'Technical collaboration',
  ],
  personalNote:
    'Outside of development, this placeholder can introduce one or two interests that add personality without becoming a full biography.',
  contactAction: {
    label: 'Start a conversation',
    kind: 'href',
    href: 'mailto:developer@example.com',
  },
}
