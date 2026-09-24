# Home and Hero Implementation Plan

## 1. Objective

Build the first public-facing version of the portfolio home page around a complete hero section. The implementation must use placeholder content only: no real name, biography, employer, social account, email address, resume, project, or portrait.

This phase should deliver:

- a responsive site header with working navigation;
- a home-specific `HeroView` component;
- a local placeholder portrait asset;
- semantic, accessible markup;
- light and dark theme support through the existing theme system;
- focused component and integration tests.

This phase should not build the projects, experience, about, or contact sections. Navigation must not expose dead links to those future sections.

## 2. Current Project State

The project is a Vue 3 + TypeScript + Vite application with Vue Router, Pinia, Vitest, and Vue Test Utils.

Relevant current state:

- `src/router/index.ts` already maps `/` to `HomeView.vue` and `/debug` to `DebugView.vue`.
- `src/App.vue` already renders the active route through `RouterView`.
- `src/views/HomeView.vue` is empty and currently contains unused theme/component imports.
- `src/views/DebugView.vue` is a component specimen page and should remain a development route, not become part of public navigation.
- `src/composables/useTheme.ts` owns the light/dark preference and persistence.
- `src/components/shared/` contains tested generic primitives:
  - `UiText` for semantic typography;
  - `UiLink` for router, anchor, mail, and external links;
  - `UiSection` for section semantics and vertical spacing;
  - `UiBox` for non-interactive surfaces;
  - `UiButton` for actions that do not navigate;
  - `ThemeSelector` for the two supported themes.
- `src/styles/tokens.css` already supplies color, spacing, radius, typography, focus, and motion tokens.
- `src/styles/global.css` already supplies global focus styles, image defaults, and reduced-motion protection.
- Existing unit tests cover the shared primitives and the debug view, but not the empty home route.

The worktree was clean when this plan was written. Preserve unrelated changes if that changes before implementation.

## 3. Design Direction

Use a recruiter-friendly hero rather than an experimental full-screen interaction. The first viewport should answer four questions quickly:

1. Who is this person?
2. What kind of developer are they?
3. What value do they create?
4. What should the visitor do next?

Use a two-column desktop layout with copy on the left and a portrait placeholder on the right. Collapse to one column on smaller screens. Keep motion optional and subtle; the page must remain complete when reduced motion is requested.

Suggested placeholder copy:

- Brand/name: `Developer Name`
- Eyebrow: `Software Developer · City, Country`
- Heading: `I build thoughtful digital products for people and businesses.`
- Supporting text: `Placeholder introduction describing the developer's focus, approach, and the value their work creates.`
- Availability: `Available for selected opportunities`
- Primary action: `Get in touch`
- Secondary action: `View code profile`
- Placeholder email: `developer@example.com`
- Placeholder external profile: `https://example.com`

All placeholder values should be visibly plausible so the layout can be evaluated, but generic enough that nobody can mistake them for the portfolio owner's real information.

## 4. Component and File Plan

### 4.1 Content model

Create `src/content/home.ts`.

Responsibilities:

- hold every replaceable placeholder value used by the header and hero;
- export typed `homeNavigation` and `heroContent` constants;
- keep content replacement separate from layout code;
- use discriminated navigation/action objects so each item has exactly one valid destination.

Suggested types:

```ts
type NavigationTarget =
  | { kind: 'route'; to: RouteLocationRaw }
  | { kind: 'href'; href: string; external?: boolean; newTab?: boolean }

type NavigationItem = { label: string } & NavigationTarget

interface HeroContent {
  eyebrow: string
  title: string
  summary: string
  availability: string
  imageSrc: string
  imageAlt: string
  primaryAction: NavigationItem
  secondaryAction: NavigationItem
}
```

Initial navigation should include only destinations that exist in this phase:

- `Home` → `{ name: 'home', hash: '#hero' }`
- `Contact` → `mailto:developer@example.com`

Do not add Projects, Experience, or About links until their target sections exist.

### 4.2 Site header

Create:

- `src/components/layout/SiteHeader/SiteHeader.vue`
- `src/components/layout/SiteHeader/SiteHeader.ts`
- `src/components/layout/SiteHeader/SiteHeader.css`
- `src/components/layout/index.ts`

`SiteHeader` responsibilities:

