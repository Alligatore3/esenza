import type { Product, PrepStep } from '~/types/product'

const DEFAULT_EMPTY_PRODUCTS: Product[] = []

// DatoCMS GraphQL query — fetches all locales in one request.
// Field names match the DatoCMS model described in the project plan.
// Run this in the DatoCMS GraphQL playground to verify: https://cda-explorer.datocms.com/
// Minimal model: title, description, image.
// Slug is derived from the title (kebab-case) since the model has no slug field yet.
const PRODUCTS_QUERY = `
  query AllProducts {
    allProducts(orderBy: _createdAt_ASC, first: 100) {
      id
      title
      subtitle
      description { value }
      image { url alt }
    }
  }
`

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

// Extracts plain text from a DatoCMS Structured Text DAST node.
// DAST = { schema, document: { type: 'root', children: [...] } } — children may be
// paragraphs, headings, lists, etc., each with nested children whose leaf nodes have `value`.
const dastToPlainText = (dast: unknown): string => {
  if (!dast || typeof dast !== 'object') return ''
  const node = dast as Record<string, any>
  if (typeof node.value === 'string') return node.value
  const children = node.document?.children ?? node.children
  if (!Array.isArray(children)) return ''
  return children.map(dastToPlainText).join(' ').replace(/\s+/g, ' ').trim()
}

const mapProduct = (raw: Record<string, any>): Product => {
  const title = raw.title ?? ''
  const subTitle = raw.subtitle ?? ''
  const description = dastToPlainText(raw.description?.value)

  return {
    slug: slugify(title) || raw.id,
    name: title,
    subTitle,
    price: 0,
    image: raw.image?.url ?? '',
    images: raw.image?.url ? [raw.image.url] : [],
    imageAlt: raw.image?.alt ?? title,
    badge: null,
    badgeColor: null,
    shortDescription: description,
    shortDescriptionJa: description,
    description,
    descriptionJa: description,
    tags: [],
    category: 'savory',
    isVegan: false,
    isGlutenFree: false,
    featured: true,
    prepSteps: [] as PrepStep[],
  }
}

export const useProducts = () => {
  const {
    public: { datocmsToken },
  } = useRuntimeConfig()

  // When no token is set (local dev without DatoCMS), static data is used.
  // Once NUXT_PUBLIC_DATOCMS_TOKEN is set, data is fetched from DatoCMS.
  const { data: products } = useAsyncData<Product[]>(
    'products',
    async () => {
      if (!datocmsToken) return DEFAULT_EMPTY_PRODUCTS

      try {
        const res = await $fetch<{
          data?: { allProducts: Record<string, any>[] }
          errors?: { message: string; extensions?: unknown }[]
        }>('https://graphql.datocms.com/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${datocmsToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: PRODUCTS_QUERY }),
        })
        if (res.errors?.length) {
          console.warn('[useProducts] DatoCMS GraphQL errors:', JSON.stringify(res.errors, null, 2))
          return DEFAULT_EMPTY_PRODUCTS
        }
        if (!res.data?.allProducts) {
          console.warn(
            '[useProducts] DatoCMS unexpected response shape:',
            JSON.stringify(res, null, 2),
          )
          return DEFAULT_EMPTY_PRODUCTS
        }
        return res.data.allProducts.map(mapProduct)
      } catch (err) {
        console.warn('[useProducts] DatoCMS fetch failed, falling back to static data:', err)
        return DEFAULT_EMPTY_PRODUCTS
      }
    },
    { default: () => DEFAULT_EMPTY_PRODUCTS },
  )

  const getAll = (): Product[] => products.value ?? []

  const getFeatured = (limit?: number): Product[] => {
    const featured = getAll().filter((p) => p.featured)
    return limit ? featured.slice(0, limit) : featured
  }

  const getBySlug = (slug: string): Product | undefined => getAll().find((p) => p.slug === slug)

  const filterProducts = (filter: string): Product[] => {
    const all = getAll()
    switch (filter) {
      case 'sweet':
        return all.filter((p) => p.category === 'sweet')
      case 'savory':
        return all.filter((p) => p.category === 'savory')
      case 'vegan':
        return all.filter((p) => p.isVegan)
      case 'gf':
        return all.filter((p) => p.isGlutenFree)
      default:
        return all
    }
  }

  return { products, getAll, getFeatured, getBySlug, filterProducts }
}
