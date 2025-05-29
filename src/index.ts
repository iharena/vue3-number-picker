import { type App } from 'vue'

import VueNumberInput from '@/components/Inputs/NumberInput.vue'

export default {
  install: (app: App) => {
    app.component('VueNumberInput', VueNumberInput)
  },
}
