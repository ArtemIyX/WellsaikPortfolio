import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PetProjectsView from '@/components/home/PetProjectsView/PetProjectsView.vue'
import { petProjectsContent } from '@/content/home'

describe('PetProjectsView', () => {
  it('renders six accessible project cards in source order with an archive action', () => {
    const wrapper = mount(PetProjectsView, { props: { content: petProjectsContent } })

    expect(wrapper.get('section').attributes()).toMatchObject({
      id: 'pet-projects',
      'aria-labelledby': 'pet-projects-title',
    })
    expect(wrapper.get('h2').attributes('id')).toBe('pet-projects-title')
    expect(wrapper.findAll('h1')).toHaveLength(0)
    expect(wrapper.findAll('article')).toHaveLength(6)
    expect(wrapper.findAll('article h3').map((heading) => heading.text())).toEqual(
      petProjectsContent.projects.map((project) => project.title),
    )
    expect(wrapper.get('.pet-projects-view__all-action a').attributes('href')).toBe(
      'https://github.com/ArtemIyX',
    )
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.text()).not.toMatch(/filter|pagination|carousel|loading/i)
  })

  it('renders supplied content rather than project-specific template text', () => {
    const customContent = {
      ...petProjectsContent,
      title: 'Custom projects',
      introduction: 'Custom introduction',
      projects: [petProjectsContent.projects[0]!],
    }
    const wrapper = mount(PetProjectsView, { props: { content: customContent } })

    expect(wrapper.text()).toContain('Custom projects')
    expect(wrapper.text()).toContain('Custom introduction')
    expect(wrapper.findAll('article')).toHaveLength(1)
  })
})
