import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { SiteFooter } from '@/components/layout'
import type { NavigationItem } from '@/content/home'

const actions: readonly NavigationItem[] = [
  { label: 'Email', kind: 'href', href: 'mailto:developer@example.com' },
  { label: 'CV', kind: 'href', href: '/Artem-Podorozhko-CV.pdf', newTab: true },
  {
    label: 'GitHub',
    kind: 'href',
    href: 'https://example.com',
    external: true,
    newTab: true,
  },
  {
    label: 'LinkedIn',
    kind: 'href',
    href: 'https://example.com',
    external: true,
    newTab: true,
  },
  {
    label: 'Steam',
    kind: 'href',
    href: 'https://example.com',
    external: true,
    newTab: true,
  },
]

describe('SiteFooter', () => {
  it('renders supplied contact links in a semantic footer', () => {
    const wrapper = mount(SiteFooter, {
      props: { actions, name: 'Name Surname', occupation: 'Job occupation' },
    })

    expect(wrapper.element.tagName).toBe('FOOTER')
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Contact links')
    expect(wrapper.text()).toContain('Name Surname')
    expect(wrapper.text()).toContain('Job occupation')
    expect(wrapper.findAll('a')).toHaveLength(actions.length)
    expect(wrapper.find('a').attributes('href')).toBe('mailto:developer@example.com')
    const cvLink = wrapper.findAll('a').find((link) => link.text().includes('CV'))
    expect(cvLink?.attributes()).toMatchObject({
      href: '/Artem-Podorozhko-CV.pdf',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    expect(wrapper.findAll('a')[2]?.attributes()).toMatchObject({
      href: 'https://example.com',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })
})
