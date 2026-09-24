# About Section Implementation Plan

## 1. Objective

Add a complete About section to the existing portfolio home page using placeholder content only. The section should explain the intended developer profile, working approach, selected skills, and a small amount of personality without presenting any real personal information.

This phase should deliver:

- a home-specific `AboutView` component rendered after `HeroView`;
- typed placeholder About content stored with the existing home content;
- a working `About` item in desktop and mobile navigation;
- an accessible section with a clear heading hierarchy;
- responsive layouts in both light and dark themes;
- focused unit and home-view integration tests.

This remains a single-page home experience. Do not create an `/about` route or a second route-level view.

## 2. Authoritative Current Project State

This plan is based on the code currently present in the repository, not only on the earlier hero plan.

The current implementation already has:

- `src/views/HomeView.vue` as the route-level page for `/`;
- `SiteHeader` composed into `HomeView`;
- `HeroView` composed inside `<main id="main-content">`;
- typed `homeNavigation` and `heroContent` in `src/content/home.ts`;
- a local placeholder portrait used by the hero;
- router hash support through `scrollBehavior` in `src/router/index.ts`;
- desktop and modal-style mobile navigation generated from the same item array;
- theme ownership in `HomeView` through `useTheme`;
- shared `UiSection`, `UiText`, `UiLink`, and `UiBox` primitives;
- shared layout tokens `--layout-content-max` and `--layout-gutter`;
- component tests for `HeroView`, `SiteHeader`, and `HomeView`.

There are existing uncommitted changes in `ThemeSelector.vue` and `ThemeSelector.css`. They are outside this feature's scope and must be preserved. Do not reformat or rewrite those files as part of the About implementation unless a verified About-specific defect requires it.

## 3. Scope and Content Rules

### In scope

- A single About section on the home page.
- Two short placeholder biography paragraphs.
- Three placeholder facts.
- A curated list of six to eight placeholder skills or capability areas.
- One short placeholder personal note.
- One contact action using the existing placeholder email.
- Header navigation to `#about`.

### Out of scope

- Real name, location, employer, education, biography, or hobbies.
- Real technology claims or experience levels.
- A downloadable résumé because no résumé asset currently exists.
- Employment timelines, testimonials, certifications, or statistics.
- A separate About page or route.
- A second portrait asset or remote image request.
- Scroll-triggered animation, counters, carousels, tabs, or filtering.
- Changes to the shared theme control.

## 4. Intended Section Structure

The About section should have four content layers:

1. **Section identity** — eyebrow and concise `h2`.
2. **Professional story** — two short paragraphs describing placeholder focus and working approach.
3. **Scannable evidence structure** — facts and selected capabilities presented as semantic lists.
4. **Human detail and action** — one short personal note followed by a contact link.

Recommended placeholder copy:

- Eyebrow: `About`
- Heading: `A developer focused on useful, carefully made software.`
- Paragraph 1: `Placeholder biography describing the developer's current focus and the kinds of products they enjoy building.`
- Paragraph 2: `Placeholder explanation of how the developer approaches collaboration, accessibility, maintainability, and thoughtful delivery.`
- Personal note: `Outside of development, this placeholder can introduce one or two interests that add personality without becoming a full biography.`
- Contact label: `Start a conversation`
- Contact destination: `mailto:developer@example.com`

Suggested placeholder facts:

- `Based in` → `City, Country`
- `Primary focus` → `Product development`
- `Currently` → `Open to selected opportunities`

Suggested placeholder capabilities:

- `Frontend systems`
- `Backend services`
- `Accessible interfaces`
- `Design systems`
- `Testing strategy`
- `Performance`
- `Developer experience`
- `Technical collaboration`

These values describe the shape and density of the content. They must be replaced later with truthful information before publishing the final portfolio.

## 5. Component and File Plan

### 5.1 Extend the home content model

Update `src/content/home.ts`.

Add the following types:

```ts
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
```

Export an `aboutContent` constant populated only with the placeholder values listed above.

