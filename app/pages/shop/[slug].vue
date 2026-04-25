<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { getBySlug } = useProducts()

const slug = route.params.slug as string
const product = getBySlug(slug)

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const activeImage = ref(0)

useSeoMeta({
  title: `${product.name} — èSenza Japan`,
  description: product.description,
})
</script>

<template>
  <div class="w-full bg-background-light dark:bg-background-dark min-h-screen">
    <div class="max-w-wide mx-auto px-4 md:px-10 lg:px-16 py-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-8">
        <NuxtLink :to="localePath('/')" class="text-text-muted dark:text-white/50 hover:text-primary transition-colors">
          {{ t('product.breadcrumb.home') }}
        </NuxtLink>
        <span class="text-text-muted dark:text-white/30">/</span>
        <NuxtLink :to="localePath('/shop')" class="text-text-muted dark:text-white/50 hover:text-primary transition-colors">
          {{ t('product.breadcrumb.shop') }}
        </NuxtLink>
        <span class="text-text-muted dark:text-white/30">/</span>
        <span class="text-text-main dark:text-white font-medium">{{ product.name }}</span>
      </nav>

      <!-- Main grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <!-- Left: Image gallery (7 cols) -->
        <div class="lg:col-span-7 flex flex-col gap-4 lg:sticky lg:top-28">
          <!-- Main image -->
          <div class="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark relative">
            <img
              :src="product.images[activeImage]"
              :alt="product.imageAlt"
              class="w-full h-full object-cover"
            />
            <!-- Organic badge -->
            <span
              v-if="product.badge"
              class="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-green-800 dark:bg-primary/20 dark:text-primary"
            >
              {{ product.badge }}
            </span>
          </div>

          <!-- Thumbnails -->
          <div v-if="product.images.length > 1" class="grid grid-cols-3 gap-3">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              class="aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200"
              :class="activeImage === i ? 'border-primary' : 'border-transparent hover:border-border-soft dark:hover:border-white/20'"
              @click="activeImage = i"
            >
              <img :src="img" :alt="`${product.name} view ${i + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Right: Product detail (5 cols) -->
        <div class="lg:col-span-5">
          <ProductDetail :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>
