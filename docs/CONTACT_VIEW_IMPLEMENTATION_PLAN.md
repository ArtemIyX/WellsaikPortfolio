# Contact Section Implementation Plan

## 1. Objective

Add a final Contact section to the existing single-page developer portfolio using placeholder content only.

The implementation should provide:

- a clear invitation to start a professional conversation;
- a visible placeholder email address and primary email action;
- a short placeholder availability statement;
- a small set of practical contact facts;
- text-labelled links to placeholder professional profiles;
- a working `#contact` destination in desktop and mobile navigation;
- a two-column desktop layout that becomes one column on smaller screens;
- accessible, static behavior with no form, backend, or unnecessary client state;
- focused component and integration tests.

This phase must not publish real contact information, availability, response times, profile URLs, or location details.

## 2. Authoritative Current Project State

This plan is based on the repository as it exists after the Hero, Featured Projects, Experience & Skills, and About phases.

The home page currently renders:

```text
SiteHeader
└── main#main-content
    ├── HeroView                    #hero
    ├── FeaturedProjectsView        #projects
    │   └── ProjectCard × 3
    ├── ExperienceSkillsView        #experience
    │   ├── ExperienceCard × 3
    │   └── Skills panel
    └── AboutView                   #about
```

The project already provides:

- Vue 3 single-file components with TypeScript;
- typed page content and navigation in `src/content/home.ts`;
- router hash scrolling in `src/router/index.ts`;
- one shared navigation array for desktop and mobile menus;
- reusable `UiSection`, `UiText`, `UiBox`, and `UiLink` primitives;
- shared spacing, layout, typography, color, focus, and motion tokens;
- light and dark theme support owned by `HomeView`;
- component tests under `src/__tests__`;
- a sticky header and skip link already covered by tests.

Current Contact-related behavior is distributed across the page:

- the header's Contact item opens `mailto:developer@example.com`;
- the Hero's `Get in touch` action opens the same placeholder email;
- About's `Start a conversation` action opens the same placeholder email;
- there is no `#contact` section;
- there is no contact form or form-delivery infrastructure;
- there is no site footer component.

The worktree was clean when this plan was prepared. Future implementation must still inspect `git status --short` first and preserve any user changes that appear later.

## 3. Final Page Position

Insert Contact after About as the fifth and final section inside the existing main landmark:

```text
SiteHeader
└── main#main-content
    ├── HeroView                    #hero
    ├── FeaturedProjectsView        #projects
    ├── ExperienceSkillsView        #experience
    ├── AboutView                   #about
    └── ContactView                 #contact
        ├── Invitation and primary action
        └── Contact details and profile links
```

This completes the page narrative:

1. Hero states the developer's value proposition.
2. Projects show evidence.
3. Experience & Skills provide professional context.
4. About adds working style and personality.
5. Contact supplies the final conversion path.

Do not create a separate `/contact` route. The current project is intentionally a single-page portfolio, and the router already supports section hashes.

## 4. Product and Interaction Decision

### Use a contact section, not a contact form

The first implementation should use direct links only. Do not render name, email, subject, or message fields.

A working form would require decisions and infrastructure that do not exist in the current project:

- a submission endpoint or third-party form provider;
- server-side validation and sanitization;
- spam and abuse protection;
- loading, success, retry, and error states;
- privacy and data-retention language;
- monitoring so lost messages are detected.

A visual-only form would imply functionality that is not available. A `mailto:` action is complete, understandable, keyboard accessible, and consistent with the current Hero and About actions.

### Keep existing email actions direct

- Change the header Contact item from `mailto:` to the internal `#contact` route.
- Keep Hero's `Get in touch` action as a direct `mailto:` link.
- Keep About's `Start a conversation` action as a direct `mailto:` link.

This creates two useful paths: navigation users can inspect the Contact section, while users already ready to write can start an email immediately.

### Do not add copy-to-clipboard behavior yet

Display the email address as visible linked text so it can be selected or copied normally. A dedicated copy button would require transient success messaging, timer cleanup, clipboard failure handling, and additional accessibility work for little benefit at this stage.

