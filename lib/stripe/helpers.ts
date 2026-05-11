import { getStripeClient, STRIPE_PRICES } from './client'
import type { PlanTier } from '@/types'

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

  const session = await getStripeClient().checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: isSubscription ? 'subscription' : 'payment',
    line_items: [
      {
        price: STRIPE_PRICES[plan],
        quantity: 1,
      },
    ],
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
