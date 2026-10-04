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
  imageSrcSet?: string
  imageLightSrcSet?: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  primaryAction: NavigationItem
  secondaryAction: NavigationItem
}

export interface ProofPoint {
  value: string
  numericValue?: number
  numericSuffix?: string
  label: string
  detail: string
  action: RouteNavigationItem
  analyticsId: string
}

export interface AboutFact {
  label: string
  value: string
  timeZone?: string
}

export interface AboutContent {
  eyebrow: string
  title: string
  paragraphs: readonly string[]
  facts: readonly AboutFact[]
  personalNote: string
  availability?: string
  contactAction: NavigationItem
}

export interface ExperiencePeriod {
  label: string
  startDate?: string
  endDate?: string
}

export type ExperienceStatus = 'current' | 'past'

export interface ExperienceEvidence {
  value: string
  label: string
}

export interface ExperienceEntry {
  id: string
  status: ExperienceStatus
  period: ExperiencePeriod
  organization: string
  organizationUrl?: string
  applicationUrl?: string
  applicationLabel?: string
  role: string
  location?: string
  engagement?: string
  summary: string
  evidence?: readonly ExperienceEvidence[]
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
  srcSet?: string
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
  caseStudyAction?: RouteNavigationItem
  videoEmbedUrl?: string
  confidentialityNote?: string
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

export interface PetProjectContent {
  id: string
  title: string
  summary: string
  whyExists?: string
  capability?: string
  status?: string
  category?: 'Rendering' | 'Networking' | 'Blueprint tooling' | 'Architecture'
  featured?: boolean
  metadata: readonly string[]
  githubAction: HrefNavigationItem
}

export interface PetProjectsContent {
  title: string
  introduction: string
  projects: readonly PetProjectContent[]
}

export const homeBrandLabel = 'Artem Podorozhko'
export const homeFooterName = 'Artem Podorozhko'
export const homeFooterOccupation = 'Unreal Engine & C++ Engineer · Riga, Latvia'
export const email = 'artem.podorozhko@outlook.com'
export const github = 'https://github.com/ArtemIyX'

export const homeNavigation: readonly NavigationItem[] = [
  { label: 'Home', kind: 'route', to: { name: 'home', hash: '#hero' } },
  { label: 'Projects', kind: 'route', to: { name: 'home', hash: '#projects' } },
  { label: 'Experience', kind: 'route', to: { name: 'home', hash: '#experience' } },
  { label: 'Pet Projects', kind: 'route', to: { name: 'home', hash: '#pet-projects' } },
  { label: 'About', kind: 'route', to: { name: 'home', hash: '#about' } },
]

export const homeFooterActions: readonly NavigationItem[] = [
  { label: 'Email', kind: 'href', href: `mailto:${email}` },
  { label: 'CV', kind: 'href', href: '/Artem-Podorozhko-CV.pdf', newTab: true },
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
    href: 'https://www.linkedin.com/in/artem-podorozhko/',
    external: true,
    newTab: true,
  },
  {
    label: 'Steam',
    kind: 'href',
    href: 'https://store.steampowered.com/app/3421920/Riftborn/',
    external: true,
    newTab: true,
  },
]

