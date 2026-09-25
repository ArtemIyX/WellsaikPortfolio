import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PetProjectCard from '@/components/home/PetProjectCard/PetProjectCard.vue'
import type { PetProjectContent } from '@/content/home'

const project: PetProjectContent = {
  id: 'test-plugin',
  title: 'Test Plugin',
  summary: 'A concise project summary.',
  metadata: ['C++', 'Blueprint support'],
  githubAction: {
    label: 'GitHub',
    kind: 'href',
    href: 'https://github.com/example/TestPluginUnreal',
    external: true,
    newTab: true,
  },
}

describe('PetProjectCard', () => {
  it('renders accessible, content-driven project information with a linked title', () => {
    const wrapper = mount(PetProjectCard, { props: { project } })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.attributes('aria-labelledby')).toBe('pet-project-card-title-test-plugin')
    expect(wrapper.get('h3 .ui-link__label').text()).toBe(project.title)
    expect(wrapper.text()).toContain(project.summary)
    expect(wrapper.findAll('.pet-project-card__metadata li').map((item) => item.text())).toEqual(
      project.metadata,
    )
    const links = wrapper.findAll('a')
    expect(links.map((link) => link.attributes('href'))).toEqual([
      'https://github.com/example/TestPluginUnreal',
    ])
    expect(links[0]?.attributes('aria-label')).toBe('View Test Plugin on GitHub')
    expect(links.every((link) => link.attributes('target') === '_blank')).toBe(true)
    expect(links.every((link) => link.attributes('rel') === 'noopener noreferrer')).toBe(true)
    expect(wrapper.find('.ui-link__indicator').exists()).toBe(false)
    expect(wrapper.findAll('button')).toHaveLength(0)
    expect(wrapper.findAll('article a')).toHaveLength(1)
    expect(wrapper.find('.pet-project-card__rail').exists()).toBe(false)
    expect(wrapper.find('.pet-project-card__actions').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Developer tool')
    expect(wrapper.text()).not.toContain('TestPluginUnreal')
    expect(wrapper.text()).not.toMatch(/star|fork/i)
  })
})
