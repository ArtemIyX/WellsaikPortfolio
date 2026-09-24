# Experience and Skills Implementation Plan

## 1. Objective

Add a combined Experience & Skills section to the portfolio home page using placeholder information only.

The implementation should provide:

- three placeholder experience entries in reverse-chronological order;
- five or six clearly grouped technical skill categories;
- wide horizontal experience cards on larger screens;
- self-contained vertical experience cards on smaller screens;
- a larger experience column and a smaller skills column on desktop;
- semantic work-history and skills structures;
- working `#experience` navigation in desktop and mobile menus;
- responsive, accessible behavior without tabs, carousels, or proficiency meters;
- focused component and integration tests.

This phase must not imply any real employment, seniority, technology expertise, dates, or measurable achievements.

## 2. Authoritative Current Project State

This plan reflects the current repository after the Hero, Featured Projects, and About phases were implemented.

The home page currently renders:

```text
SiteHeader
└── main
    ├── HeroView                 #hero
    ├── FeaturedProjectsView     #projects
    │   └── ProjectCard × 3
    └── AboutView                #about
```

The project already provides:

- typed home-page content and navigation in `src/content/home.ts`;
- router hash scrolling through `src/router/index.ts`;
- desktop and modal-style mobile navigation generated from one array;
- reusable `UiSection`, `UiText`, `UiBox`, and `UiLink` primitives;
- shared layout, spacing, typography, color, focus, and motion tokens;
- light and dark theme support;
- existing tests for HomeView, SiteHeader, HeroView, FeaturedProjectsView, ProjectCard, and AboutView.

There are existing uncommitted ThemeSelector changes and untracked planning documents. Preserve them. Implementation work must not overwrite or reformat unrelated user changes.

## 3. Final Page Position

Insert Experience & Skills after Featured Projects and before About:

```text
SiteHeader
└── main
    ├── HeroView                  #hero
    ├── FeaturedProjectsView      #projects
    ├── ExperienceSkillsView      #experience
    │   ├── ExperienceCard 01
    │   ├── ExperienceCard 02
    │   ├── ExperienceCard 03
    │   └── Skills panel
    └── AboutView                 #about
```

This order creates a clear narrative:

1. Hero states the promise.
2. Projects provide direct evidence.
3. Experience explains professional context and progression.
4. Skills provide a quick technical index.
5. About adds personality and working philosophy.

## 4. Responsive Presentation Decision

### Wide screens

At approximately `60rem` and above, use a two-column section layout:

- experience occupies roughly two-thirds of the available width;
- skills occupies roughly one-third;
- experience entries are stacked vertically;
- each experience entry is a horizontal card;
- the card's left column contains period, organization, and location/status;
- the card's right column contains role, summary, achievements, and technologies;
- the skills column contains grouped lists inside one or more restrained surfaces.

### Medium screens

Between approximately `42rem` and `60rem`:

- collapse the section to one main column;
- keep individual experience cards horizontal while space permits;
- place the complete skills panel after the experience list;
- allow skill groups to use a two-column grid.

### Small screens

Below approximately `42rem`:

- convert each experience card to a vertical card;
- place period and organization above the role content;
- retain every achievement and technology in the card;
- stack skill groups in one column;
- keep all experience entries visible in normal document flow.

This is the intended single-card mobile transformation: every horizontal desktop entry becomes one complete vertical mobile card. Do not show only one role at a time.

### Why not use tabs or a carousel

Tabs and carousels hide employment information, add state and keyboard behavior, and make comparisons between roles harder. With only three entries, a visible reverse-chronological list is faster to scan and more robust. The first implementation should use CSS layout changes only.

## 5. Placeholder Content Rules

Every visible value must be clearly generic.

Suggested section content:

- Eyebrow: `Experience & skills`
- Heading: `A placeholder record of responsibilities, growth, and technical focus.`
- Introduction: `Placeholder introduction explaining how professional experience and practical skills will be summarized here.`

### Placeholder role 01

- Period: `20XX — Present`
- Organization: `Placeholder Organization A`
- Role: `Role Title One`
- Location: `City, Country · Work arrangement`
- Summary: `Placeholder summary of the role's purpose and scope.`
- Achievements:
  - `Placeholder achievement describing ownership of a meaningful engineering outcome.`
  - `Placeholder achievement describing collaboration or technical decision-making.`
  - `Placeholder achievement describing an improvement without inventing a metric.`
- Technologies: `Technology A`, `Technology B`, `Practice A`