export const heroContent: HeroContent = {
  eyebrow: 'Unreal Engine & C++ Engineer · Riga, Latvia',
  title: 'Unreal Engine systems built for scale, speed, and play',
  summary:
    'I design and ship Unreal Engine gameplay, networking, and simulation systems, with a focus on measurable performance at scale. I also deliver focused full-stack tools with Vue.js and C# or Rust backends.',
  availability: 'Open to selective freelance work',
  imageSrc: '/images/portrait.webp',
  imageLightSrc: '/images/portrait_light.webp',
  imageSrcSet:
    '/images/generated/portrait-480.webp 480w, /images/generated/portrait-768.webp 768w, /images/generated/portrait-1200.webp 1200w',
  imageLightSrcSet:
    '/images/generated/portrait_light-480.webp 480w, /images/generated/portrait_light-768.webp 768w, /images/generated/portrait_light-1200.webp 1200w',
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

export const proofPoints: readonly ProofPoint[] = [
  {
    value: '10.000+',
    numericValue: 10000,
    numericSuffix: '+',
    label: 'Replicated entities',
    detail: 'Large-scale MMO simulation',
    action: {
      label: 'View scale evidence',
      kind: 'route',
      to: {
        name: 'project-case-study',
        params: { projectId: 'endless-war-mmo-rpg' },
        hash: '#evidence',
      },
    },
    analyticsId: 'proof-replicated-entities',
  },
  {
    value: '1.000+',
    numericValue: 1000,
    numericSuffix: '+',
    label: 'Concurrent players',
    detail: 'Custom network solution',
    action: {
      label: 'View networking evidence',
      kind: 'route',
      to: {
        name: 'project-case-study',
        params: { projectId: 'endless-war-mmo-rpg' },
        hash: '#architecture',
      },
    },
    analyticsId: 'proof-concurrent-players',
  },
  {
    value: 'GPU',
    label: 'Batched skeletal rendering',
    detail: 'Thousands of animated entities without per-entity AnimBPs',
    action: {
      label: 'View rendering evidence',
      kind: 'route',
      to: {
        name: 'project-case-study',
        params: { projectId: 'endless-war-mmo-rpg' },
        hash: '#architecture',
      },
    },
    analyticsId: 'proof-batched-rendering',
  },
  {
    value: '90 days',
    numericValue: 90,
    numericSuffix: ' days',
    label: 'From-scratch delivery pipeline',
    detail: 'Blank project to deployed simulator',
    action: {
      label: 'View delivery evidence',
      kind: 'route',
      to: { name: 'home', hash: '#experience' },
    },
    analyticsId: 'proof-delivery-pipeline',
  },
]

export const featuredProjectsContent: FeaturedProjectsContent = {
  eyebrow: 'Selected work',
  title: 'A few projects that show how I turn complex ideas into working systems',
  introduction:
    'A selection of projects showing how I turn game ideas into working products — from multiplayer architecture and simulation to technical implementation, iteration, and delivery.',
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
        srcSet:
          '/images/generated/endless-war-480.webp 480w, /images/generated/endless-war-768.webp 768w, /images/generated/endless-war-1200.webp 1200w',
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
      caseStudyAction: {
        label: 'Read case study',
        kind: 'route',
        to: { name: 'project-case-study', params: { projectId: 'endless-war-mmo-rpg' } },
      },
      confidentialityNote:
        'Client work: this page shares the public scope and engineering approach without exposing proprietary source or production data.',
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
        srcSet:
          '/images/generated/riftborn-480.webp 480w, /images/generated/riftborn-768.webp 768w, /images/generated/riftborn-1200.webp 1200w',
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
      caseStudyAction: {
        label: 'Read case study',
        kind: 'route',
        to: { name: 'project-case-study', params: { projectId: 'riftborn' } },
      },
      videoEmbedUrl: 'https://www.youtube.com/embed/m4f0rsE2DLQ',
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
        srcSet:
          '/images/generated/rockbelt-480.webp 480w, /images/generated/rockbelt-768.webp 768w, /images/generated/rockbelt-1200.webp 1200w',
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
      caseStudyAction: {
        label: 'Read case study',
        kind: 'route',
        to: { name: 'project-case-study', params: { projectId: 'rockbelt' } },
      },
    },
  ],
}

