# Pet Projects Section — Design and Implementation Plan

## 1. Objective

Add a `Pet Projects` section to the portfolio home page immediately after Experience and before About.

The section should present a curated set of open-source Unreal Engine plugins and leave room for other personal tools later. It should feel related to a GitHub repository grid without reproducing GitHub's interface, branding, navigation, or metric-heavy card layout.

The section should answer three questions quickly:

- what did Artem build;
- what problem does each project solve;
- where can a visitor inspect the source or documentation?

This phase should not add a GitHub API integration, filters, search, pagination, repository statistics, project detail routes, or another frontend dependency.

## 2. Current Project Context

The existing home page is a content-driven Vue 3 application with this order:

```text
SiteHeader
└── main
    ├── HeroView                 #hero
    ├── FeaturedProjectsView     #projects
    ├── ExperienceSkillsView     #experience
    └── AboutView                #about
```

The target order is:

```text
SiteHeader
└── main
    ├── HeroView                 #hero
    ├── FeaturedProjectsView     #projects
    ├── ExperienceSkillsView     #experience
    ├── PetProjectsView          #pet-projects
    │   ├── PetProjectCard 01
    │   ├── PetProjectCard 02
    │   ├── PetProjectCard 03
    │   ├── PetProjectCard 04
    │   ├── PetProjectCard 05
    │   ├── PetProjectCard 06
    │   ├── PetProjectCard 07
    │   └── PetProjectCard 08
    └── AboutView                #about
```

This placement is intentional. Featured Projects demonstrates shipped product work, Experience establishes professional depth, and Pet Projects then shows independent curiosity and reusable engineering before the personal About section.

Reuse the established system:

- `UiSection` for section structure and spacing;
- `UiBox` for card surfaces;
- `UiText` for headings and metadata;
- `UiLink` for repository and documentation actions;
- the existing Mona Sans typography, layout width, spacing, border, radius, color, focus, and theme tokens;
- static typed content in `src/content/home.ts`.

No existing global token or shared-component API should need to change.

## 3. Design Direction

### Context

This is a technical portfolio for recruiters, engineering leads, collaborators, and Unreal Engine developers. The content is dense enough to reward scanning, but each card must remain understandable to someone who does not already know Unreal's plugin ecosystem.

### Visual anchor

Use a Swiss editorial direction: neutral surfaces, one existing teal accent, left-aligned typography, visible one-pixel rules, and a strict grid. The implementation should preserve the portfolio's existing palette rather than introducing GitHub grey, GitHub blue, or another local mini-theme.

### Differentiator

Use the project title as the primary scan target and direct GitHub destination. The title link should retain normal heading color and have no underline.

### What to borrow from GitHub

- a compact two-column repository grid;
- repository name as the primary scan target;
- a short plain-language description;
- restrained technical metadata;
- a direct, clearly named source-code destination.

### What not to copy

- GitHub's repository icon, kebab menu, `Public` pill, exact border color, typography, or card spacing;
- star and fork counts;
- programming-language dots;
- GitHub's header, tabs, contribution visuals, or profile framing;
- an entire-card link with hidden or ambiguous behavior.

Star and fork counts are weak portfolio evidence, become stale, and would push the implementation toward a runtime API request. The portfolio should explain the engineering value instead.

## 4. Proposed Composition

Suggested section copy:

- Title: `Pet Projects`
- Introduction: `Open-source Unreal Engine plugins and small tools I build to explore reusable systems, editor workflows, networking, and Blueprint integration.`

Do not add an eyebrow if it would be empty or repeat the title.

### Wide layout

At approximately `48rem` and above, use a two-column grid of equal-width cards:

```text
Pet Projects
Open-source Unreal Engine plugins and small tools...

┌───────────────────────────────────┐  ┌───────────────────────────────────┐
│ Web User Interface                │  │ Blueprint Subsystems              │
│ CEF-based web UI for UE...        │  │ Blueprint-accessible...           │
│ Unreal Engine · C++ · CEF          │  │ Unreal Engine · C++ · Blueprint...│
└───────────────────────────────────┘  └───────────────────────────────────┘
```

Card rules:

- equal-height cards within each grid row;
- `minmax(0, 1fr)` columns to prevent overflow;
- a minimum useful card height, but no fixed height that can clip translated or zoomed text;
- title and description at the top, followed by metadata;
- all text remains start-aligned;
- no screenshots are required for the initial version.

### Narrow layout

Below approximately `48rem`:

