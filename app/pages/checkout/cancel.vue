<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: 'Payment Cancelled — èSenza Japan' })
</script>

<template>
  <div class="w-full min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4 py-16">
    <div class="max-w-md w-full text-center">
      <!-- Cancel icon -->
      <div class="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mx-auto mb-6">
        <span class="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-[40px]">cancel</span>
      </div>

      <h1 class="text-2xl md:text-3xl font-extrabold text-text-main dark:text-white mb-3">
        {{ t('checkout.cancel.title') }}
      </h1>
      <p class="text-text-muted dark:text-white/60 text-sm leading-relaxed mb-8">
        {{ t('checkout.cancel.message') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink
          :to="localePath('/cart')"
          class="px-6 py-3 bg-primary hover:bg-primary-dark text-background-dark font-bold text-sm rounded-xl transition-colors"
        >
          {{ t('cart.backToCart') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/shop')"
          class="px-6 py-3 border-2 border-border-soft dark:border-white/20 text-text-main dark:text-white font-medium text-sm rounded-xl hover:border-primary hover:text-primary transition-colors"
        >
          {{ t('cart.continueShopping') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
