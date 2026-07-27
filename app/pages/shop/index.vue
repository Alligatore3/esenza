<script setup lang="ts">
const { t } = useI18n()

const { products } = useProducts()

const activeFilter = ref('all')

const searchQuery = ref('')

const onCardEnter = (el: Element) => {
  const i = parseInt((el as HTMLElement).dataset.index ?? '0')
  ;(el as HTMLElement).style.transitionDelay = `${i * 50}ms`
}

const onCardLeave = (el: Element) => {
  ;(el as HTMLElement).style.transitionDelay = '0ms'
}

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
  title: 'Shop — èSenza',
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
        <TransitionGroup
          tag="div"
          name="product"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          @enter="onCardEnter"
          @leave="onCardLeave"
        >
          <ProductCard
            v-for="(p, i) in filteredProducts"
            :key="p.slug"
            :data-index="i"
            :product="p"
            variant="full"
          />
        </TransitionGroup>

        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <p>
            {{ t('shop.emptySearch') }}
          </p>
          <span class="material-symbols-outlined mt-2"> search_off </span>
        </div>
      </div>
    </section>

    <NewsletterSection
      :title="t('shop.newsletter.title')"
      :subtitle="t('shop.newsletter.subtitle')"
    />
  </div>
</template>

<style scoped>
.product-enter-active,
.product-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.product-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.product-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
