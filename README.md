# VNumberInput

![https://nodei.co/npm/@mgcodeur/vue-number-input.png?mini=true](https://nodei.co/npm/@mgcodeur/vue-number-input.png?mini=true)

![demo](https://i.ibb.co/gMzJDDsq/preview.png)

A customizable Vue 3 number input component with increment/decrement buttons, built-in range validation, and long-press adjustment.

## Features

- Increment/Decrement buttons with click and press-and-hold adjustment
- Range limits (`min`/`max`) and custom step size
- Customizable adjustment speed for press-and-hold
- Flexible input position: center, left, or right
- Supports `v-model` for easy two-way binding
- Custom text alignment and placeholder
- Style hooks for easy theming
- TypeScript: fully written in TypeScript for type safety and better DX
- Well-tested: strong unit test coverage
- Automatic decimal precision: the input keeps decimals consistent with your step.

---

## Installation

```bash
npm install @mgcodeur/vue-number-input
```

---

## Example

```vue
<template>
  <VueNumberInput
    v-model="value"
    :min="0"
    :max="20"
    :step="1"
    placeholder="Type a number"
    :adjustment-speed="400"
    input-position="right"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueNumberInput } from '@mgcodeur/vue-number-input'
import '@mgcodeur/vue-number-input/dist/themes/default.css'

const value = ref(5)
</script>
```

## Props

| Prop              | Type                                | Default     | Description                                      |
| ----------------- | ----------------------------------- | ----------- | ------------------------------------------------ |
| `step`            | `number`                            | `1`         | The amount to increment or decrement the value.  |
| `min`             | `number`                            | `-Infinity` | The minimum allowed value.                       |
| `max`             | `number`                            | `Infinity`  | The maximum allowed value.                       |
| `placeholder`     | `string`                            | `'0'`       | The placeholder text for the input field.        |
| `adjustmentSpeed` | `number` (milliseconds)             | `100`       | Interval for repeated adjustment when held (ms). |
| `textAlign`       | `string`                            | `'center'`  | CSS text alignment for the input value.          |
| `inputPosition`   | `'center'` \| `'left'` \| `'right'` | `'center'`  | Position of the input relative to the buttons.   |

## Events

| Event               | Payload  | Description                        |
| ------------------- | -------- | ---------------------------------- |
| `update:modelValue` | `number` | Emitted when the value is updated. |

## Styling

- **Wrapper:**  
  `.v-number-input`  
  The main container for the input and buttons.

- **Buttons:**  
  `.v-number-input__button`  
  Applies to both increment and decrement buttons.

- **Input field:**  
  `.v-number-input__input`  
  The main input element for number entry.

- **Themes:**  
  `@/src/scss/components/number-input/themes/_default.scss`.

### Customization Tips

- Override the above classes in your own stylesheet or by updating the SCSS file to match your design system.
- Use the `inputPosition` and `textAlign` props to control layout and text alignment via inline styles.
- For advanced theming, you can add more modifiers or use the `theme` prop as a class or attribute hook.

## ⭐️ Support

If you find this component useful, please consider starring the repo:  
[https://github.com/iharena/vue3-number-picker](https://github.com/iharena/vue3-number-picker)
