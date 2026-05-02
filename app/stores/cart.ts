import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  // Cookie-based persistence — works on SSR and client without extra packages
  const cookie = useCookie<CartItem[]>('esenza-cart', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const items = ref<CartItem[]>(cookie.value)

  // Keep cookie in sync whenever items change
  watch(
    items,
    (v) => {
      cookie.value = v
    },
    { deep: true },
  )

  const count = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  )

  function add(product: Product, qty = 1) {
    const existing = items.value.find((i) => i.product.slug === product.slug)

    if (existing) {
      existing.quantity += qty
    } else {
      items.value.push({ product, quantity: qty })
    }
  }

  const remove = (slug: string) => {
    items.value = items.value.filter(({ product }) => product.slug !== slug)
  }

  const updateQty = (slug: string, qty: number) => {
    if (qty <= 0) {
      remove(slug)
      return
    }

    const item = items.value.find(({ product }) => product.slug === slug)
    if (item) item.quantity = qty
  }

  const clear = () => {
    items.value = []
  }

  return { items, count, total, add, remove, updateQty, clear }
})
