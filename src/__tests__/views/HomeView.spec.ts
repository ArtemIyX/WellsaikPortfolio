import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { afterEach, describe, expect, it } from 'vitest'

import HomeView from '@/views/HomeView.vue'

const mountHome = async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/debug', name: 'debug', component: { template: '<div />' } },
    ],
  })
  await router.push('/')
  await router.isReady()

  return mount(HomeView, { global: { plugins: [router] } })
}

afterEach(() => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.removeItem('theme')
})

describe('HomeView', () => {
  it('composes the header before main and places sections in narrative order', async () => {
    const wrapper = await mountHome()

    expect(wrapper.get('.home-view').element.children[0]?.tagName).toBe('HEADER')
    expect(wrapper.get('.home-view').element.children[1]?.tagName).toBe('MAIN')
    expect(wrapper.get('main').find('#hero').exists()).toBe(true)
    expect(wrapper.get('main').find('#projects').exists()).toBe(true)
    expect(wrapper.get('main').find('#experience').exists()).toBe(true)
    expect(wrapper.get('main').find('#about').exists()).toBe(true)
    expect(
      wrapper
        .get('main')
        .find('#hero')
        .element.compareDocumentPosition(wrapper.get('#projects').element),
    ).toBe(4)
    expect(
      wrapper.get('#projects').element.compareDocumentPosition(wrapper.get('#about').element),
    ).toBe(4)
    expect(
      wrapper.get('#projects').element.compareDocumentPosition(wrapper.get('#experience').element),
    ).toBe(4)
    expect(
      wrapper.get('#experience').element.compareDocumentPosition(wrapper.get('#about').element),
    ).toBe(4)
  })

  it('keeps one page heading and matches About navigation to its target', async () => {
    const wrapper = await mountHome()

    expect(wrapper.get('main').findAll('h1')).toHaveLength(1)
    expect(wrapper.get('main').findAll('h2')).toHaveLength(3)
    expect(wrapper.get('#projects').findAll('article')).toHaveLength(3)
    expect(wrapper.get('#experience').findAll('article')).toHaveLength(3)
    const projectsLink = wrapper
      .findAll('.site-header__navigation-link')
      .find((link) => link.text() === 'Projects')
    expect(projectsLink?.attributes('href')).toBe('/#projects')
    const experienceLink = wrapper
      .findAll('.site-header__navigation-link')
      .find((link) => link.text() === 'Experience')
    expect(experienceLink?.attributes('href')).toBe('/#experience')
    const aboutLink = wrapper
      .findAll('.site-header__navigation-link')
      .find((link) => link.text() === 'About')
    expect(aboutLink?.attributes('href')).toBe('/#about')
    expect(wrapper.get('#about').attributes('id')).toBe('about')
  })

  it('provides a working skip-link target and hides the debug route', async () => {
    const wrapper = await mountHome()

    expect(wrapper.get('.site-header__skip-link').attributes('href')).toBe('#main-content')
    expect(wrapper.get('main').attributes('id')).toBe('main-content')
    expect(wrapper.findAll('a').some((link) => link.attributes('href') === '/debug')).toBe(false)
  })

  it('applies theme changes to the document root', async () => {
    const wrapper = await mountHome()

    await wrapper.get('[aria-label="Color theme: Dark"]').trigger('click')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
