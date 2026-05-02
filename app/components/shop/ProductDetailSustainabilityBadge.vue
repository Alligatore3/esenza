<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <!-- Sustainability badge -->
  <div
    class="flex items-start gap-3 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20"
  >
    <span class="material-symbols-outlined text-primary mt-0.5">recycling</span>
    <div>
      <p class="text-sm font-semibold text-text-main dark:text-white">
        {{ t('product.sustainabilityTitle') }}
      </p>
      <p class="text-xs text-text-muted dark:text-white/60 mt-0.5 leading-relaxed">
        {{ t('product.sustainabilityBody') }}
      </p>
    </div>
  </div>
</template>
