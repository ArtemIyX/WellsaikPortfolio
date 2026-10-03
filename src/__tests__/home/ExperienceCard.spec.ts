import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { ExperienceCard } from '@/components/home'
import type { ExperienceEntry } from '@/content/home'

const entry: ExperienceEntry = {
  id: 'custom-entry',
  status: 'past',
  period: { label: '20XX — Present' },
  organization: 'Custom Organization',
  role: 'Custom Role',
  location: 'Custom City · Remote placeholder',
  engagement: 'Custom engagement',
  summary: 'Custom summary',
  evidence: [
    { value: '10.000+', label: 'Custom metric' },
    { value: '60 FPS', label: 'Custom performance target' },
  ],
  achievements: ['Custom achievement one', 'Custom achievement two'],
  technologies: ['Custom technology one', 'Custom practice two'],
}

describe('ExperienceCard', () => {
  it('renders an accessible article with all supplied content', () => {
    const wrapper = mount(ExperienceCard, { props: { entry } })
    const article = wrapper.get('article')
    const title = wrapper.get('h4')

    expect(article.attributes('aria-labelledby')).toBe(title.attributes('id'))
    expect(article.classes()).toContain('ui-box--depth-aware')
    expect(title.text()).toBe(entry.role)
    expect(wrapper.get('.experience-card__header').find('h4').element).toBe(title.element)
    expect(wrapper.get('.experience-card__chronology').text()).toContain(entry.period.label)
    expect(wrapper.find('.experience-card__status').exists()).toBe(false)
    expect(wrapper.get('.experience-card__context').text()).toContain(entry.organization)
    const content = wrapper.get('.experience-card__content')
    expect(content.find('.experience-card__summary').text()).toBe(entry.summary)
    expect(content.get('.experience-card__impact p').text()).toBe('Selected impact')
    expect(content.findAll('.experience-card__impact li')).toHaveLength(entry.achievements.length)
    expect(content.findAll('.experience-card__evidence dt').map((item) => item.text())).toEqual(
      entry.evidence?.map((item) => item.label),
    )
    expect(content.findAll('.experience-card__evidence dd').map((item) => item.text())).toEqual(
      entry.evidence?.map((item) => item.value),
    )
    expect(content.get('.experience-card__stack').text()).toContain(entry.technologies.join(' · '))
    expect(wrapper.text()).toContain(entry.period.label)
    expect(wrapper.text()).toContain(entry.organization)
    expect(wrapper.text()).toContain(entry.location)
    expect(wrapper.text()).toContain(entry.engagement)
    expect(wrapper.text()).toContain(entry.summary)
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

  it('shows a current-status cue for the active role', () => {
    const wrapper = mount(ExperienceCard, { props: { entry: { ...entry, status: 'current' } } })

    expect(wrapper.get('.experience-card__status').text()).toBe('Current')
  })

  it('links the application when an application URL is provided', () => {
    const wrapper = mount(ExperienceCard, {
      props: {
        entry: {
          ...entry,
          applicationUrl:
            'https://play.google.com/store/apps/details?id=com.blockzerowallet.app&hl=bs&pli=1',
          applicationLabel: 'View on Google Play',
        },
      },
    })

    const applicationLink = wrapper
      .get('.experience-card__content')
      .findAll('a')
      .find((link) => link.text().includes('View on Google Play'))
    expect(applicationLink?.attributes()).toMatchObject({
      href: 'https://play.google.com/store/apps/details?id=com.blockzerowallet.app&hl=bs&pli=1',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })
})
