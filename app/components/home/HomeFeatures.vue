<script setup lang="ts">
const { t } = useI18n()

const features = [
  { icon: 'location_on', title: 'Made in Japan', subtitle: 'Hand-packed in Tokyo' },
  { icon: 'grain', title: 'Italian Ingredients', subtitle: 'Sourced from Tuscany' },
  { icon: 'recycling', title: 'Plastic Free', subtitle: '100% Glass & Cork' },
]
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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="f in features"
          :key="f.title"
          class="flex flex-col items-center text-center p-8 rounded-2xl bg-background-light dark:bg-dark-card border border-border-light dark:border-white/5"
        >
          <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
            <span class="material-symbols-outlined text-primary text-[28px]">{{ f.icon }}</span>
          </div>
          <h3 class="font-bold text-text-main dark:text-white mb-1">{{ f.title }}</h3>
          <p class="text-sm text-text-muted dark:text-white/50">{{ f.subtitle }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
