# Animation Opportunity Backlog — 72 Changes

This is a prioritized product backlog, not an instruction to enable every effect simultaneously. “Thousands of interactions” should emerge from reusable rules applied across many elements and states.

Priority: **P0** foundation/blocker, **P1** high-value, **P2** polish/experimentation.  
Cost: **S** small, **M** medium, **L** large.

## A. Motion foundation

| ID | Pri | Cost | Change | User value and implementation note |
|---:|:---:|:---:|---|---|
| 1 | P0 | S | Define semantic motion tokens | Add tokens for feedback, reveal, navigation, narrative, ambient, distance tiers, and enter/exit curves. Stop choosing durations per component. |
| 2 | P0 | M | Create a motion preference controller | Combine OS reduced motion, optional site preference, tab visibility, and viewport state in one composable. |
| 3 | P0 | S | Make motion opt-in from static styles | Static state is the base; enable motion inside `prefers-reduced-motion: no-preference` or a motion-enabled root attribute. |
| 4 | P0 | S | Add explicit reduced-motion final states | Complex components must remove transforms/delays and force visible final states locally. |
| 5 | P0 | S | Define a motion property allowlist | Prefer transform/opacity; require a note or measurement before animating layout, filters, large blur, or clip paths. |
| 6 | P0 | S | Establish an ambient lifecycle | Ambient effects start only while visible, pause when hidden, and stop after a bounded number of cycles unless user-controlled. |
| 7 | P0 | S | Establish interaction modality rules | Hover/magnetic behavior only for fine pointers; touch gets press/ripple/color feedback; keyboard gets equally clear focus response. |
| 8 | P0 | M | Build a shared reveal primitive | Support variants `rise`, `wipe`, `unmask`, `draw`, `count`, and `none` with the same accessible lifecycle. |
| 9 | P1 | M | Add a motion debugging mode | Root attribute outlines animated layers, shows active timelines, and disables stagger; development-only. |
| 10 | P1 | S | Document z-index and transform ownership | Every composite has a structural outer layer and one or more motion layers so transforms never overwrite each other. |
| 11 | P1 | S | Add reduced-data rules | Avoid motion video/canvas and prefer still images when Save-Data/reduced-data signals or constrained devices are detected. |
| 12 | P1 | S | Add motion telemetry hooks | Measure animation starts, long tasks, dropped-frame proxies, and feature usage locally without collecting sensitive pointer traces. |

## B. Global navigation and page state

| ID | Pri | Cost | Change | User value and implementation note |
|---:|:---:|:---:|---|---|
| 13 | P0 | S | Change reading progress from width to scaleX | Avoid per-frame layout work; keep the bar full width and update a transform/custom property. |
| 14 | P1 | M | Add native scroll-timeline progress enhancement | CSS drives the bar where supported; retain the current rAF fallback. |
| 15 | P1 | S | Animate the active nav indicator | A short underline/rail glides to the active section; color remains as the non-motion cue. |
| 16 | P1 | M | Add a compact mobile section label | Sticky header shows the current section and briefly crossfades/slides on change. |
| 17 | P1 | M | Add section waypoint markers | A small desktop rail mirrors major sections and reveals visited/current state. It must remain a nav list, not decorative dots. |
| 18 | P1 | S | Add back-to-top after meaningful depth | Reveal only after the hero is far above; show remaining progress in its ring. |
| 19 | P1 | S | Stage mobile-menu items | Panel arrives immediately; links settle over 120–180 ms with a very short stagger. No delayed usability. |
| 20 | P1 | S | Morph menu icon to close | Animate the two lines using transform; retain accessible label/state. |
| 21 | P1 | M | Use View Transitions for home/case-study routes | Shared project image/title transitions when supported; normal router navigation otherwise. |
| 22 | P2 | S | Add hash-arrival emphasis | On deep link, briefly highlight the destination heading/evidence instead of only scrolling to it. |

## C. Signature grid and ambient system