### Placeholder role 02

- Period: `20XX — 20XX`
- Organization: `Placeholder Organization B`
- Role: `Role Title Two`
- Location: `City, Country · Work arrangement`
- Summary: `Placeholder summary of the role's responsibilities and product area.`
- Achievements: three generic outcome-oriented statements.
- Technologies: `Technology C`, `Technology D`, `Practice B`

### Placeholder role 03

- Period: `20XX — 20XX`
- Organization: `Placeholder Organization C`
- Role: `Role Title Three`
- Location: `City, Country · Work arrangement`
- Summary: `Placeholder summary of an earlier role, internship, freelance period, or equivalent experience.`
- Achievements: two or three generic statements.
- Technologies: `Technology E`, `Tool A`, `Practice C`

### Placeholder skill groups

Use five or six groups with three to five items each:

- `Languages` — `Language A`, `Language B`, `Language C`
- `Frontend` — `Framework A`, `UI architecture`, `Accessibility`
- `Backend & data` — `Runtime A`, `Database A`, `API design`
- `Quality` — `Unit testing`, `Integration testing`, `Code review`
- `Delivery` — `CI/CD`, `Cloud platform`, `Observability`
- `Collaboration` — `Technical planning`, `Documentation`, `Mentoring placeholder`

Placeholder restrictions:

- no real company names or logos;
- no real employment dates;
- no unsupported title or seniority claim;
- no fabricated percentages, user counts, revenue, latency, or team size;
- no rating stars, progress bars, years-of-experience counters, or proficiency percentages;
- no credential, certification, or résumé link until a real maintained asset exists;
- no technology should be presented as a real personal skill before final content replacement.

## 6. Content Model

Extend `src/content/home.ts`.

Recommended contracts:

```ts
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

export interface SkillGroup {
  id: string
  title: string
  items: readonly string[]
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
```

Export `experienceSkillsContent` containing three placeholder entries and five or six placeholder skill groups.

Data invariants:

- all entry and group IDs are unique and URL-safe;
- entries are stored newest first and rendered in source order;
- each entry contains two or three achievements;
- each entry contains three to five technologies/practices;
- each skill group contains three to five unique items;
- `period.label` is always present;
- ISO-like machine dates are optional until truthful dates exist;
- layout information is not stored in content data.

When real dates are available, populate `startDate` and `endDate` with valid year, month, or full-date strings. Until then, render only the placeholder label and do not provide misleading `datetime` attributes.

## 7. Resolve Existing About-Skills Duplication

`AboutContent` currently contains a `skills` array, and AboutView displays it as “Selected capabilities.” A dedicated Experience & Skills section would make that list repetitive.

As part of this phase:

1. Remove `skills` from the `AboutContent` interface.
2. Remove the `skills` array from `aboutContent`.
3. Remove the “Selected capabilities” heading and list from `AboutView.vue`.
4. Keep the About facts panel and professional/personal narrative.
5. Adjust `AboutView.css` so the details card remains balanced with only profile facts.
6. Update AboutView tests to stop expecting the removed skills list.

Do not duplicate the same skill labels in About and Experience & Skills. The new section becomes the single source of truth for technical skills.

## 8. New Components

### 8.1 `ExperienceSkillsView`

Create:

- `src/components/home/ExperienceSkillsView/ExperienceSkillsView.vue`
- `src/components/home/ExperienceSkillsView/ExperienceSkillsView.ts`
- `src/components/home/ExperienceSkillsView/ExperienceSkillsView.css`

Update:

- `src/components/home/index.ts`

Prop contract:

```ts
import type { ExperienceSkillsContent } from '@/content/home'

export interface ExperienceSkillsViewProps {
  content: ExperienceSkillsContent
}
```

Responsibilities:

- render the section heading and introduction;
- render a named Experience region and a named Skills region;
- render entries in one semantic list using `ExperienceCard`;
- render skills as grouped semantic lists;
- maintain source-data order;
- own no interactive state;
- avoid direct theme, router, or viewport access.

Suggested hierarchy:

```vue
<UiSection id="experience" ...>
  <!-- section eyebrow, h2, and introduction -->
  <div class="experience-skills-view__layout">
    <section aria-labelledby="experience-list-title">
      <h3 id="experience-list-title">Experience</h3>
      <ol>
        <li v-for="entry in content.entries">
          <ExperienceCard :entry="entry" />
        </li>
      </ol>
    </section>
    <aside aria-labelledby="skills-title">
      <h3 id="skills-title">Skills</h3>
      <!-- grouped skill lists -->
    </aside>
  </div>
</UiSection>
```