- render a semantic `<header>` and labelled `<nav>`;
- render the placeholder brand as a `UiLink` back to the home route;
- accept typed navigation items as props and render them with `UiLink`;
- render the existing `ThemeSelector` as a compact theme control;
- emit `update:theme` instead of calling `useTheme` internally;
- use a single horizontal row on desktop and a wrapping layout on narrow screens;
- keep every interactive target at least 44 by 44 CSS pixels;
- expose a visible keyboard focus state through the existing global styles.

Do not create a hamburger menu in this phase. With only two navigation items, wrapping or stacking is simpler, more accessible, and avoids adding menu state prematurely.

Use `UiLink`, not `UiButton`, for every navigation destination. Use `ThemeSelector` for theme state. No new shared primitive is needed.

### 4.3 Hero view

Create:

- `src/components/home/HeroView/HeroView.vue`
- `src/components/home/HeroView/HeroView.ts`
- `src/components/home/HeroView/HeroView.css`
- `src/components/home/index.ts`

Although it is named `HeroView`, place it under `components/home`, not `views`. `HomeView.vue` is the route-level view; `HeroView` is the home page's hero section.

`HeroView` responsibilities:

- accept a typed `content` prop rather than hard-code identity information;
- render a `UiSection` with `id="hero"`, `spacing="hero"`, and `aria-labelledby="hero-title"`;
- render the eyebrow, one page-level `<h1>`, summary, and availability text with `UiText`;
- render both navigation actions with `UiLink` button variants;
- render the portrait placeholder inside a semantic `<figure>` or `UiBox as="figure"`;
- give the image explicit `width` and `height` to prevent layout shift;
- use descriptive placeholder alt text such as `Placeholder portrait for Developer Name`;
- keep visual decoration out of the accessibility tree with `aria-hidden="true"`;
- switch from a two-column grid to a single column at an intentional breakpoint;
- preserve a readable line length and avoid allowing the headline to collide with the image.

Prefer composition of `UiSection`, `UiText`, `UiLink`, and optionally `UiBox`. Do not move hero-specific grid, portrait, or badge styling into the shared components.

### 4.4 Placeholder portrait

Create `public/images/portrait-placeholder.svg`.

The asset should be a neutral, locally served SVG with:

- a fixed square or 4:5 view box;
- simple geometric shapes or a silhouette;
- colors that remain legible in both themes;
- no embedded personal initials or identifying information;
- no remote request and no stock-photo licensing dependency.

The `<img>` element, not the SVG internals, should carry the accessible description.

### 4.5 Home view composition

Update `src/views/HomeView.vue` so it is responsible only for page composition and page-level state:

1. Import `useTheme`, `SiteHeader`, `HeroView`, `homeNavigation`, and `heroContent`.
2. Call `useTheme()` once at the route level.
3. Pass `theme` and `homeNavigation` into `SiteHeader`.
4. Handle `update:theme` by forwarding the selected value to `setTheme`.
5. Render `HeroView` inside semantic `<main id="main-content">`.
6. Pass `heroContent` into `HeroView`.
7. Remove the current unused imports and empty style block.

Target composition:

```vue
<template>
  <div class="home-view">
    <SiteHeader
      :theme="theme"
      :items="homeNavigation"
      brand-label="Developer Name"
      @update:theme="setTheme"
    />
    <main id="main-content">
      <HeroView :content="heroContent" />
    </main>
  </div>
</template>
```

Add a skip link as the first focusable element, either in `HomeView` or `SiteHeader`, targeting `#main-content`.

### 4.6 Layout tokens

Extend `src/styles/tokens.css` only with layout values that will be reused by both the header and future sections:

```css
--layout-content-max: 78rem;
--layout-gutter: clamp(1rem, 4vw, 3rem);
```

Use those tokens in `SiteHeader.css` and `HeroView.css` for matching horizontal alignment. Do not change `UiSection` globally during this phase because that could unintentionally alter `DebugView` and every future consumer.

## 5. Navigation Behavior

Use Vue Router for links that identify an application location and native hrefs for protocols such as `mailto:` and external destinations.

Update `src/router/index.ts` with a `scrollBehavior` function:

1. If `to.hash` exists, return `{ el: to.hash }`.
2. Otherwise return `{ top: 0 }`.
3. Do not force smooth scrolling in JavaScript. This keeps navigation predictable and avoids conflicting with reduced-motion preferences.

The header logo should route to `{ name: 'home' }`. The Home item should route to `{ name: 'home', hash: '#hero' }`. Contact should use `href="mailto:developer@example.com"` through `UiLink`.

When future home sections are implemented, add their IDs and navigation records together in the same change. The rule is: an enabled navigation item must always resolve to a real route, section, or protocol destination.

