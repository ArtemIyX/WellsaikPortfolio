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

export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProjectContent {
  id: string
  number: string
  category: string
  title: string
  summary: string
  problem: string
  role: string
  outcome: string
  technologies: readonly string[]
  image: ProjectImage
  liveAction: NavigationItem
  sourceAction: NavigationItem
}

export interface FeaturedProjectsContent {
  eyebrow: string
  title: string
  introduction: string
  projects: readonly ProjectContent[]
}

export const homeBrandLabel = 'Developer Name'

export const homeNavigation: readonly NavigationItem[] = [
  { label: 'Home', kind: 'route', to: { name: 'home', hash: '#hero' } },
  { label: 'Projects', kind: 'route', to: { name: 'home', hash: '#projects' } },
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

// Development placeholder content. Replace every value and demonstration link before launch.
export const featuredProjectsContent: FeaturedProjectsContent = {
  eyebrow: 'Selected work',
  title: 'A few projects that show how I approach product development.',
  introduction:
    'Placeholder introduction explaining that these projects were selected to demonstrate problem solving, technical decisions, and delivery.',
  projects: [
    {
      id: 'project-alpha',
      number: '01',
      category: 'Product application',
      title: 'Project Alpha',
      summary: 'Placeholder summary of a web product created for a specific user need.',
      problem: 'Placeholder problem describing the user or business challenge.',
      role: "Placeholder role describing the developer's direct ownership and collaboration.",
      outcome:
        'Placeholder outcome describing a result without presenting an invented metric as fact.',
      technologies: ['TypeScript', 'Vue', 'API integration', 'Testing'],
      image: {
        src: '/images/projects/project-alpha-placeholder.svg',
        alt: 'Placeholder interface preview for Project Alpha',
        width: 1200,
        height: 750,
      },
      liveAction: {
        label: 'Preview placeholder',
        kind: 'href',
        href: 'https://example.com',
        external: true,
        newTab: true,
      },
      sourceAction: {
        label: 'Source placeholder',
        kind: 'href',
        href: 'https://example.com',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'project-beta',
      number: '02',
      category: 'Platform engineering',
      title: 'Project Beta',
      summary: 'Placeholder summary of a reliable service or internal platform.',
      problem: 'Placeholder problem describing a workflow, scale, or reliability constraint.',
      role: 'Placeholder role describing architecture and implementation responsibility.',
      outcome: 'Placeholder outcome describing the intended operational improvement.',
      technologies: ['Node.js', 'PostgreSQL', 'Observability', 'CI/CD'],
      image: {
        src: '/images/projects/project-beta-placeholder.svg',
        alt: 'Placeholder service architecture preview for Project Beta',
        width: 1200,
        height: 750,
      },
      liveAction: {
        label: 'Preview placeholder',
        kind: 'href',
        href: 'https://example.com',
        external: true,
        newTab: true,
      },
      sourceAction: {
        label: 'Source placeholder',
        kind: 'href',
        href: 'https://example.com',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'project-gamma',
      number: '03',
      category: 'Developer experience',
      title: 'Project Gamma',
      summary: 'Placeholder summary of a reusable system that improves consistency or delivery.',
      problem: 'Placeholder problem describing fragmented UI or development workflows.',
      role: 'Placeholder role describing component, documentation, and adoption work.',
      outcome: 'Placeholder outcome describing the intended quality or productivity benefit.',
      technologies: ['Vue', 'TypeScript', 'Accessibility', 'Documentation'],
      image: {
        src: '/images/projects/project-gamma-placeholder.svg',
        alt: 'Placeholder developer tool preview for Project Gamma',
        width: 1200,
        height: 750,
      },
      liveAction: {
        label: 'Preview placeholder',
        kind: 'href',
        href: 'https://example.com',
        external: true,
        newTab: true,
      },
      sourceAction: {
        label: 'Source placeholder',
        kind: 'href',
        href: 'https://example.com',
        external: true,
        newTab: true,
      },
    },
  ],
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
