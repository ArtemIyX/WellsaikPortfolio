# Header Back-to-Top Motion Refinement Plan

Status: implementation-ready plan only  
Prepared: 5 October 2026  
Scope: desktop header first; preserve mobile behavior unless a shared change is required  
Primary files: `src/components/layout/SiteHeader/SiteHeader.vue`, `src/components/layout/SiteHeader/SiteHeader.css`, `src/__tests__/layout/SiteHeader.spec.ts`

## Outcome

Replace the current multi-layered, layout-shifting back-to-top animation with one quiet, stable state change. The navigation and theme selector must not move when the control appears or disappears, the control must not pulse while idle, and activating it must not lose keyboard focus during smooth scrolling.

The intended result is a header that feels precise and calm:

- state changes are noticeable without demanding attention;
- navigation remains visually anchored;
- hover and press feedback use one motion idea each;
- reduced-motion users get the same information with no spatial movement;
- no new animation library or runtime dependency is introduced.

## Design direction

The existing site is closest to a **Swiss** visual anchor: cool white surface, one teal accent, sans-serif type, visible grid, hairline rules, and asymmetric technical composition. Keep that direction. Do not introduce springy, elastic, glowing, or playful motion.

The motion differentiator should remain **measured system state**: the reading-progress line and active-section underline communicate position; the back-to-top control only appears when useful and responds crisply to intent. The control is utility, not a decorative event.

## Evidence from the current implementation

### Source findings

The current back-to-top interaction combines too many effects:

1. `showBackToTop` toggles at `window.scrollY > window.innerHeight * 0.8` with no hysteresis.
2. Vue inserts/removes `.site-header__back-to-top-slot` with `v-if`.
3. The slot animates `width` and `margin-inline`, both of which change header layout.
4. The button simultaneously animates opacity, translation, scale, padding, and border color.
5. Hover changes background, color, border, shadow, and vertical position.
6. Two pseudo-elements add scale/opacity effects.
7. One pseudo-element runs an infinite four-second idle pulse.
8. The arrow has a separate hover/focus/active translation.
9. The active state adds another scale change.

The result is not one coherent transition. It is several nested transitions competing at the same time.

### Rendered desktop findings

The browser was inspected at a requested 1440 × 900 desktop viewport. The content viewport reported approximately 1309 × 818 after browser chrome.

| State | Navigation x-position | Theme selector x-position | Back-to-top width |
|---|---:|---:|---:|
| At page top | 673.62 px | 1172.86 px | 0 px during/after leave |
| Control visible | 581.63 px | 1080.87 px | 75.99 px |

The navigation and theme selector each move about **92 px** when the back-to-top control enters or leaves. This is the main visible “jiggle.” It is structural movement, so changing only the easing curve cannot fix it.

Activating the button also exposed a focus problem:

- smooth scrolling began;
- the control crossed its hide threshold before scrolling finished;
- the button was removed while the page was still around `scrollY = 498`;
- `document.activeElement` became `<body>`.

## Root causes

### 1. Conditional layout, not merely animation timing

The button is inserted into the same flex row as the navigation. Animating the new slot from zero width to 4.75 rem forces every item to find a new horizontal position for the duration of the transition.

### 2. Threshold chatter is possible

The same 80%-of-viewport threshold controls both showing and hiding. Small wheel or trackpad movements near the boundary can repeatedly mount and unmount the control.

### 3. Motion layers have no hierarchy

Entrance, idle, hover, focus, arrow, and press animations all transform related layers. The user sees motion on the container, inner button, pseudo-elements, and arrow instead of one clear response.

### 4. The focused element is destroyed

`v-if` removes the button during its own action. Smooth scrolling takes longer than the threshold change, so keyboard focus has no stable destination.

## Final interaction specification

### Hidden state

- Keep a permanent, fixed-size slot in the header at desktop widths.
- Keep the button mounted; expose it to assistive technology and tab order only when available.
- Use `opacity: 0`, `visibility: hidden`, and `pointer-events: none` for the unavailable visual state.
- If spatial motion is enabled, allow at most a 4 px upward offset. Do not use scale.
- Do not animate width, margin, padding, gap, position, or border width.

### Enter state

- Duration: 160–180 ms.
- Properties: `opacity` plus optional `translateY(4px -> 0)` only.
- Easing: `var(--motion-ease-enter)`.
- Navigation, brand, CV link, and theme selector positions must remain unchanged.

### Exit state

- Duration: 100–140 ms.
- Properties: `opacity` plus optional `translateY(0 -> -4px)` only.
- Easing: `var(--motion-ease-exit)`.
- Exit should be faster than enter.
- Do not remove or disable a focused button until focus has been intentionally transferred.

### Idle state

- Fully still.
- Remove `site-header-back-to-top-idle` and the pulsing `::after` ring.
- Avoid any timer or infinite animation.

### Hover and keyboard focus

