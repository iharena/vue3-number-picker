import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import VueNumberInput from '@/components/Inputs/NumberInput.vue'

type Props = InstanceType<typeof VueNumberInput>['$props']

describe('VueNumberInput', () => {
  let wrapper: VueWrapper<any>
  const factory = (props: Partial<Props> = {}): VueWrapper<any> => mount(VueNumberInput, { props })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('displays the initial value from the modelValue prop', () => {
    wrapper = factory({ modelValue: 42 })
    const input = wrapper.get('input')
    expect(input.element.value).toBe('42')
  })

  it('uses the placeholder when no value is provided', () => {
    wrapper = factory({ modelValue: undefined, placeholder: '999' })
    const input = wrapper.get('input')
    expect(input.attributes('placeholder')).toBe('999')
  })

  it('increments the value when the plus button is clicked', async () => {
    wrapper = factory({ modelValue: 1, step: 2 })
    await wrapper.findAll('button')[1].trigger('mousedown')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(3)
  })

  it('decrements the value when the minus button is clicked', async () => {
    wrapper = factory({ modelValue: 5, step: 2 })
    await wrapper.findAll('button')[0].trigger('mousedown')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(3)
  })

  it('respects the min boundary', async () => {
    wrapper = factory({ modelValue: 0, min: 0 })
    await wrapper.findAll('button')[0].trigger('mousedown')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(0)
    expect(wrapper.get('input').element.value).toBe('0')
  })

  it('respects the max boundary', async () => {
    wrapper = factory({ modelValue: 10, max: 10 })
    await wrapper.findAll('button')[1].trigger('mousedown')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(10)
    expect(wrapper.get('input').element.value).toBe('10')
  })

  it('accepts direct input in the input field', async () => {
    wrapper = factory({ modelValue: 5 })
    const input = wrapper.get('input')
    await input.setValue('8')
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(8)
  })

  it('corrects the value on blur if empty', async () => {
    wrapper = factory({ modelValue: 5, min: 1 })
    const input = wrapper.get('input')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(1)
  })

  it('corrects the value on blur if out of bounds', async () => {
    wrapper = factory({ modelValue: 5, max: 10 })
    const input = wrapper.get('input')
    await input.setValue('100')
    await input.trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe(10)
  })

  it('displays decimals according to the step', () => {
    wrapper = factory({ modelValue: 1.2345, step: 0.01 })
    const input = wrapper.get('input')
    expect(input.element.value).toBe('1.23')
  })

  it('applies the textAlign style', () => {
    wrapper = factory({ textAlign: 'right' })
    const input = wrapper.get('input')
    expect((input.element as HTMLInputElement).style.textAlign).toBe('right')
  })

  it('adjusts continuously while holding the button', async () => {
    wrapper = factory({ modelValue: 0, adjustmentSpeed: 50 })
    const plusBtn = wrapper.findAll('button')[1]
    await plusBtn.trigger('mousedown')
    vi.advanceTimersByTime(200)
    await plusBtn.trigger('mouseup')
    const last = wrapper.emitted('update:modelValue')?.at(-1)?.[0]
    expect(last).toBe(5)
  })

  it('stops adjusting on mouseup', async () => {
    wrapper = factory({ modelValue: 0, adjustmentSpeed: 100 })
    const plusBtn = wrapper.findAll('button')[1]
    await plusBtn.trigger('mousedown')
    vi.advanceTimersByTime(500)
    await plusBtn.trigger('mouseup')
    const n = wrapper.emitted('update:modelValue')?.length
    expect(n).toBe(6)
  })
})
