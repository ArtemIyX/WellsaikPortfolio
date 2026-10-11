# Animation Implementation Roadmap

This roadmap implements the 72-item backlog in a safe order. Each phase is independently shippable and should end with a visual/performance/accessibility gate. File paths are proposed ownership, not code changes made by this research task.

## Delivery principles

1. Content and navigation work before animation initializes.
2. Static styles are the source of truth; motion enhances them.
3. One signature system is repeated instead of inventing an effect per component.
4. Interaction feedback is faster than navigation; navigation is faster than narrative; ambient motion is slow and bounded.
5. Every phase has a reduced-motion design, not merely shortened durations.
6. No new runtime library until a measured requirement proves native CSS/WAAPI insufficient.

## Proposed motion grammar

| Role | Duration | Typical properties | Use |
|---|---:|---|---|
| Press/feedback | 80–140 ms | transform, color, opacity | Button press, chip selection, icon confirmation |
| Hover/focus | 140–220 ms | transform, color, border, opacity | Reversible affordance |
| Reveal | 320–560 ms | opacity, transform, mask/clip only when measured | One-shot content entrance |
| Navigation | 220–420 ms | transform, opacity | Menu, active indicator, route continuity |
| Narrative | scroll-linked or 450–900 ms | transform, opacity, SVG stroke | Evidence and architecture explanation |
| Ambient | 6–16 s; 1–3 cycles | decorative transform/opacity | Background signal only |

Suggested easing families:

- enter: `cubic-bezier(0.16, 1, 0.3, 1)`;
- exit: `cubic-bezier(0.7, 0, 0.84, 0)`;
- standard: retain `cubic-bezier(0.2, 0, 0, 1)`;
- linear only for progress or mechanically continuous signals.

## Phase 0 — Baseline and budgets

Backlog: 1–7, 10–12.  
Goal: make future motion consistent, switchable, and measurable.

### Steps

1. Record baseline screenshots/video at desktop, tablet, and mobile in light/dark/reduced-motion modes.
2. Record a browser performance trace for hero load, a full-page scroll, filter use, and route navigation.
3. Extend `src/styles/tokens.css` with semantic duration, distance, easing, stagger, and ambient-cycle tokens.
4. Keep old token aliases temporarily so the migration can be incremental.
5. Add a root motion state: OS default, explicit full, explicit reduced. Do not persist it until consent/storage rules are decided.
6. Create `useMotionPreference.ts` to expose `reduced`, `pageVisible`, pointer capability, and optional data-saving state.
7. Add an ambient lifecycle helper based on IntersectionObserver and `visibilitychange`.
8. Document transform ownership: outer element for reveal, inner surface for interaction, pseudo-element/SVG for decorative signal.
9. Add a reduced-motion checklist to every later phase.
10. Establish budgets: no new long tasks over 50 ms from motion; no blanket `will-change`; no layout shift; no hidden inaccessible content.

### Gate

- Existing appearance is unchanged.
- All current animations can be globally disabled without hidden content.
- No tests need to be added until implementation begins, but the implementation PR must include unit tests for composables and browser-level visual checks.

## Phase 1 — Motion primitives and cleanup

Backlog: 8, 9, 13, 59.  
Goal: improve architecture and remove the most distracting existing behavior.

### Steps

1. Replace the header progress width update with a full-width bar and `scaleX(var(--progress))`.
2. Keep rAF scheduling as the fallback; ensure only one update is queued.
3. Remove infinite `experience-card-idle` bobbing from reading cards.
4. Change timeline marker ambience to two or three reveal-time cycles, then a stable final state.
5. Generalize `UiSection` reveal into variants while retaining `rise` as the initial default.
6. Add explicit final styles for reduced motion and unavailable observers.
7. Add a development-only root debug mode that outlines transform-owning layers.
8. Verify no component applies reveal and hover transforms to the same element.

### Gate

- Reading progress is visually identical or smoother and no longer animates layout width.
- Experience text remains perfectly still after reveal.
- Every section remains visible with JavaScript disabled after server rendering/static fallback assumptions are considered.

## Phase 2 — Navigation and interaction feedback

Backlog: 15–22, 35, 66, 69, 70.  
Goal: make every intentional action feel acknowledged and improve orientation on the long page.

### Steps