Keep `NavigationItem` as the shared action/navigation contract. Do not create a second link type for the About section. Use the same `mailto:developer@example.com` placeholder already used by the header and hero so replacement remains predictable.

Content invariants:

- `paragraphs` should contain exactly two non-empty entries in the initial version;
- `facts` should contain three unique labels;
- `skills` should contain six to eight unique entries;
- `contactAction` must be an href item pointing to the placeholder email;
- no string should include a real name, company, account, or location.

### 5.2 Create `AboutView`

Create:

- `src/components/home/AboutView/AboutView.vue`
- `src/components/home/AboutView/AboutView.ts`
- `src/components/home/AboutView/AboutView.css`

Update:

- `src/components/home/index.ts`

`AboutView.ts` should expose a small prop contract:

```ts
import type { AboutContent } from '@/content/home'

export interface AboutViewProps {
  content: AboutContent
}
```

`AboutView.vue` responsibilities:

- accept `content` as its only prop;
- render `UiSection` with `id="about"`, `labelledby="about-title"`, `spacing="default"`, `width="content"`, and `surface="muted"`;
- use `UiText` for the eyebrow, `h2`, biography, labels, and personal note;
- render the biography paragraphs with `v-for` and stable index-based keys because the content is a fixed ordered tuple-like list without persistent IDs;
- render facts as one semantic `<dl>` containing paired `<dt>` and `<dd>` elements;
- render skills as a semantic `<ul>` rather than a decorative string or inaccessible logo cloud;
- render the contact action through `UiLink` using `variant="button-primary"`;
- handle both `route` and `href` action variants, matching the pattern already used by `HeroView`;
- include no local state, watchers, lifecycle hooks, or direct theme access.

Suggested template hierarchy:

```vue
<UiSection id="about" class="about-view" ...>
  <div class="about-view__layout">
    <div class="about-view__story">
      <!-- eyebrow, h2, paragraphs, personal note, contact action -->
    </div>
    <UiBox as="aside" class="about-view__details" ...>
      <!-- facts definition list and selected-skills list -->
    </UiBox>
  </div>
</UiSection>
```

The `aside` should have an accessible heading such as `Profile summary`. If the details are not meaningfully complementary when implemented, use `UiBox as="div"` instead; semantics should follow content, not visual placement.

### 5.3 Reuse existing shared components

Use:

- `UiSection` for section identity, spacing, surface, and labelled-by wiring;
- `UiText` for semantic typography and color tones;
- `UiLink` for the contact action;
- `UiBox` for the facts/skills panel.

Do not add a shared `SkillBadge`, `Tag`, `FactList`, or `ProfileCard` component in this phase. Each would have only one consumer and very little behavior. Keep the markup private to `AboutView`; extract a shared primitive only after another real section needs the same API.

Do not use `UiButton` for contact because contact is navigation, not an in-page state-changing action.

### 5.4 About-specific styling

Implement all section styles in `AboutView.css`.

Desktop layout:

- use a two-column grid;
- give the story column more width than the details column;
- align both columns at the top;
- use existing spacing, border, surface, radius, and text-color tokens;
- constrain paragraphs to a readable line length;
- render skills as wrapping text chips or a clean two-column list;
- keep the contact action visually separate from the paragraphs.

Responsive behavior:

- collapse to one column around the existing hero breakpoint (`52rem`) unless visual testing identifies a better breakpoint;
- switch the fact list to one column on narrow screens;
- allow skills to wrap without horizontal scrolling;
- make the CTA full-width or centered only at the smallest breakpoint if needed;
- reuse `--layout-content-max` and `--layout-gutter` so About aligns with the header and hero.

Use the same scoped deep selector pattern currently used by `HeroView` to apply horizontal layout width to `UiSection`:

```css
.about-view :deep(.ui-section__inner) {
  width: min(100% - (2 * var(--layout-gutter)), var(--layout-content-max));
}
```

Do not modify `UiSection.css` globally in this phase. A shared container abstraction can be considered when a third content section demonstrates the repeated need.

