import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripeClient(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('Missing STRIPE_SECRET_KEY environment variable')
    _stripe = new Stripe(key, { apiVersion: '2026-04-22.dahlia', typescript: true })
  }
  return _stripe
}


// ── Price IDs ─────────────────────────────────
export const STRIPE_PRICES = {
  audit: process.env.STRIPE_PRICE_AUDIT!,
  rebuild: process.env.STRIPE_PRICE_REBUILD!,
  installation: process.env.STRIPE_PRICE_INSTALLATION!,
  subscription: process.env.STRIPE_PRICE_SUBSCRIPTION!,
} as const

// ── Amounts (cents) ───────────────────────────
export const PLAN_AMOUNTS = {
  audit: 499,        // 4,99€
  rebuild: 7900,     // 79€
  installation: 29900, // 299€
  subscription: 2900,  // 29€/mo
} as const

// ── Plan display prices ───────────────────────
export const PLAN_PRICES = {
  audit: '4,99€',
  rebuild: '79€',
  installation: '299€',
  subscription: '29€/mois',
} as const