- Keep the button itself stationary.
- Change surface, text, and border color in 120–160 ms.
- Move only the arrow upward by 2 px to communicate direction.
- Keep the normal `:focus-visible` outline; focus must not rely on the hover treatment.
- Remove the scaling/accent-ring pseudo-element. One border-color response is enough.

### Press

- Use either a subtle `translateY(1px)` on the arrow or a shadow reduction on the button, not both plus scale.
- Duration: 80–100 ms.
- Never scale the entire header control.

### Visibility thresholds

Use different show and hide boundaries:

- show after the user has passed the hero or approximately one viewport, whichever rule is easier to derive reliably from the existing layout;
- hide only near the real top, for example below 120–160 px;
- do not toggle repeatedly around one threshold.

Recommended minimal state model:

```ts
if (!showBackToTop.value && window.scrollY > showThreshold) {
  showBackToTop.value = true
} else if (showBackToTop.value && window.scrollY < hideThreshold) {
  showBackToTop.value = false
}
```

Keep threshold calculation in one named function or named constants so tests can describe the behavior without duplicating magic numbers.

### Activation and focus

1. Detect whether activation came from keyboard/focused control; do not infer from pointer capability alone.
2. Start `window.scrollTo({ top: 0, behavior })`.
3. Use `behavior: 'auto'` when reduced motion is active; otherwise use `smooth`.
4. Keep the control mounted and logically available while it owns focus.
5. When scrolling reaches the top, transfer focus to a stable top-of-page target before disabling the control. Prefer an existing meaningful target such as the brand link or a programmatically focusable `#main-content`; do not focus `<body>`.
6. Use the `scrollend` event when supported and a small, bounded fallback for browsers without it. Do not install a perpetual polling loop.

If focus-transfer work would materially enlarge the first patch, ship it in the same feature branch but as a separate commit after layout stabilization. It is still part of the definition of done.

## Implementation steps

### Step 0 — Protect the current worktree

1. Inspect `git status --short` before editing.
2. Treat all existing modified and deleted files as user work.
3. Limit edits to the three primary files unless the implementation proves a shared motion token is missing.
4. Do not rewrite the broader animation research documents.

### Step 1 — Add failing behavior tests

Extend `src/__tests__/layout/SiteHeader.spec.ts` before changing the component.

Add tests for:

1. the back-to-top shell/button having stable DOM presence across scroll state;
2. hidden state being removed from tab order and assistive exposure;
3. showing only after the show threshold;
4. remaining visible while the scroll position moves between the show and hide thresholds;
5. hiding only below the hide threshold;
6. click activation calling `window.scrollTo` with smooth behavior in full-motion mode;
7. reduced-motion activation using instant/auto behavior;
8. keyboard activation ending with focus on the chosen stable top target rather than `<body>`.

Mock `requestAnimationFrame`, `scrollY`, `innerHeight`, and `scrollTo` explicitly. Restore all globals after each test so existing mobile-menu tests remain isolated.

### Step 2 — Separate availability from DOM lifetime

In `SiteHeader.vue`:

1. Render `.site-header__back-to-top-slot` unconditionally.
2. Render the button unconditionally inside the slot.
3. Replace the Vue `<Transition name="back-to-top-layout">` mount/unmount behavior with a state class such as `.site-header__back-to-top--visible` or a `data-visible` attribute.
4. Bind `aria-hidden`, `tabindex`, and disabled interaction state from the same source of truth.
5. Keep a button ref for focus-safe activation and exit handling.

Do not leave a focusable zero-opacity control in the header.

### Step 3 — Add hysteresis to scroll state

In `updateReadingProgress()`:

1. keep reading-progress calculation unchanged;
2. compute named show and hide thresholds;
3. update `showBackToTop` only when crossing the appropriate boundary for its current state;
4. retain the existing requestAnimationFrame scheduling so scroll events do not write reactive state on every native event;
5. ensure resize recalculates thresholds without causing repeated transitions.

Prefer a hero-boundary threshold only if it can be observed without introducing another fragile DOM query. A viewport-based rule with hysteresis is acceptable and lower risk.

### Step 4 — Stabilize the header layout

In `SiteHeader.css`:

1. keep `.site-header__back-to-top-slot` at its final desktop width in both states;
2. remove transition rules for slot width and margins;
3. remove negative margins used to collapse the slot;
4. verify that the header fits at every width above the 42 rem mobile breakpoint;
5. add an icon-only intermediate desktop treatment if the full “Top ↑” label causes crowding.

Use a breakpoint based on measured fit, not an arbitrary device name. If permanent slot reservation makes the navigation composition visibly unbalanced, use a three-zone header grid (brand / navigation / utilities) rather than returning to conditional width.

Do not solve crowding by allowing header items to overlap or by shrinking tap targets below 44 CSS px.

### Step 5 — Replace the compound transition

Delete:

- `.back-to-top-layout-*` width/margin/padding transition rules;
- `site-header-back-to-top-idle` keyframes;
- the animated `::after` ring;
- the scale-based `::before` accent treatment;
- whole-button hover lift;
- whole-button active scale.

