# Procedural Grid and Progressive Background Implementation Plan

## 1. Objective

Rework the portfolio background so it has the same underlying mechanics as the reference at [resume-al.usluga.website](https://resume-al.usluga.website/):

- a CSS-generated technical grid that spans the page;
- a subtle accent glow near the top;
- a continuous background that becomes darker with page depth;
- restrained translucent section bands;
- one-pixel horizontal dividers between major content regions;
- a sticky header and footer that remain visually connected to the same environment.

The result should borrow the reference's environmental treatment, not copy its content or component layout. It must retain this project's Vue components, light/dark theme support, existing typography, accessibility behavior, and responsive structure.

No canvas, JavaScript scroll listener, image texture, or new dependency is needed.

## 2. Reference Website Analysis

The reference looks procedural, but the effect is built from a small number of ordinary CSS layers.

### 2.1 Continuous page background

The reference applies two backgrounds to `body`:

```css
body {
  background:
    linear-gradient(rgba(15, 18, 16, 0.92), rgb(8, 10, 9)),
    radial-gradient(circle at 50% 0%, rgba(31, 117, 74, 0.12), transparent 26%);
}
```

The first layer is a top-to-bottom dark gradient. Because it is painted across the full body height, the page gradually moves from a dark green-black near the hero to a deeper near-black at the end. This is the main source of the “deeper means darker” impression; the reference does not assign an unrelated solid color to every section.

The second layer is a low-opacity green radial glow placed at the top center. It is visible through the partially transparent start of the first gradient and disappears early in the page.

### 2.2 Procedural grid

The reference uses two perpendicular one-pixel linear gradients on a fixed pseudo-element:

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle, black 30%, transparent 100%);
  pointer-events: none;
}
```

This is a generated grid, not a downloaded image. The fixed positioning anchors the grid to the viewport while content scrolls over it. The radial mask makes the grid clearer around the middle and prevents it from becoming a uniform, noisy wallpaper at the edges.

### 2.3 Section surfaces and dividers

Most reference sections are transparent and reveal the continuous body background. Selected sections use:

```css
.section-surface {
  background: rgba(255, 255, 255, 0.016);
  border-top: 1px solid #212121;
  border-bottom: 1px solid #212121;
}
```

The tint is only 1.6% white. It creates a band without replacing the page background. The dividers are intentionally quiet and provide most of the section separation; there are no large shadows.

Observed supporting values:

- header: `rgba(6, 8, 7, 0.92)`, `backdrop-filter: blur(12px)`, bottom border;
- page text: approximately `#f2f2f2`;
- footer: `rgba(4, 6, 7, 0.7)`, top border;
- grid cell: `24px × 24px` at the inspected desktop viewport;
- surface/divider border: approximately `#212121`.

### 2.4 Why the effect works

The visual depth comes from three independent scales:

1. **Page scale:** the long vertical gradient darkens continuously over the document.
2. **Section scale:** translucent bands and hairline rules mark major regions.
3. **Viewport scale:** the fixed grid and its mask stay stable while content moves.

Keeping those responsibilities separate makes the effect subtle, inexpensive, and easy to tune.

## 3. Current Project Assessment

The current repository is a Vue 3 + TypeScript + Vite portfolio with light and dark themes.

Relevant existing architecture:

- `src/views/HomeView.vue` composes the full home route.
- `src/styles/tokens.css` owns theme colors and reusable design tokens.
- `src/styles/global.css` paints `html` and `body` with `--color-bg`.
- `UiSection` already exposes `surface` and `divider` props.
- Hero, Projects, Experience, Pet Projects, and About are already separate `UiSection` consumers.
- the header is sticky and the footer already owns a top divider.
- component styles currently add their own bottom borders.

The main blockers are:

1. `.ui-section` always paints `var(--color-bg)`, including the nominal `surface="transparent"` state. A page-level gradient or grid would therefore be hidden behind every section.
2. `surface="default"` and `surface="muted"` use fully opaque colors. Experience and About would cut the continuous depth gradient into separate solid blocks.
3. divider ownership is duplicated in feature CSS instead of using the existing `UiSection` divider contract.
4. applying the effect directly to global `body` would also affect `/debug`, making the component specimen route harder to use and test.

The implementation should solve these at the shared-section and home-route boundaries rather than add one-off pseudo-elements to every feature component.

## 4. Visual Direction

Treat the grid as an environmental layer, not decoration attached to individual cards. Preserve the current Mona Sans typography and teal identity while making the dark theme feel more technical and spatial.

The memorable move is a viewport-anchored grid floating over a document-length depth gradient. Section borders cross the entire viewport, while all content stays aligned to the existing `--layout-content-max` container.

