<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
  variant?: 'simple' | 'full'
}>()

const localePath = useLocalePath()
const cart = useCartStore()

const badgeClass = computed(() => {
  if (props.product.badgeColor === 'yellow')
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
  if (props.product.badgeColor === 'white') return 'bg-white/90 text-text-main'
  return 'bg-primary/10 text-green-800 dark:bg-primary/20 dark:text-primary'
})

const formattedPrice = computed(() => `¥${props.product.price.toLocaleString()}`)
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
      <!-- Badge -->
      <span
        v-if="product.badge"
        class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
        :class="badgeClass"
      >
        {{ product.badge }}
      </span>
      <!-- Add to cart hover overlay -->
      <button
        class="absolute bottom-3 left-3 right-3 py-2.5 bg-background-dark/90 hover:bg-primary text-white hover:text-background-dark text-sm font-semibold rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        @click.prevent="cart.add(product)"
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
        <p class="text-xs text-text-muted dark:text-white/50 mt-0.5">{{ product.subTitle }}</p>
      </NuxtLink>

      <div class="flex items-center justify-between mt-2">
        <span class="font-bold text-text-main dark:text-white">{{ formattedPrice }}</span>
        <span
          v-if="product.shortDescription"
          class="text-xs text-text-muted dark:text-white/50 truncate ml-2"
        >
          {{ product.shortDescription }}
        </span>
      </div>

      <!-- Extended info for shop variant -->
      <template v-if="variant === 'full'">
        <p class="text-sm text-text-muted dark:text-white/60 mt-1 line-clamp-2">
          {{ product.description }}
        </p>
        <div v-if="product.tags.length" class="flex flex-wrap gap-1.5 mt-2">
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="text-xs px-2 py-0.5 rounded-full bg-background-light dark:bg-surface-dark text-text-muted dark:text-white/50"
          >
            {{ tag }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
