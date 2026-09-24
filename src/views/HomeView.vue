<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { ThemeSelector, UiBox, UiLink } from '@/components/shared'

const { theme, setTheme } = useTheme()

const updateTheme = (value: 'system' | 'light' | 'dark'): void => setTheme(value)

const projects = [
  {
    name: 'SCP: Riftborn',
    type: 'Game systems / UI',
    summary:
      'A readable operations layer for a co-op game: stateful encounters, clear feedback, and tools that stay out of the player’s way.',
    facts: [
      ['Role', 'Gameplay engineer'],
      ['Stack', 'Unreal · C++'],
      ['Year', '2024'],
    ],
  },
  {
    name: 'TexasSolver',
    type: 'Developer tooling',
    summary:
      'A performance-minded solver interface that turns complex decision trees into a workflow people can inspect and trust.',
    facts: [
      ['Role', 'Systems engineer'],
      ['Stack', 'Python · CUDA'],
      ['Year', '2023'],
    ],
  },
  {
    name: 'Wellsaik tools',
    type: 'Web platform',
    summary:
      'Small, durable interfaces for the work around a project: useful defaults, meaningful states, and no noise for noise’s sake.',
    facts: [
      ['Role', 'Product engineer'],
      ['Stack', 'Vue · TypeScript'],
      ['Year', '2025'],
    ],
  },
]
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="wordmark" href="#top" aria-label="Wellsaik home"
        ><span class="wordmark__mark">W</span> wellsaik</a
      >
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a
        ><a href="/debug">Debug</a>
      </nav>
      <ThemeSelector :model-value="theme" compact @update:model-value="updateTheme" />
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__copy">
          <p class="eyebrow">Independent engineer <span>·</span> Riga / remote</p>
          <h1 id="hero-title">I build dependable systems for ambitious worlds.</h1>
          <p class="hero__intro">
            I’m Wellsaik, a gameplay and product engineer focused on the seam between complex
            technology and calm, human interfaces.
          </p>
          <div class="hero__actions">
            <UiLink class="hero-action" variant="button-primary" href="#work"
              >View selected work <span aria-hidden="true">↘</span></UiLink
            ><UiLink class="hero-action" variant="button-secondary" href="#contact">Start a conversation</UiLink>
          </div>
        </div>
        <UiBox class="signal-panel" as="aside" variant="surface" padding="medium" aria-label="Current focus">
          <div class="signal-panel__top">
            <span>Current focus</span><span class="signal-panel__dot" aria-hidden="true"></span>
          </div>
          <strong>Systems that earn trust</strong>
          <p>Architecture, interaction, and tooling for teams solving difficult problems.</p>
          <div class="signal-panel__rule"></div>
          <span class="signal-panel__meta">Available for selected collaborations</span>
        </UiBox>
      </section>

      <section id="work" class="section" aria-labelledby="work-title">
        <div class="section-heading">
          <p class="eyebrow">01 / Selected work</p>
          <h2 id="work-title">Projects with a point of view.</h2>
        </div>
        <div class="project-grid">
          <article v-for="(project, index) in projects" :key="project.name" class="project-card">
            <div class="project-card__header">
              <span class="project-card__index">0{{ index + 1 }}</span
              ><span>{{ project.type }}</span>
            </div>
            <div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.summary }}</p>
            </div>
            <dl class="telemetry-rail">
              <div v-for="fact in project.facts" :key="fact[0]">
                <dt>{{ fact[0] }}</dt>
                <dd>{{ fact[1] }}</dd>
              </div>
            </dl>
            <UiLink class="project-card__link" href="#contact"
              >Discuss this project <span aria-hidden="true">↗</span></UiLink
            >
          </article>
        </div>
      </section>

      <section id="about" class="section about-section" aria-labelledby="about-title">
        <div class="section-heading">
          <p class="eyebrow">02 / Working style</p>
          <h2 id="about-title">Clarity is a technical advantage.</h2>
        </div>
        <div class="about-grid">
          <p class="about-grid__lead">
            Good engineering makes the next decision easier. I care about the details that create
            that feeling: honest states, legible boundaries, fast feedback, and tools that respect
            the person using them.
          </p>
          <div class="capabilities">
            <div>
              <span>01</span><strong>Build the core</strong>
              <p>
                Gameplay systems, architecture, and performance work that hold up under pressure.
              </p>
            </div>
            <div>
              <span>02</span><strong>Shape the surface</strong>
              <p>Interfaces that make complicated workflows feel navigable and purposeful.</p>
            </div>
            <div>
              <span>03</span><strong>Leave a trail</strong>
              <p>Documentation and instrumentation that help a team understand what it built.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="contact-section" aria-labelledby="contact-title">
        <p class="eyebrow">03 / Contact</p>
        <h2 id="contact-title">Have a difficult problem worth making clearer?</h2>
        <UiLink class="contact-link" href="mailto:hello@wellsaik.dev" variant="standalone"
          >hello@wellsaik.dev <span aria-hidden="true">↗</span></UiLink
        >
      </section>
    </main>
    <footer class="site-footer">
      <span>© 2025 Wellsaik</span><span>Made with care, shipped with intent.</span
      ><a href="#top">Back to top ↑</a>
    </footer>
  </div>
</template>