Recommended behavior by theme:

- **Dark theme:** closest to the reference—green-black at the top, near-black at the bottom, white grid lines at roughly 2–3% opacity, and a restrained teal glow.
- **Light theme:** keep the same geometry but invert its contrast—cool white at the top, slightly darker blue-grey at the bottom, dark grid lines around 4–5% opacity, and a very faint teal glow. Do not force the entire site into dark mode.

The grid should remain subordinate to text and project imagery. It should be clearly visible in empty space and almost disappear beneath dense content.

## 5. Proposed Architecture

### 5.1 Scope the ambient background to `HomeView`

Create `src/views/HomeView.css` and attach it to `HomeView.vue` with a scoped external style block:

```vue
<style scoped src="./HomeView.css"></style>
```

Use `.home-view` as the background owner. This keeps `/debug` and any future routes on the ordinary global surface.

Recommended structure:

```css
.home-view {
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  overflow: clip;
  background: var(--page-background);
}

.home-view::before {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(var(--page-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--page-grid-line) 1px, transparent 1px);
  background-size: var(--page-grid-size) var(--page-grid-size);
  -webkit-mask-image: var(--page-grid-mask);
  mask-image: var(--page-grid-mask);
  content: '';
  pointer-events: none;
}

.home-view > * {
  position: relative;
  z-index: 1;
}
```

Important details:

- `isolation: isolate` prevents the pseudo-element from escaping into unrelated page stacking contexts.
- `pointer-events: none` ensures the grid never blocks links, buttons, text selection, or the mobile navigation.
- both standard and `-webkit-` mask declarations are required for Safari coverage.
- the grid is decorative and must not create DOM content or accessible text.
- `overflow: clip` prevents a masked fixed layer from creating accidental horizontal scrollbars.

### 5.2 Add semantic background tokens

Extend `src/styles/tokens.css` with tokens for the environmental layer rather than hard-coding colors inside `HomeView.css`.

Suggested light-theme starting values:

```css
:root {
  --page-background:
    linear-gradient(to bottom, rgba(247, 249, 252, 0.94), #e8edf4),
    radial-gradient(circle at 50% 0%, rgba(15, 107, 120, 0.1), transparent 28%);
  --page-grid-line: rgba(15, 23, 42, 0.045);
  --page-grid-size: 24px;
  --page-grid-mask: radial-gradient(ellipse at 50% 28%, #000 25%, transparent 88%);
  --color-section-surface: rgba(255, 255, 255, 0.58);
  --color-section-surface-muted: rgba(238, 242, 247, 0.68);
  --color-header-surface: rgba(247, 249, 252, 0.86);
  --color-footer-surface: rgba(238, 242, 247, 0.62);
}
```

Suggested dark-theme starting values:

```css
:root[data-theme='dark'] {
  --page-background:
    linear-gradient(to bottom, rgba(9, 14, 23, 0.93), #05080d),
    radial-gradient(circle at 50% 0%, rgba(94, 234, 212, 0.1), transparent 28%);
  --page-grid-line: rgba(255, 255, 255, 0.024);
  --color-section-surface: rgba(255, 255, 255, 0.016);
  --color-section-surface-muted: rgba(255, 255, 255, 0.026);
  --color-header-surface: rgba(6, 10, 16, 0.9);
  --color-footer-surface: rgba(4, 7, 12, 0.72);
}
```

Repeat the dark values in the existing `@media (prefers-color-scheme: dark)` fallback for `:root:not([data-theme])`. This preserves correct first-render behavior before an explicit theme has been stored.

These values are initial tuning targets, not immutable requirements. Final alpha values should be selected against real page content at desktop and mobile widths.

### 5.3 Make `UiSection` surface names truthful

Update `src/components/shared/UiSection/UiSection.css`:

```css
.ui-section {
  color: var(--color-text);
  background: transparent;
}

.ui-section--surface-default {
  background: var(--color-section-surface);
}

.ui-section--surface-muted {
  background: var(--color-section-surface-muted);
}
```

Do not add a new `UiSection` prop or type. The existing API already describes the required states:

- `transparent` reveals the continuous page background;
- `default` adds a restrained surface band;
- `muted` adds a slightly stronger alternate band.

This is preferable to home-page selectors that reach into private component markup, and it corrects the current mismatch where `surface="transparent"` is not actually transparent.

Because this changes a shared primitive, inspect `DebugView` after implementation. Its root continues to use the global `--color-bg`, so transparent specimens should remain readable.

### 5.4 Preserve the existing section rhythm

Use the current page order and existing surface choices as the starting rhythm:

| Region | Surface | Divider owner |
| --- | --- | --- |
| Header | translucent header token + blur | header bottom |
| Hero | transparent | section bottom |
| Featured Projects | transparent | section bottom |
| Experience & Skills | default translucent band | section bottom |
| Pet Projects | transparent | section bottom |
| About | muted translucent band | none |
| Footer | translucent footer token | footer top |

This produces one line between adjacent regions and avoids accidental two-pixel seams.

Update the corresponding Vue templates to use `divider="bottom"` where listed. Remove the feature-level `border-bottom` declarations from:

- `HeroView.css`;
- `FeaturedProjectsView.css`;
- `ExperienceSkillsView.css`;
- `PetProjectsView.css`.

Remove the About feature border as well; the footer already supplies the final boundary. Keep feature-specific internal rules such as the About personal-note border and Experience card separators.

### 5.5 Integrate the header and footer

Update `SiteHeader.css`:

```css
.site-header {
  background: var(--color-header-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

Retain its sticky position, z-index, and bottom border. The header must stay above the fixed grid and the mobile overlay.

Update `SiteFooter.css` to use `background: var(--color-footer-surface)`. Retain its top border.

The mobile navigation panel should continue to use an opaque `var(--color-bg)` or `var(--color-surface)`. Do not make the modal navigation translucent; content beneath it would reduce readability.

### 5.6 Keep cards legible over the grid

Do not apply the grid separately to cards. Existing `UiBox` variants should remain the card-level contrast system.

During visual tuning:

- keep `UiBox--outline` transparent only when its content remains legible;
- use `--color-surface` or `--color-surface-muted` for dense cards and image frames;
- avoid increasing every card opacity merely to hide the grid;
- prefer slightly stronger borders before introducing shadows;
- confirm the fixed grid does not create moiré against project images.

No change to `UiBox` is required in the first implementation pass.

## 6. Detailed File Change Plan

### `src/styles/tokens.css`

1. Add page-background, grid, section-overlay, header-overlay, and footer-overlay tokens.
2. Define them for the light theme.
3. Override them in explicit dark mode.
4. duplicate the dark overrides in the system-dark fallback.
5. keep current semantic content colors (`--color-text`, `--color-accent`, and so on) unchanged during the first pass so background work can be evaluated independently.

### `src/views/HomeView.vue`

1. Keep its current component order and state ownership.
2. add the scoped external stylesheet import.
3. do not add decorative DOM elements for the grid.

### `src/views/HomeView.css` (new)

1. define the isolated ambient background on `.home-view`;
2. generate the fixed grid with `.home-view::before`;
3. establish content stacking above the grid;
4. add a forced-colors fallback that removes the decorative background;
5. optionally reduce grid opacity below `32rem` only if it competes with mobile text.

### `src/components/shared/UiSection/UiSection.css`

1. make the base surface transparent;
2. point default and muted surface modifiers at new translucent section tokens;
3. retain current spacing, width, and divider behavior.

### Home section templates

Update `HeroView.vue`, `FeaturedProjectsView.vue`, `ExperienceSkillsView.vue`, and `PetProjectsView.vue` with the planned `divider="bottom"` values. Keep Experience on `surface="default"` and About on `surface="muted"`.

### Home section CSS

Remove only the now-redundant outer section borders. Do not remove internal content separators.

### `src/components/layout/SiteHeader/SiteHeader.css`

Use the translucent header token and blur on the desktop/sticky header. Preserve an opaque mobile panel.

### `src/components/layout/SiteFooter/SiteFooter.css`

Add the footer surface token and retain the existing top divider.

### Tests

Update the existing shared and home tests instead of creating a test that attempts to infer rendered gradient pixels in jsdom.

## 7. Step-by-Step Implementation Sequence

### Step 1: Protect the current worktree

- run `git status --short`;
- preserve the existing modified Pet Projects plan, favicon, home content, and tests;
- do not format or rewrite unrelated files.

### Step 2: Add environmental design tokens

- add the proposed light values to `:root`;
- add the proposed dark values to both dark-theme branches;
- keep the grid size at `24px` initially to match the reference;
- ensure every new token has a valid value in every theme path.

### Step 3: Add the home-route background owner

- create `HomeView.css`;
- paint the full-height vertical and radial gradients on `.home-view`;
- add the fixed grid pseudo-element;
- establish an isolated stacking context;
- verify the grid cannot receive pointer input.

### Step 4: Expose the ambient layer through sections

- make the base `UiSection` surface transparent;
- replace opaque default/muted section colors with the new translucent tokens;
- confirm that section text still uses `--color-text` and no content color inheritance changes.

### Step 5: Centralize dividers

- assign divider props in the section templates;
- remove duplicate outer borders from feature CSS;
- keep exactly one line at every intended boundary;
- inspect the About/Footer boundary specifically for a double border.

### Step 6: Connect header and footer surfaces

- switch the sticky header to the translucent token and blur;
- add the prefixed blur property;
- switch the footer to its translucent token;
- confirm mobile navigation and the cookie banner remain sufficiently opaque.

### Step 7: Tune contrast using real content

- inspect empty regions, dense card regions, and the portrait area;
- tune grid opacity before changing grid size;
- tune section alpha before changing content colors;
- confirm the lower page is darker but headings, muted text, borders, and focus rings still meet contrast expectations;
- ensure the top accent glow does not read as a spotlight behind the portrait only.

### Step 8: Add automated coverage

Extend `src/__tests__/shared/components.spec.ts` to verify:

- default `UiSection` receives the transparent surface modifier;
- default and muted surface props produce their expected modifier classes;
- divider values produce the expected modifier classes.

Extend the relevant home-section tests to verify the selected divider and surface props are present in rendered class names. Keep `HomeView.spec.ts` focused on page composition and narrative order.

Do not assert exact gradient strings in unit tests. CSS visual output belongs in browser verification; exact-string tests would make harmless color tuning expensive.

### Step 9: Perform browser verification

Inspect at least:

- 320 px and 390 px mobile widths;
- 768 px tablet width;
- 1024 px and 1440 px desktop widths;
- explicit light theme;
- explicit dark theme;
- system dark mode with no stored theme;
- 200% browser zoom;
- reduced-motion mode;
- Windows forced-colors mode if available.

At each size, scroll from hero to footer and check that darkening is continuous rather than changing abruptly at section boundaries.

### Step 10: Run repository verification

After implementation, run:

```sh
npm run format
npm run lint
npm run test:unit -- --run
npm run build
```

Review the diff after formatting because the lint scripts can apply automatic fixes.

## 8. Accessibility and Resilience Requirements

- The grid must remain purely decorative and absent from the accessibility tree.
- It must use `pointer-events: none` and never obscure focus indicators.
- Text contrast must be checked at the darkest bottom-of-page background, not only near the hero.
- Muted text and one-pixel borders require separate checking in both themes.
- Theme switching must update all background tokens without a reload.
- The page must remain fully readable if CSS masks are unsupported; the fallback is an unmasked low-opacity grid.
- Under `forced-colors: active`, remove the page gradients and grid so system colors remain authoritative.
- The background must not depend on animation, so reduced-motion users receive the same composition without special behavior.
- Printing should suppress the grid and translucent layers. Add a print rule only if current browser output shows the texture being printed.

## 9. Performance Requirements

The implementation should remain paint-only CSS with no runtime state.

- Use one fixed pseudo-element, not one grid layer per section.
- Do not update custom properties on scroll.
- Do not use `background-attachment: fixed`; the fixed pseudo-element is more predictable across browsers.
- Keep blur limited to the small sticky header rather than the full page.
- Avoid large blurred shadows over the grid.
- Verify scrolling on a mid-range mobile device or browser emulation; if paint cost is visible, first remove the mask on narrow screens, then consider changing the grid from fixed to absolute.

## 10. Acceptance Criteria

The background change is complete when:

- the home page has a continuous top-to-bottom depth gradient;
- the bottom of the page is visibly but subtly darker than the hero;
- a 24 px CSS grid is visible in open space without interfering with text;
- the grid remains viewport-anchored while the content scrolls;
- the grid fades toward the viewport edges through a mask;
- Experience and About read as translucent surface bands rather than opaque color blocks;
- exactly one hairline divider appears between intended major regions;
- the sticky header has a readable translucent/blurred treatment;
- the footer belongs to the darker end of the same background system;
- light and dark themes both remain intentional and readable;
- `/debug` retains its ordinary background and component-inspection usefulness;
- mobile navigation, cookie consent, links, and focus outlines remain usable;
- there is no horizontal overflow or pointer interception;
- unit tests, lint, type checking, and the production build pass;
- unrelated user changes remain untouched.

## 11. Deferred Enhancements

Do not include these in the first background change:

- mouse-following glow;
- scroll-driven grid distortion;
- canvas, WebGL, noise images, or video;
- animated scanlines;
- per-section JavaScript depth calculations;
- converting all typography to monospace;
- redesigning project cards or content hierarchy;
- adding theme modes beyond the existing light/dark system.

If the static system succeeds, a later pass may experiment with an extremely subtle scroll-linked accent glow behind the active section. That should be treated as optional progressive enhancement, not part of the background foundation.