1. Add a shared active-nav indicator element that moves between desktop nav items.
2. Retain active text color and `aria-current` as non-motion state.
3. Add current-section text to the mobile header; update only when the section observer changes state.
4. Add an accessible section waypoint nav for desktop if it does not duplicate/conflict with the header at intermediate widths.
5. Add the back-to-top control after a scroll threshold; restore focus sensibly if activated by keyboard.
6. Stage mobile menu contents after the panel becomes visible; never postpone focus placement.
7. Morph the menu icon using two transform-owning lines.
8. Add button/link press compression and directional icon response.
9. Add copy-email feedback with a live region and safe fallback when Clipboard API is unavailable.
10. Add destination emphasis for hash navigation using a short outline/background cue.
11. Prototype same-document View Transitions for route changes behind feature detection.

### Gate

- Keyboard, touch, pen, and fine-pointer users all receive clear feedback.
- Menu focus trap, Escape, resize closure, and focus restoration remain correct.
- At 200% zoom, the waypoint/back-to-top controls do not cover content.

## Phase 3 — Signature living systems grid

Backlog: 23–30.  
Goal: establish the differentiator without a canvas dependency.

### Steps

1. Define section states (`hero`, `proof`, `projects`, `experience`, `pet-projects`, `about`) and map each to grid focal coordinates and signal intensity.
2. Update only on active-section changes, not on every scroll event.
3. Add a dedicated decorative SVG/CSS signal layer beneath content and above the static grid.
4. Draw one bounded route between section anchor points; keep it subtle enough that body text contrast is unchanged.
5. Add fine-pointer hero input that writes clamped `--pointer-x`/`--pointer-y` values through rAF.
6. Dampen pointer values; snap them to zero on pointer leave, touch input, reduced motion, or hidden tab.
7. Add keyboard focus routing for major CTA/project targets without tracking or storing user behavior.
8. Add CSS scroll-timeline depth only inside `@supports`; use the section-state fallback otherwise.
9. Pause the signal when no relevant section is active or after an idle timeout.
10. Do not build the optional canvas prototype unless profiling shows CSS/SVG cannot achieve the required look.

### Gate

- The grid feels alive but is not the first thing mentioned by a usability reviewer.
- No continuous main-thread work when the pointer is still and the page is not scrolling.
- Reduced-motion and print output remain the current static grid or no grid.

## Phase 4 — Hero choreography

Backlog: 31–40.  
Goal: make the first screen demonstrate a distinctive systems sensibility in under one second.

### Steps

1. Split the current uniform child reveal into semantic groups without changing DOM reading order.
2. Draw the accent rule first.
3. Reveal the role label with a short opacity/position transition.
4. Reveal the headline by line using wrappers or a mask that keeps real text intact.
5. Fade the summary without spatial motion so the body copy settles quickly.
6. Settle both actions together, then make availability appear last.
7. Unmask the portrait and offset frame as two separate layers.
8. Add 2–6 px fine-pointer depth only to portrait decoration, never the face/text.
9. Route the grid signal toward the currently hovered/focused CTA.
10. Pulse availability for two cycles and stop.
11. Add the optional scroll-to-proof control; remove it after the user scrolls.
12. Explore one bounded Unreal-specific overlay only after the core hero passes performance/accessibility gates.

### Gate

- Largest Contentful Paint is not delayed by animation setup.
- Hero is fully readable in under one second and immediately readable in reduced-motion mode.
- No character splitting, layout shift, or focus delay.

## Phase 5 — Proof and metrics

Backlog: 41–46.  
Goal: turn quantitative claims into the strongest content-bearing motion on the homepage.

### Steps

1. Store machine-readable numeric value, display value, suffix, and accessible label separately in content.
2. Build a counter primitive using `requestAnimationFrame` or WAAPI only while visible.
3. Announce only the final value; never stream changing numbers to assistive technology.
4. Use truthful schematic sparklines unless real time-series data exists. Do not fabricate telemetry.
5. Give each metric one small semantic motif: entity field, concurrency lanes, GPU scan, delivery timeline.
6. Link hover/focus state to the corresponding project/card using IDs and CSS state classes.
7. Keep the existing divider draw but make origin/direction consistent with the reading flow.
8. Add an optional “what it enabled” state only when the supporting text is authored.

