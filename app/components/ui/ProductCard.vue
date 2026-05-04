<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
  variant?: 'simple' | 'full'
}>()

const { t } = useI18n()

const cart = useCartStore()

const localePath = useLocalePath()

const notificationsStore = useNotificationsStore()

const formattedPrice = computed(() => `¥${props.product.price.toLocaleString()}`)

const addToProduct = (product: Product) => {
  cart.add(product)

  notificationsStore.add('success', t('cart.productAdded'), {
    position: 'top-right',
  })
}
</script>

<template>
  <div
    class="group relative flex flex-col bg-surface-light dark:bg-dark-card-alt rounded-2xl overflow-hidden border border-border-light dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-300"
  >
    <!-- Image -->
    <NuxtLink
      :to="localePath(`/shop/${product.slug}`)"
      class="block relative overflow-hidden aspect-[4/5]"
    >
      <img
        :src="product.image"
        :alt="product.imageAlt"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <!-- Add to cart hover overlay -->
      <button
        class="absolute bottom-3 left-3 right-3 py-2.5 bg-background-dark/90 hover:bg-primary text-white hover:text-background-dark text-sm font-semibold rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        @click.prevent="() => addToProduct(product)"
      >
        <span class="material-symbols-outlined text-[18px] align-middle mr-1"
          >add_shopping_cart</span
        >
        Add to Cart
      </button>
    </NuxtLink>

    <!-- Info -->
    <div class="p-4 flex flex-col gap-1">
      <NuxtLink :to="localePath(`/shop/${product.slug}`)">
        <h3
          class="font-semibold text-text-main dark:text-white leading-snug hover:text-primary transition-colors"
        >
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="flex items-center justify-between mt-2 gap-3">
        <span class="font-bold text-text-main dark:text-white">{{ formattedPrice }}</span>

        <p
          class="text-xs text-text-muted dark:text-white/50 mt-0.5"
          :class="variant !== 'full' ? 'line-clamp-2' : ''"
        >
          {{ product.subTitle }}
        </p>
      </div>
    </div>
  </div>
</template>
