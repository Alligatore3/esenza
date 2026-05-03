<script setup lang="ts">
import type { Product } from '~/types/product'

import type { ProductImage } from '~/types/productImage'

const props = defineProps<{ product: Product }>()

const activeImage = ref(0)

const defaultImage = computed<ProductImage>(() => ({
  alt: props.product.imageAlt,
  url: props.product.image,
}))

const currentPrimaryImage = ref<ProductImage>(defaultImage.value)

const galleryImages = computed<ProductImage[]>(() => [defaultImage.value, ...props.product.images])

const changeImage = (image: ProductImage) => (currentPrimaryImage.value = image)
</script>

<template>
  <!-- Left: Image gallery (7 cols) -->
  <div class="lg:col-span-7 flex flex-col gap-4 lg:sticky lg:top-28">
    <!-- Main image -->
    <div
      class="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark relative"
    >
      <img
        class="w-full h-full object-cover"
        :alt="currentPrimaryImage.alt ?? ''"
        :src="currentPrimaryImage.url"
      />
    </div>

    <!-- Thumbnails -->
    <div v-if="galleryImages.length >= 1" class="grid grid-cols-3 gap-3">
      <button
        v-for="(image, i) in galleryImages"
        :key="i"
        @click.prevent="() => changeImage(image)"
        class="aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200"
        :class="
          activeImage === i
            ? 'border-primary'
            : 'border-transparent hover:border-border-soft dark:hover:border-white/20'
        "
        @click="activeImage = i"
      >
        <img
          :src="image.url"
          :alt="`${image.alt} view ${i + 1}`"
          class="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>
