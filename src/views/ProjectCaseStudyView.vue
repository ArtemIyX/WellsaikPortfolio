<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { UiLink, UiText } from '@/components/shared'
import { featuredProjectsContent } from '@/content/home'

const route = useRoute()
const project = computed(() =>
  featuredProjectsContent.projects.find((item) => item.id === route.params.projectId),
)
const flowPaused = ref(false)
const flowResetKey = ref(0)
const trailerLoaded = ref(false)

const updateDocumentMetadata = (): void => {
  if (!project.value) return
  document.title = `${project.value.title} — Artem Podorozhko`
  document.querySelector('meta[name="description"]')?.setAttribute('content', project.value.summary)
}

onMounted(updateDocumentMetadata)
watch(project, updateDocumentMetadata)
onBeforeUnmount(() => {
  document.title = 'Artem Podorozhko — Portfolio'
})
</script>

<template>
  <main v-if="project" class="case-study-view">
    <div class="case-study-view__inner">
      <nav class="case-study-view__breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        <span aria-hidden="true">/</span>
        <span>{{ project.title }}</span>
      </nav>

      <header class="case-study-view__header">
        <UiText as="p" role="label" tone="accent" weight="medium">{{ project.category }}</UiText>
        <UiText as="h1" role="heading" max-width="none">{{ project.title }}</UiText>
        <UiText class="case-study-view__summary" tone="muted">{{ project.summary }}</UiText>
        <div class="case-study-view__actions">
          <UiLink :to="{ name: 'home', hash: '#projects' }" variant="button-secondary"
            >Back to projects</UiLink
          >
          <UiLink
            v-if="project.liveAction.kind === 'href'"
            :href="project.liveAction.href"
            :external="project.liveAction.external"
            :new-tab="project.liveAction.newTab"
            variant="button-primary"
            >{{ project.liveAction.label }}</UiLink
          >
        </div>
      </header>

      <img
        class="case-study-view__image"
        :src="project.image.src"
        :srcset="project.image.srcSet"
        :alt="project.image.alt"
        :width="project.image.width"
        :height="project.image.height"
      />

      <div class="case-study-view__grid">
        <section
          v-if="project.videoEmbedUrl"
          id="trailer"
          class="case-study-view__trailer"
          aria-labelledby="trailer-title"
        >
          <UiText id="trailer-title" as="h2" role="heading">Trailer</UiText>
          <div v-if="trailerLoaded" class="case-study-view__video">
            <iframe
              :src="project.videoEmbedUrl"
              title="Project trailer"
              loading="lazy"
              allowfullscreen
            ></iframe>
          </div>
          <div v-else class="case-study-view__video-facade">
            <p>Load the trailer only when you are ready to watch.</p>
            <button type="button" @click="trailerLoaded = true">Load trailer</button>
          </div>
          <p>
            <a
              :href="project.videoEmbedUrl.replace('/embed/', '/watch?v=')"
              target="_blank"
              rel="noopener noreferrer"
              >Open trailer directly</a
            >
          </p>
        </section>
        <section id="overview" aria-labelledby="overview-title">
          <UiText id="overview-title" as="h2" role="heading">Overview</UiText>
          <p>{{ project.outcome.text ?? project.outcome.items?.join(' ') }}</p>
        </section>
        <section id="constraints" aria-labelledby="constraints-title">
          <UiText id="constraints-title" as="h2" role="heading">Constraints</UiText>
          <ul>
            <li v-for="item in project.problem.items" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section
          id="architecture"
          class="case-study-view__architecture"
          aria-labelledby="architecture-title"
        >
          <UiText id="architecture-title" as="h2" role="heading">Architecture</UiText>
          <svg
            viewBox="0 0 720 180"
            role="img"
            :aria-label="`${project.title} system flow diagram`"
          >
            <title>{{ project.title }} system flow</title>
            <g class="case-study-view__diagram-lines">
              <path d="M180 90h120M420 90h120" />
            </g>
            <g class="case-study-view__diagram-node">
              <rect x="24" y="50" width="156" height="80" rx="8" />
              <text x="102" y="96">Player input</text>
            </g>
            <g class="case-study-view__diagram-node">
              <rect x="300" y="50" width="120" height="80" rx="8" />
              <text x="360" y="96">Game systems</text>
            </g>
            <g class="case-study-view__diagram-node">
              <rect x="540" y="50" width="156" height="80" rx="8" />
              <text x="618" y="96">World state</text>
            </g>
            <circle
              :key="flowResetKey"
              class="case-study-view__diagram-pulse"
              :class="{ 'case-study-view__diagram-pulse--paused': flowPaused }"
              cx="242"
              cy="90"
              r="7"
            />
          </svg>
          <div class="case-study-view__diagram-controls" aria-label="Systems flow controls">
            <button type="button" @click="flowPaused = !flowPaused">
              {{ flowPaused ? 'Resume flow' : 'Pause flow' }}
            </button>
            <button type="button" @click="flowResetKey++">Reset</button>
          </div>
          <p>
            Inputs are validated at the gameplay boundary, passed through reusable systems, and
            reflected in authoritative world state.
          </p>
        </section>
        <section id="evidence" aria-labelledby="evidence-title">
          <UiText id="evidence-title" as="h2" role="heading">Evidence and outcome</UiText>
          <p>
            {{
              project.outcome.text ??
              'The project outcome is documented in the selected work summary.'
            }}
          </p>
          <ul class="case-study-view__technologies">
            <li v-for="technology in project.technologies" :key="technology">{{ technology }}</li>
          </ul>
        </section>
        <section id="lessons" aria-labelledby="lessons-title">
          <UiText id="lessons-title" as="h2" role="heading">Lessons</UiText>
          <p>
            Keep the system boundary explicit, measure the expensive path, and preserve a small
            playable loop while technical decisions evolve.
          </p>
        </section>
        <p v-if="project.confidentialityNote" class="case-study-view__confidentiality">
          {{ project.confidentialityNote }}
        </p>
      </div>
    </div>
  </main>
  <main v-else class="case-study-view case-study-view--missing">
    <div class="case-study-view__inner">
      <UiText as="h1" role="heading">Project not found</UiText>
      <p>The requested case study is not available.</p>
      <UiLink :to="{ name: 'home', hash: '#projects' }" variant="button-primary"
        >Back to projects</UiLink
      >
    </div>
  </main>
</template>

<style scoped src="./ProjectCaseStudyView.css"></style>