The section needs no animation. If a small hover transition is added to the contact action through existing `UiLink` behavior, it is already covered by the global reduced-motion handling.

## 6. Navigation Integration

Update `homeNavigation` in `src/content/home.ts` to this order:

1. `Home` → `{ name: 'home', hash: '#hero' }`
2. `About` → `{ name: 'home', hash: '#about' }`
3. `Contact` → `mailto:developer@example.com`

No `SiteHeader` production-code change should be necessary because both desktop and mobile menus already render the supplied item array. The mobile menu already closes when a navigation link is selected.

The existing router `scrollBehavior` already resolves hash targets, so `#about` should work once the section exists. Verify it rather than rewriting it.

Navigation requirements:

- `/#about` must resolve to the About section;
- clicking About from the top of the page must move to the section;
- clicking About from the open mobile navigation must close the panel and move to the section;
- the item must not be added before `id="about"` exists in the same change;
- `/debug` must remain absent from public navigation.

Because the header is sticky, verify that the About heading is not hidden behind it after hash navigation. If it is obscured, add `scroll-margin-top` to `.about-view`, sized from the header height plus a small spacing token. Do not hard-code JavaScript scroll offsets.

## 7. Home View Integration

Update `src/views/HomeView.vue`:

1. Import `AboutView` from `@/components/home` alongside `HeroView`.
2. Import `aboutContent` alongside the existing home content.
3. Render `<AboutView :content="aboutContent" />` immediately after `HeroView` inside the existing `<main>`.
4. Keep `SiteHeader`, `useTheme`, and theme event wiring unchanged.
5. Do not add a second `<main>` or a second page-level `<h1>`.

Target composition:

```vue
<main id="main-content">
  <HeroView :content="heroContent" />
  <AboutView :content="aboutContent" />
</main>
```

`HomeView` remains responsible for composition and theme state. `AboutView` remains presentational and receives all replaceable content through props.

## 8. Functional Behavior

The About section is intentionally low-interaction. Its functional contract is:

- router navigation lands on `#about`;
- contact opens the user's configured email application via the placeholder `mailto:` URL;
- the component reacts automatically if its `content` prop changes;
- desktop/mobile rearrangement is CSS-only;
- light/dark appearance is token-driven and requires no component logic;
- keyboard users can reach the About navigation item and contact action in document order;
- screen readers receive a section landmark named by `about-title`, a structured facts list, and a normal skills list.

No stores, composables, Pinia state, browser storage, API calls, timers, or event listeners are needed.

## 9. Step-by-Step Implementation Sequence

### Step 1: Protect the existing worktree

- Run `git status --short` before editing.
- Record existing modifications, especially the current ThemeSelector changes.
- Limit the implementation diff to About-related files and directly required test updates.

### Step 2: Add typed placeholder content

- Add `AboutFact` and `AboutContent` to `src/content/home.ts`.
- Add the `aboutContent` constant.
- Add the About navigation item only in the same change that creates the target section.
- Review every string to ensure it is intentionally generic.

### Step 3: Create the About component contract

- Add `AboutView.ts` with the single typed `content` prop.
- Export `AboutView` from `src/components/home/index.ts`.

### Step 4: Build semantic About markup

- Add `AboutView.vue`.
- Compose the existing shared primitives.
- Use one `h2`, two biography paragraphs, one `dl`, one skills `ul`, one personal note, and one contact link.
- Ensure IDs are unique and the section's `aria-labelledby` target exists.

### Step 5: Add responsive styling

- Add `AboutView.css`.
- Align it with the current hero/header container.
- Implement two-column and single-column layouts.
- Add `scroll-margin-top` only if the sticky header obscures the section heading.
- Confirm no styling leaks outside the scoped component.

### Step 6: Compose it into HomeView

- Import `AboutView` and `aboutContent`.
- Render About after Hero inside the existing main landmark.
- Keep route-level logic otherwise unchanged.

### Step 7: Integrate navigation

