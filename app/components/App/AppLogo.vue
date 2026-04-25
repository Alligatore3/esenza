<script setup lang="ts">
defineProps<{ size?: 'sm' | 'md' | 'lg' }>()
</script>

<template>
  <div class="flex items-center gap-2">
    <svg
      :class="{
        'w-6 h-6': size === 'sm',
        'w-8 h-8': !size || size === 'md',
        'w-10 h-10': size === 'lg',
      }"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 4C13.0 4 4 13.0 4 24C4 35.0 13.0 44 24 44C35.0 44 44 35.0 44 24C44 13.0 35.0 4 24 4ZM21.5 14C21.5 14 16 18.5 16 24.5C16 27.5 17.5 30 19.5 31.5C19 29.5 19 27.5 20 26C21 24.5 22.5 23.5 24 23C22.5 24.5 22 26.5 22.5 28.5C23 30.5 24.5 32 26.5 32.5C28.5 33 30.5 32 32 30.5C33.5 29 34 27 33.5 25C33 23 31.5 21.5 29.5 21C31 22 32 23.5 32 25C30 22.5 27 21 24 21.5C25.5 19 26.5 16.5 25.5 14.5C24.5 12.5 22.5 12 21.5 14Z"
        fill="#4ce619"
      />
    </svg>
    <span
      :class="{
        'text-base': size === 'sm',
        'text-xl': !size || size === 'md',
        'text-2xl': size === 'lg',
      }"
      class="font-bold tracking-tight text-text-main dark:text-white"
    >
      èSenza
    </span>
  </div>
</template>
