import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DebugView from '../views/DebugView.vue'
import HomeView from '../views/HomeView.vue'

describe('portfolio views', () => {
  it('renders the portfolio foundation', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('I build dependable systems for ambitious worlds.')
    expect(wrapper.findAll('button[aria-label^="Color theme"]')).toHaveLength(2)
    expect(wrapper.text()).toContain('SCP: Riftborn')
    expect(wrapper.find('a[href="/debug"]').text()).toBe('Debug')
  })

  it('renders the shared component specimen matrix and changes theme', async () => {
    const wrapper = mount(DebugView)

    expect(wrapper.findAll('.ui-button')).toHaveLength(10)
    expect(wrapper.findAll('.ui-box')).toHaveLength(4)
    expect(wrapper.findAll('.ui-text').length).toBeGreaterThan(10)

    await wrapper.get('.debug-segmented button:nth-child(2)').trigger('click')
    expect(document.documentElement.dataset.theme).toBe('dark')

    document.documentElement.removeAttribute('data-theme')
    localStorage.removeItem('theme')
  })
})