### Gate

- Metrics are understandable before, during, and after animation.
- Counters run once, finish quickly, and never replay on minor back-scroll.
- A recruiter can click through immediately without waiting for a number to finish.

## Phase 6 — Project previews and route continuity

Backlog: 47–58.  
Goal: let project evidence move before decorative surfaces do.

### Steps

1. Choose exactly one truthful preview per featured project: short muted loop, still sequence, architecture overlay, or controlled diagram.
2. Use poster images as the default and load motion media only on intent/near viewport.
3. Pause preview when pointer/focus leaves, the card exits viewport, the tab hides, or motion is reduced.
4. Replace generic image zoom with a directional overlay and explicit “Preview”/“System view” affordance where needed.
5. Implement shared image/title route transitions using feature detection and stable transition names.
6. Ensure the destination case-study DOM is ready before starting a transition; fall back to normal navigation.
7. Animate `<details>` content only if it can remain native and accessible; otherwise keep native behavior.
8. Expand the architecture diagram data model to nodes, edges, labels, stages, and evidence references.
9. Add play/pause/step controls and keyboard navigation to the architecture narrative.
10. Tie diagram progress to scroll only as enhancement; controls remain the authoritative input.
11. Add a local case-study progress rail.
12. Add before/after scrubber only where real paired evidence exists.
13. Transition video facades into players after explicit activation.
14. Add decode-aware image entrance without changing reserved layout dimensions.
15. Add next-project continuity only after single-route transitions are stable.

### Gate

- Only one media preview plays at a time.
- Project cards remain navigable with JS failure and reduced motion.
- Route transition never traps focus, breaks browser back, or obscures the destination heading.

## Phase 7 — Experience and skills

Backlog: 60–63.  
Goal: make the timeline communicate progression while keeping long-form reading stable.

### Steps

1. Convert the rail to a structural base plus a progress overlay.
2. Drive rail progress with a CSS view timeline where supported; IntersectionObserver checkpoints otherwise.
3. Mark the current reading entry in DOM state and visual state.
4. Reveal each card once in semantic order: title/context, scope, metrics, impact.
5. Use a bounded current-role marker pulse only on first activation.
6. Create a real mapping from skills to roles/projects in content data.
7. On skill focus/hover, highlight proof references and dim unrelated decorative layers—not body text.
8. Provide a touch-friendly “Show evidence” action if hover association is otherwise undiscoverable.

### Gate

- Paragraphs never move while being read.
- Rail progress tracks reading position without rapid active-entry flicker.
- Skill relationships remain usable without color alone.

## Phase 8 — Repository filtering and alternate views

Backlog: 64–67.  
Goal: preserve object constancy and make the repository section feel responsive.

### Steps

1. Assign stable keys and stable transition names to repository cards.
2. Wrap filter mutation in a View Transition when supported.
3. For fallback, use a FLIP-like strategy only if it does not complicate Vue rendering; otherwise use concise enter/leave transitions.
4. Keep focus on the chosen filter, not on moving cards.
5. Update result count after state mutation and announce one concise message.
6. Give cards border/arrow response consistent with featured projects.
7. Prototype a constellation view as an optional mode with a real toggle and persistent list fallback.
8. Never replace the accessible list with canvas-only navigation.

### Gate

- Rapid filter changes do not queue long transitions.
- No layout jumps at the section boundary.
- Screen reader output announces only the final filter result.

## Phase 9 — Theme and closing sequence

Backlog: 68, 71, 72.  
Goal: give the long page a deliberate visual ending and make theme changes feel caused by the control.

### Steps

1. Feature-detect View Transitions for the theme mutation.
2. Capture the control's screen position and use it only to set transition origin, not for tracking.
3. Reveal the new theme through a bounded radial/clip transition.
4. Preserve the existing 300 ms color fallback.
5. Disable the spatial wipe under reduced motion.
6. Transition the section signal toward contact actions near the footer.
7. Stop the signal in a stable final state rather than looping.
8. If a local-time detail is animated, update at minute boundaries and pause when hidden.

### Gate

- Theme changes never flash unreadable intermediate colors.
- Footer contact links remain the strongest actionable element.
- No persistent timer runs more often than the UI requires.

## Phase 10 — Optional experimental layer

