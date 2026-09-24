# Featured Projects Implementation Plan

## 1. Objective

Add a Featured Projects section to the existing portfolio home page using placeholder projects, placeholder screenshots, placeholder metrics, and placeholder links only.

The implementation should present:

- three substantial featured projects;
- wide horizontal project cards on larger screens;
- alternating image placement to create visual rhythm;
- a self-contained vertical card for each project on smaller screens;
- short project stories covering problem, role, and outcome;
- clearly labelled technology lists and project actions;
- working `#projects` navigation in both desktop and mobile menus;
- responsive, accessible, testable behavior without unnecessary state.

This phase should not create real project case-study pages, a project archive, filters, or a carousel.

## 2. Authoritative Current Project State

The current repository already contains:

- `HomeView.vue` as the route-level page for `/`;
- `SiteHeader` with desktop and modal-style mobile navigation;
- `HeroView` and `AboutView` inside one `<main id="main-content">`;
- typed page content and navigation in `src/content/home.ts`;
- working hash navigation through the router's existing `scrollBehavior`;
- `UiSection`, `UiText`, `UiLink`, and `UiBox` shared primitives;
- global light/dark theme tokens and reusable layout tokens;
- unit tests for the header, hero, About section, shared primitives, and Home view.

The home page currently renders:

```text
SiteHeader
└── main
    ├── HeroView      #hero
    └── AboutView     #about
```

After this phase it should render:

```text
SiteHeader
└── main
    ├── HeroView                 #hero
    ├── FeaturedProjectsView     #projects
    │   ├── ProjectCard 01
    │   ├── ProjectCard 02
    │   └── ProjectCard 03
    └── AboutView                #about
```

Projects should appear before About because work samples are the strongest evidence of the promise made by the hero. About then supplies personal and professional context after the visitor has seen the work.

There are existing uncommitted ThemeSelector changes and untracked planning documents. Preserve them. Do not rewrite unrelated files as part of this feature.

## 3. Responsive Presentation Decision

### Wide screens

At approximately `52rem` and above:

- render all three projects as separate full-width horizontal cards;
- use a two-column grid inside each card;
- allocate roughly 55–60% to media and 40–45% to content;
- place media on the left for odd cards and on the right for even cards;
- keep every project's full story and actions visible;
- stack the cards vertically with generous spacing.

### Small screens

Below approximately `52rem`:

- switch every horizontal card to one vertical column;
- place the screenshot first and the content directly below it;
- make each project a complete, independent card;
- keep all projects in the document and stack them vertically;
- allow actions to wrap, becoming full-width only at the narrowest breakpoint;
- keep stack labels wrapping within the card.

This is the intended “single-card swap”: each desktop horizontal row becomes a conventional vertical card on mobile. Do not show only one project at a time.

### Why not use a carousel

A carousel is not justified for three projects in this phase. It would introduce active-index state, next/previous controls, announcements, swipe behavior, reduced-motion handling, and focus-management requirements while hiding work recruiters may otherwise scan immediately. A vertically stacked mobile list keeps every project discoverable and works without additional JavaScript.

If later visual testing shows the mobile page is excessively long, evaluate CSS scroll-snap as a separate enhancement. Do not combine that experiment with this baseline implementation.

## 4. Placeholder Content Rules

Use plausible content lengths so layout decisions remain valid, but make every value obviously generic.

Suggested section content:

- Eyebrow: `Selected work`
- Heading: `A few projects that show how I approach product development.`
- Introduction: `Placeholder introduction explaining that these projects were selected to demonstrate problem solving, technical decisions, and delivery.`

Create three placeholder projects representing different types of work:

### Project 01 — Product application

- Title: `Project Alpha`
- Category: `Product application`
- Summary: `Placeholder summary of a web product created for a specific user need.`
- Problem: `Placeholder problem describing the user or business challenge.`
- Role: `Placeholder role describing the developer's direct ownership and collaboration.`
- Outcome: `Placeholder outcome describing a result without presenting an invented metric as fact.`
- Stack: `TypeScript`, `Vue`, `API integration`, `Testing`

### Project 02 — Platform or service

