import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberInput from '@/components/Inputs/NumberInput.vue'

describe('NumberInput', () => {
  it('displays the initial value', async () => {
    const wrapper = mount(NumberInput, {
      props: { modelValue: 5 },
    })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('5')
  })

  it('increments and decrements the value', async () => {
    let value = 10
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: value,
        step: 2,
        'onUpdate:modelValue': (val: number) => {
          value = val
          wrapper.setProps({ modelValue: value })
        },
      },
    })
    const buttons = wrapper.findAll('.v-number-input__button')
    const decrement = buttons[0]
    const increment = buttons[1]

    await increment.trigger('mousedown')
    await increment.trigger('mouseup')
    expect(value).toBe(12)

    await decrement.trigger('mousedown')
    await decrement.trigger('mouseup')
    expect(value).toBe(10)
  })

  it('respects min and max props', async () => {
    const wrapper = mount(NumberInput, {
      props: { modelValue: 5, step: 2, min: 4, max: 6 },
    })
    const buttons = wrapper.findAll('.v-number-input__button')
    const decrement = buttons[0]
    const increment = buttons[1]

    await decrement.trigger('mousedown')
    await decrement.trigger('mouseup')
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(4)

    await increment.trigger('mousedown')
    await increment.trigger('mouseup')
    await increment.trigger('mousedown')
    await increment.trigger('mouseup')
    expect(wrapper.emitted('update:modelValue')?.[2][0]).toBe(6)
  })

  it('updates value when typing', async () => {
    const wrapper = mount(NumberInput, {
      props: { modelValue: 5 },
    })
    const input = wrapper.find('input')
    await input.setValue(42)
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(42)
  })
})
