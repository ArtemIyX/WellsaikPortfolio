<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { ThemeSelector, UiLink } from '@/components/shared'
import type { ThemePreference } from '@/composables/useTheme'

import type { SiteHeaderProps } from './SiteHeader'

defineProps<SiteHeaderProps>()

const emit = defineEmits<{ 'update:theme': [value: ThemePreference] }>()

const menuOpen = ref(false)
const menuTrigger = ref<HTMLButtonElement | null>(null)
const mobilePanel = ref<HTMLElement | null>(null)

const updateTheme = (value: ThemePreference): void => emit('update:theme', value)

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

onMounted(() => window.addEventListener('resize', handleViewportResize))

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleViewportResize)
  document.body.classList.remove('site-header-menu-open')
})
</script>

<template>
  <header class="site-header">
    <UiLink class="site-header__skip-link" href="#main-content">Skip to main content</UiLink>
    <div class="site-header__inner">
      <UiLink class="site-header__brand" :to="{ name: 'home' }" variant="standalone">
        {{ brandLabel }}
      </UiLink>

      <div class="site-header__desktop-controls">
        <nav class="site-header__navigation" aria-label="Primary navigation">
          <ul class="site-header__navigation-list">
            <li v-for="item in items" :key="item.label">
              <UiLink
                v-if="item.kind === 'route'"
                class="site-header__navigation-link"
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
        aria-label="Open navigation menu"
        @click="openMenu"
      >
        <span>Menu</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>
    </div>

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
