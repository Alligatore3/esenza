import type { Product } from '~/types/product'

const DEFAULT_EMPTY_PRODUCTS: Product[] = []

// Maps Nuxt i18n locale codes to DatoCMS locale identifiers.
const DATO_LOCALE_MAP: Record<string, string> = {
  en: 'en',
  ja: 'japa',
}

// Accepts a $locale variable so DatoCMS returns each text field in the
// requested language. `slugTitle` always fetches the English title so that
// URL slugs remain stable across locales.
const PRODUCTS_QUERY = `
  query AllProducts($locale: SiteLocale!) {
    allProducts(orderBy: _createdAt_ASC, first: 100) {
      id
      slugTitle: title(locale: en)
      title(locale: $locale)
      subtitle(locale: $locale)
      description(locale: $locale) { value }
      howtoprepare(locale: $locale) { value }
      tips(locale: $locale) { value }
      primaryimage { url alt }
      galleryimages { url alt }
    }
  }
`

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

// Renders a DatoCMS Structured Text DAST node tree to an HTML string suitable
// for `v-html`. DAST = { schema, document: { type: 'root', children: [...] } }
// where each node has a `type` (paragraph, heading, list, listItem, link,
// blockquote, code, thematicBreak, span). Leaf `span` nodes carry the actual
// text in `value` plus optional `marks` (strong, emphasis, code, underline,
// strikethrough, highlight).
//
// Note: DatoCMS authors are trusted, but we still HTML-escape leaf text to
// avoid surprises if someone pastes raw HTML into the CMS.
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const MARK_TAGS: Record<string, string> = {
  strikethrough: 's',
  highlight: 'mark',
  strong: 'strong',
  underline: 'u',
  emphasis: 'em',
  code: 'code',
}

const wrapMarks = (text: string, marks: string[] | undefined): string => {
  if (!marks?.length) return text
  return marks.reduce((acc, mark) => {
    const tag = MARK_TAGS[mark]
    return tag ? `<${tag}>${acc}</${tag}>` : acc
  }, text)
}

type DastNode = {
  type?: string
  value?: string
  marks?: string[]
  level?: number
  style?: 'bulleted' | 'numbered'
  url?: string
  language?: string
  code?: string
  children?: DastNode[]
}

const renderChildren = (children: DastNode[] | undefined): string =>
  (children ?? []).map(renderNode).join('')

const renderNode = (node: DastNode): string => {
  if (!node || typeof node !== 'object') return ''

  // Leaf text node — span (or untyped node carrying a value).
  // Convert literal newlines inside a span to <br> so soft line breaks
  // authored in DatoCMS render visibly inside their parent block.
  if (typeof node.value === 'string' && (!node.type || node.type === 'span')) {
    const html = escapeHtml(node.value).replace(/\r?\n/g, '<br>')
    return wrapMarks(html, node.marks)
  }

  switch (node.type) {
    case 'paragraph':
      return `<p>${renderChildren(node.children)}</p>`
    case 'heading': {
      const level = Math.min(Math.max(node.level ?? 2, 1), 6)
      return `<h${level}>${renderChildren(node.children)}</h${level}>`
    }
    case 'list': {
      const tag = node.style === 'numbered' ? 'ol' : 'ul'
      return `<${tag}>${renderChildren(node.children)}</${tag}>`
    }
    case 'listItem':
      return `<li>${renderChildren(node.children)}</li>`
    case 'link':
      return `<a href="${escapeHtml(node.url ?? '#')}" rel="noopener" target="_blank">${renderChildren(node.children)}</a>`
    case 'blockquote':
      return `<blockquote>${renderChildren(node.children)}</blockquote>`
    case 'code':
      return `<pre><code${
        node.language ? ` class="language-${escapeHtml(node.language)}"` : ''
      }>${escapeHtml(node.code ?? '')}</code></pre>`
    case 'thematicBreak':
      return '<hr>'
    case 'root':
      return renderChildren(node.children)
    default:
      // Unknown node type — fall back to rendering its children if any.
      return renderChildren(node.children)
  }
}

const dastToHtml = (dast: unknown): string => {
  if (!dast || typeof dast !== 'object') return ''
  const root = (dast as { document?: DastNode }).document ?? (dast as DastNode)
  return renderNode(root)
}

const mapProduct = (raw: Record<string, any>): Product => {
  const title = raw.title ?? ''
  const slugSource = raw.slugTitle ?? title
  const subTitle = raw.subtitle ?? ''
  const description = dastToHtml(raw.description?.value)
  const howToPrepare = dastToHtml(raw.howtoprepare?.value)
  const tips = dastToHtml(raw.tips?.value)

  const images: { url: string; alt: string | null }[] = raw.galleryimages ?? []

  return {
    imageAlt: raw.primaryimage?.alt ?? title,
    image: raw.primaryimage?.url ?? '',
    slug: slugify(slugSource) || raw.id,
    howToPrepare,
    name: title,
    description,
    subTitle,
    price: 0,
    images,
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