Backlog: 29, 40, 67 and any deferred P2 item.  
Goal: add one showcase experiment only if the core experience is already fast, clear, and distinctive.

### Candidate A: ECS entity field

A small canvas in the hero shows a bounded entity field that reacts to one pointer/focus input and resolves into the “10,000+ entities” proof. It must not simulate 10,000 DOM nodes, block LCP, or continue offscreen.

### Candidate B: packet routing diagram

An SVG/Canvas hybrid visualizes packets through client → transport → authoritative server → replicated entities, using real architecture labels. This is likely more relevant and cheaper than a decorative 3D scene.

### Candidate C: repository constellation

Optional alternate view groups plugins by shared Unreal capabilities. The normal list remains canonical.

### Admission criteria

Implement at most one candidate initially. It must:

- improve comprehension or demonstrate a target skill;
- have a static accessible equivalent;
- load after primary content;
- stay inside a measurable CPU/GPU/memory budget;
- pause offscreen/hidden;
- be removable without changing information architecture.

## File-level ownership map

| Concern | Likely files |
|---|---|
| Motion tokens/mode | `src/styles/tokens.css`, `src/styles/global.css`, new `src/composables/useMotionPreference.ts` |
| Reveal primitives | `src/components/shared/UiSection/*`, optional new `src/components/shared/UiMotion/*` |
| Grid signature | `src/views/HomeView.css`, `src/views/HomeView.vue`, new decorative component if SVG is needed |
| Header/navigation | `src/components/layout/SiteHeader/*` |
| Hero | `src/components/home/HeroView/*` |
| Proof strip | `src/views/HomeView.vue`, `src/views/HomeView.css`, `src/content/home.ts` |
| Featured projects | `src/components/home/ProjectCard/*`, `FeaturedProjectsView/*` |
| Experience | `src/components/home/ExperienceSkillsView/*`, `ExperienceCard/*` |
| Repository filtering | `PetProjectsView/*`, `PetProjectCard/*` |
| Case studies | `src/views/ProjectCaseStudyView.vue`, `ProjectCaseStudyView.css`, case-study content data |
| Theme transition | `src/composables/useTheme.ts`, `ThemeSelector/*`, root styles |

## Verification matrix for every phase

### Functional

- mouse, keyboard, touch, pen/coarse pointer;
- direct hash load, router navigation, browser back/forward;
- fast repeated interaction and interrupted transitions;
- slow image/network conditions where applicable;
- JavaScript/API fallback for progressive features.

### Responsive

- 320 px, 375 px, 768 px, 1024 px, 1440 px, and ultrawide;
- portrait/landscape changes;
- 200% zoom and text-only zoom;
- no horizontal overflow caused by transformed layers.

### Themes and preferences

- light, dark, system theme;
- OS reduced motion and optional site override;
- forced colors/high contrast;
- reduced-data/Save-Data when media is introduced;
- print stylesheet.

### Performance

- Chrome/Edge Performance trace during load, scroll, filter, and route transition;
- rendering panel for paint flashing and layer borders;
- no layout shift from animation wrappers;
- no unnecessary compositor layers after animation finishes;
- offscreen/hidden pause verified.

### Accessibility

- DOM reading order equals logical order;
- focus remains visible and stable;
- no announcement spam from counters/filtering;
- pause/stop available for nonessential motion over five seconds;
- information never exists only inside canvas, video, hover, or animation.

## Rollout strategy

1. Ship phases 0–2 as the motion foundation release.
2. Ship the grid signature and hero choreography behind a temporary feature flag.
3. Collect qualitative feedback from 5–8 target viewers: recruiter, engineering lead, Unreal developer, mobile user, and motion-sensitive user.
4. Ship proof/project improvements individually so their performance cost is attributable.
5. Remove effects that users do not notice, understand, or enjoy; motion has maintenance cost.
6. Admit the optional experimental layer only after the core page meets its budgets.

## Definition of done

The animation program is complete when:

- the site has one recognizable motion language;
- every major action gives immediate feedback;
- long-page location is always clear;
- real project evidence is more vivid than decoration;
- reduced-motion mode is complete, not second-class;
- the page is idle when the user is idle;
- no animation blocks reading, clicking, navigation, or LCP;
- the visual experience remains memorable without requiring WebGL or a runtime animation library.
