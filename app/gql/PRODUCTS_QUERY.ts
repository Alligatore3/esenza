// DatoCMS GraphQL query — fetches all locales in one request.
// Field names match the DatoCMS model described in the project plan.
// Run this in the DatoCMS GraphQL playground to verify: https://cda-explorer.datocms.com/
// Minimal model: title, description, image.
// Slug is derived from the title (kebab-case) since the model has no slug field yet.
// DatoCMS API IDs are snake_case, but GraphQL exposes them as camelCase.
// All text fields are localized (EN + JA) in the DatoCMS model, so we use the
// auto-generated `_all*Locales` variants to fetch every locale in one request
// and map them in JS via `pickLocale*`.
// Accepts a $locale variable so DatoCMS returns each text field in the
// requested language. `slugTitle` always fetches the English title so that
// URL slugs remain stable across locales.
export const PRODUCTS_QUERY = `
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
      price
    }
  }
`
