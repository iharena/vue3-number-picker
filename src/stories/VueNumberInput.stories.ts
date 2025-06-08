import type { Meta, StoryObj } from '@storybook/vue3'
import VueNumberInput from '@/components/Inputs/NumberInput.vue'
import { ref } from 'vue'

import '@/scss/components/number-input/themes/_default.scss'

const meta: Meta<typeof VueNumberInput> = {
  title: 'Inputs/VueNumberInput',
  component: VueNumberInput,
  argTypes: {
    modelValue: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    textAlign: { control: 'text' },
    inputPosition: {
      control: { type: 'select' },
      options: ['center', 'left', 'right'],
    },
    adjustmentSpeed: { control: 'number' },
    placeholder: { control: 'text' },
  },
  args: {
    modelValue: 5,
    textAlign: 'center',
    inputPosition: 'center',
    adjustmentSpeed: 100,
    placeholder: '0',
  },
}
export default meta

type Story = StoryObj<typeof VueNumberInput>

export const Default: Story = {
  name: 'Default',
  args: {
    modelValue: 5,
  },
}

export const StepDecimal: Story = {
  name: 'Decimal step',
  args: {
    modelValue: 1.5,
    step: 0.1,
    min: 1,
    max: 100,
  },
}

export const WithLimits: Story = {
  name: 'With limits',
  args: {
    modelValue: 0,
    min: -5,
    max: 5,
  },
}

export const LeftInput: Story = {
  name: 'Left input',
  args: {
    inputPosition: 'left',
    textAlign: 'left',
    modelValue: 1,
  },
}

export const RightInput: Story = {
  name: 'Right input',
  args: {
    inputPosition: 'right',
    textAlign: 'right',
    modelValue: 1,
  },
}

export const TwoWayBinding: Story = {
  name: 'Reactive v-model',
  render: (args) => ({
    components: { VueNumberInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <VueNumberInput v-model="value" v-bind="args" />
      <div style="margin-top:16px">Value: {{ value }}</div>
    `,
  }),
}
