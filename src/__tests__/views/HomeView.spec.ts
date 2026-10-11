import { readFile } from 'node:fs/promises'

import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { afterEach, describe, expect, it } from 'vitest'

import { proofPoints } from '@/content/home'
import HomeView from '@/views/HomeView.vue'

const mountHome = async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      {
        path: '/projects/:projectId',
        name: 'project-case-study',
        component: { template: '<div />' },
      },
      { path: '/debug', name: 'debug', component: { template: '<div />' } },
    ],
  })
  await router.push('/')
  await router.isReady()

  return mount(HomeView, { global: { plugins: [router] } })
}

afterEach(() => {
  document.documentElement.removeAttribute('data-theme')
  document.cookie = 'portfolio-theme=; Max-Age=0; Path=/'
  document.cookie = 'portfolio-cookie-consent=; Max-Age=0; Path=/'
})

describe('HomeView', () => {
  it('composes the header before main and places sections in narrative order', async () => {
    const wrapper = await mountHome()

    expect(wrapper.get('.home-view').element.children[0]?.tagName).toBe('HEADER')
    expect(wrapper.get('.home-view').element.children[1]?.tagName).toBe('MAIN')
    expect(wrapper.get('.home-view').element.children[2]?.tagName).toBe('FOOTER')
    expect(wrapper.get('main').find('#hero').exists()).toBe(true)
    expect(wrapper.get('main').find('#projects').exists()).toBe(true)
    expect(wrapper.get('main').find('#experience').exists()).toBe(true)
    expect(wrapper.get('main').find('#pet-projects').exists()).toBe(true)
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
      wrapper
        .get('#experience')
        .element.compareDocumentPosition(wrapper.get('#pet-projects').element),
    ).toBe(4)
    expect(
      wrapper.get('#pet-projects').element.compareDocumentPosition(wrapper.get('#about').element),
    ).toBe(4)
  })

  it('keeps the header sticky above the home-page content layer', async () => {
    const stylesheet = await readFile('src/views/HomeView.css', 'utf8')

    expect(stylesheet).toContain('.home-view > :not(.site-header)')
    expect(stylesheet).not.toContain('.home-view > *')
  })

  it('keeps one page heading and matches About navigation to its target', async () => {
    const wrapper = await mountHome()

    expect(wrapper.get('main').findAll('h1')).toHaveLength(1)
    expect(wrapper.get('main').findAll('h2')).toHaveLength(4)
    expect(wrapper.get('#projects').findAll('article')).toHaveLength(3)
    expect(wrapper.get('#experience').findAll('article')).toHaveLength(4)
    expect(wrapper.get('#pet-projects').findAll('article')).toHaveLength(9)
    const projectsLink = wrapper
      .findAll('.site-header__navigation-link')
      .find((link) => link.text() === 'Projects')
    expect(projectsLink?.attributes('href')).toBe('/#projects')
    const experienceLink = wrapper
      .findAll('.site-header__navigation-link')
      .find((link) => link.text() === 'Experience')
    expect(experienceLink?.attributes('href')).toBe('/#experience')
    const petProjectsLink = wrapper
      .findAll('.site-header__navigation-link')
      .find((link) => link.text() === 'Pet Projects')
    expect(petProjectsLink?.attributes('href')).toBe('/#pet-projects')
    const aboutLink = wrapper
      .findAll('.site-header__navigation-link')
      .find((link) => link.text() === 'About')
    expect(aboutLink?.attributes('href')).toBe('/#about')
    expect(wrapper.get('#about').attributes('id')).toBe('about')
    expect(wrapper.get('main').findAll('#about')).toHaveLength(1)
    expect(wrapper.find('#contact').exists()).toBe(false)
    expect(wrapper.get('main').findAll('main')).toHaveLength(0)
  })

  it('opts every non-hero home section into scroll reveals', async () => {
    const wrapper = await mountHome()

    for (const sectionId of ['proof', 'projects', 'experience', 'pet-projects', 'about']) {
      expect(wrapper.get(`#${sectionId}`).classes()).toContain('ui-section--reveal')
    }
    expect(wrapper.get('#hero').classes()).not.toContain('ui-section--reveal')
  })

  it('renders named proof links with evidence destinations and stable IDs', async () => {
    const wrapper = await mountHome()
    const proofLinks = wrapper.findAll('.proof-strip__surface')

    expect(wrapper.get('#proof-title').text()).toBe('Engineering')
    expect(proofLinks).toHaveLength(4)

    for (const [index, point] of proofPoints.entries()) {
      const link = proofLinks[index]
      expect(link?.attributes('data-proof-id')).toBe(point.analyticsId)
      expect(link?.text()).toContain(point.value)
      expect(link?.text()).toContain(point.label)
      expect(link?.text()).toContain(point.detail)
      expect(link?.attributes('aria-label')).toContain(point.action.label)
      expect(link?.element.parentElement?.getAttribute('style')).toContain(
        `--reveal-index: ${index}`,
      )
    }

    expect(proofLinks.map((link) => link.attributes('href'))).toEqual([
      '/projects/endless-war-mmo-rpg#evidence',
      '/projects/endless-war-mmo-rpg#architecture',
      '/projects/endless-war-mmo-rpg#architecture',
      '/#experience',
    ])
    expect(wrapper.findAll('.proof-strip__item[tabindex]').length).toBe(0)
  })

  it('provides a working skip-link target and hides the debug route', async () => {
    const wrapper = await mountHome()

    expect(wrapper.get('.site-header__skip-link').attributes('href')).toBe('#main-content')
    expect(wrapper.get('main').attributes('id')).toBe('main-content')
    expect(wrapper.findAll('a').some((link) => link.attributes('href') === '/debug')).toBe(false)
  })

  it('does not persist theme choices before cookie consent', async () => {
    const wrapper = await mountHome()

    expect(wrapper.get('.cookie-consent-banner').attributes()).toMatchObject({
      role: 'dialog',
      'aria-labelledby': 'cookie-consent-title',
      'aria-describedby': 'cookie-consent-description',
    })
    await wrapper.get('[aria-label="Color theme: Dark"]').trigger('click')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.cookie).not.toContain('portfolio-theme=dark')
  })

  it('keeps native view-transition theme changes bound to the document', async () => {
    type ViewTransitionDocument = Document & {
      startViewTransition?: (callback: () => void) => { ready?: Promise<void> }
    }
    const viewTransitionDocument = document as ViewTransitionDocument
    const originalStartViewTransition = viewTransitionDocument.startViewTransition
    let callbackThis: Document | undefined
    let wrapper: Awaited<ReturnType<typeof mountHome>> | undefined

    viewTransitionDocument.startViewTransition = function (this: Document, callback) {
      callbackThis = this
      callback()
      return {}
    }

    try {
      wrapper = await mountHome()
      await wrapper.get('[aria-label="Color theme: Dark"]').trigger('click')

      expect(callbackThis).toBe(document)
      expect(document.documentElement.dataset.theme).toBe('dark')
    } finally {
      wrapper?.unmount()
      if (originalStartViewTransition) {
        viewTransitionDocument.startViewTransition = originalStartViewTransition
      } else {
        delete viewTransitionDocument.startViewTransition
      }
    }
  })

  it('persists the theme only after accepting cookies', async () => {
    const wrapper = await mountHome()

    await wrapper.get('.cookie-consent-banner__accept').trigger('click')
    await wrapper.get('[aria-label="Color theme: Dark"]').trigger('click')

    expect(document.cookie).toContain('portfolio-cookie-consent=accepted')
    expect(document.cookie).toContain('portfolio-theme=dark')
    expect(wrapper.find('.cookie-consent-banner').exists()).toBe(false)
  })

  it('asks again after rejecting cookies', async () => {
    const firstVisit = await mountHome()

    await firstVisit.get('.cookie-consent-banner__reject').trigger('click')
    expect(document.cookie).not.toContain('portfolio-cookie-consent=accepted')
    expect(document.cookie).not.toContain('portfolio-theme=')
    expect(firstVisit.find('.cookie-consent-banner').exists()).toBe(false)
    firstVisit.unmount()

    const nextVisit = await mountHome()
    expect(nextVisit.find('.cookie-consent-banner').exists()).toBe(true)
  })

  it('restores the saved theme only after accepting cookies', async () => {
    document.cookie = 'portfolio-cookie-consent=accepted; Path=/'
    document.cookie = 'portfolio-theme=dark; Path=/'

    const wrapper = await mountHome()

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(wrapper.find('.cookie-consent-banner').exists()).toBe(false)
  })
})
