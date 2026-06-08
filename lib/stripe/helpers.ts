import { getStripeClient, STRIPE_PRICES, PLAN_AMOUNTS } from './client'
import type { PlanTier } from '@/types'
import { isPromoActive } from '@/lib/promo'

interface CreateCheckoutParams {
  userId: string
  userEmail: string
  stripeCustomerId: string | null
  plan: PlanTier
  auditId: string
  rebuildId?: string
  successPath: string
  cancelPath: string
}

export async function createCheckoutSession({
  userId,
  userEmail,
  stripeCustomerId,
  plan,
  auditId,
  rebuildId,
  successPath,
  cancelPath,
}: CreateCheckoutParams) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  const isSubscription = plan === 'subscription'

  // Reuse or create Stripe customer
  let customerId = stripeCustomerId
  if (!customerId) {
    const customer = await getStripeClient().customers.create({
      email: userEmail,
      metadata: { supabase_user_id: userId },
    })
    customerId = customer.id
  }

  // Si la promo est active et que c'est l'audit, on utilise price_data avec -50%
  const promoOnAudit = isPromoActive() && plan === 'audit'
  const lineItems = promoOnAudit
    ? [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Audit SEO — Offre Flash -50%' },
            unit_amount: Math.floor(PLAN_AMOUNTS.audit / 2), // 499 centimes = 4,99€
          },
          quantity: 1,
        },
      ]
    : [{ price: STRIPE_PRICES[plan], quantity: 1 }]

  const session = await getStripeClient().checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: isSubscription ? 'subscription' : 'payment',
    line_items: lineItems,
    success_url: `${appUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}${cancelPath}`,
    metadata: {
      user_id: userId,
      audit_id: auditId,
      plan,
      ...(rebuildId ? { rebuild_id: rebuildId } : {}),
    },
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    locale: 'fr',
  })

  return { session, customerId }
}

export async function createPortalSession(customerId: string, returnPath: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const session = await getStripeClient().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl}${returnPath}`,
  })

  return session
}

export async function constructWebhookEvent(body: string, signature: string) {
  return getStripeClient().webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}
