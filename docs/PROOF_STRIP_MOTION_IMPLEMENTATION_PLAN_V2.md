# Proof Strip Motion and Newcomer Experience Plan

## Decision

Turn the proof strip into a calm, evidence-led bridge between the hero promise and the project work.
The block should enter once as a short four-step sequence, settle completely, and then respond only
to intentional hover or keyboard focus. Each proof point should link to the case study or evidence
that substantiates it.

Do **not** add a perpetual idle bob. It makes factual metrics feel unstable, competes with reading,
and creates motion without adding meaning. The memorable move should be a short "signal acquisition"
sequence: the accent divider draws in, each proof surface resolves upward by a few pixels, and the
value becomes fully opaque before its supporting text. This is a restrained, engineering-specific
gesture that fits the existing grid, Mona Sans typography, teal accent, and evidence-first content.

## Scope and outcome

This document replaces the direction in `docs/PROOF_STRIP_MOTION_PLAN.md`. It is an implementation
plan, not an instruction to change the production UI immediately.

The desired first-visit experience is:

1. The visitor finishes the hero and immediately sees a named proof section rather than four
   unexplained statistics.
2. The four facts arrive in reading order over less than one second.
3. Motion stops, leaving a stable surface that is easy to scan.
4. Hover or keyboard focus raises one item slightly and exposes a clear evidence cue.
5. Activating an item takes the visitor to the corresponding case study or evidence section.
6. Reduced-motion users receive the same content and navigation with no spatial movement.

Success is not "more animation." Success is faster comprehension, clearer affordance, traceable
proof, and no loss of comfort or performance.

## Research method

The research was performed in two passes, with a review between them.

- **Pass A:** 54 portfolios: the four supplied sites were directly inspected at 1280 × 720,
  including their rendered layouts and computed transition/animation styles; 50 additional developer
  portfolios were scanned from the community-maintained Developer Portfolios directory.
- **Interim review:** compared those findings with the existing proof-strip plan and this repository's
  Vue, CSS, reveal composable, tokens, content model, and tests.
- **Pass B:** 50 different developer portfolios were scanned from a later, non-overlapping portion of
  the same directory. Findings were used to revise the plan and add interaction, accessibility,
  validation, and rollout details.