Use `aside` only because Skills supplements the Experience record. If implementation review determines both columns are equally primary, use a nested `section` instead.

### 8.2 `ExperienceCard`

Create:

- `src/components/home/ExperienceCard/ExperienceCard.vue`
- `src/components/home/ExperienceCard/ExperienceCard.ts`
- `src/components/home/ExperienceCard/ExperienceCard.css`

Prop contract:

```ts
import type { ExperienceEntry } from '@/content/home'

export interface ExperienceCardProps {
  entry: ExperienceEntry
}
```

Responsibilities:

- render one semantic `<article>`;
- connect `aria-labelledby` to a unique role heading based on `entry.id`;
- render metadata and role content in stable DOM order;
- render achievements as a list;
- render technologies/practices as a second labelled list;
- add no expand/collapse state;
- adapt from horizontal to vertical through CSS only.

Suggested card hierarchy:

```vue
<UiBox as="article" class="experience-card" ...>
  <div class="experience-card__meta">
    <!-- period, organization, location -->
  </div>
  <div class="experience-card__body">
    <!-- h4 role, summary, achievements, technologies -->
  </div>
</UiBox>
```

Do not make the role card clickable. Add a company or related-project link later only when a valid destination exists and disclosure is permitted.

### 8.3 Skills markup inside the view

Render skill groups directly inside `ExperienceSkillsView.vue`.

Each group should use:

- an `h4` group title;
- a `ul` of skill labels;
- either `UiBox` or a simple bordered container;
- no icons unless text labels remain visible;
- no proficiency visualization.

Do not create `SkillBadge`, `SkillGroupCard`, or `Timeline` shared components yet. They have only one consumer and no independent behavior. Extract only after another feature demonstrates the same contract.

## 9. Shared Components to Reuse

Use:

- `UiSection` for section surface, spacing, and accessible naming;
- `UiBox` for experience and skill-group surfaces;
- `UiText` for headings, metadata, summaries, and labels;
- `UiLink` only if a real navigation destination is introduced later.

`UiButton` is not needed because this phase has no state-changing action.

No changes to the shared component API should be required.

## 10. Experience Card Styling

### Wide horizontal card

In `ExperienceCard.css`, use a two-column grid:

- metadata column: approximately `12rem–15rem`, allowed to shrink safely;
- body column: `minmax(0, 1fr)`;
- top-align both columns;
- separate columns with spacing or a subtle border;
- keep text start-aligned;
- keep summary line length readable;
- render achievements with visible list markers;
- render technologies as wrapping text labels.

The metadata column should visually prioritize period first, organization second, and location/status third. The body should prioritize role, summary, achievements, then technologies.

### Mobile vertical card

At `max-width: 42rem`:

- switch to `grid-template-columns: 1fr`;
- render metadata above the body;
- change the dividing border from vertical to horizontal if one is used;
- reduce padding using existing spacing tokens;
- keep every achievement visible;
- allow technologies to wrap without overflow;
- retain the same DOM and heading order as desktop.

Do not duplicate markup for different breakpoints.

## 11. Section and Skills Styling

In `ExperienceSkillsView.css`:

- align the section with the existing layout container;
- use `scroll-margin-top` to account for the sticky header;
- render Experience and Skills in a two-column grid on wide screens;
- use `minmax(0, 2fr) minmax(17rem, 1fr)` or an equivalent tested ratio;
- stack Experience and Skills at the medium breakpoint;
- use a two-column skill-group grid at medium widths when space permits;
- use one skill-group column on narrow screens;
- use existing surface, border, radius, spacing, and type tokens;
- visually distinguish group titles without relying only on color.

Use the established scoped container pattern:

```css
.experience-skills-view :deep(.ui-section__inner) {
  width: min(100% - (2 * var(--layout-gutter)), var(--layout-content-max));
}
```

Do not modify `UiSection.css` globally during this phase.

Avoid making the Skills panel sticky in the initial implementation. A tall skills column can become awkward on short viewports and at high zoom. Revisit only after real content determines its final height.

## 12. Navigation Integration

Update `homeNavigation` in `src/content/home.ts` to:

1. `Home` → `{ name: 'home', hash: '#hero' }`
2. `Projects` → `{ name: 'home', hash: '#projects' }`
3. `Experience` → `{ name: 'home', hash: '#experience' }`
4. `About` → `{ name: 'home', hash: '#about' }`
5. `Contact` → `mailto:developer@example.com`

