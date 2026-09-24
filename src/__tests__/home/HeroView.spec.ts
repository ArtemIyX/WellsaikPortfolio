import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { HeroView } from '@/components/home'
import { email, github, heroContent } from '@/content/home'

describe('HeroView', () => {
  it('connects the hero landmark to its only page-level heading', () => {
    const wrapper = mount(HeroView, { props: { content: heroContent } })

    expect(wrapper.get('section').attributes()).toMatchObject({
      id: 'hero',
      'aria-labelledby': 'hero-title',
    })
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.get('#hero-title').text()).toBe(heroContent.title)
  })

  it('renders supplied copy and both navigation destinations', () => {
    const wrapper = mount(HeroView, { props: { content: heroContent } })
    const links = wrapper.findAll('.hero-view__actions a')

    expect(wrapper.text()).toContain(heroContent.eyebrow)
    expect(wrapper.text()).toContain(heroContent.summary)
    expect(wrapper.text()).toContain(heroContent.availability)
    expect(links[0]?.attributes('href')).toBe(`mailto:${email}`)
    expect(links[1]?.attributes()).toMatchObject({
      href: github,
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })

  it('renders an intrinsically sized local placeholder portrait', () => {
    const image = mount(HeroView, { props: { content: heroContent } }).get('img')

    expect(image.attributes()).toMatchObject({
      src: heroContent.imageSrc,
      alt: heroContent.imageAlt,
      width: String(heroContent.imageWidth),
      height: String(heroContent.imageHeight),
    })
    expect(image.attributes('alt')).not.toBe('')
    expect(image.attributes('src')).not.toMatch(/^https?:/)
  })

  it('renders the supplied professional summary', () => {
    const wrapper = mount(HeroView, { props: { content: heroContent } })

    expect(wrapper.text()).toContain(heroContent.summary)
  })

  it('adds a decorative email icon to the primary action', () => {
    const wrapper = mount(HeroView, { props: { content: heroContent } })

    expect(wrapper.get('.hero-view__actions a:first-child .hero-view__email-icon').attributes()).toMatchObject({
      'aria-hidden': 'true',
      viewBox: '0 0 24 24',
    })
  })

  it('adds a decorative GitHub icon to the secondary action', () => {
    const wrapper = mount(HeroView, { props: { content: heroContent } })

    const codeProfileAction = wrapper.get('.hero-view__actions a:nth-child(2)')

    expect(codeProfileAction.get('.hero-view__github-icon').attributes()).toMatchObject({
      'aria-hidden': 'true',
      viewBox: '0 0 24 24',
    })
    expect(codeProfileAction.find('.ui-link__indicator').exists()).toBe(false)
  })
})
