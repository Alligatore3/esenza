<script setup lang="ts">
const { t } = useI18n()

const route = useRoute()

const localePath = useLocalePath()

const { products, getBySlug } = useProducts()

const slug = route.params.slug as string

const product = computed(() => getBySlug(slug))

// Throw 404 only once products have actually loaded — otherwise we'd 404
// on the initial synchronous render before useAsyncData resolves.
watchEffect(() => {
  if (products.value && products.value.length > 0 && !product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
})

useSeoMeta({
  title: () => (product.value ? `${product.value.name} — èSenza Japan` : 'èSenza Japan'),
  description: () => product.value?.description ?? '',
})
</script>

<template>
  <div class="w-full bg-background-light dark:bg-background-dark min-h-screen">
    <div v-if="product" class="max-w-wide mx-auto px-4 md:px-10 lg:px-16 py-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-8">
        <NuxtLink
          :to="localePath('/')"
          class="text-text-muted dark:text-white/50 hover:text-primary transition-colors"
        >
          {{ t('product.breadcrumb.home') }}
        </NuxtLink>
        <span class="text-text-muted dark:text-white/30">/</span>
        <NuxtLink
          :to="localePath('/shop')"
          class="text-text-muted dark:text-white/50 hover:text-primary transition-colors"
        >
          {{ t('product.breadcrumb.shop') }}
        </NuxtLink>
        <span class="text-text-muted dark:text-white/30">/</span>
        <span class="text-text-main dark:text-white font-medium">{{ product.name }}</span>
      </nav>

      <!-- Main grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <ProductDetailImageWithGallery :product="product" />

        <!-- Right: Product detail (5 cols) -->
        <div class="lg:col-span-5">
          <ProductDetail :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>