`SiteHeader` should require no production-code modification because it already renders all supplied navigation items in both variants.

Verify:

- `/#experience` resolves to the section;
- the sticky header does not obscure the section heading;
- selecting Experience from the mobile menu closes the panel;
- the increased number of desktop items still fits before the mobile breakpoint;
- no navigation item wraps awkwardly at intermediate widths;
- `/debug` remains absent from public navigation.

If five items do not fit cleanly before `42rem`, adjust the existing header breakpoint based on measured content rather than abbreviating labels or reducing tap targets.

## 13. Home View Integration

Update `src/views/HomeView.vue`:

1. Import `ExperienceSkillsView` from `@/components/home`.
2. Import `experienceSkillsContent` from `@/content/home`.
3. Render it after Featured Projects and before About.
4. Keep SiteHeader and theme ownership unchanged.

Target composition:

```vue
<main id="main-content">
  <HeroView :content="heroContent" />
  <FeaturedProjectsView :content="featuredProjectsContent" />
  <ExperienceSkillsView :content="experienceSkillsContent" />
  <AboutView :content="aboutContent" />
</main>
```

Do not create another route or main landmark. The heading hierarchy should remain:

- one page-level `h1` in Hero;
- one `h2` for each major home section;
- `h3` for Experience and Skills subsections;
- `h4` for roles and skill groups.

## 14. Functional Contract

The Experience & Skills section should be static and content-driven:

- router navigation lands on `#experience`;
- all entries and skill groups render from props;
- responsive transformation is CSS-only;
- light/dark styling comes from existing tokens;
- all content remains present and readable at every breakpoint;
- there is no active entry, selected company, collapsed card, or animated timeline;
- no Pinia store, composable, API request, local storage, timer, observer, or event listener is needed.

## 15. Step-by-Step Implementation Sequence

### Step 1: Protect the existing worktree

- Run `git status --short`.
- Record current modified and untracked files.
- Preserve ThemeSelector changes and all existing plans.
- Keep the phase diff limited to content, home components, navigation fixtures, and directly affected tests.

### Step 2: Add the typed content model

- Add `ExperiencePeriod`, `ExperienceEntry`, `SkillGroup`, and `ExperienceSkillsContent`.
- Add `experienceSkillsContent` with three roles and five or six skill groups.
- Review every placeholder for accidental real claims.

### Step 3: Remove duplicated skills from About

- Remove `skills` from AboutContent and aboutContent.
- Remove the selected-capabilities list from AboutView.
- Rebalance the remaining facts panel styling.
- Update AboutView tests without weakening unrelated assertions.

### Step 4: Implement ExperienceCard

- Add its Vue, TypeScript, and CSS files.
- Compose `UiBox` and `UiText`.
- Add the accessible article title relationship.
- Render metadata, summary, achievement list, and technology list.
- Implement horizontal desktop and vertical mobile layouts.

### Step 5: Implement ExperienceSkillsView

- Add its Vue, TypeScript, and CSS files.
- Compose UiSection, UiText, UiBox, and ExperienceCard.
- Render entries and grouped skills from content props.
- Add the two-column section layout and responsive stacking.
- Export the new components from `src/components/home/index.ts`.

### Step 6: Compose the section into HomeView

- Import the component and content.
- Place it between Featured Projects and About.
- Preserve one main landmark and one page-level heading.

### Step 7: Integrate navigation

- Add Experience between Projects and About.
- Verify the existing router hash behavior.
- Confirm desktop fit and mobile-menu close behavior.

### Step 8: Add and update tests

- Add tests for ExperienceCard and ExperienceSkillsView.
- Update AboutView tests for moved skills.
- Update SiteHeader and HomeView integration tests.
- Preserve all existing Hero and Projects coverage.

### Step 9: Run automated verification

Run:

```sh
npm run format
npm run lint
npm run test:unit -- --run
npm run build
```

Inspect the final diff after automatic formatting and lint fixes. Confirm unrelated ThemeSelector changes remain intact.

### Step 10: Perform manual verification

Inspect `/` and `/#experience` at approximately:

- 320 px;
- 390 px;
- 768 px;
- 1024 px;
- 1440 px.

Repeat with:

- light theme;
- dark theme;
- keyboard-only navigation;
- 200% browser zoom;
- reduced-motion preference.

## 16. Test Plan

### `ExperienceCard.spec.ts`

Create `src/__tests__/home/ExperienceCard.spec.ts`.

