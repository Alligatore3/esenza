import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.stripeSecretKey || !config.stripeWebhookSecret) {
    throw createError({ statusCode: 503, statusMessage: 'Stripe is not configured' })
  }

  const sig = getHeader(event, 'stripe-signature')
  if (!sig) {
    throw createError({ statusCode: 400, statusMessage: 'Missing stripe-signature header' })
  }

  const rawBody = await readRawBody(event)
  if (!rawBody) {
    throw createError({ statusCode: 400, statusMessage: 'Missing request body' })
  }

  const stripe = new Stripe(config.stripeSecretKey)

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, config.stripeWebhookSecret)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid webhook signature' })
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session
    // TODO: Send confirmation email, log order, update inventory
    console.log('[stripe webhook] checkout.session.completed', session.id)
  }

  return { received: true }
})
