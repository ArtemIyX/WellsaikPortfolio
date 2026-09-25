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
  imageLightSrc: string
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
  personalNote: string
  availability: string
  contactAction: NavigationItem
}

export interface ExperiencePeriod {
  label: string
  startDate?: string
  endDate?: string
}

export interface ExperienceEntry {
  id: string
  period: ExperiencePeriod
  organization: string
  role: string
  location: string
  summary: string
  achievements: readonly string[]
  technologies: readonly string[]
}

export interface SkillItem {
  name: string
  level?: string
}

export interface SkillGroup {
  id: string
  title: string
  items: readonly SkillItem[]
}

export interface ExperienceSkillsContent {
  eyebrow: string
  title: string
  introduction: string
  experienceHeading: string
  skillsHeading: string
  entries: readonly ExperienceEntry[]
  skillGroups: readonly SkillGroup[]
}

export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProjectDetailLabels {
  problem: string
  role: string
  outcome: string
  technologies: string
}

export interface ProjectDetailContent {
  text?: string
  items?: readonly string[]
}

export interface ProjectContent {
  id: string
  number: string
  category: string
  title: string
  summary: string
  problem: ProjectDetailContent
  role: ProjectDetailContent
  outcome: ProjectDetailContent
  technologies: readonly string[]
  labels?: Partial<ProjectDetailLabels>
  image: ProjectImage
  liveAction: NavigationItem
  sourceAction?: NavigationItem
}

export const defaultProjectDetailLabels: ProjectDetailLabels = {
  problem: 'Problem',
  role: 'Role',
  outcome: 'Outcome',
  technologies: 'Technologies',
}

export interface FeaturedProjectsContent {
  eyebrow: string
  title: string
  introduction: string
  projects: readonly ProjectContent[]
}

export const homeBrandLabel = 'Artem Podorozhko'
export const homeFooterName = 'Name Surname'
export const homeFooterOccupation = 'Unreal Engine & C++ Engineer · Riga, Latvia'
export const email = 'artem.podorozhko@outlook.com'
export const github = 'https://github.com/ArtemIyX'

export const homeNavigation: readonly NavigationItem[] = [
  { label: 'Home', kind: 'route', to: { name: 'home', hash: '#hero' } },
  { label: 'Projects', kind: 'route', to: { name: 'home', hash: '#projects' } },
  { label: 'Experience', kind: 'route', to: { name: 'home', hash: '#experience' } },
  { label: 'About', kind: 'route', to: { name: 'home', hash: '#about' } },
]

export const homeFooterActions: readonly NavigationItem[] = [
  { label: 'Email', kind: 'href', href: `mailto:${email}` },
  {
    label: 'GitHub',
    kind: 'href',
    href: github,
    external: true,
    newTab: true,
  },
  {
    label: 'LinkedIn',
    kind: 'href',
    href: 'https://example.com',
    external: true,
    newTab: true,
  },
  {
    label: 'Steam',
    kind: 'href',
    href: 'https://example.com',
    external: true,
    newTab: true,
  },
]

export const heroContent: HeroContent = {
  eyebrow: 'Unreal Engine & C++ Engineer · Riga, Latvia',
  title: 'Nothing can stop an idea whose time has come',
  summary:
    'I develop games in Unreal Engine, with a primary focus on client-side optimization and pushing the engine to its practical limits. I also build bespoke full-stack applications for clients, using Vue.js with C# or Rust backends.',
  availability: 'Employed full-time',
  imageSrc: '/images/portrait.webp',
  imageLightSrc: '/images/portrait_light.webp',
  imageAlt: `Portrait of ${homeBrandLabel}`,
  imageWidth: 1200,
  imageHeight: 1600,
  primaryAction: {
    label: 'Get in touch',
    kind: 'href',
    href: `mailto:${email}`,
  },
  secondaryAction: {
    label: 'View code profile',
    kind: 'href',
    href: github,
    external: true,
    newTab: true,
  },
}

