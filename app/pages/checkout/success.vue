<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const cart = useCartStore()

useSeoMeta({ title: 'Order Confirmed — èSenza Japan' })

// Clear cart once the success page loads
onMounted(() => cart.clear())
</script>

<template>
  <div class="w-full min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4 py-16">
    <div class="max-w-md w-full text-center">
      <!-- Success icon -->
      <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <span class="material-symbols-outlined text-primary text-[40px]">check_circle</span>
      </div>

      <h1 class="text-2xl md:text-3xl font-extrabold text-text-main dark:text-white mb-3">
        {{ t('checkout.success.title') }}
      </h1>
      <p class="text-text-muted dark:text-white/60 text-sm leading-relaxed mb-8">
        {{ t('checkout.success.message') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink
          :to="localePath('/shop')"
          class="px-6 py-3 bg-primary hover:bg-primary-dark text-background-dark font-bold text-sm rounded-xl transition-colors"
        >
          {{ t('cart.continueShopping') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/')"
          class="px-6 py-3 border-2 border-border-soft dark:border-white/20 text-text-main dark:text-white font-medium text-sm rounded-xl hover:border-primary hover:text-primary transition-colors"
        >
          {{ t('common.backToHome') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
