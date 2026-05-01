<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="w-full bg-white dark:bg-surface-dark py-16 md:py-24 px-4 md:px-10 lg:px-16">
    <div class="max-w-wide mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Image -->
      <div class="rounded-2xl overflow-hidden aspect-[4/3]">
        <img
          src="/images/about.jpeg"
          alt="Hands packing jar with organic ingredients"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Text -->
      <div class="flex flex-col gap-6">
        <div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white mb-1">
            {{ t('about.mission.title') }}
          </h2>
          <p class="text-text-muted dark:text-white/50 text-base">{{ t('about.mission.titleJa') }}</p>
        </div>
        <p class="text-text-muted dark:text-white/70 text-sm leading-relaxed">
          {{ t('about.mission.body') }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex items-start gap-3 p-4 rounded-xl bg-background-light dark:bg-dark-card border border-border-light dark:border-white/5">
            <span class="material-symbols-outlined text-primary mt-0.5">recycling</span>
            <div>
              <p class="font-semibold text-text-main dark:text-white text-sm">{{ t('about.mission.feature1Title') }}</p>
              <p class="text-xs text-text-muted dark:text-white/50">{{ t('about.mission.feature1Sub') }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-4 rounded-xl bg-background-light dark:bg-dark-card border border-border-light dark:border-white/5">
            <span class="material-symbols-outlined text-primary mt-0.5">local_shipping</span>
            <div>
              <p class="font-semibold text-text-main dark:text-white text-sm">{{ t('about.mission.feature2Title') }}</p>
              <p class="text-xs text-text-muted dark:text-white/50">{{ t('about.mission.feature2Sub') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