## 5. Responsive Presentation

### Wide screens

At approximately `52rem` and above, use a two-column layout:

- the left column occupies roughly three-fifths of the width;
- it contains the eyebrow, `h2`, short invitation, primary email action, and a small expectation note;
- the right column contains a single outlined `UiBox`;
- the box contains the visible email address, contact facts, and professional profile links;
- align both columns at the top;
- use normal document flow and avoid fixed heights.

### Medium and small screens

Below approximately `52rem`:

- stack the invitation above the details box;
- preserve exactly the same DOM and reading order;
- allow long email addresses and URLs to wrap safely;
- keep text-labelled profile links large enough to activate comfortably.

Below approximately `32rem`:

- make the primary email action full width;
- place profile links in one column if they no longer fit side by side;
- keep left alignment for facts and values;
- verify no horizontal overflow at 320 px and at 200% zoom.

No carousel, single-card swap, tabs, accordion, or JavaScript breakpoint detection is needed. Unlike the Experience section, Contact contains one compact information group and should simply reflow.

## 6. Placeholder Content Rules

Recommended content:

- Eyebrow: `Contact`
- Heading: `Have a project or opportunity in mind? Let's talk.`
- Introduction: `Placeholder invitation describing the kinds of conversations, projects, or roles the developer welcomes.`
- Availability: `Placeholder availability status`
- Primary action: `Email developer`
- Email: `developer@example.com`
- Expectation note: `Placeholder note describing the preferred contact method and expected response window.`

Recommended contact facts:

- `Based in` — `City, Country`
- `Work preference` — `Placeholder work preference`
- `Time zone` — `UTC±00:00 placeholder`
- `Response` — `Placeholder response expectation`

Recommended professional links:

- `Code profile` — `https://example.com`
- `Professional network` — `https://example.com`

Placeholder restrictions:

- no real personal email, phone number, address, or messaging handle;
- no real city, country, time zone, or relocation status;
- no promise such as “replies within 24 hours” unless it is later verified;
- no claim of being available for work unless it reflects the real situation;
- no profile URL that suggests ownership of a third-party identity;
- no QR code, scheduling embed, live-chat widget, newsletter form, or analytics event;
- no phone field or phone link unless the owner explicitly chooses to publish one;
- no icons without visible text labels.

Before launch, every placeholder value and `example.com` URL must be replaced or removed.

## 7. Content Model

Extend `src/content/home.ts` with Contact-specific contracts.

Recommended types:

```ts
export interface ContactFact {
  label: string
  value: string
}

export interface ContactContent {
  eyebrow: string
  title: string
  introduction: string
  availability: string
  email: string
  primaryAction: NavigationItem
  expectationNote: string
  facts: readonly ContactFact[]
  profileActions: readonly NavigationItem[]
}
```

Export one `contactContent: ContactContent` object with placeholder values.

Data invariants:

- `primaryAction` is an href navigation item whose destination is `mailto:`;
- `email` is visible text and matches the address in `primaryAction.href`;
- `profileActions` contains no more than three high-value destinations;
- external profiles explicitly use `external: true` and `newTab: true`;
- each fact label is unique;
- content data contains no layout, class, icon, or breakpoint information;
- no Contact copy is duplicated directly inside a Vue template.

The existing `NavigationItem` union already supports internal routes, email links, and external links. Do not create a second action type.

## 8. Navigation Changes

Replace the existing header Contact item:

```ts
{ label: 'Contact', kind: 'href', href: 'mailto:developer@example.com' }
```

with:

```ts
{ label: 'Contact', kind: 'route', to: { name: 'home', hash: '#contact' } }
```

No router changes should be necessary. `src/router/index.ts` already returns `{ el: to.hash }` when a hash is present.

Confirm that:

- desktop Contact resolves to `/#contact`;
- mobile Contact resolves to `/#contact`;
- choosing Contact closes the mobile navigation panel;
- `#contact` is a unique ID;
- the sticky header does not obscure the Contact heading;
- loading the page directly at `/#contact` reaches the section.

## 9. New Component

Create:

- `src/components/home/ContactView/ContactView.vue`
- `src/components/home/ContactView/ContactView.ts`
- `src/components/home/ContactView/ContactView.css`

Update:

- `src/components/home/index.ts`

### `ContactView.ts`

Define only the public component contract:

```ts
import type { ContactContent } from '@/content/home'

export interface ContactViewProps {
  content: ContactContent
}
```

No emits are required. The component has no interactive state beyond normal link behavior.

### `ContactView.vue`

Recommended semantic structure:

```text
UiSection#contact[aria-labelledby="contact-title"]
└── div.contact-view__layout
    ├── div.contact-view__invitation
    │   ├── eyebrow paragraph
    │   ├── h2#contact-title
    │   ├── introduction paragraph
    │   ├── availability line
    │   ├── primary email UiLink
    │   └── expectation note
    └── UiBox.contact-view__details[as="aside"]
        ├── h3 "Contact details"
        ├── visible email link
        ├── dl of contact facts
        ├── h3 "Professional profiles"
        └── ul of text-labelled UiLinks
```

Implementation details:

- use `UiSection`, `UiText`, `UiBox`, and `UiLink` from `@/components/shared`;
- set `id="contact"` and `labelledby="contact-title"` on `UiSection`;
- use `h2` for the section title and `h3` for detail-group headings;
- render facts with `<dl>`, `<dt>`, and `<dd>`;
- render profile actions as a semantic list;
- branch on `NavigationItem.kind` in the same style as HeroView and AboutView;
- show the email address as link text rather than only “Email me”;
- do not add native buttons, inputs, form markup, or event handlers;
- do not import `useTheme`, access the router directly, or own page-level state.

The `aside` is appropriate because it contains supporting logistics. If browser or screen-reader review shows the extra landmark adds noise, change `as="aside"` to `as="div"`; the facts and list remain semantic either way.

## 10. Styling Plan

Use `ContactView.css` as component-scoped layout styling.

### Section surface

- use `surface="default"` to distinguish Contact from the muted About section directly above it;
- add `scroll-margin-top: calc(4.5rem + var(--space-4))` to match existing hash targets;
- retain a subtle top or bottom border only if needed to make the transition clear;
- reuse the shared content width expression:

```css
width: min(100% - (2 * var(--layout-gutter)), var(--layout-content-max));
```

### Main layout

- use CSS Grid, not viewport JavaScript;
- wide layout: `minmax(0, 1.35fr) minmax(17rem, 0.65fr)` or a close equivalent;
- use the existing spacing tokens for gaps;
- use `align-items: start`;
- cap the invitation measure around `60ch`;
- allow both grid children to shrink with `min-width: 0`.

### Actions and links

- render the primary email action with `variant="button-primary"`;
- render the visible email and professional profiles with `standalone` or `inline`, selecting the existing variant whose spacing fits the context;
- preserve the shared focus indicator supplied by `UiLink`;
- allow long addresses to wrap with `overflow-wrap: anywhere` where necessary;
- do not add hover motion that conflicts with reduced-motion preferences.

### Mobile layout

- at `max-width: 52rem`, switch the main grid to one column;
- at `max-width: 32rem`, set the action wrapper and primary link to `width: 100%`;
- avoid duplicated mobile markup and CSS reordering;
- keep the email, facts, and links readable without horizontal scrolling.

Use only existing tokens. Do not add global tokens unless an actual repeated need is discovered during implementation.

## 11. HomeView Composition

Update `src/views/HomeView.vue`:

1. Import `ContactView` from `@/components/home`.
2. Import `contactContent` from `@/content/home`.
3. Render `<ContactView :content="contactContent" />` after `<AboutView>`.
4. Preserve the existing `SiteHeader` outside `<main>`.
5. Preserve the single `<main id="main-content">` landmark.
6. Preserve Hero as the only `h1`.

Expected final composition:

```vue
<main id="main-content">
  <HeroView :content="heroContent" />
  <FeaturedProjectsView :content="featuredProjectsContent" />
  <ExperienceSkillsView :content="experienceSkillsContent" />
  <AboutView :content="aboutContent" />
  <ContactView :content="contactContent" />
</main>
```

