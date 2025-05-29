<template>
  <div class="v-number-input">
    <button
      class="v-number-input__button"
      @mousedown="() => startAdjusting('decrement')"
      @mouseup="stopAdjusting"
      @mouseleave="stopAdjusting"
      @touchstart="() => startAdjusting('decrement')"
      @touchend="stopAdjusting"
      :style="{ order: fieldOrderStyle.minus }"
    >
      <MinusIcon :size="12" :stroke-width="1.5" />
    </button>

    <input
      type="number"
      :step="step"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      v-model="modelValue"
      class="v-number-input__input"
      @input="updateValue"
      lang="en"
      :style="{ textAlign: textAlign, order: fieldOrderStyle.input } as CSSProperties"
    />

    <button
      class="v-number-input__button"
      @mousedown="() => startAdjusting('increment')"
      @mouseup="stopAdjusting"
      @mouseleave="stopAdjusting"
      @touchstart="() => startAdjusting('increment')"
      @touchend="stopAdjusting"
      :style="{ order: fieldOrderStyle.plus }"
    >
      <PlusIcon :size="12" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'

import MinusIcon from '@/components/Icons/MinusIcon.vue'
import PlusIcon from '@/components/Icons/PlusIcon.vue'

interface Props {
  modelValue?: number
  step?: number
  min?: number
  max?: number
  placeholder?: string
  theme?: 'default'
  adjustmentSpeed?: number
  textAlign?: string
  inputPosition?: 'center' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  min: -Infinity,
  max: Infinity,
  placeholder: '0',
  modelValue: 0,
  theme: 'default',
  adjustmentSpeed: 100,
  textAlign: 'center',
  inputPosition: 'center',
})

/** VARIABLES */
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const intervalId = ref<number | null>(null)
const fieldOrderStyle = computed(() => {
  const positions = {
    center: { input: 1, minus: 0, plus: 2 },
    left: { input: 0, minus: 1, plus: 2 },
    right: { input: 2, minus: 0, plus: 1 },
  }

  return positions[props.inputPosition as 'center' | 'left' | 'right'] || positions.center
})

const modelValue = ref(props.modelValue)

/** METHODS */
const startAdjusting = (type: 'increment' | 'decrement') => {
  if (intervalId.value) return

  const adjust = () => {
    let newValue = modelValue.value ?? 0
    newValue += type === 'increment' ? props.step : -props.step
    newValue = Math.min(Math.max(newValue, props.min), props.max)
    modelValue.value = newValue
    emit('update:modelValue', newValue)
  }

  adjust()
  intervalId.value = window.setInterval(adjust, props.adjustmentSpeed)
}

const stopAdjusting = () => {
  clearInterval(intervalId.value!)
  intervalId.value = null
}

const updateValue = () => {
  emit('update:modelValue', modelValue.value)
}

/** WATCHERS */
watch(
  () => props.modelValue,
  (val) => {
    modelValue.value = val
  },
)
</script>

<style lang="scss" scoped>
@use '@/scss/components/number-input/_shared';
</style>
