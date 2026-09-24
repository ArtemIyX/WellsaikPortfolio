import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { AboutView } from '@/components/home'
import type { AboutContent } from '@/content/home'
import { aboutContent } from '@/content/home'

const customContent: AboutContent = {
  ...aboutContent,
  eyebrow: 'Custom eyebrow',
  title: 'Custom title',
  paragraphs: ['First custom paragraph', 'Second custom paragraph'],
  facts: [{ label: 'Custom fact', value: 'Custom value' }],
  skills: ['Custom skill'],
  personalNote: 'Custom personal note',
  contactAction: { label: 'Custom contact', kind: 'href', href: 'mailto:custom@example.com' },
}

describe('AboutView', () => {
  it('renders an accessible section with semantic content', () => {
    const wrapper = mount(AboutView, { props: { content: aboutContent } })
    const section = wrapper.get('section')

    expect(section.attributes()).toMatchObject({
      id: 'about',
      'aria-labelledby': 'about-title',
    })
    expect(wrapper.get('#about-title').element.tagName).toBe('H2')
    expect(wrapper.findAll('h1')).toHaveLength(0)
    expect(wrapper.findAll('p')).toHaveLength(aboutContent.paragraphs.length + 2)
    expect(wrapper.findAll('dl dt')).toHaveLength(aboutContent.facts.length)
    expect(wrapper.findAll('dl dd')).toHaveLength(aboutContent.facts.length)
    expect(wrapper.findAll('ul li')).toHaveLength(aboutContent.skills.length)
    expect(wrapper.text()).toContain(aboutContent.personalNote)
  })

  it('renders supplied content and contact action without remote assets', () => {
    const wrapper = mount(AboutView, { props: { content: customContent } })
    const contact = wrapper.get('.about-view__actions a')

    expect(wrapper.text()).toContain('First custom paragraph')
    expect(wrapper.text()).toContain('Second custom paragraph')
    expect(wrapper.text()).toContain('Custom fact')
    expect(wrapper.text()).toContain('Custom skill')
    expect(contact.attributes()).toMatchObject({
      href: 'mailto:custom@example.com',
      class: expect.stringContaining('ui-link--button-primary'),
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.findAll('button')).toHaveLength(0)
  })
})
