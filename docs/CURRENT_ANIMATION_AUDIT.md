# Current Animation Audit

Audit date: 4 October 2026  
Scope: source review plus rendered browser inspection at 1440×900 and the default narrow viewport  
Framework: Vue 3, Vue Router, plain scoped CSS; no animation runtime dependency

## Outcome

The current site is not motionless. It has a responsible foundation and approximately ten authored keyframe families, but most visible behavior resolves to the same three gestures: fade/rise, small vertical lift, and gentle scale. That makes the site polished yet generic. The biggest opportunity is to turn the existing evidence and architecture into a coherent, content-bearing motion language.

## Current motion inventory

| Area | Current behavior | Source | Assessment |
|---|---|---|---|
| Global theme | Background, border, and text colors transition for 300 ms | `src/styles/global.css` | Good continuity; may be expanded into a bounded theme wipe later. |
| Motion tokens | Fast 120 ms, normal 200 ms, entrance 520 ms, exit 180 ms, stagger 70 ms, ambient 5 s, reveal distance 1.125 rem | `src/styles/tokens.css` | Useful start, but missing spring/expressive curves, distance tiers, motion roles, and mode controls. |
| Hero copy | Five children stagger through the same 520 ms fade/rise | `HeroView.css` | Clear and safe, but generic. The label, title, summary, actions, and availability should not all behave identically. |
| Hero portrait | One 520 ms fade/rise; theme images crossfade | `HeroView.css` | Functional. No depth, intent response, or relationship to the grid/system theme. |
| Section reveal | `IntersectionObserver` triggers one-shot fade/rise with per-item index | `useReveal.ts`, `UiSection.css` | Accessible and efficient. The same reveal everywhere creates repetition and does not communicate section meaning. |
| Proof strip | Shorter fade/rise, divider draw, 3 px lift, arrow translation, surface/shadow change | `HomeView.css` | Best current motion component. It has separate reveal and interaction layers and explicit reduced-motion final states. |
| Featured projects | Card lifts 2 px; image scales 1.025 and gains contrast/saturation | `ProjectCard.css` | Conventional and subtle. Does not preview the work or expose interaction direction. |
| Experience timeline | Cards bob forever over 8 s; markers pulse; hover pauses and lifts 12 px | `ExperienceSkillsView.css` | Visibly alive, but infinite card bobbing competes with reading and can make the page feel unstable. |
| Pet projects | Card lifts 2 px and border changes | `PetProjectCard.css` | Clear affordance but identical to thousands of portfolio grids. Filtering lacks strong spatial feedback. |
| Header | Scroll listener + rAF updates a 2 px width progress bar; active section uses IntersectionObserver | `SiteHeader.vue`, `SiteHeader.css` | Valuable persistent state. Width animation is layout-affecting; a scale transform would be cheaper. Active item change is only color, so state changes feel abrupt. |
| Mobile menu | Backdrop fades; panel translates from right; focus is trapped and restored | `SiteHeader.vue`, `SiteHeader.css` | Strong accessible baseline. Could add staged item entrance without slowing access. |
| Theme selector | Button lifts 1 px; selected icon rotates −8° and scales 1.08 | `ThemeSelector.css` | Good microinteraction. Theme transition itself could communicate cause/effect more clearly. |
| Shared links/buttons | Color, background, border, shadow, and small vertical response | `UiLink.css`, `UiButton.css` | Consistent, but button press physics and directional icon behavior are incomplete. |
| Loading button | 700 ms infinite spinner | `UiButton.css` | Appropriate state communication; should stop under reduced motion through explicit local rules as well as global protection. |
| Case-study architecture | A pulse translates 238 px every 2.4 s; user can pause | `ProjectCaseStudyView.css` | Excellent content-bearing seed. It should evolve into a scroll/step-controlled explanation with labels and multiple paths. |
| Page background | Fixed masked CSS grid, intentionally static | `HomeView.css` | Strong visual foundation and the ideal carrier for a signature systems interaction. |

## Rendered-site observations

- At 1440×900, the hero composition is clear and professional, but after the initial 520 ms entrance the screen becomes almost entirely static.
- At the default narrow browser viewport, the page measured roughly 15,027 px tall. The mobile header is usable, but long-form orientation depends heavily on a tiny top progress line.
- The desktop hero has enough negative space for a restrained telemetry/grid signature without reducing readability.
- The project section contains high-value imagery, but card interaction is limited to a generic lift/zoom.
- The source exposes unusually strong quantitative claims; the visual system does not yet capitalize on them.
- The site correctly avoids a runtime animation dependency. This is an advantage: most proposed motion can be delivered with CSS, native browser APIs, and the existing Vue composables.

## What is already strong

1. `prefers-reduced-motion` is handled globally and in several components.
2. Reveals fail open: if IntersectionObserver is unavailable or motion is reduced, content becomes immediately visible.
3. Hover effects generally have `focus-within`/`focus-visible` equivalents.
4. The mobile menu manages focus, Escape, tab wrapping, and scroll locking.
5. Reveal transforms and interactive transforms are separated in the proof strip, avoiding transform conflicts.
6. Most motion uses `transform` and `opacity`.
7. The architecture pulse has a user pause control.
8. The visual grid, numeric proof, project data, and architecture diagrams give motion a real semantic basis.

## Problems to solve

### P0 — Motion lacks a narrative concept

The current collection is a set of respectable component effects, not a recognizable motion identity. The recommended identity is **living systems telemetry**: a quiet grid, signal paths, nodes, counters, packets, frame cadence, and cause/effect transitions derived from the real work.

