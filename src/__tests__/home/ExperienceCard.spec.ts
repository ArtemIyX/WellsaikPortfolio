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
  engagement: 'Custom engagement',
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
    expect(wrapper.text()).toContain(entry.engagement)
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

  it('links the organization when an organization URL is provided', () => {
    const wrapper = mount(ExperienceCard, {
      props: { entry: { ...entry, organizationUrl: 'https://newjourney.online/en/' } },
    })

    const organizationLink = wrapper.get('a')
    expect(organizationLink.text()).toContain(entry.organization)
    expect(organizationLink.attributes()).toMatchObject({
      href: 'https://newjourney.online/en/',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })

  it('links the application when an application URL is provided', () => {
    const wrapper = mount(ExperienceCard, {
      props: {
        entry: {
          ...entry,
          applicationUrl:
            'https://play.google.com/store/apps/details?id=com.blockzerowallet.app&hl=bs&pli=1',
        },
      },
    })

    const applicationLink = wrapper
      .findAll('a')
      .find((link) => link.text().includes('View application'))
    expect(applicationLink?.attributes()).toMatchObject({
      href: 'https://play.google.com/store/apps/details?id=com.blockzerowallet.app&hl=bs&pli=1',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })
})
