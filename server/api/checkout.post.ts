import Stripe from 'stripe'

interface CheckoutItem {
  name: string
  price: number
  image: string
  quantity: number
}

interface CheckoutBody {
  items: CheckoutItem[]
  locale: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.stripeSecretKey) {
    throw createError({ statusCode: 503, statusMessage: 'Stripe is not configured' })
  }

  const { items, locale } = await readBody<CheckoutBody>(event)

  if (!items?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Cart is empty' })
  }

  const stripe = new Stripe(config.stripeSecretKey)

  const origin = getRequestURL(event).origin
  const localePrefix = locale === 'ja' ? 'ja/' : ''

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map((item) => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: item.price, // JPY has no decimal places
      },
      quantity: item.quantity,
    })),
    // Stripe Checkout UI will be shown in the user's locale
    locale: locale === 'ja' ? 'ja' : 'en',
    success_url: `${origin}/${localePrefix}checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${localePrefix}cart`,
  })

  return { url: session.url }
})
