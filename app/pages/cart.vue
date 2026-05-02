<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const cart = useCartStore()

const loading = ref(false)
const error = ref<string | null>(null)

useSeoMeta({
  title: 'Cart — èSenza Japan',
})

async function proceedToCheckout() {
  if (cart.items.length === 0) return

  loading.value = true
  error.value = null

  try {
    const { url } = await $fetch<{ url: string }>('/api/checkout', {
      method: 'POST',
      body: {
        locale: locale.value,
        items: cart.items.map((i) => ({
          name: locale.value === 'ja' ? i.product.subTitle : i.product.name,
          price: i.product.price,
          image: i.product.image,
          quantity: i.quantity,
        })),
      },
    })
    window.location.href = url
  } catch {
    error.value = t('cart.checkoutError')
    loading.value = false
  }
}
</script>

<template>
  <div
    class="w-full min-h-screen bg-background-light dark:bg-background-dark py-12 px-4 md:px-10 lg:px-16"
  >
    <div class="max-w-content mx-auto">
      <!-- Header -->
      <h1 class="text-2xl md:text-3xl font-extrabold text-text-main dark:text-white mb-8">
        {{ t('cart.title') }}
      </h1>

      <!-- Empty state -->
      <div
        v-if="cart.items.length === 0"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <span class="material-symbols-outlined text-[64px] text-text-muted dark:text-white/30 mb-4"
          >shopping_bag</span
        >
        <p class="text-lg font-semibold text-text-main dark:text-white mb-2">
          {{ t('cart.empty') }}
        </p>
        <NuxtLink
          :to="localePath('/shop')"
          class="mt-4 px-6 py-3 bg-primary hover:bg-primary-dark text-background-dark font-bold text-sm rounded-xl transition-colors"
        >
          {{ t('cart.continueShopping') }}
        </NuxtLink>
      </div>

      <!-- Cart content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Items list -->
        <div class="lg:col-span-2">
          <div
            class="bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-white/5 px-6"
          >
            <CartItem v-for="item in cart.items" :key="item.product.slug" :item="item" />
          </div>

          <NuxtLink
            :to="localePath('/shop')"
            class="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-text-muted dark:text-white/50 hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            {{ t('cart.continueShopping') }}
          </NuxtLink>
        </div>

        <!-- Order summary -->
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-white/5 p-6 sticky top-28"
          >
            <h2 class="text-lg font-bold text-text-main dark:text-white mb-6">
              {{ t('cart.orderSummary') }}
            </h2>

            <div
              class="flex justify-between items-center py-3 border-b border-border-light dark:border-white/10 text-sm"
            >
              <span class="text-text-muted dark:text-white/60">{{ t('cart.subtotal') }}</span>
              <span class="font-semibold text-text-main dark:text-white"
                >¥{{ cart.total.toLocaleString() }}</span
              >
            </div>
            <div
              class="flex justify-between items-center py-3 border-b border-border-light dark:border-white/10 text-sm"
            >
              <span class="text-text-muted dark:text-white/60">{{ t('cart.shipping') }}</span>
              <span class="font-semibold text-text-main dark:text-white">{{
                t('cart.shippingCalc')
              }}</span>
            </div>
            <div class="flex justify-between items-center pt-4 mt-1">
              <span class="font-bold text-text-main dark:text-white">{{ t('cart.total') }}</span>
              <span class="font-extrabold text-xl text-text-main dark:text-white"
                >¥{{ cart.total.toLocaleString() }}</span
              >
            </div>

            <p v-if="error" class="mt-3 text-xs text-red-500">{{ error }}</p>

            <button
              class="w-full mt-6 py-4 bg-primary hover:bg-primary-dark text-background-dark font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="loading"
              @click="proceedToCheckout"
            >
              <span v-if="loading" class="material-symbols-outlined text-[20px] animate-spin"
                >progress_activity</span
              >
              <span v-else class="material-symbols-outlined text-[20px]">lock</span>
              {{ loading ? t('cart.processing') : t('cart.checkout') }}
            </button>

            <p class="text-xs text-center text-text-muted dark:text-white/40 mt-3">
              {{ t('cart.secureNote') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
