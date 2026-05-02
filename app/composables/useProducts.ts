import type { Product } from '~/types/product'

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
      howtoprepare { value }
      tips { value }
      image { url alt }
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
  const subTitle = raw.subtitle ?? ''
  const description = dastToHtml(raw.description?.value)
  const howToPrepare = dastToHtml(raw.howtoprepare?.value)
  const tips = dastToHtml(raw.tips?.value)

  return {
    slug: slugify(title) || raw.id,
    name: title,
    subTitle,
    howToPrepare,
    tips,
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
