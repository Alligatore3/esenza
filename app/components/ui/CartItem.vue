<script setup lang="ts">
import type { CartItem } from '~/stores/cart'

const props = defineProps<{ item: CartItem }>()

const cart = useCartStore()
const localePath = useLocalePath()

const formattedPrice = computed(
  () => `¥${(props.item.product.price * props.item.quantity).toLocaleString()}`,
)
</script>

<template>
  <div class="flex items-center gap-4 py-4 border-b border-border-light dark:border-white/10">
    <!-- Product image -->
    <NuxtLink
      :to="localePath(`/shop/${item.product.slug}`)"
      class="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-surface-light dark:bg-surface-dark"
    >
      <img
        :src="item.product.image"
        :alt="item.product.imageAlt"
        class="w-full h-full object-cover"
      />
    </NuxtLink>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <NuxtLink :to="localePath(`/shop/${item.product.slug}`)">
        <p
          class="font-semibold text-text-main dark:text-white text-sm leading-snug hover:text-primary transition-colors truncate"
        >
          {{ item.product.name }}
        </p>
        <p class="text-xs text-text-muted dark:text-white/50">{{ item.product.subTitle }}</p>
      </NuxtLink>
      <p class="text-xs text-text-muted dark:text-white/50 mt-0.5">
        ¥{{ item.product.price.toLocaleString() }} × {{ item.quantity }}
      </p>
    </div>

    <!-- Qty controls -->
    <div
      class="flex items-center border border-border-soft dark:border-white/20 rounded-xl overflow-hidden"
    >
      <button
        class="w-8 h-8 flex items-center justify-center hover:bg-background-light dark:hover:bg-surface-dark text-text-main dark:text-white transition-colors"
        @click="cart.updateQty(item.product.slug, item.quantity - 1)"
      >
        <span class="material-symbols-outlined text-[16px]">remove</span>
      </button>
      <span class="w-8 text-center text-sm font-semibold text-text-main dark:text-white">{{
        item.quantity
      }}</span>
      <button
        class="w-8 h-8 flex items-center justify-center hover:bg-background-light dark:hover:bg-surface-dark text-text-main dark:text-white transition-colors"
        @click="cart.updateQty(item.product.slug, item.quantity + 1)"
      >
        <span class="material-symbols-outlined text-[16px]">add</span>
      </button>
    </div>

    <!-- Line price -->
    <p class="w-20 text-right font-bold text-text-main dark:text-white text-sm flex-shrink-0">
      {{ formattedPrice }}
    </p>

    <!-- Remove -->
    <button
      class="p-1.5 rounded-lg text-text-muted dark:text-white/40 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      @click="cart.remove(item.product.slug)"
    >
      <span class="material-symbols-outlined text-[18px]">delete</span>
    </button>
  </div>
</template>