export const experienceSkillsContent: ExperienceSkillsContent = {
  eyebrow: '',
  experienceHeading: 'Experience',
  skillsHeading: 'Skills',
  entries: [
    {
      id: 'new-journey-studio',
      status: 'current',
      period: { label: '01/2024 — Present' },
      organization: 'New Journey Studio',
      organizationUrl: 'https://newjourney.online/en/',
      role: 'Unreal Engine C++ Engineer',
      location: 'China, Remote',
      summary: 'Core and Gameplay Engineer for a large-scale UE5 MMO RPG.',
      evidence: [
        { value: '10K+', label: 'replicated AI entities' },
        { value: '1K+', label: 'concurrent players' },
        { value: '60 FPS', label: 'stable simulation target' },
      ],
      achievements: [
        'Built reusable UE5 C++ modules, plugins, and components used across gameplay systems.',
        'Architected performance-critical simulation systems for 10,000+ replicated AI entities and 1,000+ concurrent players.',
        'Designed the custom ECS framework and TCP networking layer integrated with UE5 networking.',
        'Profiled CPU and network bottlenecks while building multithreaded abilities and asynchronous physics queries.',
      ],
      technologies: ['Unreal Engine 5', 'C++', 'ECS', 'TCP Networking', 'Replication'],
    },
    {
      id: 'vic-tec',
      status: 'past',
      period: { label: '06/2025 — 08/2025' },
      organization: 'Vic Tec',
      organizationUrl: 'https://www.victec.lv/',
      role: 'Game Developer',
      location: 'Riga, Latvia',
      engagement: 'Part-time contract',
      summary:
        'Independently designed and delivered a production UE5 naval training simulator in 90 days, from an empty project to deployed game.',
      evidence: [
        { value: '90 days', label: 'end-to-end delivery' },
        { value: '6-DOF', label: 'vessel dynamics model' },
        { value: 'UE5', label: 'production simulator' },
      ],
      achievements: [
        'Independently delivered the simulation architecture, gameplay, and physics entirely in C++.',
        'Developed a custom 6-DOF vessel dynamics and buoyancy model using Chaos Physics.',
        'Implemented sensor and weapons simulation systems and optimized deployment for ruggedized hardware.',
      ],
      technologies: [
        'Unreal Engine 5',
        'C++',
        'Chaos Physics',
        '6-DOF Vessel Dynamics',
        'Buoyancy',
      ],
    },
    {
      id: 'swiss-tech-capital',
      status: 'past',
      period: { label: '05/2024 — 07/2025' },
      organization: 'Swiss Tech Capital AG',
      organizationUrl: 'https://blockzero.rs/',
      role: 'Mobile Application Developer',
      location: 'Riga, Latvia',
      engagement: 'Part-time · Remote',
      summary:
        'Owned the entire lifecycle of a consumer-grade, cross-platform mobile application built in C# (.NET 6/7) and delivered to iOS and Android with .NET MAUI.',
      evidence: [
        { value: 'iOS + Android', label: 'store delivery' },
        { value: '.NET 6/7', label: 'application platform' },
        { value: '60 FPS', label: 'scrolling performance' },
      ],
      achievements: [
        'Owned the application architecture, CI/CD workflow, and App Store and Play Store release process.',
        'Built .NET MAUI Blazor Hybrid features and native iOS and Android integrations, including push notifications.',
        'Implemented certificate pinning, encrypted keychain and keystore storage, and OWASP MASVS controls.',
        'Improved scrolling performance through UI virtualization, incremental loading, image caching, and memory profiling.',
      ],
      technologies: ['C#', '.NET 6/7', '.NET MAUI', 'Blazor Hybrid', 'iOS / Android'],
      applicationUrl:
        'https://play.google.com/store/apps/details?id=com.blockzerowallet.app&hl=bs&pli=1',
      applicationLabel: 'View on Google Play',
    },
    {
      id: 'coffeee-io',
      status: 'past',
      period: { label: '07/2022 — 06/2023' },
      organization: 'Coffeee.io',
      organizationUrl: 'https://www.coffeee.io/',
      role: 'Unreal Engine Gameplay Programmer',
      location: 'Riga, Latvia',
      engagement: 'Remote',
      summary: 'Full-stack multiplayer developer.',
      evidence: [
        { value: '1K+', label: 'concurrent players' },
        { value: 'UE4', label: 'multiplayer gameplay' },
        { value: 'C# TCP', label: 'backend services' },
      ],
      achievements: [
        'Built production-ready Unreal Engine 4 gameplay experiences.',
        'Designed C# TCP microservices and authoritative game servers that synchronized 1,000+ concurrent players.',
        'Developed custom matchmaking and live-ops telemetry for a third-person shooter.',
      ],
      technologies: [
        'Unreal Engine 4',
        'C++',
        'C#',
        'TCP Networking',
        'Authoritative Game Servers',
      ],
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

export const petProjectsContent: PetProjectsContent = {
  title: 'Pet Projects',
  introduction:
    'Open-source Unreal Engine plugins and small tools I build to explore reusable systems, editor workflows, networking, and Blueprint integration.',
  projects: [
    {
      id: 'web-user-interface',
      title: 'Web User Interface',
      whyExists: 'Explores a maintainable bridge between web UI and Unreal runtime systems.',
      capability: 'CEF off-screen rendering with local WebSocket transport',
      status: 'Active plugin',
      category: 'Blueprint tooling',
      featured: true,
      summary:
        'Embeds CEF-powered web interfaces in Unreal Engine with off-screen rendering, local WebSocket transport, and Blueprint-friendly browser controls.',
      metadata: ['Unreal Engine', 'C++', 'CEF', 'WebSocket'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/WebUserInterfaceUnreal',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'blueprint-subsystems',
      title: 'Blueprint Subsystems',
      whyExists: 'Removes repetitive C++ scaffolding from subsystem experiments.',
      capability: 'Blueprint-defined subsystem registration',
      status: 'Reusable plugin',
      category: 'Blueprint tooling',
      summary:
        'Lets Blueprint authors define and register Unreal Engine subsystems without writing a dedicated C++ subsystem class.',
      metadata: ['Unreal Engine', 'C++', 'Blueprint support'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/BlueprintSubsystemsUnreal',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'replicated-object',
      title: 'Replicated Object',
      whyExists: 'Provides a focused base for network-aware UObject composition.',
      capability: 'Replicated UObjects and subobjects',
      status: 'Reusable plugin',
      category: 'Networking',
      summary:
        'Provides a reusable foundation for replicating network-supported UObjects and their subobjects in Unreal Engine.',
      metadata: ['Unreal Engine', 'C++', 'Networking'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/ReplicatedObjectUnreal',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'data-serializer',
      title: 'Data Serializer',
      whyExists: 'Makes complex data persistence available to Blueprint workflows.',
      capability: 'Map and structure serialization',
      status: 'Reusable plugin',
      category: 'Architecture',
      summary:
        'Offers utilities for serializing and deserializing Unreal data, including complex structures such as maps, with Blueprint support.',
      metadata: ['Unreal Engine', 'C++', 'Blueprint support'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/DataSerializerUnreal',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'async-blueprints',
      title: 'Async Blueprints',
      whyExists: 'Makes safe worker-thread experiments visible to gameplay authors.',
      capability: 'Thread dispatch with game-thread handoff',
      status: 'Experimental plugin',
      category: 'Architecture',
      summary:
        'Adds Blueprint nodes for dispatching work to selected threads and handing execution back to the Unreal game thread.',
      metadata: ['Unreal Engine', 'C++', 'Blueprint support', 'Async tasks'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/AsyncBlueprintsUnreal',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'advanced-asset',
      title: 'Advanced Asset',
      whyExists: 'Standardizes reusable data-asset identity and editor discovery.',
      capability: 'Configurable asset IDs and thumbnails',
      status: 'Reusable plugin',
      category: 'Architecture',
      summary:
        'Extends Primary Data Assets with configurable asset IDs and editor thumbnails for reusable data-asset workflows.',
      metadata: ['Unreal Engine', 'C++', 'Primary Data Assets'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/AdvancedAssetUnreal',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'signal-hub',
      title: 'Signal Hub',
      whyExists: 'Tests explicit event lifetimes across gameplay and worker threads.',
      capability: 'Typed queued signals with diagnostics',
      status: 'Active plugin',
      category: 'Architecture',
      summary:
        'Routes typed in-process signals per game instance with safe subscription lifetimes, Blueprint nodes, worker-thread queuing, and delivery diagnostics.',
      metadata: ['Unreal Engine', 'C++', 'Blueprint support', 'Thread-safe queuing'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/SignalHubUnreal',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'fragmented-inventory',
      title: 'Fragmented Inventory',
      whyExists: 'Explores composable item state without a monolithic inventory class.',
      capability: 'Fast Array replicated item fragments',
      status: 'Active plugin',
      category: 'Networking',
      featured: true,
      summary:
        'Builds network-replicated UE5 inventories from composable item fragments, dynamic item state, configurable slots, and Blueprint-facing events.',
      metadata: ['Unreal Engine', 'C++', 'Fast Array replication', 'Blueprint support'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/FragmentedInventoryUnreal',
        external: true,
        newTab: true,
      },
    },
    {
      id: 'optimized-skeletal-mesh',
      title: 'Optimized Skeletal Mesh',
      whyExists: 'Investigates high-count animated rendering under a controlled GPU path.',
      capability: 'Batched GPU skinning without per-entity AnimBPs',
      status: 'Experimental plugin',
      category: 'Rendering',
      featured: true,
      summary:
        'Renders high counts of animated skeletal meshes through a custom GPU skinning path, without requiring a component and AnimBP for every entity.',
      metadata: ['Unreal Engine 5.7', 'C++', 'GPU skinning', 'Batched rendering'],
      githubAction: {
        label: 'GitHub',
        kind: 'href',
        href: 'https://github.com/ArtemIyX/OptimizedSkeletalMesh',
        external: true,
        newTab: true,
      },
    },
  ],
}

export const aboutContent: AboutContent = {
  eyebrow: '',
  title: 'A developer focused on useful, carefully made software.',
  paragraphs: [
    'I am an Unreal Engine C++ programmer specializing in developing gameplay, simulation, and networking systems. I have a passion for making innovative games a reality through creating an experience that responds and interacts with players.',
    'I’m open to selective freelance work and focused collaborations across desktop, mobile, web, and game platforms.',
  ],
  personalNote:
    'Away from development, I love to play around with game design ideas, learn about how complicated systems function, and realize grand visions in games.',
  contactAction: {
    label: 'Start a conversation',
    kind: 'href',
    href: `mailto:${email}`,
  },
  facts: [
    { label: 'Based in', value: 'Riga, Latvia' },
    { label: 'Primary focus', value: 'Unreal Engine' },
    { label: 'Work preference', value: 'C++ Engineer' },
    { label: 'Time zone', value: 'UTC+2 / UTC+3', timeZone: 'Europe/Riga' },
  ],
}
