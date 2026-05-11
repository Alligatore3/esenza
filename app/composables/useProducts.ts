import type { Product } from '~/types/product'

import { dastToHtml } from '~/utils/dastToHtml'

import { PRODUCTS_QUERY } from '~/gql/PRODUCTS_QUERY'

import { DATO_LOCALE_MAP } from '~/constants/DATO_LOCALE_MAP'

const DEFAULT_EMPTY_PRODUCTS: Product[] = []

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const mapProduct = (raw: Record<string, any>): Product => {
  const images: { url: string; alt: string | null }[] = raw.galleryimages ?? []
  const howToPrepare = dastToHtml(raw.howtoprepare?.value)
  const description = dastToHtml(raw.description?.value)
  const tips = dastToHtml(raw.tips?.value)
  const subTitle = raw.subtitle ?? ''
  const title = raw.title ?? ''
  const slugSource = raw.slugTitle ?? title
  const price = raw.price ?? 0

  return {
    imageAlt: raw.primaryimage?.alt ?? title,
    image: raw.primaryimage?.url ?? '',
    slug: slugify(slugSource) || raw.id,
    howToPrepare,
    name: title,
    description,
    subTitle,
    images,
    price,
    tips,
  }
}

export const useProducts = () => {
  const { locale } = useI18n()

  const {
    public: { datocmsToken },
  } = useRuntimeConfig()

  const datoLocale = computed(() => DATO_LOCALE_MAP[locale.value] ?? 'en')

  // When no token is set (local dev without DatoCMS), static data is used.
  // Once NUXT_PUBLIC_DATOCMS_TOKEN is set, data is fetched from DatoCMS.
  // The reactive key causes Nuxt to re-fetch automatically on locale change.
  const { data: products } = useAsyncData<Product[]>(
    () => `products-${datoLocale.value}`,
    async () => {
      if (!datocmsToken) {
        return DEFAULT_EMPTY_PRODUCTS
      }

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
          body: JSON.stringify({ query: PRODUCTS_QUERY, variables: { locale: datoLocale.value } }),
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
    const featured = getAll()
    return limit ? featured.slice(0, limit) : featured
  }

  const getBySlug = (slug: string): Product | undefined => getAll().find((p) => p.slug === slug)

  // @todo: not working
  const filterProducts = (): Product[] => {
    const all = getAll()
    return all
  }

  return { products, getAll, getFeatured, getBySlug, filterProducts }
}
