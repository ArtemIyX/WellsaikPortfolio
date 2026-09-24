import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the portfolio foundation', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('I build dependable systems for ambitious worlds.')
    expect(wrapper.find('select[aria-label="Color theme"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('SCP: Riftborn')
  })
})