Add one state transition on the button:

```css
.site-header__back-to-top {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-0.25rem);
  transition:
    opacity 120ms var(--motion-ease-exit),
    transform 120ms var(--motion-ease-exit),
    visibility 0s linear 120ms,
    color var(--motion-duration-feedback) var(--motion-ease-standard),
    background-color var(--motion-duration-feedback) var(--motion-ease-standard),
    border-color var(--motion-duration-feedback) var(--motion-ease-standard);
}

.site-header__back-to-top--visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
  transition-delay: 0s;
  transition-duration: 180ms;
  transition-timing-function: var(--motion-ease-enter);
}
```

The snippet communicates the intended property budget, not mandatory final syntax. Avoid a shorthand that accidentally gives `visibility` a spatial easing or delays hover colors.

### Step 6 — Simplify intent feedback

1. Keep the button box fixed on hover and focus.
2. Retain a restrained surface/border/accent-color change.
3. Let only `.site-header__back-to-top-arrow` translate by 2 px.
4. Use the focus outline already present.
5. On active, return the arrow toward its base position or reduce shadow; do not scale the button.
6. Ensure hover rules are scoped to `(hover: hover) and (pointer: fine)` if touch browsers synthesize unwanted hover persistence.

### Step 7 — Complete reduced-motion behavior

Inside the existing reduced-motion media query and the site-level `data-motion='reduced'` mode:

1. remove spatial transforms from hidden and visible states;
2. switch availability instantly or with opacity only;
3. use non-smooth scrolling;
4. keep state communicated through visibility, text, border, and focus outline;
5. confirm no deleted infinite animation remains in computed styles.

The component should have an explicit reduced-motion final state even though global duration overrides already exist.

### Step 8 — Verify and tune

Run automated checks:

```powershell
npm run test:unit -- src/__tests__/layout/SiteHeader.spec.ts
npm run type-check
npm run build
```

Then inspect the rendered site at these widths:

- 1440 × 900 desktop;
- 1280 × 800 desktop;
- 1024 × 768 compact desktop/tablet landscape;
- 768 × 1024 tablet boundary;
- 375 × 812 mobile regression check;
- 200% browser zoom at desktop width.

For each desktop width:

1. record the navigation and theme-selector bounding rectangles at the page top;
2. scroll until the control appears;
3. confirm x/y movement is no more than 1 px;
4. hover, focus, press, and activate the control;
5. make short up/down trackpad-like movements around the show threshold;
6. confirm the control does not chatter;
7. activate with keyboard and verify final focus;
8. repeat in dark theme and reduced-motion mode.

Use browser performance tools for one scroll pass. There should be no repeated layout work caused by animated header width, margin, or padding.

## Acceptance criteria

The implementation is complete only when all of the following are true:

- Header navigation and theme selector shift by at most 1 px when back-to-top visibility changes.
- No back-to-top rule animates width, margin, padding, gap, top/right/bottom/left, or border width.
- The control has no infinite animation.
- Entrance uses no more than opacity and one short translation.
- Exit is faster than entrance.
- Whole-button scale is absent from enter, hover, focus, and active states.
- Repeated scroll movements near the threshold cause at most one show or hide transition per boundary crossing.
- The hidden control is not clickable, focusable, or announced as available.
- Keyboard activation never leaves focus on `<body>`.
- Reduced-motion mode uses no spatial transition and no smooth scroll.
- Existing mobile menu focus trap, Escape handling, resize closure, active-section state, and reading-progress behavior still pass.
- Unit tests, type check, and production build pass.

## Non-goals

- Do not redesign the entire header.
- Do not add GSAP, Motion One, or another animation dependency.
- Do not add a circular progress ring, glow, bounce, elastic spring, particle effect, or sound.
- Do not change portfolio content or navigation labels.
- Do not alter global animation tokens unless the component cannot express the agreed durations with existing semantic tokens.
- Do not combine this fix with unrelated hero, project-card, or experience-section motion work.

## Suggested implementation order for an LLM agent

1. Read this plan and the three primary files completely.
2. Inspect `git status` and preserve unrelated changes.
3. Add tests for stable presence, hysteresis, scroll behavior, and focus.
4. Refactor the Vue state without styling changes; make tests pass at the behavior level.
5. Reserve the slot and remove all layout-property transitions.
6. Remove idle/pseudo-element/scale effects.
7. Add the single enter/exit transition and arrow-only intent response.
8. Add explicit reduced-motion rules.
9. Run focused tests, type check, and build.
10. Inspect desktop behavior in-browser and measure element positions.
11. Inspect compact widths, 200% zoom, dark theme, and reduced motion.
12. Report changed files, verification results, and any measured deviation from the acceptance criteria.

Do not stop after making the animation look calmer in one screenshot. The essential proof is that header geometry remains stable across the full show → interact → activate → hide sequence.
