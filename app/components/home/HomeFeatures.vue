<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="w-full bg-white dark:bg-surface-dark py-16 px-4 md:px-10 lg:px-16">
    <div class="max-w-wide mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white mb-3">
          {{ t('home.features.title') }}
        </h2>
        <p class="text-text-muted dark:text-white/60 text-sm max-w-lg mx-auto">
          {{ t('home.features.subtitle') }}
        </p>
      </div>
    </div>
  </section>
</template>