The directory is a corpus source, not an endorsement or quality ranking. The two exact samples are
recorded in the appendices so the audit is reproducible. Broader comparison also used curated lists
from [Colorlib's developer portfolio collection](https://colorlib.com/wp/developer-portfolios/),
[Colorlib's game-developer portfolio collection](https://colorlib.com/wp/game-developer-portfolios/),
[CareerFoundry's software-engineer examples](https://careerfoundry.com/en/blog/web-development/software-engineer-portfolio/),
and the [Web Design Awards portfolio rubric](https://www.webdesignawards.io/categories/portfolio).

## What the four supplied portfolios teach us

### Nikita Galochkin — The Slayer's Codex

URL: [n-galochkin.github.io](https://n-galochkin.github.io/)

- Strongest idea: motion, typography, iconography, and project framing all belong to one game-world
  metaphor. The site feels authored rather than assembled.
- Direct inspection found 900 ms reveal transitions with a 28 px vertical offset, short 180–400 ms
  interaction transitions, canvas embers, video, and many image transforms.
- Useful for our strip: a sequential reveal can create ceremony around proof, and stable dividers can
  hold the composition while an inner surface moves.
- Do not copy: the amount of ambient motion and thematic ornament suits a cinematic game portfolio,
  but would overpower a four-item evidence strip and increase first-visit cognitive load.

### Andrei Levchenko — Software Engineer

URL: [resume-al.usluga.website](https://resume-al.usluga.website/)

- Strongest idea: large, direct positioning is followed immediately by quantified evidence.
- Direct inspection found restrained 180–200 ms interactions, an 18 px project-card reveal, a single
  blinking cursor, and one 5 s floating panel.
- Useful for our strip: facts work when they are close to the promise, visually consistent, and easy
  to scan. Motion can be sparse while the page still feels deliberate.
- Do not copy: persistent floating is acceptable on a decorative portrait panel but would undermine
  the perceived precision of performance metrics.

### Rajdeep Senapati — Data Science and AI

URL: [rajdeep-senapati.vercel.app](https://rajdeep-senapati.vercel.app/#work)

- Strongest idea: each project has a miniature visualization whose motion represents the project
  domain—forecast flow, route flow, metric pulse—instead of applying one generic animation everywhere.
- Direct inspection found a 700 ms page entrance, 650 ms/24 px scroll reveals, 200–420 ms hover
  transitions, and domain-specific animations between roughly 1.35 s and 4 s.
- Useful for our strip: motion should describe the content. A brief signal/draw-in gesture fits
  engineering evidence better than generic floating.
- Do not copy: many simultaneous looping signals are engaging in a project gallery but too active for
  a compact credibility block.

### Bhuvanesh Neve — Full Stack Java Developer

URL: [portfolio-bhuvi-one.vercel.app](https://portfolio-bhuvi-one.vercel.app/)

- Strongest idea: familiar card motion, clear availability status, and consistent 300 ms interaction
  timing make a long page approachable.
- Direct inspection found two canvases, repeated 25–30 px reveal offsets, 300 ms transitions, and
  small pulsing status dots.
- Useful for our strip: consistency is valuable, but the proof block should have a smaller motion
  distance than general content cards because it is denser and closer to the hero.
- Do not copy: broad `transition: all` rules and repeated pulsing create unnecessary work and make it
  harder to reason about what actually moves.

## Cross-portfolio findings from pass A

The first pass produced six recurring patterns:

1. **The best first screen makes a claim, then proves it quickly.** Quantified proof close to the hero
   reduces the gap between positioning and evidence.
2. **One-shot entrances are common; perpetual motion is selective.** Strong portfolios usually stop
   moving once content has arrived. Continuous motion is reserved for a hero object, status signal, or
   domain visualization.
3. **Useful hover motion previews an action.** Lift, image zoom, color, or an arrow indicates that a
   project is clickable. Motion on a non-interactive block is less useful.
4. **Small stagger improves reading order.** A short sequence makes a group legible without forcing
   the visitor to wait.
5. **Proof is stronger when it leads somewhere.** Case studies, live work, source code, or a clear
   explanation make metrics credible.
6. **Distinctive motion comes from content.** The memorable examples use motion that describes a
   system, route, forecast, game, or craft—not a stock floating-card preset.

## Review of the existing plan

### Keep

- Separate the reveal layer from the interaction layer so transforms do not overwrite each other.
- Keep dividers on a stable outer element.
- Add balanced vertical padding.
- Use different enter and exit easing.
- Treat hover and keyboard focus consistently.
- Preserve the four-, two-, and one-column layouts.
- Respect `prefers-reduced-motion`.

### Change

- Replace the delayed infinite bob with a finite entrance sequence. A proof metric should settle.
- Do not animate `background-color`, `box-shadow`, or `border-color` during the entrance. They can be
  immediate interaction-state cues; the moving properties should be `transform` and `opacity`.
- Remove the proposed extra `.proof-strip__content` transform layer unless a content sub-sequence is
  actually implemented. The outer item can own reveal, and a single inner anchor/surface can own
  hover/focus. Two layers are sufficient.
- Make each proof item a real link. The current list items contain no focusable descendants, so the
  existing `:focus-within` rule cannot be reached by keyboard.
- Add a visible section label and short explanatory line. The current `h2` is screen-reader-only,
  leaving newcomers to infer what the numbers mean.
- Avoid scaling the whole card. Scaling text can soften rendering and makes adjacent dividers feel as
  if they shift. Use a 3–4 px translation instead.
- Do not use `transition: all`; name only the properties that change.

## Revision after pass B: features added

The second, unique 50-site scan reinforced the need for restraint and added the following features to
the final plan:

1. **Evidence destinations in the data model.** Every metric gets an internal route or hash target,
   not a decorative click state.
2. **A persistent evidence affordance.** A short “View evidence” label or arrow is visible without
   hover on touch devices and becomes more prominent on hover/focus for pointer users.
3. **Motion only once per page view.** Repeatedly replaying the stagger while scrolling up and down
   makes navigation feel noisy. Reuse the existing observer's one-shot behavior.
4. **A compact mobile sequence.** On a single-column phone layout, shorten the stagger so the fourth
   item is not delayed by nearly a second.
5. **No count-up animation.** Values include `GPU`, `90 days`, punctuation, and scale qualifiers.
   Counting would be inconsistent, may imply measurement precision that is not present, and delays
   access to the actual evidence.
6. **Touch and coarse-pointer rules.** Do not leave content dependent on hover. Touch users get the
   static raised affordance and can activate the entire link.
7. **Forced-colors validation.** Dividers and focus must remain visible when authored colors are
   replaced.
8. **A/B-ready instrumentation hooks, not analytics code.** Stable data attributes allow later
   measurement of proof-link activation without coupling this implementation to a tracking vendor.
9. **A two-stage rollout.** Ship semantics and links first, then motion. This makes the UX improvement
   independently reviewable and easy to roll back.

## Final interaction specification

### Visual direction

The existing site is closest to a restrained Swiss system: pale neutral surface, one teal accent,
one sans family, hairline grid, and evidence-led asymmetry. Keep that direction. The differentiator
is the **signal acquisition sequence**—a divider draws in while the metric resolves into place.

### Resting state

- The section has a visible `h2`: **Selected engineering proof**.
- Optional supporting copy: **Measured outcomes and systems, linked to the work behind them.**
- Four items remain in a flat grid with stable accent dividers.
- Each item is a full-surface link with value, label, detail, and a small evidence cue.
- No animation runs after the entrance completes.

### Entrance sequence

Trigger once when roughly 20% of the section intersects the viewport.

| Element | From | To | Duration | Delay |
| --- | --- | --- | ---: | ---: |
| Section heading | `opacity: 0`, `translateY(6px)` | stable | 320 ms | 0 ms |
| Item surface | `opacity: 0`, `translateY(8px)` | stable | 420 ms | `90ms + index × 65ms` |
| Accent divider pseudo-element | `scaleY(0)` | `scaleY(1)` | 360 ms | same item delay |
| Evidence cue | `opacity: 0` | `opacity: 1` | 220 ms | item delay + 180 ms |

Use an emphasized arrival such as `cubic-bezier(0.16, 1, 0.3, 1)`. The complete desktop sequence
finishes in about 705 ms; on mobile use a 45 ms stagger and 360 ms item duration.

### Hover and focus-visible

- Translate the inner link/surface upward by 3 px over 220 ms.
- Increase the surface contrast immediately or over the existing normal duration.
- Add a modest shadow; do not animate a large blur radius.
- Translate the evidence arrow 3 px inline.
- Use the existing global focus outline. Do not remove or replace it with shadow alone.
- Return to rest over 160–180 ms.
- Apply the same visual state with `:hover` and `:focus-visible` on the link, not `:focus-within` on an
  unfocusable list item.

### Active/press state

- Reduce the lift to 1 px while pressed.
- Do not scale below 1; the press should not make text visibly pulse.
- Keep the focus outline intact for keyboard activation.

### Reduced motion

Under `@media (prefers-reduced-motion: reduce)`:

- reveal heading, items, dividers, and cue immediately;
- set all proof-strip transforms to `none`;
- remove stagger delays and keyframe animations;
- keep non-motion cues: surface contrast, border, underline/arrow, and focus outline.

The repository already has a global reduced-motion rule, but the component should still declare its
final reduced-motion state explicitly. This prevents hidden initial styles or inline reveal delays from
leaving content in an intermediate state. The recommendation follows
[MDN's reduced-motion guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
and [WCAG guidance for animation triggered by interaction](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions).
Avoiding an infinite bob also avoids introducing automatically moving content that would need careful
treatment under [WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide).

## Information architecture and content changes

Extend `ProofPoint` in `src/content/home.ts` with a destination and accessible action label. Use the
same action shape already used elsewhere if practical.

```ts
export interface ProofPoint {
  value: string
  label: string
  detail: string
  action: NavigationAction
  analyticsId: string
}
```

Map the current proof points to real evidence:

| Proof | Recommended destination | Why |
| --- | --- | --- |
| `10.000+ Replicated entities` | Endless War case study, scale/evidence heading | Shows the architecture behind the claim. |
| `1.000+ Concurrent players` | Endless War case study, networking heading | Connects capacity to the custom network solution. |
| `GPU Batched skeletal rendering` | Rockbelt or relevant rendering case study | Lets a technical visitor inspect the approach. |
| `90 days From-scratch delivery pipeline` | The case study that documents the simulator delivery | Grounds the schedule in scope and outcome. |

If a real destination does not yet exist, keep that item non-interactive and do not give it hover lift.
Never create a dead or placeholder link merely for visual consistency.

## DOM structure

Use a stable structural layer and one interactive motion layer:

```vue
<UiSection id="proof" class="proof-strip" reveal ...>
  <header class="proof-strip__header ui-section__reveal-item">
    <UiText id="proof-title" as="h2" role="heading">Selected engineering proof</UiText>
    <UiText as="p" tone="subtle">
      Measured outcomes and systems, linked to the work behind them.
    </UiText>
  </header>

  <ul class="proof-strip__list">
    <li
      v-for="(point, index) in proofPoints"
      :key="point.label"
      class="proof-strip__item ui-section__reveal-item"
      :style="{ '--reveal-index': index }"
    >
      <RouterLink
        class="proof-strip__surface"
        :to="point.action.to"
        :data-proof-id="point.analyticsId"
        :aria-label="`${point.value} ${point.label}. ${point.action.label}`"
      >
        <UiText as="strong" role="data" class="proof-strip__value">...</UiText>
        <UiText as="span" role="label" class="proof-strip__label">...</UiText>
        <UiText as="span" tone="subtle" class="proof-strip__detail">...</UiText>
        <span class="proof-strip__action" aria-hidden="true">View evidence →</span>
      </RouterLink>
    </li>
  </ul>
</UiSection>
```

Do not make the entire `<li>` focusable with `tabindex="0"` if it does not perform an action. Native
links provide correct keyboard behavior, semantics, context menu support, and screen-reader output.

## CSS architecture

### 1. Add component motion tokens

Add these aliases to `src/styles/tokens.css` only if they will be reused; otherwise keep them local to
`.proof-strip`:

```css
.proof-strip {
  --proof-enter-distance: 0.5rem;
  --proof-hover-distance: 0.1875rem;
  --proof-enter-duration: 420ms;
  --proof-hover-duration: 220ms;
  --proof-exit-duration: 170ms;
  --proof-stagger: 65ms;
  --proof-ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 2. Keep layout on the outer item

The item owns grid placement and dividers. It must not translate on hover.

```css
.proof-strip__item {
  position: relative;
  min-width: 0;
}

.proof-strip__item:not(:first-child)::before {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: var(--border-width);
  background: var(--color-accent);
  content: '';
  transform: scaleY(1);
  transform-origin: center;
}
```

Retain the current breakpoint logic, moving it from `border-inline-start` to the pseudo-element's
visibility/placement.

### 3. Put layout and interaction on the surface

```css
.proof-strip__surface {
  display: grid;
  grid-template-rows: minmax(clamp(1.4rem, 3vw, 2.1rem), auto) auto minmax(3.3em, auto) auto;
  align-content: start;
  gap: var(--space-1);
  min-height: 100%;
  padding: var(--space-4);
  border-radius: var(--radius-small);
  color: inherit;
  text-decoration: none;
  transform: translateY(0);
  transition:
    transform var(--proof-exit-duration) cubic-bezier(0.7, 0, 0.84, 0),
    background-color var(--duration-normal) var(--ease-standard),
    box-shadow var(--duration-normal) var(--ease-standard);
}

@media (hover: hover) and (pointer: fine) {
  .proof-strip__surface:hover {
    transform: translateY(calc(-1 * var(--proof-hover-distance)));
    transition-duration: var(--proof-hover-duration);
    transition-timing-function: var(--proof-ease-enter);
  }
}

.proof-strip__surface:focus-visible {
  transform: translateY(calc(-1 * var(--proof-hover-distance)));
  transition-duration: var(--proof-hover-duration);
  transition-timing-function: var(--proof-ease-enter);
}
```

Use `transform` and `opacity` for moving content. These are normally compositor-friendly; animating
layout and paint properties can create jank and layout shift, as explained by
[web.dev's animation performance guide](https://web.dev/articles/animations-guide) and
[Chrome's non-composited animation guidance](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations).
Do not add `will-change` by default; measure first, because unnecessary layers consume memory.

### 4. Integrate with the existing reveal system

`UiSection` and `useReveal` already control `.ui-section__reveal-item`. Extend their proof-specific
styles instead of adding a second observer.

- Initial item state: `opacity: 0; transform: translateY(var(--proof-enter-distance));`.
- Visible item state: `opacity: 1; transform: translateY(0);`.
- Delay: `calc(90ms + var(--reveal-index) * var(--proof-stagger))`.
- Keep hover transform on `.proof-strip__surface`, not `.proof-strip__item`, so reveal and hover never
  compete for the same `transform` declaration.
- Ensure the observer unobserves after reveal; confirm this in `useReveal.ts` before implementation.

### 5. Draw the divider once

Animate the divider's `scaleY` only during the initial reveal. Do not replay it on every hover. If
visual testing finds the line draw too ornamental, remove it before removing the item sequence; the
item sequence carries more comprehension value.

### 6. Style the evidence cue

- Keep the text short and literal: `View evidence`.
- Show it at rest with subtle tone; never make important action meaning hover-only.
- On hover/focus, strengthen color and translate only the arrow/pseudo-element by 3 px.
- At widths below 32 rem, keep the cue visible and place it after the detail.

## Step-by-step implementation plan

### Phase 0 — verify evidence destinations

1. Identify the exact route and heading ID for each proof point.
2. Add missing heading IDs to case studies without changing their visible copy.
3. Confirm every claim is accurate and attributable.
4. Stop and resolve any proof item that lacks a real destination; do not invent one.

**Why:** interaction must increase trust. A clickable claim that lands on generic content does the
opposite.

### Phase 1 — ship semantics and navigation

1. Extend `ProofPoint` with `action` and `analyticsId`.
2. Add the four real destinations in `src/content/home.ts`.
3. Replace the screen-reader-only heading with the visible header block.
4. Wrap only actionable items in `RouterLink`; use a non-interactive surface for unresolved items.
5. Add a visible evidence cue.
6. Update unit tests for link targets, accessible names, and item count.

**Why:** this phase creates user value even if all motion is later disabled.

### Phase 2 — separate structural and motion layers

1. Move text-grid layout and balanced padding from `.proof-strip__item` to
   `.proof-strip__surface`.
2. Replace divider borders with stable item pseudo-elements.
3. Remove transform, background, shadow, and transition rules from the outer item.
4. Confirm the four/two/one-column divider pattern before adding animation.

**Why:** independent layers prevent reveal and interaction transforms from overwriting each other.

### Phase 3 — add the finite entrance

1. Add proof-specific reveal distance, duration, easing, and stagger variables.
2. Use the existing `UiSection` observer and `.ui-section__reveal-item` state.
3. Animate surfaces with opacity and an 8 px vertical translation.
4. Animate divider pseudo-elements from `scaleY(0)` to `scaleY(1)`.
5. Fade the evidence cue after its parent begins resolving.
6. Confirm the entire sequence completes in under 750 ms desktop and under 650 ms mobile.

**Why:** the sequence teaches reading order, calls attention to evidence once, and then gets out of
the way.

### Phase 4 — add intentional interaction feedback

1. Add the 3 px surface lift for fine-pointer hover.
2. Apply the same lift to `:focus-visible` on the link.
3. Add immediate surface contrast and modest shadow.
4. Move only the cue arrow inline by 3 px.
5. Add the 1 px pressed state.
6. Verify rapid pointer entry/exit does not leave a transition queued.

**Why:** motion now confirms clickability and location; it is not decorative.

### Phase 5 — accessibility modes

1. Add a proof-specific reduced-motion block that makes all content immediately visible and removes
   transforms, animation, and delay.
2. Test keyboard order from the hero actions through all four proof links.
3. Verify visible focus in light, dark, and forced-colors modes.
4. Verify the accessible name does not repeat the visible text confusingly.
5. Confirm touch users see the evidence cue without hover.
6. Confirm 200% zoom and 320 px width do not clip the value, detail, or outline.

**Why:** alternative modes must preserve information and affordance, not merely stop motion.

### Phase 6 — performance and regression testing

1. Record a Chrome Performance trace on a mid-range/mobile emulation profile.
2. Confirm entrance animations are composited and do not trigger repeated layout.
3. Check Cumulative Layout Shift: target `0` attributable to the proof strip.
4. Check that the strip adds no JavaScript bundle dependency and no network request.
5. Run `npm run type-check`, `npm run test:unit -- --run`, and `npm run build-only`.
6. Test with throttled CPU and confirm the final state appears even if frames are dropped.

**Why:** graceful final state matters more than perfect animation on a fast development machine.

### Phase 7 — visual QA and rollout

1. Capture before/after screenshots at 320, 390, 768, 1024, and 1440 px.
2. Review light, dark, reduced-motion, forced-colors, touch, keyboard, and 200% zoom.
3. Ship Phase 1 separately if possible; then ship motion in a second change.
4. If analytics already exist, record only proof-link activation using `data-proof-id`; do not add a
   vendor solely for this block.
5. After release, compare proof-link activation and downstream case-study engagement. Do not optimize
   for hover counts because hover is not intent.

**Why:** separate rollout makes semantic value and animation risk independently observable.

## Test plan

### Unit tests in `src/__tests__/views/HomeView.spec.ts`

- renders exactly four proof items;
- renders a visible `h2` named `Selected engineering proof`;
- every actionable item is a link with the expected route/hash;
- every proof link has a stable `data-proof-id`;
- item value, label, and detail come from `proofPoints`;
- no `tabindex` is added to non-interactive list items;
- reveal index values are `0`, `1`, `2`, and `3`.

Do not use jsdom to claim that hover, animation timing, breakpoints, or compositing work. Those require
a real browser.

### Browser acceptance matrix

| Mode | Acceptance |
| --- | --- |
| Desktop pointer | Sequence runs once; hover lift is 3–4 px; exit is crisp; dividers remain fixed. |
| Keyboard | Each linked proof receives visible focus in DOM order and activates correctly. |
| Touch/coarse pointer | No hover dependency; full item target works; evidence cue is visible. |
| Reduced motion | No spatial motion or delay; all content is immediately present. |
| Light and dark | Surface, text, dividers, shadow, and focus remain legible. |
| Forced colors | Native link/focus distinction and dividers remain visible. |
| 200% zoom | No clipped text, overlap, or off-screen focus ring. |
| Slow CPU | Animation may drop frames, but content ends fully visible and layout does not shift. |

## Acceptance criteria

- A newcomer can identify the block as engineering proof without inferring its purpose.
- Every interactive metric leads to specific supporting evidence.
- The entrance finishes in less than 750 ms and runs once.
- Nothing in the strip animates indefinitely.
- Hover and focus move only the interactive surface, not dividers or neighboring layout.
- All spatial animation is limited to `transform`; reveal visibility uses `opacity`.
- Reduced-motion users receive an immediate, fully usable state.
- The strip works at four, two, and one columns with no layout shift.
- Keyboard focus is visible and follows the reading order.
- No animation library or new runtime dependency is introduced.
- Type-check, unit tests, and production build pass.

## Explicit non-goals

- No number count-up.
- No infinite bob, pulse, marquee, parallax, cursor-following glow, or particle field.
- No autoplay audio or video.
- No `transition: all`.
- No JavaScript pointer tracking.
- No animation library for this block.
- No fabricated metric, testimonial, or evidence destination.
- No motion that is necessary to understand the content.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Four staggered items feel slow on mobile | Use 45 ms mobile stagger and 360 ms duration. |
| Link wrapping changes card height | Keep `min-height: 100%` on the surface and test long copy at 320 px. |
| Reveal transform conflicts with hover | Reveal outer item; hover inner surface. |
| Focus outline clips under overflow | Do not set overflow hidden on item/surface; test edge items. |
| Shadow muddies dark theme | Use a theme-aware low-alpha shadow; rely on border/surface contrast first. |
| Missing evidence weakens trust | Keep unresolved items static until a real destination exists. |
| Too many compositor layers | Avoid blanket `will-change`; profile before promoting. |
| Animation replays on back-scroll | Preserve one-shot observer behavior and unobserve after reveal. |

## Appendix A — pass A corpus: 50 unique developer portfolios

These are the first 50 entries used from the
[Developer Portfolios directory](https://github.com/emmabostian/developer-portfolios), separate from
the four supplied sites.

1. [Aditya Seth](https://adityaseth.in)
2. [Aditya Thakur](https://adityathakur.me)
3. [Aditya Vikram Singh](https://www.adityavsingh.com)
4. [Aditya](https://aditya-a-portfolio.vercel.app)
5. [Adityakumar Sinha](https://aditya113141.github.io)
6. [Adnan Khan](https://adnan-portfolio-web.onrender.com)
7. [Adrian Hansen](https://adrian-hansen-dev.github.io)
8. [Advait Nair](https://advaitnair.org)
9. [Adwitya](https://adwityac.netlify.app)
10. [Afam Olie](https://afamolie.com)
11. [Afaq Awan](https://afaq35202.github.io)
12. [Affan Raza](https://affan-portfolio-kappa.vercel.app)
13. [Afjal Ansari](https://md-afjal-ansari.onrender.com)
14. [Aftab Alam](https://datasciencefolio.streamlit.app)
15. [Aggelos Ladas](https://aggelosladas.com)
16. [Agney Menon](https://agney.dev)
17. [Agrawal Pratham](https://agrawalpratham.in)
18. [Ahamed Kabeer](https://aktech27.github.io)
19. [Aharon Zilberman](https://ahronsilv.dev)
20. [Ahmad Almory](https://ahmedalmory.github.io)
21. [Ahmad Awais](https://ahmadawais.com)
22. [Ahmad Faraz](https://theahmadfaraz.com)
23. [Ahmed Abdelhafiez](https://nevo.is-a.dev)
24. [Ahmed Allali](https://portfolio-ahmed-allalis-projects.vercel.app)
25. [Ahmed Nassar](https://ahmednassar7.github.io)
26. [Ahmed Tokyo](https://ahmedtokyo.com)
27. [Ahmet Eren Odacı](https://ahmete.ren)
28. [Aishani Pachauri](https://aishanipach.netlify.app)
29. [Aishwarya Shyam](https://aishwarya-cs-portfolio.netlify.app)
30. [Aitezaz Sikandar](https://aitezazdev.vercel.app)
31. [Ajay Kannan](https://ajaykannan.netlify.app)
32. [Ajay Kumar Sharma](https://ajay-sharma.in)
33. [Ajay Pawar](https://ajay-pawar.vercel.app)
34. [Ajay Prajapat](https://ajayprajapat.com)
35. [Ajink Gupta](https://ajinkgupta.vercel.app)
36. [Ajvad Laseen](https://ajvadlaseen.com)
37. [Ajyendu Chaudhary](https://ajyendu.vercel.app)
38. [Akash Balasubhramanyam](https://akashblsbrmnm.github.io)
39. [Akash Kumar](https://portfolio-site-git-main-akash-kumar5s-projects.vercel.app)
40. [Akash Rajpurohit](https://akashrajpurohit.com)
41. [Akash Samanta](https://akashcraft.ca)
42. [Akash Santra](https://my-portfolio-one-roan-33.vercel.app)
43. [Akashkumar Jadav](https://akashjadav.com)
44. [Akhil Pillay](https://akhil-devs-portfolio.vercel.app)
45. [Akhileswar Kamale](https://akhileswar6.github.io)
46. [Akhshy Ganesh](https://akhshyganesh.github.io)
47. [Akira Yoshiro](https://gungho0619.vercel.app)
48. [Akli Massinissa Sadek](https://sadoukas.com)
49. [Akshat Gupta](https://www.akshatvg.com)
50. [Akshat Kotpalliwar / Integeralex](https://realtalkportfolio.vercel.app)

## Appendix B — pass B corpus: 50 more unique developer portfolios

This sample is non-overlapping with pass A and with the four supplied sites.

1. [Mihir Chauhan](https://chauhan-mihir.vercel.app)
2. [Mihir Das](https://getmihir.com)
3. [Milan Milanovic](https://milan.milanovic.org)
4. [Min Khant Kyaw](https://min-khant-kyaw-portfolio.vercel.app)
5. [Minmitha](https://minmitha.vercel.app)
6. [Missael Rangel](https://missaelr.com)
7. [Mitul Savani](https://mitulsavani.com)
8. [Mohamad Fadhil Yaacob](https://fadhil-blog.dev)
9. [Mohamed Khayyer](https://mwamed.com)
10. [Mohamed Zhioua](https://mohamedzhioua.vercel.app)
11. [Mohammad Ahmad — 3D Portfolio](https://3d-portfolio-orpin-one.vercel.app)
12. [Mohammad Ahmad — Netflix Portfolio](https://ahmad-netflix-portfolio-ujir.vercel.app)
13. [Mohammad Araf](https://araf-portfolio.vercel.app)
14. [Mohammad Gauhar](https://www.iamgauhar.in)
15. [Muhammad Murtaza](https://murtazasarwar.com)
16. [Mohammad Haaris Iqubal](https://haarisiqubal.github.io)
17. [Mohammad Hadi Siavashi](https://mhsiavashi.com)
18. [Mohammad Rahmani](https://afgprogrammer.com)
19. [Mohammad Siddique Sakib](https://ssakib-portfolio.vercel.app)
20. [Mohammed Abdullah Khan](https://www.mohammedabdullahkhan.com)
21. [Mohammed Atef](https://mohammedatefportfolio.vercel.app)
22. [Mohammed Ibrahim Islam](https://macromanager.dev)
23. [Mohan Reddy](https://mohanreddy0909.github.io)
24. [Mohd Ubaid Khan](https://mdubaid.in)
25. [Mohibur Rahman Sani](https://www.sanimohibur.me)
26. [Mohit Kumar](https://mohit1r.github.io)
27. [Mohit Paudyal](https://findmohit.netlify.app)
28. [Mohit Shrivastava](https://iamohit.com)
29. [Mohit Verma](https://mohitverma.codes)
30. [Moin Sheikh](https://moinsheikh.in)
31. [Moteeullah Azmi](https://moteeullahazmi.com)
32. [Mouad Ziani](https://mouadziani.github.io)
33. [Mouzan Raza](https://my-portfolio-jz1h.vercel.app)
34. [Mp3Martin](https://mp3martin.xyz)
35. [Mubashar Hussain](https://mubashar.dev)
36. [Mudassir Ali](https://mudassirali.com)
37. [Mudassir Junejo](https://mudassir-junejo.vercel.app)
38. [Mufida Andi](https://heymufi.com)
39. [Muhammad Aamir Malik](https://www.muhammadaamirmalik.com)
40. [Muhammad Abdullah](https://abd-cloud-resume-v1.pages.dev)
41. [Muhammad Adnan](https://portfolio-orpin-nu-27.vercel.app)
42. [Muhammad Ahmad](https://muhammadahmad.dev)
43. [Muhammad Azlaan Zubair](https://www.mdazlaanzubair.com)
44. [Muhammad Faheem Iqbal](https://faheem506pk.vercel.app)
45. [Muhammad Furqan Yasin](https://mfurqanyasin.com)
46. [Muhammad Furqan](https://iammuhammadfurqan.github.io)
47. [Muhammad Hassan Nazar](https://hassannazar72.github.io)
48. [Muhammad Iqbal Nazulis](https://iqbalnzls.github.io)
49. [Muhammad Jahanzeb](https://jahanzeb.dev)
50. [Muhammad Muhaddis](https://muhaddis.info)

## Sources

- [Developer Portfolios community directory](https://github.com/emmabostian/developer-portfolios)
- [Colorlib: developer and software-engineer portfolios](https://colorlib.com/wp/developer-portfolios/)
- [Colorlib: game developer and designer portfolios](https://colorlib.com/wp/game-developer-portfolios/)
- [CareerFoundry: software-engineer portfolio guide and examples](https://careerfoundry.com/en/blog/web-development/software-engineer-portfolio/)
- [Web Design Awards: portfolio category and judging rubric](https://www.webdesignawards.io/categories/portfolio)
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)
- [W3C: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
- [web.dev: high-performance CSS animations](https://web.dev/articles/animations-guide)
- [Chrome for Developers: avoid non-composited animations](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations)
