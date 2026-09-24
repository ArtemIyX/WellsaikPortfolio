import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DebugView from '../views/DebugView.vue'
import HomeView from '../views/HomeView.vue'

describe('portfolio views', () => {
  it('renders the portfolio foundation', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('I build dependable systems for ambitious worlds.')
    expect(wrapper.find('select[aria-label="Color theme"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('SCP: Riftborn')
    expect(wrapper.find('a[href="/debug"]').text()).toBe('Debug')
  })

  it('renders every theme token and changes theme from the debug view', async () => {
    const wrapper = mount(DebugView)

    expect(wrapper.findAll('.color-swatch')).toHaveLength(16)
    expect(wrapper.findAll('.type-sample')).toHaveLength(4)

    await wrapper.get('button.theme-button:nth-child(3)').trigger('click')
    expect(document.documentElement.dataset.theme).toBe('dark')

    document.documentElement.removeAttribute('data-theme')
    localStorage.removeItem('theme')
  })
})