- Title: `Project Beta`
- Category: `Platform engineering`
- Summary: `Placeholder summary of a reliable service or internal platform.`
- Problem: `Placeholder problem describing a workflow, scale, or reliability constraint.`
- Role: `Placeholder role describing architecture and implementation responsibility.`
- Outcome: `Placeholder outcome describing the intended operational improvement.`
- Stack: `Node.js`, `PostgreSQL`, `Observability`, `CI/CD`

### Project 03 — Design system or developer tool

- Title: `Project Gamma`
- Category: `Developer experience`
- Summary: `Placeholder summary of a reusable system that improves consistency or delivery.`
- Problem: `Placeholder problem describing fragmented UI or development workflows.`
- Role: `Placeholder role describing component, documentation, and adoption work.`
- Outcome: `Placeholder outcome describing the intended quality or productivity benefit.`
- Stack: `Vue`, `TypeScript`, `Accessibility`, `Documentation`

Placeholder constraints:

- do not use real client or employer names;
- do not invent percentages, revenue, user counts, awards, or performance numbers;
- do not describe a placeholder as “production,” “award-winning,” or “used by thousands”;
- use local placeholder screenshots only;
- use `https://example.com` for demonstration links;
- label links honestly, such as `Preview placeholder` and `Source placeholder`;
- add a visible development note or content comment that these values must be replaced before launch.

## 5. Content Model

Update `src/content/home.ts` with types for the section and individual projects.

Recommended contracts:

```ts
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
```

Export a `featuredProjectsContent` constant containing exactly three placeholder projects.

Data rules:

- every project `id` must be unique, URL-safe, and stable;
- `number` should be presentational text such as `01`, not derived in the template;
- each project should have three to five technology labels;
- every image must provide source, alt text, width, and height;
- every navigation action must use the existing `NavigationItem` union;
- project actions should remain explicit objects rather than raw URL strings;
- presentation such as media-left/media-right should not be stored in content.

The parent component can derive visual alternation from the project index. Content data should describe the project, not its layout.

## 6. New Components

### 6.1 `FeaturedProjectsView`

Create:

- `src/components/home/FeaturedProjectsView/FeaturedProjectsView.vue`
- `src/components/home/FeaturedProjectsView/FeaturedProjectsView.ts`
- `src/components/home/FeaturedProjectsView/FeaturedProjectsView.css`

Update:

- `src/components/home/index.ts`

Prop contract:

```ts
import type { FeaturedProjectsContent } from '@/content/home'

export interface FeaturedProjectsViewProps {
  content: FeaturedProjectsContent
}
```

Responsibilities:

- render the section container and introduction;
- render a semantic ordered or unordered project list;
- create one `ProjectCard` per project;
- pass `media-side="start"` for even indexes and `media-side="end"` for odd indexes;
- preserve the source-data order regardless of visual media placement;
- own no interactive state;
- include no viewport listeners or JavaScript breakpoint logic.

Section markup:

- `UiSection id="projects"`;
- `labelledby="projects-title"`;
- `spacing="default"`;
- `width="content"`;
- section eyebrow as a label-style `UiText`;
- section title as an `h2`;
- one short introductory paragraph;
- project list beneath the introduction.

Use the same horizontal container alignment as Hero and About:

```css
.featured-projects-view :deep(.ui-section__inner) {
  width: min(100% - (2 * var(--layout-gutter)), var(--layout-content-max));
}
```

Add `scroll-margin-top` so the sticky header does not obscure the section heading.

### 6.2 `ProjectCard`

Create:

- `src/components/home/ProjectCard/ProjectCard.vue`
- `src/components/home/ProjectCard/ProjectCard.ts`
- `src/components/home/ProjectCard/ProjectCard.css`

Keep `ProjectCard` within the home feature barrel for now. It is reusable across featured projects, but it is not yet a generic shared primitive.

Recommended prop contract:

```ts
import type { ProjectContent } from '@/content/home'

export type ProjectCardMediaSide = 'start' | 'end'

export interface ProjectCardProps {
  project: ProjectContent
  mediaSide?: ProjectCardMediaSide
}
```

Responsibilities:

