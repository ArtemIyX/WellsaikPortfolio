import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { ContactView } from '@/components/home'
import type { ContactContent } from '@/content/home'

const fixture: ContactContent = {
  eyebrow: 'Reach out',
  title: 'A custom contact heading',
  introduction: 'A custom invitation for a focused conversation.',
  availability: 'A custom availability statement',
  email: 'fixture@example.com',
  primaryAction: {
    label: 'Email the developer',
    kind: 'href',
    href: 'mailto:fixture@example.com',
  },
  expectationNote: 'A custom expectation note.',
  facts: [
    { label: 'Fact one', value: 'Value one' },
    { label: 'Fact two', value: 'Value two' },
  ],
  profileActions: [
    {
      label: 'Code profile',
      kind: 'href',
      href: 'https://example.com/code',
      external: true,
      newTab: true,
    },
    {
      label: 'Network profile',
      kind: 'href',
      href: 'https://example.com/network',
      external: true,
      newTab: true,
    },
  ],
}

describe('ContactView', () => {
  it('renders an accessible, data-driven contact section', () => {
    const wrapper = mount(ContactView, { props: { content: fixture } })

    expect(wrapper.get('section#contact').attributes('aria-labelledby')).toBe('contact-title')
    expect(wrapper.get('h2#contact-title').text()).toBe(fixture.title)
    expect(wrapper.findAll('h1')).toHaveLength(0)
    expect(wrapper.text()).toContain(fixture.eyebrow)
    expect(wrapper.text()).toContain(fixture.introduction)
    expect(wrapper.text()).toContain(fixture.availability)
    expect(wrapper.text()).toContain(fixture.expectationNote)
    expect(wrapper.get('.contact-view__email').text()).toBe(fixture.email)
    expect(wrapper.get('.contact-view__email').attributes('href')).toBe(
      fixture.primaryAction.kind === 'href' ? fixture.primaryAction.href : undefined,
    )

    const facts = wrapper.get('dl').findAll('dt')
    expect(facts).toHaveLength(fixture.facts.length)
    expect(wrapper.get('dl').findAll('dd')).toHaveLength(fixture.facts.length)
    expect(facts.map((fact) => fact.text())).toEqual(fixture.facts.map((fact) => fact.label))
    expect(
      wrapper
        .get('dl')
        .findAll('dd')
        .map((fact) => fact.text()),
    ).toEqual(fixture.facts.map((fact) => fact.value))

    const profileLinks = wrapper.findAll('.contact-view__profiles a')
    expect(profileLinks).toHaveLength(fixture.profileActions.length)
    expect(profileLinks.map((link) => link.get('.ui-link__label').text())).toEqual(
      fixture.profileActions.map((action) => action.label),
    )
    expect(profileLinks.every((link) => link.attributes('target') === '_blank')).toBe(true)
    expect(profileLinks.every((link) => link.attributes('rel') === 'noopener noreferrer')).toBe(
      true,
    )
  })

  it('contains only static links and no misleading form controls', () => {
    const wrapper = mount(ContactView, { props: { content: fixture } })

    expect(wrapper.find('form').exists()).toBe(false)
    expect(wrapper.find('input, textarea, select, button').exists()).toBe(false)
    expect(wrapper.find('[aria-haspopup="dialog"], [aria-expanded]').exists()).toBe(false)
  })
})
