import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PetProjectCard from '@/components/home/PetProjectCard/PetProjectCard.vue'
import type { PetProjectContent } from '@/content/home'

const project: PetProjectContent = {
  id: 'test-plugin',
  number: '07',
  kind: 'Developer tool',
  title: 'Test Plugin',
  repositoryName: 'TestPluginUnreal',
  summary: 'A concise project summary.',
  metadata: ['C++', 'Blueprint support'],
  sourceAction: {
    label: 'View source',
    kind: 'href',
    href: 'https://github.com/example/TestPluginUnreal',
    external: true,
    newTab: true,
  },
  documentationAction: {
    label: 'Read documentation',
    kind: 'href',
    href: 'https://example.com/docs',
    external: true,
    newTab: true,
  },
}

describe('PetProjectCard', () => {
  it('renders accessible, content-driven project information and actions', () => {
    const wrapper = mount(PetProjectCard, { props: { project } })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.attributes('aria-labelledby')).toBe('pet-project-card-title-test-plugin')
    expect(wrapper.get('h3').text()).toBe(project.title)
    expect(wrapper.text()).toContain(project.number)
    expect(wrapper.text()).toContain(project.kind)
    expect(wrapper.text()).toContain(project.repositoryName)
    expect(wrapper.text()).toContain(project.summary)
    expect(wrapper.findAll('.pet-project-card__metadata li').map((item) => item.text())).toEqual(
      project.metadata,
    )
    const links = wrapper.findAll('a')
    expect(links.map((link) => link.attributes('href'))).toEqual([
      'https://github.com/example/TestPluginUnreal',
      'https://example.com/docs',
    ])
    expect(links[0]?.attributes('aria-label')).toBe('View TestPluginUnreal source on GitHub')
    expect(links.every((link) => link.attributes('target') === '_blank')).toBe(true)
    expect(links.every((link) => link.attributes('rel') === 'noopener noreferrer')).toBe(true)
    expect(wrapper.findAll('button')).toHaveLength(0)
    expect(wrapper.findAll('article a')).toHaveLength(2)
    expect(wrapper.text()).not.toMatch(/star|fork/i)
  })

  it('omits documentation when it is not supplied', () => {
    const wrapper = mount(PetProjectCard, {
      props: { project: { ...project, documentationAction: undefined } },
    })

    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.text()).not.toContain('Read documentation')
  })
})
