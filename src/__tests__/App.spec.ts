import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DebugView from '../views/DebugView.vue'

describe('portfolio views', () => {
  it('renders the shared component specimen matrix and changes theme', async () => {
    const wrapper = mount(DebugView)

    expect(wrapper.findAll('.ui-button')).toHaveLength(10)
    expect(wrapper.findAll('.ui-box')).toHaveLength(4)
    expect(wrapper.findAll('.ui-text').length).toBeGreaterThan(10)

    await wrapper.get('.debug-segmented button:nth-child(2)').trigger('click')
    expect(document.documentElement.dataset.theme).toBe('dark')

    document.documentElement.removeAttribute('data-theme')
    document.cookie = 'portfolio-theme=; Max-Age=0; Path=/'
  })
})
