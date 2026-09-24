import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { ExperienceCard } from '@/components/home'
import type { ExperienceEntry } from '@/content/home'

const entry: ExperienceEntry = {
  id: 'custom-entry',
  period: { label: '20XX — Present' },
  organization: 'Custom Organization',
  role: 'Custom Role',
  location: 'Custom City · Remote placeholder',
  summary: 'Custom summary',
  achievements: ['Custom achievement one', 'Custom achievement two'],
  technologies: ['Custom technology one', 'Custom practice two'],
}

describe('ExperienceCard', () => {
  it('renders an accessible article with all supplied content', () => {
    const wrapper = mount(ExperienceCard, { props: { entry } })
    const article = wrapper.get('article')
    const title = wrapper.get('h4')

    expect(article.attributes('aria-labelledby')).toBe(title.attributes('id'))
    expect(title.text()).toBe(entry.role)
    expect(wrapper.text()).toContain(entry.period.label)
    expect(wrapper.text()).toContain(entry.organization)
    expect(wrapper.text()).toContain(entry.location)
    expect(wrapper.text()).toContain(entry.summary)
    expect(wrapper.findAll('.experience-card__list-group:first-of-type li')).toHaveLength(
      entry.achievements.length,
    )
    expect(wrapper.findAll('.experience-card__technologies li')).toHaveLength(
      entry.technologies.length,
    )
    expect(wrapper.findAll('button, a, [role="tab"], [hidden]').length).toBe(0)
    expect(wrapper.find('time').exists()).toBe(false)
  })
})
