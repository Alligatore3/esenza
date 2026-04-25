import { products } from '~/data/products'
import type { Product } from '~/data/products'

export const useProducts = () => {
  const getAll = (): Product[] => products

  const getFeatured = (limit?: number): Product[] => {
    const featured = products.filter((p) => p.featured)
    return limit ? featured.slice(0, limit) : featured
  }

  const getBySlug = (slug: string): Product | undefined =>
    products.find((p) => p.slug === slug)

  const filterProducts = (filter: string): Product[] => {
    switch (filter) {
      case 'sweet': return products.filter((p) => p.category === 'sweet')
      case 'savory': return products.filter((p) => p.category === 'savory')
      case 'vegan': return products.filter((p) => p.isVegan)
      case 'gf': return products.filter((p) => p.isGlutenFree)
      default: return getAll()
    }
  }

  return { getAll, getFeatured, getBySlug, filterProducts }
}
