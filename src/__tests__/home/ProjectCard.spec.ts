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
  problem: { text: 'Test problem', items: ['Test constraint'] },
  role: { text: 'Test role' },
  outcome: { text: 'Test outcome' },
  technologies: ['Vue', 'TypeScript'],
  labels: {
    problem: 'Challenge',
    role: 'Contribution',
    outcome: 'Impact',
    technologies: 'Tools',
  },
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
    expect(wrapper.findAll('dt').map((term) => term.text())).toEqual([
      project.labels?.problem,
      project.labels?.role,
      project.labels?.outcome,
    ])
    expect(wrapper.findAll('dd').map((value) => value.text())).toEqual([
      'Test problemTest constraint',
      'Test role',
      'Test outcome',
    ])
    expect(wrapper.get('.project-card__detail-list').text()).toBe('Test constraint')
    expect(wrapper.findAll('.project-card__technologies li').map((item) => item.text())).toEqual(
      project.technologies,
    )
    expect(wrapper.get('h4').text()).toBe(project.labels?.technologies)
    const links = wrapper.findAll('a')
    expect(links.map((link) => link.text())).toEqual([
      'Live↗ (opens in a new tab)',
      'Source↗ (opens in a new tab)',
    ])
    expect(links.map((link) => link.attributes('href'))).toEqual([
      project.liveAction.kind === 'href' ? project.liveAction.href : undefined,
      project.sourceAction.kind === 'href' ? project.sourceAction.href : undefined,
    ])
    expect(links.every((link) => link.attributes('target') === '_blank')).toBe(true)
    expect(links.every((link) => link.attributes('rel') === 'noopener noreferrer')).toBe(true)
    expect(wrapper.classes()).toContain('project-card--media-end')
    expect(wrapper.findAll('button')).toHaveLength(0)
  })

  it('supports custom markup through named detail slots', () => {
    const wrapper = mount(ProjectCard, {
      props: { project },
      slots: {
        problem: '<ul><li>Custom problem item</li></ul>',
        role: '<p>Custom role</p>',
        outcome: '<p>Custom outcome</p>',
        technologies: '<p>Custom technologies</p>',
      },
    })

    expect(wrapper.findAll('dd').map((value) => value.text())).toEqual([
      'Custom problem item',
      'Custom role',
      'Custom outcome',
    ])
    expect(wrapper.get('.project-card__technologies').text()).toContain('Custom technologies')
  })
})
