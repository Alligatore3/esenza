import { products as staticProducts } from '~/data/products'
import type { Product, PrepStep } from '~/types/product'

// DatoCMS GraphQL query — fetches all locales in one request.
// Field names match the DatoCMS model described in the project plan.
// Run this in the DatoCMS GraphQL playground to verify: https://cda-explorer.datocms.com/
const PRODUCTS_QUERY = `
  query AllProducts {
    allProducts(orderBy: _createdAt_ASC, first: 100) {
      slug
      price
      badge
      badgeColor
      category
      isVegan
      isGlutenFree
      featured
      tags
      image { url alt }
      gallery { url alt }
      _allNameLocales { locale value }
      _allShortDescriptionLocales { locale value }
      _allDescriptionLocales { locale value }
      prepSteps {
        icon
        _allLabelLocales { locale value }
      }
    }
  }
`

type LocaleValue = { locale: string; value: string }

const localeVal = (arr: LocaleValue[] | undefined, lang: string): string =>
  arr?.find((l) => l.locale === lang)?.value ?? ''

const mapProduct = (raw: Record<string, any>): Product => ({
  slug: raw.slug,
  name: localeVal(raw._allNameLocales, 'en'),
  nameJa: localeVal(raw._allNameLocales, 'ja'),
  price: raw.price,
  image: raw.image?.url ?? '',
  images: raw.gallery?.map((g: { url: string }) => g.url) ?? [],
  imageAlt: raw.image?.alt ?? '',
  badge: raw.badge ?? null,
  badgeColor: raw.badgeColor ?? null,
  shortDescription: localeVal(raw._allShortDescriptionLocales, 'en'),
  shortDescriptionJa: localeVal(raw._allShortDescriptionLocales, 'ja'),
  description: localeVal(raw._allDescriptionLocales, 'en'),
  descriptionJa: localeVal(raw._allDescriptionLocales, 'ja'),
  tags: raw.tags ?? [],
  category: raw.category,
  isVegan: raw.isVegan,
  isGlutenFree: raw.isGlutenFree,
  featured: raw.featured,
  prepSteps: raw.prepSteps?.map((s: Record<string, any>): PrepStep => ({
    icon: s.icon,
    label: localeVal(s._allLabelLocales, 'en'),
    labelJa: localeVal(s._allLabelLocales, 'ja'),
  })) ?? [],
})

export const useProducts = () => {
  const { public: { datocmsToken } } = useRuntimeConfig()

  // When no token is set (local dev without DatoCMS), static data is used.
  // Once NUXT_PUBLIC_DATOCMS_TOKEN is set, data is fetched from DatoCMS.
  const { data: products } = useAsyncData<Product[]>('products', async () => {
    if (!datocmsToken) return staticProducts as Product[]

    try {
      const res = await $fetch<{ data: { allProducts: Record<string, any>[] } }>(
        'https://graphql.datocms.com/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${datocmsToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: PRODUCTS_QUERY }),
        },
      )
      return res.data.allProducts.map(mapProduct)
    } catch (err) {
      console.warn('[useProducts] DatoCMS fetch failed, falling back to static data:', err)
      return staticProducts as Product[]
    }
  }, { default: () => staticProducts as Product[] })

  const getAll = (): Product[] => products.value ?? []

  const getFeatured = (limit?: number): Product[] => {
    const featured = getAll().filter((p) => p.featured)
    return limit ? featured.slice(0, limit) : featured
  }

  const getBySlug = (slug: string): Product | undefined =>
    getAll().find((p) => p.slug === slug)

  const filterProducts = (filter: string): Product[] => {
    const all = getAll()
    switch (filter) {
      case 'sweet': return all.filter((p) => p.category === 'sweet')
      case 'savory': return all.filter((p) => p.category === 'savory')
      case 'vegan': return all.filter((p) => p.isVegan)
      case 'gf': return all.filter((p) => p.isGlutenFree)
      default: return all
    }
  }

  return { products, getAll, getFeatured, getBySlug, filterProducts }
}
