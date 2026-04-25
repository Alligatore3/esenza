<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="w-full bg-white dark:bg-surface-dark py-16 md:py-24 px-4 md:px-10 lg:px-16">
    <div class="max-w-wide mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white mb-2">
          {{ t('howItWorks.shipping.title') }}
        </h2>
        <p class="text-text-muted dark:text-white/60 text-sm">{{ t('howItWorks.shipping.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <!-- Shipping zones -->
        <div class="p-6 md:p-8 rounded-2xl bg-background-light dark:bg-dark-card border border-border-light dark:border-white/5">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
            </div>
            <div>
              <p class="font-semibold text-text-main dark:text-white text-sm">{{ t('howItWorks.shipping.zonesTitle') }}</p>
              <p class="text-xs text-text-muted dark:text-white/50">{{ t('howItWorks.shipping.zonesTitleJa') }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <div
              v-for="n in [1, 2, 3]"
              :key="n"
              class="flex items-center justify-between py-2.5 border-b border-border-light dark:border-white/5 last:border-0"
            >
              <span class="text-sm text-text-main dark:text-white">{{ t(`howItWorks.shipping.zone${n}Area`) }}</span>
              <span class="text-sm font-semibold text-primary">{{ t(`howItWorks.shipping.zone${n}Time`) }}</span>
            </div>
          </div>
        </div>

        <!-- Temperature control -->
        <div class="p-6 md:p-8 rounded-2xl bg-background-light dark:bg-dark-card border border-border-light dark:border-white/5">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-[20px]">ac_unit</span>
            </div>
            <div>
              <p class="font-semibold text-text-main dark:text-white text-sm">{{ t('howItWorks.shipping.tempTitle') }}</p>
              <p class="text-xs text-text-muted dark:text-white/50">{{ t('howItWorks.shipping.tempTitleJa') }}</p>
            </div>
          </div>
          <p class="text-sm text-text-muted dark:text-white/70 leading-relaxed">
            {{ t('howItWorks.shipping.tempBody') }}
          </p>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <NuxtLink
          :to="localePath('/shop')"
          class="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-background-dark font-bold rounded-xl transition-colors duration-200"
        >
          {{ t('howItWorks.shipping.cta') }}
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
