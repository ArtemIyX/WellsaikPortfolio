import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { SiteHeader } from '@/components/layout'
import { UiLink } from '@/components/shared'
import type { NavigationItem } from '@/content/home'

const items: readonly NavigationItem[] = [
  { label: 'Home', kind: 'route', to: { name: 'home', hash: '#hero' } },
  { label: 'Contact', kind: 'href', href: 'mailto:developer@example.com' },
]

const mountHeader = async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', name: 'home', component: { template: '<div />' } }],
  })
  await router.push('/')
  await router.isReady()

  return mount(SiteHeader, {
    props: { theme: 'light', items, brandLabel: 'Developer Name' },
    global: { plugins: [router] },
  })
}

describe('SiteHeader', () => {
  it('renders a semantic header with labelled primary navigation', async () => {
    const wrapper = await mountHeader()

    expect(wrapper.element.tagName).toBe('HEADER')
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Primary navigation')
  })

  it('routes the brand home and renders exactly the supplied navigation items', async () => {
    const wrapper = await mountHeader()
    const navigationLinks = wrapper.findAll('.site-header__navigation-link')
    const componentLinks = wrapper.findAllComponents(UiLink)

    expect(componentLinks[1]?.props('to')).toEqual({ name: 'home' })
    expect(wrapper.get('.site-header__brand').attributes('href')).toBe('/')
    expect(navigationLinks).toHaveLength(items.length)
    expect(navigationLinks.map((link) => link.text())).toEqual(['Home', 'Contact'])
    expect(componentLinks[2]?.props('to')).toEqual({ name: 'home', hash: '#hero' })
    expect(navigationLinks[0]?.attributes('href')).toBe('/#hero')
    expect(navigationLinks[1]?.attributes('href')).toBe('mailto:developer@example.com')
  })

  it('emits theme updates from an accessibly labelled control', async () => {
    const wrapper = await mountHeader()

    expect(wrapper.get('[role="group"]').attributes('aria-label')).toBe('Color theme')
    await wrapper.get('[aria-label="Color theme: Dark"]').trigger('click')
    expect(wrapper.emitted('update:theme')).toEqual([['dark']])
  })
})
