<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  activeFilter: string
  productCount: number
}>()

const emit = defineEmits<{ 'filter-change': [filter: string] }>()

const primaryFilters = [
  { key: 'all', labelKey: 'shop.filters.all', subKey: 'shop.filters.allJa' },
  { key: 'sweet', labelKey: 'shop.filters.sweet', subKey: 'shop.filters.sweetJa' },
  { key: 'savory', labelKey: 'shop.filters.savory', subKey: 'shop.filters.savoryJa' },
]

const secondaryFilters = [
  { key: 'vegan', labelKey: 'shop.filters.vegan', icon: 'eco' },
  { key: 'gf', labelKey: 'shop.filters.gf', icon: 'grain' },
]
</script>

<template>
  <div
    class="sticky z-40 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-border-light dark:border-white/5"
    style="top: var(--header-height)"
  >
    <div
      class="max-w-wide mx-auto px-4 md:px-10 lg:px-16 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar"
    >
      <!-- Primary filters -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <button
          v-for="f in primaryFilters"
          :key="f.key"
          class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0"
          :class="
            activeFilter === f.key
              ? 'bg-primary text-background-dark shadow-sm'
              : 'bg-background-light dark:bg-surface-dark text-text-main dark:text-white/80 hover:bg-primary/10 hover:text-primary'
          "
          @click="emit('filter-change', f.key)"
        >
          {{ t(f.labelKey) }}
          <span class="text-xs opacity-60 hidden sm:inline">{{ t(f.subKey) }}</span>
        </button>
      </div>

      <!-- Divider -->
      <div class="w-px h-6 bg-border-soft dark:bg-white/10 flex-shrink-0 mx-1"></div>

      <!-- Secondary filters -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <button
          v-for="f in secondaryFilters"
          :key="f.key"
          class="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0"
          :class="
            activeFilter === f.key
              ? 'bg-primary text-background-dark shadow-sm'
              : 'bg-background-light dark:bg-surface-dark text-text-main dark:text-white/80 hover:bg-primary/10 hover:text-primary'
          "
          @click="emit('filter-change', f.key)"
        >
          <span class="material-symbols-outlined text-[16px]">{{ f.icon }}</span>
          {{ t(f.labelKey) }}
        </button>
      </div>

      <!-- Spacer + count -->
      <div
        class="ml-auto flex-shrink-0 text-xs text-text-muted dark:text-white/40 font-medium whitespace-nowrap"
      >
        {{ t('shop.productCount', { count: productCount }) }}
      </div>
    </div>
  </div>
</template>
