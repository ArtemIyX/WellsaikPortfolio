<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { ThemeSelector, UiLink } from '@/components/shared'
import type { ThemePreference } from '@/composables/useTheme'
import type { NavigationItem } from '@/content/home'

import type { SiteHeaderProps } from './SiteHeader'

const props = defineProps<SiteHeaderProps>()

const emit = defineEmits<{ 'update:theme': [value: ThemePreference] }>()

const menuOpen = ref(false)
const menuTrigger = ref<HTMLButtonElement | null>(null)
const mobilePanel = ref<HTMLElement | null>(null)
const navigationElement = ref<HTMLElement | null>(null)
const activeSection = ref('hero')
const readingProgress = ref(0)
const showBackToTop = ref(false)
const activeIndicator = ref({ left: 0, width: 0, visible: false })
let sectionObserver: IntersectionObserver | undefined
let progressFrame = 0
let resizeObserver: ResizeObserver | undefined

const navigationHash = (item: NavigationItem): string | undefined => {
  if (item.kind !== 'route' || typeof item.to !== 'object' || !item.to || !('hash' in item.to))
    return
  return typeof item.to.hash === 'string' ? item.to.hash : undefined
}

const isNavigationItemActive = (item: NavigationItem): boolean =>
  navigationHash(item) === `#${activeSection.value}`

const activeSectionLabel = computed(
  () => props.items.find((item) => navigationHash(item) === `#${activeSection.value}`)?.label ?? 'Home',
)

const updateActiveIndicator = (): void => {
  const nav = navigationElement.value
  const activeLink = nav?.querySelector<HTMLElement>('.site-header__navigation-link--active')
  if (!nav || !activeLink) {
    activeIndicator.value.visible = false
    return
  }
  const navRect = nav.getBoundingClientRect()
  const linkRect = activeLink.getBoundingClientRect()
  activeIndicator.value = {
    left: linkRect.left - navRect.left,
    width: linkRect.width,
    visible: true,
  }
}

const updateReadingProgress = (): void => {
  progressFrame = 0
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0
  showBackToTop.value = window.scrollY > window.innerHeight * 0.8
}

const scheduleReadingProgress = (): void => {
  if (progressFrame) return
  progressFrame = window.requestAnimationFrame(updateReadingProgress)
}

const updateTheme = (value: ThemePreference): void => emit('update:theme', value)

const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' })

const openMenu = async (): Promise<void> => {
  menuOpen.value = true
  await nextTick()
  mobilePanel.value?.querySelector<HTMLButtonElement>('.site-header__panel-close')?.focus()
}

const closeMenu = async (restoreFocus = true): Promise<void> => {
  if (!menuOpen.value) return

  menuOpen.value = false
  await nextTick()
  if (restoreFocus) menuTrigger.value?.focus()
}

const handlePanelKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    event.preventDefault()
    void closeMenu()
    return
  }

  if (event.key !== 'Tab') return

  const focusableElements = Array.from(
    mobilePanel.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements.at(-1)

  if (!firstElement || !lastElement) return

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

const handleViewportResize = (): void => {
  if (window.innerWidth > 672 && menuOpen.value) void closeMenu(false)
}

watch(menuOpen, (isOpen) => {
  document.body.classList.toggle('site-header-menu-open', isOpen)
})

watch(activeSection, () => void nextTick(updateActiveIndicator))

onMounted(() => {
  window.addEventListener('resize', handleViewportResize)
  resizeObserver = typeof window.ResizeObserver === 'function'
    ? new ResizeObserver(updateActiveIndicator)
    : undefined
  if (navigationElement.value) resizeObserver?.observe(navigationElement.value)
  const sections = props.items
    .map(navigationHash)
    .filter((hash): hash is string => Boolean(hash))
    .map((hash) => document.querySelector(hash))
    .filter((section): section is Element => Boolean(section))

  if (typeof window.IntersectionObserver !== 'function') {
    window.addEventListener('scroll', scheduleReadingProgress, { passive: true })
    updateReadingProgress()
    updateActiveIndicator()
    return
  }

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible?.target.id) activeSection.value = visible.target.id
    },
    { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.5] },
  )
  sections.forEach((section) => sectionObserver?.observe(section))
  window.addEventListener('scroll', scheduleReadingProgress, { passive: true })
  updateReadingProgress()
  updateActiveIndicator()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleViewportResize)
  sectionObserver?.disconnect()
  resizeObserver?.disconnect()
  window.removeEventListener('scroll', scheduleReadingProgress)
  if (progressFrame) window.cancelAnimationFrame(progressFrame)
  document.body.classList.remove('site-header-menu-open')
})
</script>

