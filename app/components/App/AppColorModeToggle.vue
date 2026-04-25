<script setup lang="ts">
const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      class="p-2 rounded-lg text-text-main dark:text-white/80 hover:bg-background-light dark:hover:bg-surface-dark transition-colors"
      :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggle"
    >
      <span class="material-symbols-outlined text-[22px]">
        {{ colorMode.value === 'dark' ? 'light_mode' : 'dark_mode' }}
      </span>
    </button>

    <template #fallback>
      <div class="w-[38px] h-[38px]" />
    </template>
  </ClientOnly>
</template>
