import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ThemeSelector, UiBox, UiButton, UiLink, UiSection, UiText } from '@/components/shared'

describe('shared portfolio components', () => {
  it('renders UiButton defaults, attrs, pressed state, and loading protection', async () => {
    const onClick = vi.fn<() => void>()
    const wrapper = mount(UiButton, {
      props: { onClick },
      attrs: { name: 'action', 'data-test': 'button' },
      slots: { default: 'Save' },
    })
    expect(wrapper.get('button').attributes()).toMatchObject({
      type: 'button',
      name: 'action',
      'data-test': 'button',
    })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    await wrapper.setProps({ loading: true, pressed: true })
    expect(wrapper.get('button').attributes('aria-busy')).toBe('true')
    expect(wrapper.get('button').attributes('aria-pressed')).toBe('true')
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
  it('separates UiText visual role from its semantic element', () => {
    const wrapper = mount(UiText, {
      props: { as: 'h3', role: 'display', tone: 'accent' },
      slots: { default: 'Heading' },
    })
    expect(wrapper.element.tagName).toBe('H3')
    expect(wrapper.classes()).toContain('ui-text--role-display')
    expect(wrapper.classes()).toContain('ui-text--tone-accent')
  })
  it('renders only supplied UiSection regions and wires its label', () => {
    const wrapper = mount(UiSection, {
      props: { labelledby: 'section-title' },
      slots: { title: '<h2 id="section-title">Title</h2>', default: '<p>Content</p>' },
    })
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('section-title')
    expect(wrapper.find('.ui-section__eyebrow').exists()).toBe(false)
    expect(wrapper.get('.ui-section__title').text()).toBe('Title')
    expect(wrapper.get('.ui-section__content').text()).toBe('Content')
  })
  it('keeps UiBox a semantic, non-interactive container', () => {
    const wrapper = mount(UiBox, {
      props: { as: 'article', variant: 'accent' },
      slots: { default: 'Content' },
    })
    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.find('button, a').exists()).toBe(false)
  })
  it('selects RouterLink for to, native anchors for href, and rejects ambiguity', () => {
    const wrapper = mount(
      defineComponent({ components: { UiLink }, template: '<UiLink to="/work">Work</UiLink>' }),
      { global: { stubs: { RouterLink: { template: '<a class="router-stub"><slot /></a>' } } } },
    )
    expect(wrapper.get('.router-stub').text()).toBe('Work')
    expect(
      mount(UiLink, {
        props: { href: 'https://example.com', external: true, newTab: true },
        slots: { default: 'External' },
      })
        .get('a')
        .attributes(),
    ).toMatchObject({ target: '_blank', rel: 'noopener noreferrer' })
    const invalid = mount(UiLink, {
      props: { to: '/', href: '/also-invalid' } as never,
      slots: { default: 'Invalid' },
    })
    expect(invalid.get('a').attributes('href')).toBeUndefined()
  })
  it('implements ThemeSelector v-model with icon buttons in both presentations', async () => {
    const wrapper = mount(ThemeSelector, {
      props: { modelValue: 'light', presentation: 'segmented' },
    })
    await wrapper.get('button:nth-child(2)').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['dark'])
    await wrapper.setProps({ presentation: 'select' })
    await wrapper.get('button:nth-child(1)').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['light'])
    expect(wrapper.find('select').exists()).toBe(false)
  })
  it('updates loading state without sharing component state', async () => {
    const wrapper = mount(UiButton, { props: { loading: false }, slots: { default: 'Action' } })
    await wrapper.setProps({ loading: true })
    await nextTick()
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
  })
})
