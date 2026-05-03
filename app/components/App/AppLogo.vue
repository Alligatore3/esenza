<script lang="ts" setup>
const { mode = 'light' } = defineProps<{ mode?: 'dark' | 'light' }>()
</script>

<template>
  <img
    class="w-14 h-auto object-contain"
    :src="`/images/logo-${mode}.png`"
    alt="èSenza Japan logo"
  />
</template>
