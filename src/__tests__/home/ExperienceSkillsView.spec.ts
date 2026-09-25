import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { ExperienceSkillsView } from '@/components/home'
import type { ExperienceSkillsContent } from '@/content/home'
import { experienceSkillsContent } from '@/content/home'

const customContent: ExperienceSkillsContent = {
  ...experienceSkillsContent,
  eyebrow: 'Custom experience eyebrow',
  title: 'Custom experience title',
  introduction: 'Custom experience introduction',
  experienceHeading: 'Custom experience heading',
  skillsHeading: 'Custom skills heading',
  entries: [
    {
      ...experienceSkillsContent.entries[0],
      id: 'custom-first',
      role: 'Custom first role',
    },
    {
      ...experienceSkillsContent.entries[1],
      id: 'custom-second',
      role: 'Custom second role',
    },
  ],
  skillGroups: [
    {
      id: 'custom-group',
      title: 'Custom group',
      items: [{ name: 'Custom item', level: 'Expert' }],
    },
  ],
}

describe('ExperienceSkillsView', () => {
  it('renders named semantic regions and all source data', () => {
    const wrapper = mount(ExperienceSkillsView, { props: { content: experienceSkillsContent } })
    const section = wrapper.get('section#experience')

    expect(section.attributes('aria-labelledby')).toBe('experience-title')
    expect(wrapper.get('#experience-title').element.tagName).toBe('H2')
    expect(wrapper.findAll('h1')).toHaveLength(0)
    expect(wrapper.get('section[aria-labelledby="experience-list-title"] h3').text()).toBe(
      experienceSkillsContent.experienceHeading,
    )
    expect(wrapper.get('aside[aria-labelledby="skills-title"] h3').text()).toBe(
      experienceSkillsContent.skillsHeading,
    )
    expect(wrapper.findAll('.experience-card')).toHaveLength(experienceSkillsContent.entries.length)
    expect(wrapper.findAll('.experience-card h4').map((heading) => heading.text())).toEqual(
      experienceSkillsContent.entries.map((entry) => entry.role),
    )
    expect(wrapper.findAll('.experience-skills-view__group')).toHaveLength(
      experienceSkillsContent.skillGroups.length,
    )
    expect(wrapper.findAll('[role="tablist"], [role="progressbar"], [data-carousel]').length).toBe(
      0,
    )
  })

  it('renders custom props instead of hard-coded content', () => {
    const wrapper = mount(ExperienceSkillsView, { props: { content: customContent } })

    expect(wrapper.text()).toContain('Custom experience title')
    expect(wrapper.text()).toContain('Custom first role')
    expect(wrapper.text()).toContain('Custom second role')
    expect(wrapper.text()).toContain('Custom group')
    expect(wrapper.text()).toContain('Custom item')
    expect(wrapper.text()).toContain('Expert')
    expect(wrapper.findAll('.experience-card')).toHaveLength(customContent.entries.length)
  })

  it('renders language proficiency levels when supplied', () => {
    const wrapper = mount(ExperienceSkillsView, { props: { content: experienceSkillsContent } })
    const languages = experienceSkillsContent.skillGroups.find((group) => group.id === 'languages')

    expect(wrapper.get('.experience-skills-view__group').text()).toContain('Ukrainian')
    for (const language of languages?.items ?? []) {
      expect(wrapper.text()).toContain(language.name)
      if (language.level) expect(wrapper.text()).toContain(language.level)
    }
  })
})
