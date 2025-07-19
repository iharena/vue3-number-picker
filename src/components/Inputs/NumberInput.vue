<template>
  <div class="v-number-input">
    <button
      class="v-number-input__button"
      @mousedown="startAdjust('decrement')"
      @mouseup="stopAdjust"
      @mouseleave="stopAdjust"
      @touchstart="startAdjust('decrement')"
      @touchend="stopAdjust"
      :style="{ order: orderStyle.minus }"
    >
      <span v-if="$slots['minus-icon']">
        <slot name="minus-icon" />
      </span>
      <MinusIcon v-else :size="12" :stroke-width="1.5" />
    </button>

    <input
      type="number"
      v-model="displayValue"
      :step="step"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      class="v-number-input__input"
      @input="onInput"
      @blur="onBlur"
      :style="{ textAlign, order: orderStyle.input } as CSSProperties"
      lang="en"
    />

    <button
      class="v-number-input__button"
      @mousedown="startAdjust('increment')"
      @mouseup="stopAdjust"
      @mouseleave="stopAdjust"
      @touchstart="startAdjust('increment')"
      @touchend="stopAdjust"
      :style="{ order: orderStyle.plus }"
    >
      <span v-if="$slots['plus-icon']">
        <slot name="plus-icon" />
      </span>
      <PlusIcon v-else :size="12" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import MinusIcon from '@/components/Icons/MinusIcon.vue'
import PlusIcon from '@/components/Icons/PlusIcon.vue'

// ===== PROPS & EMITS =====
const props = withDefaults(
  defineProps<{
    adjustmentSpeed?: number
    inputPosition?: 'center' | 'left' | 'right'
    max?: number
    min?: number
    modelValue?: number
    placeholder?: string
    step?: number
    textAlign?: string
  }>(),
  {
    step: 1,
    min: -Infinity,
    max: Infinity,
    placeholder: '0',
    modelValue: 0,
    adjustmentSpeed: 100,
    textAlign: 'center',
    inputPosition: 'center',
  },
)
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

// ===== UTILS =====
const clamp = (v: number) => Math.min(props.max, Math.max(props.min, v))
const fix = (v: number) => Number(Number(v).toFixed(getPrecision()))
const format = (v: number) => fix(v).toFixed(getPrecision())
const getPrecision = () => props.step.toString().split('.')[1]?.length || 0

// ===== ⚡ STATE =====
const displayValue = ref<string>(format(fix(clamp(props.modelValue!))))
const interval = ref<number | null>(null)
const value = ref<number>(fix(clamp(props.modelValue!)))

// ===== COMPUTED =====
const orderStyle = computed(
  () =>
    ({
      center: { input: 1, minus: 0, plus: 2 },
      left: { input: 0, minus: 1, plus: 2 },
      right: { input: 2, minus: 0, plus: 1 },
    })[props.inputPosition],
)

// ===== METHODS =====
function adjust(type: 'increment' | 'decrement') {
  const next = fix(clamp((value.value ?? 0) + (type === 'increment' ? props.step : -props.step)))
  value.value = next
  displayValue.value = format(next)
  emit('update:modelValue', next)
}
function onBlur() {
  const n = Number(displayValue.value)
  if (displayValue.value === '' || isNaN(n)) {
    value.value = fix(Math.max(props.min, 0))
  } else {
    value.value = fix(clamp(n))
  }
  displayValue.value = format(value.value)
  emit('update:modelValue', value.value)
}
function onInput(e: Event) {
  displayValue.value = (e.target as HTMLInputElement).value
  const n = Number(displayValue.value)
  if (displayValue.value !== '' && !isNaN(n)) {
    value.value = fix(clamp(n))
    emit('update:modelValue', value.value)
  }
}
function startAdjust(type: 'increment' | 'decrement') {
  if (interval.value) return
  adjust(type)
  interval.value = window.setInterval(() => adjust(type), props.adjustmentSpeed)
}
function stopAdjust() {
  if (interval.value) clearInterval(interval.value)
  interval.value = null
}

// ===== WATCHERS =====
watch(
  () => props.modelValue,
  (val) => {
    const safe = fix(clamp(val!))
    if (safe !== value.value) {
      value.value = safe
      displayValue.value = format(safe)
    }
  },
  { immediate: true },
)
</script>
