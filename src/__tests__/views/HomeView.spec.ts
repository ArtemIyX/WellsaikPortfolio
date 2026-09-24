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
  it('composes the header before main and includes the hero', async () => {
    const wrapper = await mountHome()

    expect(wrapper.get('.home-view').element.children[0]?.tagName).toBe('HEADER')
    expect(wrapper.get('.home-view').element.children[1]?.tagName).toBe('MAIN')
    expect(wrapper.get('main').find('#hero').exists()).toBe(true)
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
