<script setup lang="ts">
import type { Product } from '~/types/product'

const { t } = useI18n()

const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const quantity = ref(1)

const activeTab = ref<'description' | 'nutrition' | 'reviews'>('description')

const formattedPrice = computed(() => `¥${props.product.price.toLocaleString()}`)

const increment = () => { quantity.value++ }

const decrement = () => { if (quantity.value > 1) quantity.value-- }

const addToCart = () => cart.add(props.product, quantity.value)
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-text-main dark:text-white leading-tight">
        {{ product.name }}
      </h1>
      <p class="text-text-muted dark:text-white/50 mt-1 text-sm">{{ product.nameJa }}</p>
    </div>

    <!-- Price -->
    <div>
      <span class="text-3xl font-extrabold text-text-main dark:text-white">{{ formattedPrice }}</span>
      <span class="text-xs text-text-muted dark:text-white/50 ml-2">{{ t('product.taxNote') }}</span>
    </div>

    <!-- Description -->
    <p class="text-sm text-text-muted dark:text-white/70 leading-relaxed">{{ product.description }}</p>

    <!-- Quantity + Add to Cart -->
    <div class="flex flex-col gap-3">
      <!-- Quantity selector -->
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-text-main dark:text-white/80 w-16">Qty</span>
        <div class="flex items-center border border-border-soft dark:border-white/20 rounded-xl overflow-hidden">
          <button
            class="w-10 h-10 flex items-center justify-center hover:bg-background-light dark:hover:bg-surface-dark text-text-main dark:text-white transition-colors"
            @click="decrement"
          >
            <span class="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <span class="w-10 text-center text-sm font-semibold text-text-main dark:text-white">{{ quantity }}</span>
          <button
            class="w-10 h-10 flex items-center justify-center hover:bg-background-light dark:hover:bg-surface-dark text-text-main dark:text-white transition-colors"
            @click="increment"
          >
            <span class="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>

      <!-- Add to cart -->
      <button
        class="w-full py-4 bg-primary hover:bg-primary-dark text-background-dark font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
        @click="addToCart"
      >
        <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
        {{ t('product.addToCart') }}
      </button>
    </div>

    <!-- How to prepare -->
    <div class="p-5 rounded-2xl bg-background-light dark:bg-dark-card border border-border-light dark:border-white/5">
      <p class="text-sm font-semibold text-text-main dark:text-white mb-1">{{ t('product.howToPrepare') }}</p>
      <p class="text-xs text-text-muted dark:text-white/50 mb-5">{{ t('product.howToPrepareJa') }}</p>

      <div class="flex items-center gap-0">
        <template v-for="(step, i) in product.prepSteps" :key="step.icon">
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-[20px]">{{ step.icon }}</span>
            </div>
            <span class="text-xs font-medium text-text-main dark:text-white text-center">{{ step.label }}</span>
            <span class="text-xs text-text-muted dark:text-white/50 text-center">{{ step.labelJa }}</span>
          </div>
          <div
            v-if="i < product.prepSteps.length - 1"
            class="flex-1 h-px border-t-2 border-dashed border-border-soft dark:border-white/20 mb-8"
          ></div>
        </template>
      </div>
    </div>

    <!-- Sustainability badge -->
    <div class="flex items-start gap-3 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
      <span class="material-symbols-outlined text-primary mt-0.5">recycling</span>
      <div>
        <p class="text-sm font-semibold text-text-main dark:text-white">{{ t('product.sustainabilityTitle') }}</p>
        <p class="text-xs text-text-muted dark:text-white/60 mt-0.5 leading-relaxed">{{ t('product.sustainabilityBody') }}</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border border-border-soft dark:border-white/10 rounded-2xl overflow-hidden">
      <div class="flex border-b border-border-soft dark:border-white/10">
        <button
          v-for="tab in ['description', 'nutrition', 'reviews'] as const"
          :key="tab"
          class="flex-1 py-3 text-xs font-semibold transition-colors duration-200"
          :class="activeTab === tab
            ? 'text-primary border-b-2 border-primary -mb-px bg-white dark:bg-surface-dark'
            : 'text-text-muted dark:text-white/50 hover:text-primary'"
          @click="activeTab = tab"
        >
          {{ t(`product.tabs.${tab}`) }}
          <template v-if="tab === 'reviews'"> (24)</template>
        </button>
      </div>
      <div class="p-5 text-sm text-text-muted dark:text-white/70 leading-relaxed">
        <template v-if="activeTab === 'description'">
          {{ product.description }}<br /><br />
          <span class="text-xs">{{ t('product.storageNote') }}</span>
        </template>
        <template v-else-if="activeTab === 'nutrition'">
          <p>Nutrition facts information will be available soon.</p>
        </template>
        <template v-else>
          <p>Customer reviews coming soon.</p>
        </template>
      </div>
    </div>
  </div>
</template>