Do not add `/debug` to the public header.

## 6. Step-by-Step Implementation Sequence

### Step 1: Establish typed placeholder content

- Add `src/content/home.ts`.
- Define the destination, navigation item, and hero content types.
- Add only placeholder values.
- Confirm route targets and href targets are mutually exclusive at compile time.

### Step 2: Add reusable layout tokens

- Add the content-width and responsive-gutter tokens to `tokens.css`.
- Do not change existing color or typography tokens yet.

### Step 3: Create the portrait placeholder

- Add the local SVG under `public/images/`.
- Confirm it loads from `/images/portrait-placeholder.svg` in both development and production builds.
- Record intrinsic dimensions in the hero content or component markup.

### Step 4: Build `SiteHeader`

- Add the Vue, TypeScript, and CSS files plus the layout barrel export.
- Render semantic navigation from the supplied typed items.
- Compose `UiLink` and `ThemeSelector`.
- Add the skip link and responsive wrapping behavior.
- Keep theme ownership in `HomeView`.

### Step 5: Build `HeroView`

- Add the Vue, TypeScript, and CSS files plus the home barrel export.
- Compose existing shared primitives.
- Implement the content/media grid, CTA group, status text, and placeholder figure.
- Add responsive rules and explicit reduced-motion-safe behavior.

### Step 6: Compose the home route

- Replace the empty `HomeView.vue` template with `SiteHeader` and semantic `<main>`.
- Wire theme state and placeholder content.
- Remove unused imports.
- Keep the existing `/` route; no new hero route is required.

### Step 7: Add hash navigation support

- Add router `scrollBehavior`.
- Verify loading `/`, clicking Home, and revisiting `/#hero` all place the viewport correctly.

### Step 8: Add automated tests

Create:

- `src/__tests__/layout/SiteHeader.spec.ts`
- `src/__tests__/home/HeroView.spec.ts`
- `src/__tests__/views/HomeView.spec.ts`

Test `SiteHeader` for:

- semantic header and labelled navigation;
- brand route;
- exactly the supplied navigation links;
- theme update emission;
- accessible theme-control label.

Test `HeroView` for:

- section ID and `aria-labelledby` relationship;
- exactly one `<h1>`;
- rendering content from props;
- primary and secondary destinations;
- image source, non-empty alt text, width, and height;
- absence of accidental real portfolio data.

Test `HomeView` for:

- header followed by `<main>`;
- `HeroView` inclusion;
- skip-link destination;
- theme changes reaching `document.documentElement.dataset.theme`;
- no link to the debug route.

Keep existing shared-component and debug-view tests unchanged unless a genuine compatibility issue is discovered.

### Step 9: Verify responsive and accessible behavior

Manually inspect at approximately:

- 320 px width;
- 768 px width;
- 1280 px width and above;
- light theme;
- dark theme;
- keyboard-only navigation;
- reduced-motion mode.

Check that:

- there is no horizontal overflow;
- header controls wrap without overlap;
- the heading remains readable;
- the portrait does not cause layout shift;
- CTA focus order follows visual order;
- contrast and focus indicators remain visible;
- the page has one `<h1>` and logical landmarks.

### Step 10: Run project verification

Run these commands after implementation:

```sh
npm run format
npm run lint
npm run test:unit -- --run
npm run build
```

Review the final diff after formatting because the lint scripts use automatic fixes.

## 7. Acceptance Criteria

The hero phase is complete when all of the following are true:

- `/` renders a visible site header and hero without console errors.
- All displayed identity, contact, social, and portrait information is placeholder content.
- `HomeView` owns theme state and composes `SiteHeader` plus `HeroView`.
- `HeroView` lives under `src/components/home`, not under route-level `src/views`.
- Existing shared components are reused rather than duplicated.
- Navigation contains no dead links and does not expose `/debug`.
- Home hash navigation works through the router.
- The hero contains one semantic `<h1>`, useful landmarks, accessible link names, and meaningful image alt text.
- Desktop and mobile layouts have no horizontal overflow.
- Light and dark themes both render correctly.
- Existing tests still pass and new header, hero, and home tests pass.
- Formatting, linting, type checking, and the production build complete successfully.

## 8. Deferred Work

Do not include the following in this implementation:

- real personal content or photography;
- project, experience, about, or full contact sections;
- mobile menu state;
- analytics;
- resume download;
- remote social/profile integrations;
- complex hero animation, WebGL, or video;
- a content management system.

Add future sections incrementally, and only then add their corresponding header navigation items.
