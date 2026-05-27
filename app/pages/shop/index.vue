<script setup lang="ts">
const { t } = useI18n()

const { products } = useProducts()

const activeFilter = ref('all')
const searchQuery = ref('')

const filteredProducts = computed(() => {
  const querySearch = searchQuery.value.trim()
  if (!querySearch) {
    return products.value ?? []
  }

  const regex = new RegExp(querySearch, 'i')
  const all = products.value ?? []

  const titleMatches = all.filter(({ name }) => regex.test(name))
  const titleSlugs = new Set(titleMatches.map(({ slug }) => slug))
  const descMatches = all.filter(
    ({ slug, subTitle }) => !titleSlugs.has(slug) && regex.test(subTitle),
  )

  return [...titleMatches, ...descMatches]
})

useSeoMeta({
  title: 'Shop — èSenza Japan',
  description:
    'Browse all our premium Italian organic jar mixes. Filter by category, vegan, or gluten-free.',
})
</script>

<template>
  <div class="w-full">
    <ShopHero />

    <ShopFilters
      :active-filter="activeFilter"
      :product-count="filteredProducts.length"
      @filter-change="(f) => (activeFilter = f)"
      @search-change="(q) => (searchQuery = q)"
    />

    <!-- Product grid -->
    <section
      class="w-full py-12 px-4 md:px-10 lg:px-16 bg-background-light dark:bg-background-dark"
    >
      <div class="max-w-wide mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="p in filteredProducts" :key="p.slug" :product="p" variant="full" />
        </div>
      </div>
    </section>

    <NewsletterSection
      :title="t('shop.newsletter.title')"
      :subtitle="t('shop.newsletter.subtitle')"
    />
  </div>
</template>