<style scoped>
.site-shell {
  width: min(100% - 3rem, 78rem);
  margin: 0 auto;
}
.site-header {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  min-height: 5.5rem;
  border-bottom: var(--border-width) solid var(--color-border);
}
.wordmark {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  letter-spacing: -0.02em;
}
.wordmark__mark {
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  background: var(--color-accent);
  color: var(--color-on-accent);
  border-radius: var(--radius-small);
  font-size: 0.8rem;
}
.site-nav {
  display: flex;
  gap: var(--space-6);
  margin-left: auto;
}
.site-nav a,
.site-footer a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: var(--font-size-small);
}
.site-nav a:hover,
.site-footer a:hover {
  color: var(--color-accent);
}
.theme-control select {
  padding: var(--space-1) var(--space-2);
  background: var(--color-surface);
  color: var(--color-text);
  border: var(--border-width) solid var(--color-border-strong);
  border-radius: var(--radius-small);
  font-size: var(--font-size-small);
}
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(16rem, 0.6fr);
  gap: var(--space-16);
  align-items: end;
  padding: var(--space-24) 0;
  border-bottom: var(--border-width) solid var(--color-border);
}
.eyebrow {
  margin: 0 0 var(--space-6);
  color: var(--color-accent);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
h1,
h2,
h3,
p {
  margin-top: 0;
}
h1 {
  max-width: 15ch;
  margin-bottom: var(--space-6);
  font-size: clamp(2.8rem, 6vw, 5.6rem);
  letter-spacing: -0.055em;
}
.hero__intro {
  max-width: 58ch;
  margin-bottom: var(--space-8);
  color: var(--color-text-muted);
  font-size: 1.1rem;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.75rem 1rem;
  border: var(--border-width) solid var(--color-border-strong);
  border-radius: var(--radius-small);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition:
    background var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard);
}
.button--primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
  border-color: var(--color-accent);
}
.button--primary:hover {
  background: var(--color-accent-hover);
  color: var(--color-on-accent);
}
.button--quiet {
  background: transparent;
  color: var(--color-text);
}
.button--quiet:hover {
  background: var(--color-surface-muted);
  color: var(--color-text);
}
.signal-panel {
  padding: var(--space-6);
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-top: 3px solid var(--color-accent);
}
.signal-panel__top,
.signal-panel__meta {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-subtle);
  font-size: var(--font-size-small);
}
.signal-panel strong {
  display: block;
  margin: var(--space-12) 0 var(--space-3);
  font-size: 1.2rem;
}
.signal-panel p {
  color: var(--color-text-muted);
}
.signal-panel__dot {
  width: 0.6rem;
  height: 0.6rem;
  background: var(--color-positive);
  border-radius: 50%;
}
.signal-panel__rule {
  margin: var(--space-8) 0 var(--space-3);
  border-top: var(--border-width) solid var(--color-border);
}
.section {
  padding: var(--space-24) 0;
  border-bottom: var(--border-width) solid var(--color-border);
}
.section-heading {
  display: flex;
  justify-content: space-between;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}
.section-heading h2 {
  max-width: 14ch;
  margin-bottom: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: -0.04em;
}
.section-heading .eyebrow {
  flex: 0 0 12rem;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
.project-card {
  display: grid;
  gap: var(--space-8);
  min-height: 27rem;
  padding: var(--space-6);
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-small);
}
.project-card__header {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-subtle);
  font-size: var(--font-size-small);
}
.project-card__index {
  color: var(--color-accent);
}
.project-card h3 {
  margin-bottom: var(--space-3);
  font-size: 1.35rem;
}
.project-card p {
  color: var(--color-text-muted);
}
.telemetry-rail {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  margin: auto 0 0;
  padding-top: var(--space-3);
  border-top: var(--border-width) solid var(--color-border);
}
.telemetry-rail dt {
  color: var(--color-text-subtle);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.telemetry-rail dd {
  margin: 0.2rem 0 0;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}
.project-card__link {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
}
.about-grid__lead {
  max-width: 34ch;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  line-height: 1.35;
  letter-spacing: -0.02em;
}
.capabilities {
  border-top: var(--border-width) solid var(--color-border);
}
.capabilities > div {
  display: grid;
  grid-template-columns: 2rem 1fr;
  column-gap: var(--space-4);
  padding: var(--space-4) 0;
  border-bottom: var(--border-width) solid var(--color-border);
}
.capabilities span {
  color: var(--color-accent);
  font-variant-numeric: tabular-nums;
}
.capabilities strong,
.capabilities p {
  grid-column: 2;
}
.capabilities strong {
  margin-top: -0.1rem;
}
.capabilities p {
  margin: var(--space-2) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
}
.contact-section {
  padding: var(--space-24) 0;
}
.contact-section h2 {
  max-width: 14ch;
  margin-bottom: var(--space-8);
  font-size: clamp(2.5rem, 6vw, 5.5rem);
  letter-spacing: -0.05em;
}
.contact-link {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: var(--font-weight-medium);
}
.site-footer {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-6) 0;
  color: var(--color-text-subtle);
  font-size: 0.75rem;
}
.site-footer a {
  color: inherit;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
@media (max-width: 52rem) {
  .hero {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  .project-grid {
    grid-template-columns: 1fr;
  }
  .project-card {
    min-height: 22rem;
  }
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}
@media (max-width: 38rem) {
  .site-shell {
    width: min(100% - 2rem, 78rem);
  }
  .site-header {
    gap: var(--space-3);
  }
  .site-nav {
    gap: var(--space-3);
  }
  .site-nav a {
    font-size: 0.75rem;
  }
  .theme-control select {
    max-width: 4.8rem;
  }
  .hero,
  .section,
  .contact-section {
    padding: var(--space-16) 0;
  }
  .section-heading {
    display: block;
  }
  .section-heading .eyebrow {
    margin-bottom: var(--space-4);
  }
  .site-footer {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .site-footer span:nth-child(2) {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}
</style>