| ID | Pri | Cost | Change | User value and implementation note |
|---:|:---:|:---:|---|---|
| 23 | P0 | M | Turn the static grid into a section-aware field | Update a few CSS custom properties at section changes: focal point, accent strength, and line opacity. No continuous JS scroll loop. |
| 24 | P1 | M | Add a single traveling signal | One accent pulse follows a bounded SVG/CSS path between section anchors. It pauses while reading and disappears under reduced motion. |
| 25 | P1 | M | Add fine-pointer parallax to the hero field | Move only the decorative grid/glow by a few pixels, damped and clamped. Do not move text or portrait. |
| 26 | P1 | S | Add focus-reactive grid response | Keyboard focus on major CTA/project subtly shifts the grid focal point to the focused region. |
| 27 | P1 | M | Add scroll-linked grid depth | Very small scale/opacity change over the hero's exit using a CSS view timeline; static fallback. |
| 28 | P2 | M | Add section-specific signal motifs | Projects use packets, experience uses a rail, proof uses data ticks, about uses convergence—same geometry and accent. |
| 29 | P2 | L | Prototype an optional low-cost canvas layer | Only if CSS/SVG cannot deliver the signature. Isolate it behind a feature flag and static fallback. |
| 30 | P2 | S | Add page-visibility pause | Freeze any ambient layer immediately when `document.hidden` is true. |

## D. Hero

| ID | Pri | Cost | Change | User value and implementation note |
|---:|:---:|:---:|---|---|
| 31 | P0 | M | Replace uniform child reveal with authored sequence | Rule draws, role label resolves, headline lines reveal, summary fades, actions settle, portrait unmasks. Total remains under ~900 ms. |
| 32 | P1 | M | Reveal headline by line, not character | Preserve semantic text and selection; use block wrappers or background-size masks. |
| 33 | P1 | M | Add portrait depth stack | The offset panel, image, and thin accent frame move on separate 2–6 px layers on fine-pointer intent. |
| 34 | P1 | S | Make availability status breathe twice | Two cycles on load or state change, then stop. Never pulse forever. |
| 35 | P1 | S | Add button press physics | Hover lift is supplemented by a crisp active compression and icon displacement. |
| 36 | P1 | M | Add CTA signal routing | Hover/focus on “Get in touch” or “View code profile” sends the grid signal toward the selected action. |
| 37 | P1 | M | Add role-loop only if content-authored | Rotate among truthful roles/capabilities with a user-pausable, non-typing transition; no generic typewriter effect. |
| 38 | P2 | M | Add portrait theme morph | Use View Transition/crossfade with a controlled luminance bridge so dark/light image swap feels caused by the theme control. |
| 39 | P2 | S | Add a scroll invitation with real function | A small control indicates the next section and scrolls/focuses it; hide after first meaningful scroll. |
| 40 | P2 | M | Add one Unreal-specific Easter egg | A small optional interaction such as toggling wireframe/trace overlay on the portrait frame; never block content. |

## E. Proof and quantitative evidence

| ID | Pri | Cost | Change | User value and implementation note |
|---:|:---:|:---:|---|---|
| 41 | P0 | M | Animate proof values as measured counters | Count to real values once; retain suffix and accessible full text; skip counting in reduced motion. |
| 42 | P1 | M | Add mini evidence sparklines | Small SVG lines visualize entity scale, concurrency, frame cadence, or delivery time without fabricated datapoints. If no real series exists, use a labeled schematic, not fake telemetry. |
| 43 | P1 | S | Draw proof dividers directionally | Tie divider origin to reading direction/entry rather than all scaling from center. |
| 44 | P1 | S | Add metric-to-project trace | Hover/focus draws a short route toward the action and highlights the target project label. |
| 45 | P1 | S | Give proof cards distinct response by metric | Scale metric can expand a node field; GPU can sweep a scan line; time can fill a timeline—bounded and subtle. |
| 46 | P2 | M | Add evidence comparison mode | Allow toggling from headline metric to “what it enabled” with a shared-height crossfade, not a flip card. |

## F. Featured projects and case studies

