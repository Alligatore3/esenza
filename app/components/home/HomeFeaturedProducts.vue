<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { getFeatured } = useProducts()
const featured = getFeatured(6)
</script>

<template>
  <section class="w-full bg-background-light dark:bg-background-dark py-16 px-4 md:px-10 lg:px-16">
    <div class="max-w-wide mx-auto">
      <!-- Header -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white">
            {{ t('home.products.title') }}
          </h2>
          <p class="text-text-muted dark:text-white/60 text-sm mt-1">{{ t('home.products.subtitle') }}</p>
        </div>
        <NuxtLink
          :to="localePath('/shop')"
          class="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          {{ t('home.products.viewAll') }}
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </NuxtLink>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <ProductCard
          v-for="p in featured"
          :key="p.slug"
          :product="p"
        />
      </div>

      <!-- Mobile view all -->
      <div class="flex justify-center mt-8 sm:hidden">
        <NuxtLink
          :to="localePath('/shop')"
          class="px-6 py-3 border-2 border-primary text-primary font-bold text-sm rounded-xl hover:bg-primary hover:text-background-dark transition-all duration-200"
        >
          {{ t('home.products.viewAll') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
