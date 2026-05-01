<script setup lang="ts">
const { t } = useI18n()

const  { filterProducts } = useProducts()

const activeFilter = ref('all')

const products = computed(() => filterProducts(activeFilter.value))

useSeoMeta({
  title: 'Shop — èSenza Japan',
  description: 'Browse all our premium Italian organic jar mixes. Filter by category, vegan, or gluten-free.',
})
</script>

<template>
  <div class="w-full">
    <ShopHero />

    <ShopFilters
      :active-filter="activeFilter"
      :product-count="products.length"
      @filter-change="(f) => activeFilter = f"
    />

    <!-- Product grid -->
    <section class="w-full py-12 px-4 md:px-10 lg:px-16 bg-background-light dark:bg-background-dark">
      <div class="max-w-wide mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="p in products"
            :key="p.slug"
            :product="p"
            variant="full"
          />
        </div>

        <!-- Load more -->
        <div class="flex justify-center mt-12">
          <button
            class="flex items-center gap-2 px-6 py-3 border-2 border-border-soft dark:border-white/20 text-text-main dark:text-white font-medium text-sm rounded-xl hover:border-primary hover:text-primary transition-all duration-200"
          >
            {{ t('shop.loadMore') }}
            <span class="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
      </div>
    </section>

    <NewsletterSection
      :title="t('shop.newsletter.title')"
      :subtitle="t('shop.newsletter.subtitle')"
    />
  </div>
</template>