| ID | Pri | Cost | Change | User value and implementation note |
|---:|:---:|:---:|---|---|
| 47 | P0 | M | Replace generic image zoom with project preview states | On intent, reveal one meaningful still/video/diagram state per project; never autoplay all cards. |
| 48 | P0 | M | Add shared-element route transition | Project image/title continue into the case study when supported. |
| 49 | P1 | M | Add directional card affordance | Pointer/focus position subtly biases image crop/gradient and moves the arrow toward the route. |
| 50 | P1 | M | Animate implementation-details disclosure | Height/opacity transition with content immediately available to assistive tech; respect reduced motion. |
| 51 | P1 | M | Add project architecture overlay | A “System view” control overlays a real simplified diagram on the screenshot. |
| 52 | P1 | L | Upgrade case-study flow diagram | Replace one looping dot with labeled stages, multiple real paths, step controls, pause, and scroll-linked explanation. |
| 53 | P1 | M | Add case-study section progress | Local rail shows problem → constraints → architecture → evidence → outcome. |
| 54 | P1 | M | Add before/after evidence scrubber | Use only where real visual or metric comparisons exist; keyboard-accessible range input. |
| 55 | P1 | M | Add video facade-to-player transition | Poster smoothly yields to player after explicit activation; no hidden autoplay. |
| 56 | P1 | S | Add image loading transition | Decode-aware opacity/unblur with stable dimensions; never use a long skeleton for local assets. |
| 57 | P2 | M | Add project-to-project transition | Next case study previews its color/media and shares image geometry through route change. |
| 58 | P2 | M | Add architecture path focus | Hover/focus on a legend item isolates the matching real path; keyboard and touch supported. |

## G. Experience, skills, and repositories

| ID | Pri | Cost | Change | User value and implementation note |
|---:|:---:|:---:|---|---|
| 59 | P0 | S | Remove infinite experience-card bob | Cards settle after reveal. Keep ambient life in the rail/marker or background, not under paragraphs. |
| 60 | P1 | M | Grow the timeline rail with section progress | The rail fills as entries enter the reading zone; current role marker locks into the active state. |
| 61 | P1 | M | Reveal outcome metrics after role context | Stagger once per card: role → scope → metrics → selected impact. Keep total short. |
| 62 | P1 | S | Add current-role signal pulse with bounded cycles | Pulse on first reveal and when revisited by navigation; then remain solid. |
| 63 | P1 | M | Add skill relationship highlighting | Focusing a skill highlights the projects/roles that prove it; do not animate every skill continuously. |
| 64 | P1 | M | Animate repository filtering with object constancy | Use View Transitions or FLIP so retained cards visibly move and entering/leaving cards are clear. |
| 65 | P1 | S | Animate filter result count | Short numeric crossfade/roll with an aria-live text update that does not announce every animation frame. |
| 66 | P1 | S | Add repository-card directional affordance | External-link arrow and border trace respond to focus/hover; touch gets a pressed state. |
| 67 | P2 | M | Add project constellation view | Optional alternate visualization groups repos by rendering/networking/tooling. Keep the list as the default accessible view. |

## H. Theme, footer, feedback, and polish

| ID | Pri | Cost | Change | User value and implementation note |
|---:|:---:|:---:|---|---|
| 68 | P1 | M | Add bounded theme-origin transition | A radial/clip reveal originates from the pressed theme control using View Transitions; plain color transition fallback. |
| 69 | P1 | S | Add copy-to-clipboard feedback for email | Icon changes to check, label updates, and a polite live region confirms; return after a short delay. |
| 70 | P1 | S | Add CTA success/error state motion | State changes use color/icon/opacity, not shaking. Errors must remain readable and announced. |
| 71 | P2 | M | Converge grid signals in the footer | The ambient signal resolves into contact links, giving the long page a visual ending. |
| 72 | P2 | S | Add a restrained idle detail in the footer | Local time separator or accent rule ticks at a minute boundary, not every second; stops when hidden. |

## Recommended first 15

Implement IDs 1–8, 13, 15, 23, 31, 41, 47, and 59 first. Together they create a coherent motion system, improve performance, add meaningful proof, and remove the most distracting existing loop.

## Explicit non-goals

- Do not animate every DOM node.
- Do not add a fake terminal intro.
- Do not make visitors drive or play before seeing the work.
- Do not split body text into characters.
- Do not add global cursor replacement.
- Do not add inertia/smooth-scroll interception.
- Do not autoplay multiple project videos.
- Do not use motion to conceal missing content or fabricated metrics.