## 12. Footer Decision

Do not add a footer as part of this phase.

The current request is specifically the Contact section, and the repository has no footer abstraction or settled legal/ownership copy. Keeping the phase focused avoids duplicating the same email and professional links immediately below Contact.

A later footer phase can add a semantic `<footer>` outside `<main>` when the following are known:

- the real owner/brand string;
- copyright preference;
- whether navigation should repeat;
- which legal or privacy links exist;
- whether social links should be repeated.

The Contact implementation must not make a later footer difficult: keep data in `home.ts` and avoid styling based on being the literal last DOM child.

## 13. Detailed Implementation Sequence

### Step 1: Re-check repository state

- Run `git status --short`.
- Review any changes in the files named by this plan.
- Preserve unrelated work and adapt the plan if the page composition has changed.
- Run the existing test suite once if the baseline is uncertain.

### Step 2: Add typed Contact content

- Add `ContactFact` and `ContactContent` to `src/content/home.ts`.
- Add `contactContent` using placeholder values only.
- Reuse `NavigationItem` for all actions.
- Keep the visible email synchronized with the `mailto:` destination.
- Mark placeholder profile actions as external and new-tab links.

### Step 3: Convert header Contact to a section route

- Change only the Contact item in `homeNavigation` to `{ name: 'home', hash: '#contact' }`.
- Leave Hero and About email actions unchanged.
- Do not modify router configuration unless a failing integration test proves it is necessary.

### Step 4: Create the ContactView contract

- Add `ContactView.ts`.
- Accept one required `content` prop.
- Do not add emits, slots, local copied content, or defaults.

### Step 5: Build semantic Contact markup

- Add `ContactView.vue` with the structure in Section 9.
- Render all content from props.
- Use one `h2`, two `h3` group headings, a definition list, and a list of profile links.
- Render internal and external actions according to their discriminated union kind.
- Keep the email visible and actionable.
- Avoid form controls and synthetic interaction.

### Step 6: Add responsive styling

- Add `ContactView.css`.
- Match existing content width, spacing, and scroll-margin conventions.
- Implement the two-column-to-one-column transformation with CSS Grid.
- Add safe wrapping for long contact strings.
- Make the main action full width at the smallest breakpoint.
- Check light, dark, hover, focus-visible, and visited-link states.

### Step 7: Export and compose

- Export `ContactView` from `src/components/home/index.ts`.
- Import the component and content in `HomeView.vue`.
- Render Contact after About.
- Confirm there is still only one `h1` and one main landmark.

### Step 8: Add focused tests

- Create `src/__tests__/home/ContactView.spec.ts`.
- Update `src/__tests__/layout/SiteHeader.spec.ts`.
- Update `src/__tests__/views/HomeView.spec.ts`.
- Do not weaken existing Hero, Projects, Experience, About, theme, or skip-link assertions.

### Step 9: Run automated verification

Run:

```sh
npm run format
npm run lint
npm run test:unit -- --run
npm run build
```

Because lint and format scripts write files, inspect the resulting diff and ensure they did not alter unrelated user work.

### Step 10: Perform manual verification

Inspect `/` and `/#contact` at approximately:

- 320 px;
- 390 px;
- 768 px;
- 1024 px;
- 1440 px.

Repeat important checks with:

- light theme;
- dark theme;
- keyboard-only navigation;
- 200% browser zoom;
- reduced-motion preference.

## 14. Test Plan

### `ContactView.spec.ts`

Create `src/__tests__/home/ContactView.spec.ts` and verify that ContactView:

- renders `<section id="contact">`;
- connects `aria-labelledby="contact-title"` to an `h2`;
- contains no `h1`;
- renders eyebrow, heading, introduction, availability, and expectation note;
- renders the visible email address;
- renders the primary action with the correct `mailto:` href;
- renders every contact fact as a `dt`/`dd` pair;
- renders every professional profile action;
- applies safe new-tab behavior to external links through `UiLink`;
- renders supplied custom prop data rather than hard-coded production data;
- contains no `form`, `input`, `textarea`, `select`, or submit button;
- contains no clipboard, carousel, dialog, or accordion controls.