- render one semantic `<article>`;
- connect `aria-labelledby` to a title ID derived from the stable project ID;
- render a lazy-loaded local image with explicit dimensions;
- present category and project number as metadata;
- render the project title as an `h3`;
- render summary, problem, role, and outcome as concise labelled content;
- render technologies as a semantic list;
- render explicit live and source links using `UiLink`;
- apply a media-side modifier class for desktop layout;
- reset to image-first vertical flow on small screens;
- contain no state, network requests, router access, or theme logic.

Suggested card hierarchy:

```vue
<UiBox as="article" class="project-card" ...>
  <div class="project-card__media">
    <img ... />
  </div>
  <div class="project-card__content">
    <!-- number/category, h3, summary -->
    <dl><!-- problem, role, outcome --></dl>
    <ul><!-- technologies --></ul>
    <div><!-- explicit action links --></div>
  </div>
</UiBox>
```

Do not make the entire card clickable. Independent links provide clearer names, predictable focus behavior, and separate live/source destinations.

### 6.3 Shared components to reuse

Use:

- `UiSection` for section framing;
- `UiText` for the section and card typography;
- `UiBox` as the semantic project surface;
- `UiLink` for external project destinations.

Do not create new shared badge, card, media, carousel, or icon components in this phase. Technology labels and metadata are simple ProjectCard internals until a second feature demonstrates a shared API.

## 7. Placeholder Project Media

Create:

- `public/images/projects/project-alpha-placeholder.svg`
- `public/images/projects/project-beta-placeholder.svg`
- `public/images/projects/project-gamma-placeholder.svg`

Each SVG should:

- use the same intrinsic dimensions, preferably `1200 × 750` or another consistent 16:10 ratio;
- depict a neutral interface wireframe, architecture diagram, or tool window;
- be visually distinct enough to test alternating cards;
- contain no company marks, real product copy, personal initials, or copyrighted screenshots;
- use simple colors that remain readable against both theme surfaces;
- avoid embedded accessibility text because the `<img>` supplies alt text.

Render images with:

- explicit `width` and `height` attributes;
- `loading="lazy"` because the section is below the hero;
- `decoding="async"`;
- `object-fit: cover` or `contain`, selected consistently after visual inspection;
- meaningful placeholder alt text such as `Placeholder interface preview for Project Alpha`.

## 8. Desktop Card Styling

In `ProjectCard.css`:

- use a two-column grid for the article;
- keep the media and content within one bordered `UiBox` surface;
- use a stable image aspect ratio;
- align content vertically without absolute positioning;
- use generous internal padding and existing spacing tokens;
- place metadata above the `h3`;
- use a compact definition list for problem, role, and outcome;
- display technologies as wrapping labels;
- display actions in a wrapping horizontal row.

Alternation:

- default `mediaSide="start"` places media in column one and content in column two;
- `mediaSide="end"` changes only the visual grid placement on wide screens;
- DOM order remains stable for every project;
- do not alternate text alignment—all text remains start-aligned;
- avoid image overlap, negative offsets, and content placed over screenshots.

This produces visual variation without reducing readability.

## 9. Mobile Card Styling

At `max-width: 52rem`:

- change every card to `grid-template-columns: 1fr`;
- force media into row one and content into row two regardless of `mediaSide`;
- remove any desktop-specific grid-column overrides;
- reduce internal padding using existing spacing tokens;
- keep the image full-width within the card;
- keep the information definition list readable as label/value pairs;
- allow technology labels to wrap naturally.

At approximately `32rem` and below:

- stack project actions vertically if two links no longer fit comfortably;
- make each action span the content width;
- keep tap targets at least 44 CSS pixels high;
- reduce gaps, but not below existing `--space-3` for separate controls;
- verify no technology label causes horizontal overflow.

All three project cards remain visible and stacked. There is no active card, pagination, swipe dependency, or duplicated desktop/mobile markup.

## 10. Navigation Integration

Update `homeNavigation` in `src/content/home.ts` to:

1. `Home` → `{ name: 'home', hash: '#hero' }`
2. `Projects` → `{ name: 'home', hash: '#projects' }`
3. `About` → `{ name: 'home', hash: '#about' }`
4. `Contact` → `mailto:developer@example.com`

