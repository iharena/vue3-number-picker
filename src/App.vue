<script setup lang="ts">
import NumberInput from '@/components/Inputs/NumberInput.vue'
</script>

<template>
  <NumberInput :step="1" :min="0" :max="20" placeholder="0" />
</template>