Use a small custom `ContactContent` fixture in the test rather than relying only on the exported page content. That proves the component is data-driven.

### `SiteHeader.spec.ts`

Update `src/__tests__/layout/SiteHeader.spec.ts`:

- change the Contact fixture from an href item to a route item;
- expect Contact to resolve to `/#contact`;
- verify selecting Contact in the mobile panel closes the panel;
- preserve the complete label expectation: Home, Projects, Experience, About, Contact;
- preserve keyboard, focus, theme, and external-link tests.

### `HomeView.spec.ts`

Update `src/__tests__/views/HomeView.spec.ts`:

- assert order Hero → Projects → Experience → About → Contact;
- expect one `h1` and four major-section `h2` headings;
- assert `#contact` exists exactly once;
- assert the header Contact href matches the section ID;
- retain section-scoped counts for three project articles and three experience articles;
- retain theme, skip-link, route, and no-debug-link coverage;
- verify the page still contains only one main landmark.

Do not treat jsdom tests as proof of responsive layout. Breakpoint behavior requires browser inspection.

## 15. Accessibility Requirements

Verify:

- `#contact` has an accessible name from its unique `h2`;
- heading order remains `h1` → section `h2` → local `h3`;
- the visible email link communicates its destination without icon interpretation;
- every professional link has descriptive visible text;
- external new-tab links receive safe `rel` behavior from `UiLink`;
- the facts use a real definition list;
- reading and focus order remain logical at every breakpoint;
- all interactive elements are reachable and usable by keyboard;
- focus is visible in both themes;
- no information depends only on accent color;
- touch targets remain practical on narrow screens;
- text survives 200% zoom without overlap or loss;
- `/#contact` is not hidden beneath the sticky header;
- no placeholder text is used as an inaccessible form-field placeholder because there is no form.

## 16. Performance and Privacy Requirements

- Add no dependency, remote asset, web font, embed, script, or network request.
- Keep Contact content static and typed.
- Add no viewport listeners or duplicated mobile markup.
- Add no analytics event without a later explicit analytics decision.
- Do not expose a real email address during placeholder development.
- Do not add CAPTCHA, maps, calendars, chat widgets, or social feeds.
- Do not obfuscate the placeholder email with client-side JavaScript.
- Keep the section functional if JavaScript-enhanced router behavior is unavailable: the rendered links must still have valid hrefs.

## 17. Acceptance Criteria

The Contact phase is complete only when:

- Home renders Hero, Projects, Experience & Skills, About, and Contact in that order;
- Contact is the final section inside the main landmark;
- all Contact content is typed placeholder data in `src/content/home.ts`;
- desktop and mobile header Contact links target `/#contact`;
- Hero and About retain their direct placeholder email actions;
- the Contact section displays a visible placeholder email address;
- the primary action opens the placeholder `mailto:` destination;
- two or three text-labelled placeholder professional links render correctly;
- contact facts are semantic and readable;
- the wide layout uses two columns and smaller layouts use one column;
- no contact form or misleading nonfunctional control is present;
- direct hash navigation lands below the sticky header;
- the section is usable by keyboard and at 200% zoom;
- light and dark themes remain legible;
- no horizontal overflow appears at supported widths;
- no dependency or remote request is added;
- all new and existing tests pass;
- formatting, linting, type checking, and production build pass;
- unrelated user changes remain intact.

## 18. Deferred Follow-Up

When truthful content and operational requirements are available:

- replace the placeholder email and profile destinations;
- replace availability, location, time-zone, work-preference, and response copy;
- decide whether availability belongs in both Hero and Contact or only one place;
- verify every public profile is maintained and worth sending visitors to;
- add optional scheduling only if the owner actively manages a calendar and wants public booking;
- add a real contact form only with a defined delivery service, validation, spam controls, privacy text, and observable failure handling;
- add a separate semantic site footer after brand, copyright, and legal-link requirements are settled;
- consider email-address abuse mitigation only after evaluating its accessibility and usability costs;
- add analytics only with an explicit privacy and measurement plan.
