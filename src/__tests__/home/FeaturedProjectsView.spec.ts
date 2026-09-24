import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import FeaturedProjectsView from '@/components/home/FeaturedProjectsView/FeaturedProjectsView.vue'
import { featuredProjectsContent } from '@/content/home'

describe('FeaturedProjectsView', () => {
  it('renders the named projects in source order with alternating media sides', () => {
    const wrapper = mount(FeaturedProjectsView, { props: { content: featuredProjectsContent } })

    expect(wrapper.get('section').attributes('id')).toBe('projects')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('projects-title')
    expect(wrapper.get('h2').attributes('id')).toBe('projects-title')
    expect(wrapper.findAll('h1')).toHaveLength(0)
    expect(wrapper.findAll('article')).toHaveLength(3)
    expect(wrapper.findAll('article h3').map((heading) => heading.text())).toEqual([
      featuredProjectsContent.projects[0]?.title,
      'Project Beta',
      'Project Gamma',
    ])
    expect(wrapper.findAll('article').map((article) => article.classes())).toEqual([
      expect.arrayContaining(['project-card--media-start']),
      expect.arrayContaining(['project-card--media-end']),
      expect.arrayContaining(['project-card--media-start']),
    ])
    expect(wrapper.findAll('article')[0]?.findAll('a').map((link) => link.attributes('href'))).toEqual([
      'https://newjourney.online/en/',
    ])
  })

  it('renders custom content instead of relying on project-specific template text', () => {
    const customContent = {
      ...featuredProjectsContent,
      eyebrow: 'Custom work',
      title: 'Custom title',
      introduction: 'Custom introduction',
      projects: [featuredProjectsContent.projects[0]!],
    }
    const wrapper = mount(FeaturedProjectsView, { props: { content: customContent } })

    expect(wrapper.text()).toContain('Custom work')
    expect(wrapper.text()).toContain('Custom title')
    expect(wrapper.text()).toContain('Custom introduction')
    expect(wrapper.findAll('article')).toHaveLength(1)
  })
})