// Development placeholder content. Replace every value and demonstration link before launch.
export const featuredProjectsContent: FeaturedProjectsContent = {
  eyebrow: '',
  title: 'A few projects that show how I turn complex ideas into working systems',
  introduction:
    'A selection of projects that show how I turn game ideas into working products - from early concepts and gameplay systems to technical implementation, iteration, and delivery.',
  projects: [
    {
      id: 'endless-war-mmo-rpg',
      number: '01',
      category: 'MMO RPG Game',
      title: 'Endless War',
      summary: 'Client for an MMO RPG game targeting the Chinese market.',
      problem: {
        items: [
          'ECS',
          'Multithreaded custom TCP networking',
          'Moving asynchronous physics',
          'Unique skeletal-mesh batch GPU rendering',
        ],
      },
      role: { text: 'Lead Unreal Engine Client Developer' },
      outcome: {
        text: 'Delivered a fully functional, smooth gameplay client while coordinating closely with 3D content creators to integrate assets into a cohesive player experience.',
      },
      technologies: [
        'Unreal Engine',
        'Vue',
        'JS',
        'CSS',
        'C++',
        'ECS/MASS',
        'Networking/TCP',
        'Multithreading',
      ],
      labels: {
        problem: '10k entities',
        outcome: 'User experience',
        technologies: 'Tech stack',
      },
      image: {
        src: '/images/projects/endless-war.webp',
        alt: 'Gameplay preview from Endless War',
        width: 1200,
        height: 750,
      },
      liveAction: {
        label: 'Visit game',
        kind: 'href',
        href: 'https://newjourney.online/en/',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'riftborn',
      number: '02',
      category: 'Multiplayer first-person hack-and-slash',
      title: 'Riftborn',
      summary:
        'A multiplayer first-person hack-and-slash built around three-team combat, distinct classes, weapons, custom abilities, and varied game modes.',
      problem: {
        items: [
          'Three-team multiplayer combat',
          'Distinct classes, weapons, and custom abilities',
          'Multiple game modes for varied team play',
        ],
      },
      role: { text: 'Unreal Engine Developer' },
      outcome: {
        text: 'Released in public alpha and gathered substantial player feedback. Development paused after a change in direction because the available resources could not support the content needed for a full release; a follow-up game is planned.',
      },
      technologies: ['Unreal Engine', 'Steam', 'Multiplayer', 'VOIP'],
      labels: {
        problem: 'Game systems',
        outcome: 'Public alpha',
        technologies: 'Tech stack',
      },
      image: {
        src: '/images/projects/riftborn.webp',
        alt: 'Gameplay preview from Riftborn',
        width: 1200,
        height: 750,
      },
      liveAction: {
        label: 'Watch trailer',
        kind: 'href',
        href: 'https://youtu.be/m4f0rsE2DLQ',
        external: true,
        newTab: true,
      },
      sourceAction: {
        label: 'View on Steam',
        kind: 'href',
        href: 'https://store.steampowered.com/app/3421920/Riftborn/',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'rockbelt',
      number: '03',
      category: '8-player sci-fi turn-based game',
      title: 'Rockbelt',
      summary:
        'A completed eight-player sci-fi turn-based multiplayer game, built solo in four focused work weeks to prove that a fully finished game could be shipped quickly.',
      problem: {
        items: [
          'Eight-player multiplayer turn-based gameplay',
          'Ten rounds of playtesting with real players',
          'Original sci-fi world, gameplay, and visual direction',
        ],
      },
      role: { text: 'Solo developer — gameplay, networking, and 3D art' },
      outcome: {
        text: 'Shipped as a complete solo project after ten rounds of player testing, demonstrating a focused end-to-end game-development process from concept through release.',
      },
      technologies: ['Unreal Engine', 'Custom TCP networking', 'LAN multiplayer', 'Blender'],
      labels: {
        problem: 'Development scope',
        technologies: 'Tech stack',
      },
      image: {
        src: '/images/projects/rockbelt.webp',
        alt: 'Gameplay preview from Rockbelt',
        width: 1200,
        height: 750,
      },
      liveAction: {
        label: 'Play on itch.io',
        kind: 'href',
        href: 'https://wellsaik.itch.io/rockbelt',
        external: true,
        newTab: true,
      },
    },
  ],
}

export const experienceSkillsContent: ExperienceSkillsContent = {
  eyebrow: '',
  title: 'A placeholder record of responsibilities, growth, and technical focus.',
  introduction:
    'Placeholder introduction explaining how professional experience and practical skills will be summarized here.',
  experienceHeading: 'Experience',
  skillsHeading: 'Skills',
  entries: [
    {
      id: 'new-journey-studio',
      period: { label: '01/2024 — Present' },
      organization: 'New Journey Studio',
      role: 'Unreal Engine C++ Engineer',
      location: 'Riga, Latvia',
      summary: 'Core and Gameplay Engineer for a large-scale UE5 MMO RPG.',
      achievements: [
        'Designed reusable Unreal Engine C++ modules, plugins, and components for use across multiple gameplay systems.',
        'Architected performance-critical UE5 systems supporting 10,000+ replicated AI entities and 1,000+ concurrent players at a stable 60 FPS.',
        'Designed and maintained a custom ECS framework for large-scale simulation.',
        'Developed a custom TCP networking layer integrated with UE5 networking.',
        'Built multithreaded gameplay systems using the UE Task Graph, including abilities and asynchronous physics queries.',
        'Profiled and optimized CPU and network bottlenecks across gameplay and simulation systems.',
      ],
      technologies: [
        'Unreal Engine 5',
        'C++',
        'ECS',
        'TCP Networking',
        'UE Task Graph',
        'Replication',
        'Performance Profiling',
      ],
    },
    {
      id: 'placeholder-experience-b',
      period: { label: '20XX — 20XX' },
      organization: 'Placeholder Organization B',
      role: 'Role Title Two',
      location: 'City, Country · Work arrangement',
      summary: "Placeholder summary of the role's responsibilities and product area.",
      achievements: [
        'Placeholder achievement describing contribution to a product or service outcome.',
        'Placeholder achievement describing a thoughtful technical implementation.',
        'Placeholder achievement describing collaboration across a delivery process.',
      ],
      technologies: ['Technology C', 'Technology D', 'Practice B'],
    },
    {
      id: 'placeholder-experience-c',
      period: { label: '20XX — 20XX' },
      organization: 'Placeholder Organization C',
      role: 'Role Title Three',
      location: 'City, Country · Work arrangement',
      summary:
        'Placeholder summary of an earlier role, internship, freelance period, or equivalent experience.',
      achievements: [
        'Placeholder achievement describing an early contribution to a useful outcome.',
        'Placeholder achievement describing learning through practical delivery and feedback.',
      ],
      technologies: ['Technology E', 'Tool A', 'Practice C'],
    },
  ],
  skillGroups: [
    {
      id: 'languages',
      title: 'Languages',
      items: [
        { name: 'English', level: 'Upper-intermediate' },
        { name: 'Latvian', level: 'Elementary' },
        { name: 'Ukrainian', level: 'Native' },
        { name: 'Russian', level: 'Fluent' },
      ],
    },
    {
      id: 'unreal-engine',
      title: 'Unreal Engine',
      items: [
        { name: 'Gameplay Framework' },
        { name: 'Blueprint/C++' },
        { name: 'Multiplayer' },
        { name: 'UMG' },
        { name: 'GAS' },
        { name: 'ECS / MASS' },
        { name: 'Subsystems' },
        { name: 'TCP/UDP' },
        { name: 'HTTP/WebSocket' },
      ],
    },
    {
      id: 'web-game-ui',
      title: 'Web Game UI',
      items: [{ name: 'Vue.js / TypeScript' }, { name: 'HTML / CSS' }, { name: 'Protobuf / JSON' }],
    },
    {
      id: 'backend',
      title: 'Backend',
      items: [
        { name: 'C# / ASP.NET / Entity Framework' },
        { name: 'Rust / Tauri' },
        { name: 'C++' },
      ],
    },
    {
      id: 'game-tools-delivery',
      title: 'Game Tools & Delivery',
      items: [
        { name: 'Git' },
        { name: 'Steamworks' },
        { name: 'Blender' },
        { name: 'Build automation / CI' },
        { name: 'Profiling & optimization' },
      ],
    },
    {
      id: 'engineering-practices',
      title: 'Engineering Practices',
      items: [
        { name: 'Unit Testing' },
        { name: 'Debugging' },
        { name: 'Performance optimization' },
        { name: 'Networking architecture' },
        { name: 'Technical documentation' },
        { name: 'Code review' },
      ],
    },
  ],
}

export const aboutContent: AboutContent = {
  eyebrow: '',
  title: 'A developer focused on useful, carefully made software.',
  paragraphs: [
    "Placeholder biography describing the developer's current focus and the kinds of products they enjoy building.",
    'Placeholder explanation of how the developer approaches collaboration, accessibility, maintainability, and thoughtful delivery.',
  ],
  personalNote:
    'Outside of development, this placeholder can introduce one or two interests that add personality without becoming a full biography.',
  availability: 'Placeholder availability status',
  contactAction: {
    label: 'Start a conversation',
    kind: 'href',
    href: `mailto:${email}`,
  },
  facts: [
    { label: 'Based in', value: 'City, Country' },
    { label: 'Primary focus', value: 'Product development' },
    { label: 'Work preference', value: 'Placeholder work preference' },
    { label: 'Time zone', value: 'UTC±00:00 placeholder' },
    { label: 'Response', value: 'Placeholder response expectation' },
  ],
}