Verify that ExperienceCard:

- renders as an article;
- connects `aria-labelledby` to a unique role heading;
- renders the supplied period, organization, location, role, and summary;
- renders every achievement as a list item;
- renders every technology/practice as a separate list item;
- renders custom prop data instead of hard-coded content;
- contains no buttons, links, tabs, or hidden panels;
- does not add misleading `datetime` values for placeholder periods.

### `ExperienceSkillsView.spec.ts`

Create `src/__tests__/home/ExperienceSkillsView.spec.ts`.

Verify that ExperienceSkillsView:

- renders `<section id="experience">`;
- connects `aria-labelledby="experience-title"` to an `h2`;
- contains no `h1`;
- renders separate named Experience and Skills regions;
- renders exactly three ExperienceCard instances;
- preserves entry source order;
- renders all skill groups and items;
- renders custom prop data;
- has no tablist, carousel, progressbar, or skill-percentage markup.

### Existing AboutView tests

Update `src/__tests__/home/AboutView.spec.ts`:

- remove expectations for the old skills list;
- retain section naming, paragraphs, facts, personal note, contact action, and custom-content checks;
- assert that About no longer renders a “Selected capabilities” heading.

### Existing SiteHeader tests

Update `src/__tests__/layout/SiteHeader.spec.ts`:

- add Experience to the fixture;
- expect `Home`, `Projects`, `Experience`, `About`, `Contact`;
- verify the Experience link resolves to `/#experience`;
- verify selecting Experience from the mobile panel closes it.

### Existing HomeView tests

Update `src/__tests__/views/HomeView.spec.ts`:

- assert order Hero → Projects → Experience → About;
- expect one `h1` and three major-section `h2` headings;
- assert the Experience navigation href matches the target ID;
- assert exactly three experience articles in addition to three project articles using section-scoped selectors;
- retain theme, skip-link, Projects, About, and no-debug-link coverage.

Do not use jsdom tests as evidence that breakpoint styling works. Responsive behavior requires browser inspection.

## 17. Accessibility Requirements

Verify:

- `#experience` has an accessible name from its unique `h2`;
- Experience and Skills have distinct `h3` headings;
- each experience article has a unique `h4` title association;
- entries are in a semantic list ordered newest first;
- achievements and technologies use separate lists;
- skill groups and individual skills use semantic lists;
- reading order is unchanged by desktop layout;
- mobile cards retain the same DOM and focus order;
- placeholder periods do not use false machine-readable dates;
- no meaning depends only on color, position, or timeline decoration;
- text remains readable at 200% zoom;
- the hash target is not hidden under the sticky header;
- no horizontal overflow occurs at supported widths;
- reduced motion does not remove or hide information.

## 18. Performance Requirements

- Keep all content as static typed data.
- Add no images, logos, fonts, network calls, or third-party packages.
- Add no viewport JavaScript or resize listeners.
- Do not duplicate desktop/mobile markup.
- Use CSS Grid and Flexbox only for responsive transformations.
- Keep list keys stable through entry and group IDs.
- Verify the build does not introduce a new asynchronous chunk solely for this static section.

## 19. Acceptance Criteria

The Experience & Skills phase is complete only when:

- Home renders Hero, Projects, Experience & Skills, and About in that order;
- all experience and skills content is typed placeholder data;
- exactly three placeholder experience entries render newest first;
- five or six grouped skill categories render without ratings or percentages;
- wide experience cards are horizontal;
- small-screen experience cards become complete vertical cards;
- the wide section uses a larger Experience column and smaller Skills column;
- medium and small layouts stack without duplicated markup;
- all content remains visible—no tabs, carousel, or collapsed entries;
- About no longer duplicates the dedicated skills list;
- desktop and mobile headers contain a working Experience link;
- `/#experience` lands below the sticky header;
- heading and landmark structure is valid;
- light and dark themes remain legible;
- no horizontal overflow appears at tested widths or 200% zoom;
- all new and existing tests pass;
- formatting, linting, type checking, and production build pass;
- pre-existing unrelated changes remain intact.

## 20. Deferred Follow-Up

When truthful content becomes available:

- replace all placeholder organizations, roles, dates, locations, achievements, and skills;
- add verified machine-readable dates;
- connect experience entries to related project case studies when disclosure permits;
- add metrics only when accurate and attributable;
- add organization links only when useful and maintained;
- decide whether education needs a separate small section;
- add a résumé link only after a real current document exists;
- periodically remove outdated skills and responsibilities that no longer support the target role.