- Confirm `homeNavigation` now renders Home, About, and Contact in both header variants.
- Confirm the current router hash behavior is sufficient.
- Verify mobile navigation closes after selecting About.

### Step 8: Add and update tests

- Add the new About component tests described below.
- Update SiteHeader expectations from two to three navigation items.
- Update HomeView integration expectations to include About.
- Keep all existing hero assertions.

### Step 9: Run automated verification

Run:

```sh
npm run format
npm run lint
npm run test:unit -- --run
npm run build
```

Because formatting and linting can rewrite files, inspect `git diff` afterward and confirm unrelated ThemeSelector changes were not altered.

### Step 10: Perform manual verification

Inspect `/`, `/#hero`, and `/#about` in development mode at approximately 320 px, 768 px, and 1280 px widths. Repeat in both supported themes and with keyboard-only navigation.

## 10. Test Plan

### New test file

Create `src/__tests__/home/AboutView.spec.ts`.

Test that `AboutView`:

- renders a `<section id="about">`;
- connects `aria-labelledby="about-title"` to an existing `h2`;
- renders all supplied paragraphs in order;
- renders facts as `dt`/`dd` pairs;
- renders every supplied skill as a list item;
- renders the personal note;
- renders the placeholder `mailto:` action with button-link styling;
- contains no `<h1>`;
- contains no remote image or unnecessary interactive controls;
- renders changed prop data instead of relying on hard-coded template strings.

### Existing SiteHeader tests

Update `src/__tests__/layout/SiteHeader.spec.ts`:

- include the About route-hash item in the fixture;
- expect `Home`, `About`, and `Contact` in that order;
- assert About resolves to `/#about`;
- verify selecting About from the mobile panel closes it.

### Existing HomeView tests

Update `src/__tests__/views/HomeView.spec.ts`:

- assert Hero appears before About inside the same main landmark;
- assert one page-level `h1` and one About `h2`;
- assert the About navigation href and target section ID match;
- retain theme-change, skip-link, placeholder, and no-debug-link checks.

Do not weaken or delete existing assertions merely to make the expanded page pass.

## 11. Accessibility and Content Checks

Verify:

- the page still contains exactly one `<h1>`;
- About begins with an `<h2>`;
- `aria-labelledby` references a real unique ID;
- facts use `dl`, `dt`, and `dd` correctly;
- skills use a list;
- the contact action is an anchor, not a button;
- focus styles remain visible in light and dark modes;
- color is not the only method used to communicate meaning;
- zooming to 200% does not overlap or hide content;
- the sticky header does not obscure the hash target;
- placeholder text is understandable and not lorem ipsum;
- no placeholder is represented as a verified achievement or real identity.

## 12. Acceptance Criteria

The About phase is complete only when:

- `/` renders `HeroView` followed by `AboutView` inside one main landmark;
- `AboutView` is a home feature component, not a route-level view;
- all About content comes from typed placeholder data in `src/content/home.ts`;
- no real personal information or remote asset is introduced;
- desktop and mobile navigation both include a working About link;
- `/#about` lands on an unobscured About section;
- About uses one `h2`, semantic paragraphs, a definition list, a skills list, and a contact anchor;
- no new shared primitive, store, composable, or route is added without demonstrated need;
- the layout works without horizontal overflow at the tested widths;
- light and dark themes both remain legible;
- existing Hero, header, shared-component, and debug-view behavior remains intact;
- new and updated tests pass;
- formatting, linting, type checking, and production build pass;
- the final diff preserves the pre-existing ThemeSelector modifications.

## 13. Deferred Follow-Up

After truthful portfolio content is available:

- replace every placeholder value in `aboutContent`;
- confirm that every claimed skill is supported by work shown elsewhere;
- decide whether a real portrait or working-context image adds value;
- add a résumé action only after a real, maintained PDF exists;
- consider extracting repeated section/container patterns after another section is implemented;
- add Projects, Experience, or Contact navigation only when those target sections exist.
