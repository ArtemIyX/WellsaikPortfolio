import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { HeroView } from '@/components/home'
import { heroContent } from '@/content/home'

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
    expect(links[0]?.attributes('href')).toBe('mailto:developer@example.com')
    expect(links[1]?.attributes()).toMatchObject({
      href: 'https://example.com',
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

  it('uses explicitly generic placeholder identity content', () => {
    const wrapper = mount(HeroView, { props: { content: heroContent } })

    expect(wrapper.text()).toContain('Placeholder introduction')
    expect(wrapper.text().toLowerCase()).not.toContain('wellsaik')
  })
})
