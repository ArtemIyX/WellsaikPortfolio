import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { afterEach, describe, expect, it } from 'vitest'

import { SiteHeader } from '@/components/layout'
import { UiLink } from '@/components/shared'
import type { NavigationItem } from '@/content/home'

const items: readonly NavigationItem[] = [
  { label: 'Home', kind: 'route', to: { name: 'home', hash: '#hero' } },
  { label: 'Projects', kind: 'route', to: { name: 'home', hash: '#projects' } },
  { label: 'About', kind: 'route', to: { name: 'home', hash: '#about' } },
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
    attachTo: document.body,
  })
}

afterEach(() => {
  document.body.classList.remove('site-header-menu-open')
})

describe('SiteHeader', () => {
  it('renders a semantic header with labelled primary navigation', async () => {
    const wrapper = await mountHeader()

    expect(wrapper.element.tagName).toBe('HEADER')
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Primary navigation')
    expect(wrapper.classes()).toContain('site-header')

    wrapper.unmount()
  })

  it('routes the brand home and renders exactly the supplied navigation items', async () => {
    const wrapper = await mountHeader()
    const navigationLinks = wrapper.findAll('.site-header__navigation-link')
    const componentLinks = wrapper.findAllComponents(UiLink)

    expect(componentLinks[1]?.props('to')).toEqual({ name: 'home' })
    expect(wrapper.get('.site-header__brand').attributes('href')).toBe('/')
    expect(navigationLinks).toHaveLength(items.length)
    expect(navigationLinks.map((link) => link.text())).toEqual([
      'Home',
      'Projects',
      'About',
      'Contact',
    ])
    expect(componentLinks[2]?.props('to')).toEqual({ name: 'home', hash: '#hero' })
    expect(componentLinks[3]?.props('to')).toEqual({ name: 'home', hash: '#projects' })
    expect(componentLinks[4]?.props('to')).toEqual({ name: 'home', hash: '#about' })
    expect(navigationLinks[0]?.attributes('href')).toBe('/#hero')
    expect(navigationLinks[1]?.attributes('href')).toBe('/#projects')
    expect(navigationLinks[2]?.attributes('href')).toBe('/#about')
    expect(navigationLinks[3]?.attributes('href')).toBe('mailto:developer@example.com')

    wrapper.unmount()
  })

  it('emits theme updates from an accessibly labelled control', async () => {
    const wrapper = await mountHeader()

    expect(wrapper.get('[role="group"]').attributes('aria-label')).toBe('Color theme')
    await wrapper.get('[aria-label="Color theme: Dark"]').trigger('click')
    expect(wrapper.emitted('update:theme')).toEqual([['dark']])

    wrapper.unmount()
  })

  it('opens an accessible mobile navigation panel and locks page scrolling', async () => {
    const wrapper = await mountHeader()
    const trigger = wrapper.get('.site-header__menu-trigger')

    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('#mobile-navigation-panel').exists()).toBe(false)

    await trigger.trigger('click')
    await nextTick()

    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('#mobile-navigation-panel').attributes()).toMatchObject({
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'mobile-navigation-title',
    })
    expect(document.body.classList).toContain('site-header-menu-open')
    expect(document.activeElement).toBe(wrapper.get('.site-header__panel-close').element)

    wrapper.unmount()
  })

  it('closes the mobile panel with Escape and restores focus to its trigger', async () => {
    const wrapper = await mountHeader()
    const trigger = wrapper.get<HTMLButtonElement>('.site-header__menu-trigger')

    await trigger.trigger('click')
    await nextTick()
    await wrapper.get('#mobile-navigation-panel').trigger('keydown', { key: 'Escape' })
    await nextTick()

    expect(wrapper.find('#mobile-navigation-panel').exists()).toBe(false)
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger.element)
    expect(document.body.classList).not.toContain('site-header-menu-open')

    wrapper.unmount()
  })

  it('closes the mobile panel after selecting About', async () => {
    const wrapper = await mountHeader()
    const trigger = wrapper.get('.site-header__menu-trigger')

    await trigger.trigger('click')
    await nextTick()
    const aboutLink = wrapper
      .findAll('.site-header__mobile-navigation-link')
      .find((link) => link.text() === 'About')
    expect(aboutLink).toBeDefined()
    await aboutLink?.trigger('click')
    await nextTick()

    expect(wrapper.find('#mobile-navigation-panel').exists()).toBe(false)
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('.site-header__mobile-navigation-link').exists()).toBe(false)

    wrapper.unmount()
  })

  it('closes the mobile panel after selecting Projects', async () => {
    const wrapper = await mountHeader()
    const trigger = wrapper.get('.site-header__menu-trigger')

    await trigger.trigger('click')
    await nextTick()
    const projectsLink = wrapper
      .findAll('.site-header__mobile-navigation-link')
      .find((link) => link.text() === 'Projects')
    expect(projectsLink?.attributes('href')).toBe('/#projects')
    await projectsLink?.trigger('click')
    await nextTick()

    expect(wrapper.find('#mobile-navigation-panel').exists()).toBe(false)
    expect(trigger.attributes('aria-expanded')).toBe('false')

    wrapper.unmount()
  })
})
