import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ProjectCard from '@/components/home/ProjectCard/ProjectCard.vue'
import type { ProjectContent } from '@/content/home'

const project: ProjectContent = {
  id: 'test-project',
  number: '01',
  category: 'Test category',
  title: 'Test project',
  summary: 'Test summary',
  problem: 'Test problem',
  role: 'Test role',
  outcome: 'Test outcome',
  technologies: ['Vue', 'TypeScript'],
  image: {
    src: '/images/projects/test.svg',
    alt: 'Test project preview',
    width: 1200,
    height: 750,
  },
  liveAction: {
    label: 'Live',
    kind: 'href',
    href: 'https://example.com',
    external: true,
    newTab: true,
  },
  sourceAction: {
    label: 'Source',
    kind: 'href',
    href: 'https://example.com',
    external: true,
    newTab: true,
  },
}

describe('ProjectCard', () => {
  it('renders accessible, content-driven project details and actions', () => {
    const wrapper = mount(ProjectCard, { props: { project, mediaSide: 'end' } })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.attributes('aria-labelledby')).toBe('project-card-title-test-project')
    expect(wrapper.get('h3').text()).toBe(project.title)
    expect(wrapper.get('img').attributes()).toMatchObject({
      src: project.image.src,
      alt: project.image.alt,
      width: '1200',
      height: '750',
      loading: 'lazy',
      decoding: 'async',
    })
    expect(wrapper.findAll('dt').map((term) => term.text())).toEqual(['Problem', 'Role', 'Outcome'])
    expect(wrapper.findAll('dd').map((value) => value.text())).toEqual([
      project.problem,
      project.role,
      project.outcome,
    ])
    expect(wrapper.findAll('li').map((item) => item.text())).toEqual(project.technologies)
    expect(wrapper.findAll('a').map((link) => link.text())).toEqual([
      'Live↗ (opens in a new tab)',
      'Source↗ (opens in a new tab)',
    ])
    expect(wrapper.classes()).toContain('project-card--media-end')
    expect(wrapper.findAll('button')).toHaveLength(0)
  })
})