<template>
  <header class="site-header" :style="{ '--reading-progress': readingProgress }">
    <UiLink class="site-header__skip-link" href="#main-content">Skip to main content</UiLink>
    <div class="site-header__inner">
      <div class="site-header__brand-group">
        <UiLink class="site-header__brand" :to="{ name: 'home' }" variant="standalone">
          {{ brandLabel }}
        </UiLink>
        <UiLink
          class="site-header__cv-link"
          href="/Artem-Podorozhko-CV.pdf"
          new-tab
          variant="button-secondary"
        >
          CV
        </UiLink>
      </div>

      <div class="site-header__desktop-controls">
        <nav ref="navigationElement" class="site-header__navigation" aria-label="Primary navigation">
          <span
            class="site-header__active-indicator"
            aria-hidden="true"
            :style="{
              width: `${activeIndicator.width}px`,
              transform: `translateX(${activeIndicator.left}px)`,
              opacity: activeIndicator.visible ? 1 : 0,
            }"
          ></span>
          <ul class="site-header__navigation-list">
            <li v-for="item in items" :key="item.label">
              <UiLink
                v-if="item.kind === 'route'"
                class="site-header__navigation-link"
                :class="{ 'site-header__navigation-link--active': isNavigationItemActive(item) }"
                :aria-current="isNavigationItemActive(item) ? 'location' : undefined"
                :to="item.to"
                variant="standalone"
              >
                {{ item.label }}
              </UiLink>
              <UiLink
                v-else
                class="site-header__navigation-link"
                :href="item.href"
                :external="item.external"
                :new-tab="item.newTab"
                variant="standalone"
              >
                {{ item.label }}
              </UiLink>
            </li>
          </ul>
        </nav>

        <ThemeSelector
          :model-value="theme"
          compact
          label="Color theme"
          @update:model-value="updateTheme"
        />
      </div>

      <button
        ref="menuTrigger"
        class="site-header__menu-trigger"
        type="button"
        aria-controls="mobile-navigation-panel"
        :aria-expanded="menuOpen"
        :aria-label="`Open navigation menu. Current section: ${activeSectionLabel}`"
        @click="openMenu"
      >
        <span class="site-header__menu-label">{{ activeSectionLabel }}</span>
        <span class="site-header__menu-icon" aria-hidden="true"><i></i><i></i></span>
      </button>
    </div>

    <button
      v-if="showBackToTop"
      class="site-header__back-to-top"
      type="button"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      ↑
    </button>

    <Transition name="site-header-panel">
      <div v-if="menuOpen" class="site-header__mobile-layer">
        <button
          class="site-header__backdrop"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          @click="closeMenu()"
        ></button>
        <aside
          id="mobile-navigation-panel"
          ref="mobilePanel"
          class="site-header__mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-navigation-title"
          @keydown="handlePanelKeydown"
        >
          <div class="site-header__panel-heading">
            <span id="mobile-navigation-title">Navigation</span>
            <button
              class="site-header__panel-close"
              type="button"
              aria-label="Close navigation menu"
              @click="closeMenu()"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            <ul class="site-header__mobile-navigation-list">
              <li v-for="item in items" :key="item.label">
                <UiLink
                  v-if="item.kind === 'route'"
                  class="site-header__mobile-navigation-link"
                  :class="{
                    'site-header__mobile-navigation-link--active': isNavigationItemActive(item),
                  }"
                  :aria-current="isNavigationItemActive(item) ? 'location' : undefined"
                  :to="item.to"
                  variant="standalone"
                  @click="closeMenu(false)"
                >
                  {{ item.label }}
                </UiLink>
                <UiLink
                  v-else
                  class="site-header__mobile-navigation-link"
                  :href="item.href"
                  :external="item.external"
                  :new-tab="item.newTab"
                  variant="standalone"
                  @click="closeMenu(false)"
                >
                  {{ item.label }}
                </UiLink>
              </li>
            </ul>
          </nav>

          <UiLink
            class="site-header__panel-cv"
            href="/Artem-Podorozhko-CV.pdf"
            new-tab
            variant="button-primary"
          >
            View CV
          </UiLink>

          <div class="site-header__panel-theme">
            <span>Theme</span>
            <ThemeSelector
              :model-value="theme"
              presentation="segmented"
              label="Color theme"
              @update:model-value="updateTheme"
            />
          </div>
        </aside>
      </div>
    </Transition>
  </header>
</template>

<style scoped src="./SiteHeader.css"></style>