No production change should be required in `SiteHeader`; it already generates desktop and mobile items from the array and closes its mobile panel after selection.

Verify:

- `/#projects` resolves to the new section;
- the Projects heading is not hidden behind the sticky header;
- selecting Projects from the mobile menu closes the panel;
- the public header still omits `/debug`;
- no project action is incorrectly included in primary site navigation.

## 11. Home View Integration

Update `src/views/HomeView.vue`:

1. Import `FeaturedProjectsView` from `@/components/home`.
2. Import `featuredProjectsContent` from `@/content/home`.
3. Render Featured Projects immediately after Hero and before About.
4. Leave theme ownership and header wiring unchanged.

Target composition:

```vue
<main id="main-content">
  <HeroView :content="heroContent" />
  <FeaturedProjectsView :content="featuredProjectsContent" />
  <AboutView :content="aboutContent" />
</main>
```

Do not create a new route or another `<main>`. `HeroView` keeps the page's only `h1`; Featured Projects and About each use an `h2`.

## 12. Functional Contract

The section's behavior should remain deliberately simple:

- hash navigation moves to `#projects` through the existing router behavior;
- project actions use explicit anchors through `UiLink`;
- external placeholder links open in a new tab only when `newTab` is set and retain `noopener noreferrer` behavior;
- all project content is driven by props and typed content data;
- layout changes are CSS-only;
- media alternation is a prop-derived class, not runtime viewport state;
- theme changes work automatically through design tokens;
- no Pinia store, composable, browser storage, event listener, timer, or API request is required.

## 13. Step-by-Step Implementation Sequence

### Step 1: Protect existing work

- Run `git status --short`.
- Record all pre-existing modified and untracked files.
- Avoid changing ThemeSelector files or rewriting earlier planning documents.

### Step 2: Add typed project data

- Add `ProjectImage`, `ProjectContent`, and `FeaturedProjectsContent` to `src/content/home.ts`.
- Add `featuredProjectsContent` with exactly three placeholder projects.
- Add the Projects navigation item only when the target section is included in the same change.
- Check that no placeholder claims a real result.

### Step 3: Create placeholder media

- Add three local SVG screenshots under `public/images/projects/`.
- Keep identical intrinsic dimensions.
- Verify their production URLs begin with `/images/projects/`.

### Step 4: Implement `ProjectCard`

- Add the Vue, TypeScript, and CSS files.
- Compose `UiBox`, `UiText`, and `UiLink`.
- Implement stable semantic IDs from `project.id`.
- Add horizontal layout and the media-side modifier.
- Add the vertical mobile reset.

### Step 5: Implement `FeaturedProjectsView`

- Add the Vue, TypeScript, and CSS files.
- Compose `UiSection`, `UiText`, and `ProjectCard`.
- Render the projects as one semantic list in source-data order.
- Derive alternating media placement from each index.
- Export both new components from the home barrel if tests or later home features need direct imports.

### Step 6: Compose the section into HomeView

- Import the component and its placeholder content.
- Place it between Hero and About.
- Preserve the single main landmark and heading hierarchy.

### Step 7: Integrate navigation

- Add Projects between Home and About in `homeNavigation`.
- Verify the existing router and SiteHeader handle it without new production logic.
- Add scroll margin if needed for the sticky header.

### Step 8: Add and update automated tests

- Add tests for ProjectCard and FeaturedProjectsView.
- Update HomeView and SiteHeader expectations.
- Preserve every existing Hero, About, header, and shared-component assertion.

### Step 9: Run automated verification

Run:

```sh
npm run format
npm run lint
npm run test:unit -- --run
npm run build
```

Inspect the diff after automatic formatting/linting and restore no unrelated user changes.

### Step 10: Perform visual and accessibility verification

Inspect `/`, `/#projects`, and mobile-menu navigation at approximately:

- 320 px;
- 390 px;
- 768 px;
- 1024 px;
- 1440 px.

Repeat in light theme, dark theme, keyboard-only navigation, 200% zoom, and reduced-motion mode.

## 14. Test Plan

### `ProjectCard.spec.ts`

Create `src/__tests__/home/ProjectCard.spec.ts`.

Verify that ProjectCard:

- renders as an article;
- links `aria-labelledby` to the rendered `h3`;
- renders supplied content rather than hard-coded values;
- renders problem, role, and outcome as semantic definition terms and values;
- renders every technology as a list item;
- renders the local image with alt text, dimensions, lazy loading, and async decoding;
- renders live and source actions with correct destinations and rel/target behavior;
- applies the expected media-side modifier;
- does not make the entire article a link;
- contains no buttons or local interactive state.

### `FeaturedProjectsView.spec.ts`

Create `src/__tests__/home/FeaturedProjectsView.spec.ts`.

Verify that FeaturedProjectsView:

- renders `<section id="projects">`;
- connects `aria-labelledby="projects-title"` to an `h2`;
- contains no `h1`;
- renders exactly three ProjectCard instances from placeholder data;
- preserves project source order;
- alternates start/end media-side props;
- renders custom prop data to prove the template is content-driven.

### Existing SiteHeader tests

Update `src/__tests__/layout/SiteHeader.spec.ts`:

- add Projects to the fixture;
- expect `Home`, `Projects`, `About`, `Contact`;
- verify the Projects link resolves to `/#projects`;
- verify selecting Projects from the mobile panel closes it.

### Existing HomeView tests

Update `src/__tests__/views/HomeView.spec.ts`:

- assert the order Hero → Featured Projects → About;
- expect one `h1` and two section-level `h2` headings;
- assert the Projects navigation href matches the section ID;
- assert exactly three project articles render;
- retain skip-link, theme, About, and no-debug-link checks.

CSS breakpoint behavior must be confirmed visually; jsdom unit tests should not claim to verify responsive rendering.

## 15. Accessibility Requirements

Verify:

- the section has a programmatic name through `aria-labelledby`;
- every project article has a unique accessible title;
- heading order remains `h1` → `h2` → `h3`;
- project images have meaningful placeholder alt text;
- decorative SVG internals are not separately announced;
- project facts use semantic labels and values;
- technology collections use lists;
- live/source link names remain distinguishable when read outside visual context;
- external/new-tab behavior is communicated by the existing `UiLink` assistance text;
- keyboard focus never depends on hover;
- media alternation does not change logical reading or focus order;
- small-screen actions meet minimum target sizes;
- 200% zoom and narrow widths do not create horizontal overflow;
- no content is hidden behind a carousel, hover overlay, or animation.

## 16. Performance Requirements

- Use three lightweight local SVG placeholders.
- Lazy-load all project images.
- Include intrinsic image dimensions to avoid layout shift.
- Do not introduce a carousel library, animation library, icon package, or data-fetching dependency.
- Do not add JavaScript viewport detection.
- Keep the content as static typed data so the section renders immediately.
- Confirm the production build does not duplicate the project data through separate desktop/mobile templates.

## 17. Acceptance Criteria

The Featured Projects phase is complete only when:

- the home page order is Hero, Featured Projects, then About;
- `FeaturedProjectsView` renders from typed placeholder content;
- exactly three placeholder ProjectCard instances are present;
- desktop cards are horizontal and alternate media placement;
- mobile cards become image-first, single-column cards and remain vertically stacked;
- no carousel, duplicated responsive markup, or viewport JavaScript is introduced;
- every card communicates category, summary, problem, role, outcome, stack, and two explicit actions;
- every project image is local, intrinsically sized, lazy-loaded, and accessible;
- desktop and mobile navigation contain a working Projects link;
- `/#projects` lands below the sticky header without obscuring the heading;
- the page still has one main landmark and one `h1`;
- light and dark themes remain legible;
- there is no horizontal overflow at the tested widths;
- all new and existing unit tests pass;
- formatting, linting, type checking, and the production build pass;
- pre-existing ThemeSelector changes and planning documents remain intact.

## 18. Deferred Follow-Up

After real project information becomes available:

- replace each placeholder project with verifiable work;
- replace placeholder SVGs with optimized screenshots or video posters;
- state individual contribution clearly for team projects;
- add metrics only when accurate and attributable;
- replace example links with tested live and source destinations;
- add dedicated case-study routes only when enough material exists;
- add an “Other projects” archive only after more credible work is available;
- periodically test every external project link for availability.