### P0 — Repeated fade/rise produces sameness

Hero copy, portrait, generic sections, and proof items all enter from below. A visitor stops noticing the difference between section types. Reveals should communicate structure: headings can wipe along a rule, evidence can count/draw, media can unmask, timelines can grow, and lists can settle with short stagger.

### P0 — Infinite motion is attached to reading surfaces

Every experience card currently bobs forever. Ambient motion should live in decorative/non-reading layers and should pause after a limited number of cycles or on inactivity. Cards should become stable once revealed.

### P1 — Scroll progress uses width

Changing width on every scroll frame can cause layout/paint work. Use a full-width bar with `transform: scaleX()` and `transform-origin: left`; consider native scroll-timeline enhancement when supported.

### P1 — The longest page lacks local progress

The global progress bar answers “how far down the document?” but not “where am I in projects/experience?” Section rail state, mobile section label, and case-study step progress will make the long page easier to scan.

### P1 — Project motion does not demonstrate the projects

The card hover zoom is generic. Real project previews, architecture traces, before/after frames, or cursor-scrubbed still sequences would be higher-value than more card lift.

### P1 — Filtering has weak spatial continuity

Pet-project filtering changes content count but does not visually explain which cards remained, moved, entered, or left. A native View Transition or FLIP-style local transition could preserve object constancy.

### P1 — Motion is missing explicit lifecycle control

There is no shared visibility/idle policy for infinite animation, videos, or future canvas work. Add a motion controller that combines reduced-motion, document visibility, viewport presence, pointer type, and an optional user preference.

### P2 — Global reduced-motion rule is a safety net, not a complete alternate design

Setting durations to 0.01 ms prevents most motion but can leave animation declarations, layout assumptions, or opacity start states. Continue the proof-strip pattern: each complex component should declare its accessible final state explicitly.

### P2 — No reduced-data / low-power strategy

Before adding video, canvas, or generated previews, define behavior for `prefers-reduced-data` where available, Save-Data, small screens, hidden tabs, and coarse pointers.

## Recommended design direction

### Problem statement

Make a technically dense Unreal/C++ portfolio feel alive and memorable without making recruiters wait, hunt, or endure decorative motion while reading.

### Direction

Retain the current disciplined grid and typography. Add a systems-telemetry differentiator rather than changing the site into a fake IDE, terminal, or game. The grid should subtly react to section state; evidence should animate like measured signals; architecture should flow; project media should respond on intent; navigation should continuously explain location.

### Signature interaction

As the visitor moves through the page, a restrained signal travels through the existing grid and connects the active section to its evidence. In the hero it is ambient and pointer-responsive; in proof it resolves into counters; in projects it becomes architecture/data paths; in experience it becomes a stable timeline rail; at contact it converges into a clear CTA. The same accent signal is used everywhere, so hundreds of responses feel like one system.

### Why this fits

- It is rooted in actual networking, ECS, simulation, GPU, and performance work.
- It can be implemented mostly with CSS custom properties, SVG, IntersectionObserver, and scroll/view timelines.
- It degrades to the existing static grid.
- It avoids the overused fake-terminal aesthetic.
- It offers many interaction states without requiring many unrelated animations.

## Architecture recommendation

Use four layers:

1. **Motion tokens:** durations, distances, curves, spring approximations, stagger tiers, opacity, blur limits, and z-depth.
2. **Motion preference/controller:** reduced-motion, user override, page visibility, viewport visibility, pointer capability, and optional reduced-data mode.
3. **Primitives:** reveal, draw, count, unmask, shared-element transition, press, magnetic-local, and media-preview primitives.
4. **Narrative compositions:** hero telemetry, proof counters, project preview, experience rail, filter rearrangement, and case-study architecture.

Do not introduce GSAP, Framer Motion, Lenis, or Three.js in the foundation. Re-evaluate only after phases 0–4 prove a specific requirement that CSS/WAAPI cannot meet.

## Performance targets

- Animate `transform`, `opacity`, `clip-path` only after profiling; prefer transform/opacity.
- Zero blanket `will-change`; promote only during an active interaction and remove afterward.
- No continuous JavaScript work when the page is idle.
- No scroll handler that mutates layout directly; use rAF at most, native scroll timelines when available.
- Pause offscreen video/canvas/ambient loops.
- Limit simultaneous entrance animations to a small visible group.
- Keep any optional canvas signature isolated, low resolution on mobile, and replaceable by static CSS.
- Target stable 60 FPS on a mid-range phone and ordinary laptop; degrade effects before content.

## Accessibility targets

- Every motion feature has a static final state.
- No content depends on spatial motion to be understood.
- Hover-only behavior has focus and touch equivalents.
- Autoplay motion lasting more than five seconds has pause/stop or is purely background and disabled in reduced-motion mode.
- No flashing or rapid luminance changes.
- DOM reading order never follows visual animation order.
- Route/filter transitions preserve focus and announce meaningful state changes.
- A site-level “Motion: Full / Reduced” control is optional, but if added it must honor the OS preference by default and persist only with consent.

## Decision summary

| Decision | Recommendation |
|---|---|
| Animation library | None initially |
| Smooth-scroll library | Reject |
| Custom cursor | Reject globally |
| WebGL/Three.js | Optional isolated experiment only after core roadmap |
| CSS scroll timelines | Progressive enhancement |
| View Transitions | Use for filters/routes with fallback |
| Infinite card bobbing | Remove/replace with one-shot or decorative ambient layer |
| Signature | Living systems telemetry on the existing grid |
| Primary motion goal | Explain, orient, preview, and confirm |