- use one card per row;
- allow metadata to wrap;
- preserve the exact DOM and reading order;
- keep each link target at least 44 CSS pixels high where it behaves like a button-style action.

## 5. Card Information Architecture

Each card should contain only useful, maintained information:

1. human-readable display title, linked directly to GitHub;
2. one-sentence description focused on the solved problem;
3. two to four metadata labels, such as `C++` or `Blueprint support`.

The repository slug does not need to be visible. Use a readable title and an accessible link name equivalent to `View Blueprint Subsystems on GitHub`.

Avoid:

- vague tags such as `Cool`, `Advanced`, or `Powerful`;
- maturity claims unless maintained as real project data;
- engine compatibility inferred only from an old repository name or README;
- more than four metadata items per card;
- more than two actions per card;
- truncating descriptions with CSS line clamp.

## 6. Initial Curated Content

Use eight repositories so the wide layout forms four complete rows. The attached reference identifies a coherent initial set:

| Order | Display title | Repository | Card focus |
| --- | --- | --- | --- |
| 01 | Web User Interface | [`ArtemIyX/WebUserInterfaceUnreal`](https://github.com/ArtemIyX/WebUserInterfaceUnreal) | CEF-based web interfaces inside Unreal Engine |
| 02 | Blueprint Subsystems | [`ArtemIyX/BlueprintSubsystemsUnreal`](https://github.com/ArtemIyX/BlueprintSubsystemsUnreal) | exposing subsystem workflows to Blueprints |
| 03 | Replicated Object | [`ArtemIyX/ReplicatedObjectUnreal`](https://github.com/ArtemIyX/ReplicatedObjectUnreal) | replicated UObject behavior |
| 04 | Data Serializer | [`ArtemIyX/DataSerializerUnreal`](https://github.com/ArtemIyX/DataSerializerUnreal) | serialization utilities with Blueprint support |
| 05 | Async Blueprints | [`ArtemIyX/AsyncBlueprintsUnreal`](https://github.com/ArtemIyX/AsyncBlueprintsUnreal) | asynchronous Blueprint execution and task handoff |
| 06 | Advanced Asset | [`ArtemIyX/AdvancedAssetUnreal`](https://github.com/ArtemIyX/AdvancedAssetUnreal) | reusable data-asset workflows |
| 07 | Signal Hub | [`ArtemIyX/SignalHubUnreal`](https://github.com/ArtemIyX/SignalHubUnreal) | typed local signal routing with safe subscriptions and queued delivery |
| 08 | Fragmented Inventory | [`ArtemIyX/FragmentedInventoryUnreal`](https://github.com/ArtemIyX/FragmentedInventoryUnreal) | fragment-based, Fast Array replicated inventories |

Before implementation, review each current README and write an accurate one-sentence summary. Verify engine versions, documentation URLs, license/maturity language, and whether the repository is still the best destination. Do not copy README paragraphs into the cards.

Potential later additions include `FragmentedInventoryUnreal`, `AimOffsetMakerUnreal`, or a non-Unreal developer tool. The content model should support them without renaming Unreal-specific fields, but the initial section should stay curated rather than becoming an exhaustive repository list.

Selection rules for later additions:

- the project must be public and understandable from its repository;
- it should demonstrate a distinct engineering concern;
- its README and setup guidance should be usable;
- it should add breadth instead of duplicating an existing card;
- keep the home-page section to six or eight items; link to the GitHub profile for the complete archive.

## 7. Content Model

Extend `src/content/home.ts` with generic names that also support non-Unreal projects:

```ts
export interface PetProjectContent {
  id: string
  title: string
  summary: string
  metadata: readonly string[]
  githubAction: HrefNavigationItem
}

export interface PetProjectsContent {
  title: string
  introduction: string
  projects: readonly PetProjectContent[]
}
```

Export `petProjectsContent` with eight curated entries.

Data invariants:

- IDs are unique, stable, and URL-safe;
- titles are reader-friendly and link to their GitHub repositories;
- summaries are authored locally and are not presented as live GitHub data;
- metadata contains two to four verified labels;
- source actions use the existing `HrefNavigationItem` contract with `external: true` and `newTab: true`;
- layout classes, column positions, and color values never enter content data.

Do not store stars, forks, watchers, last-commit dates, or a `languageColor`. If live repository data becomes a real requirement later, design caching, loading, error, privacy, and rate-limit behavior as a separate feature.

## 8. New Components

### `PetProjectsView`

Create:

- `src/components/home/PetProjectsView/PetProjectsView.vue`
- `src/components/home/PetProjectsView/PetProjectsView.ts`
- `src/components/home/PetProjectsView/PetProjectsView.css`

Update `src/components/home/index.ts`.

Recommended prop contract:

```ts
import type { PetProjectsContent } from '@/content/home'

export interface PetProjectsViewProps {
  content: PetProjectsContent
}
```

Responsibilities:

- render `UiSection id="pet-projects"` with `labelledby="pet-projects-title"`;
- render the title as an `h2` and the introduction as body text;
- render the projects as one semantic ordered list;
- render one `PetProjectCard` per project in source order;
- own no state, repository-fetching logic, theme logic, router logic, or viewport logic.

### `PetProjectCard`

Create:

- `src/components/home/PetProjectCard/PetProjectCard.vue`
- `src/components/home/PetProjectCard/PetProjectCard.ts`
- `src/components/home/PetProjectCard/PetProjectCard.css`

Recommended prop contract:

```ts
import type { PetProjectContent } from '@/content/home'

export interface PetProjectCardProps {
  project: PetProjectContent
}
```

Responsibilities:

- render one `UiBox` as a semantic `article`;
- connect `aria-labelledby` to a unique `h3` derived from `project.id`;
- render metadata as a semantic list;
- render the title as the GitHub source link with `UiLink`;
- contain no click handler on the card surface;
- contain no internal state.

Keep the card feature-local. Do not add a generic shared `RepositoryCard`, `Tag`, or `Icon` component until another implemented feature proves the same contract.

## 9. Styling Specification

Use only the existing tokens in `src/styles/tokens.css`.

Section:

- `scroll-margin-top: calc(4.5rem + var(--space-4))`;
- bottom border matching the other major sections;
- the same constrained inner width used by Projects and Experience;
- intro measure limited to `var(--measure)`;
- grid begins after `var(--space-8)` on wide screens and `var(--space-6)` on narrow screens.

Grid:

```css
.pet-projects-view__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
  margin: var(--space-8) 0 0;
  padding: 0;
  list-style: none;
}
```

The project currently uses `--space-5` in feature CSS without declaring it in `tokens.css`. Do not repeat that inconsistency. This section should use existing declared tokens only; correcting the earlier occurrence can be handled as a separate cleanup.

Card:

- transparent or normal surface according to visual testing; prefer `UiBox variant="outline"` initially;
- `border-color: var(--color-border-strong)` only where stronger separation is needed;
- `border-radius: var(--radius-small)`;
- title uses normal heading text color with no underline;
- metadata is a wrapping list separated by spacing or borders, not fake pills everywhere;
- links use existing `UiLink` behavior and focus treatment.

Interaction:

- on hover or `:focus-within`, change the top or left rule to `var(--color-accent)` and translate the card no more than `-2px` vertically;
- do not add blur shadows;
- keep the transition within existing `--duration-fast` and `--ease-standard` tokens;
- under `prefers-reduced-motion: reduce`, remove the translation while retaining the accent-border state;
- never reveal required content only on hover.

Responsive breakpoint:

```css
@media (max-width: 48rem) {
  .pet-projects-view__list {
    grid-template-columns: 1fr;
    margin-top: var(--space-6);
  }
}
```

Do not add JavaScript breakpoint detection or duplicate mobile markup.

## 10. Navigation Decision

Recommended first release: add `Pet Projects` to the main navigation between `Experience` and `About`.

Target navigation order:

1. Home
2. Projects
3. Experience
4. Pet Projects
5. About

The new item should target `{ name: 'home', hash: '#pet-projects' }`.

Because the label is wider than the existing items, manually verify the desktop header between `42rem` and `70rem`. If it collides with the theme selector or brand, move the desktop/mobile breakpoint upward based on the measured header. Do not abbreviate the label, shrink tap targets, or reduce text below the existing navigation size.

If visual testing shows five content links are too dense, omit the new header item rather than renaming the section. The page order still makes the section discoverable.

## 11. Home View Integration

Update `src/views/HomeView.vue`:

1. import `PetProjectsView` from `@/components/home`;
2. import `petProjectsContent` from `@/content/home`;
3. render it directly after `ExperienceSkillsView` and before `AboutView`;
4. keep one `<main>` and preserve theme/cookie ownership.

Target composition:

```vue
<main id="main-content">
  <HeroView :content="heroContent" :theme="theme" />
  <FeaturedProjectsView :content="featuredProjectsContent" />
  <ExperienceSkillsView :content="experienceSkillsContent" />
  <PetProjectsView :content="petProjectsContent" />
  <AboutView :content="aboutContent" />
</main>
```

Heading hierarchy remains:

- one page-level `h1` in Hero;
- one `h2` for each major section;
- one `h3` for each pet-project card.

## 12. Accessibility Requirements

Verify that:

- `#pet-projects` receives its accessible name from the unique `h2`;
- each card article receives its accessible name from its unique `h3`;
- the card collection is a semantic list;
- metadata is a semantic list and not a row of unannounced visual dots;
- source and documentation links have distinguishable names when read out of context;
- the repository slug remains available to assistive technology or visible secondary text;
- new-tab behavior is announced by the existing `UiLink` implementation;
- visual card hover does not imply the whole card is clickable;
- focus indication remains visible in both themes;
- 200% zoom and 320 px width do not hide, clamp, or overlap content;
- card order is identical in CSS layout, DOM order, and keyboard order;
- the hash target is not obscured by the sticky header.

## 13. Test Plan

### `PetProjectCard.spec.ts`

Create `src/__tests__/home/PetProjectCard.spec.ts` and verify that the card:

- renders as an article;
- connects `aria-labelledby` to the project `h3`;
- renders custom prop data rather than hard-coded content;
- renders the linked title and summary;
- renders every metadata item as a list item;
- renders the source action with the correct destination and external-link behavior;
- renders the title as the sole GitHub link with no external-link indicator;
- contains no button and is not itself a link;
- contains no star/fork counters or GitHub metric labels.

### `PetProjectsView.spec.ts`

Create `src/__tests__/home/PetProjectsView.spec.ts` and verify that the view:

- renders `<section id="pet-projects">`;
- connects `aria-labelledby="pet-projects-title"` to an `h2`;
- contains no `h1`;
- renders exactly eight cards from the initial content;
- preserves source order;
- renders custom prop data;
- has no filter, search, pagination, carousel, or loading state.

### Existing tests

Update:

- `HomeView.spec.ts` to assert Projects → Experience → Pet Projects → About, four major-section `h2` headings, eight pet-project articles, and matching navigation target;
- `SiteHeader.spec.ts` if the navigation item is added, including desktop and mobile destinations and mobile-menu close behavior;
- any fixtures that assert the complete `homeNavigation` list.

Do not use jsdom tests as proof of grid breakpoints, hover, zoom, or dark-theme contrast. Those require browser inspection.

## 14. Implementation Sequence

1. Run `git status --short` and preserve unrelated work.
2. Review the selected repositories and verify all public content and links.
3. Add `PetProjectContent`, `PetProjectsContent`, and eight curated entries to `src/content/home.ts`.
4. Implement and test `PetProjectCard`.
5. Implement and test `PetProjectsView`.
6. Export both components from `src/components/home/index.ts`.
7. Compose the section into `HomeView.vue` after Experience.
8. Add the optional navigation item and update header fixtures.
9. Run formatting, linting, unit tests, type checking, and the production build.
10. Inspect light and dark themes at 320, 390, 768, 1024, and 1440 px, plus 200% zoom and reduced motion.

Automated verification:

```sh
npm run format
npm run lint
npm run test:unit -- --run
npm run build
```

## 15. Acceptance Criteria

The feature is ready when:

- Pet Projects appears after Experience and before About;
- the section presents eight curated real repositories from typed static content;
- its visual language belongs to the portfolio while remaining recognizably repository-oriented;
- the two-column desktop grid becomes one column without duplicated markup;
- every card explains a project, shows restrained verified metadata, and links to its source;
- the section does not fetch GitHub data or display stale popularity metrics;
- every article and section has a correct accessible name;
- `/#pet-projects` lands below the sticky header when navigation is enabled;
- there is no horizontal overflow at supported widths or 200% zoom;
- all existing and new tests pass;
- lint, formatting, type checking, and production build pass;
- unrelated files and user changes remain untouched.

## 16. Deferred Enhancements

Consider only after the static section is live and visually tested:

- a dedicated `/projects` archive if six or eight home-page cards are no longer enough;
- repository category filters on that archive, not on the home page;
- local screenshots or diagrams for the two strongest plugins;
- release/download links when stable packaged releases exist;
- a small `Recently updated` label maintained manually and truthfully;
- live GitHub metadata only with a build-time cache and a clear failure strategy.

Do not turn the home-page section into a miniature repository browser. Its job is selection and explanation, with GitHub remaining the destination for exhaustive technical detail.
