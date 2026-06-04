import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { getStripeClient } from '@/lib/stripe/client'
import type { Devis } from '@/types'

export const runtime = 'nodejs'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

const SITE_LABELS: Record<string, string> = {
  simple:  'Site Vitrine Simple',
  complet: 'Site Vitrine Complet (avec chatbot IA)',
  premium: 'Site Premium 3D',
}

export async function POST(req: NextRequest) {
  try {
    const user = await getServerUser()
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { devis_id } = await req.json()
    if (!devis_id) return NextResponse.json({ error: 'devis_id requis' }, { status: 400 })

    const db = getAdminDb()
    const devisDoc = await db.collection('devis').doc(devis_id).get()
    if (!devisDoc.exists) return NextResponse.json({ error: 'Devis introuvable' }, { status: 404 })

    const devis = { id: devisDoc.id, ...devisDoc.data() } as Devis

    // Security: only the owner can pay
    if (devis.email !== user.email) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    if (devis.payment_status === 'paid') {
      return NextResponse.json({ error: 'Ce devis a déjà été payé' }, { status: 400 })
    }

    // Get or create Stripe customer
    const profileDoc = await db.collection('profiles').doc(user.uid).get()
    const profile = profileDoc.data() as { stripe_customer_id?: string } | undefined
    let customerId = profile?.stripe_customer_id ?? null

    if (!customerId) {
      const customer = await getStripeClient().customers.create({
        email: user.email ?? devis.email,
        name: devis.name,
        metadata: { user_id: user.uid },
      })
      customerId = customer.id
      await db.collection('profiles').doc(user.uid).update({ stripe_customer_id: customerId })
    }

    const label = SITE_LABELS[devis.siteType] ?? 'Création de site'
    const description = [
      label,
      devis.maintenance ? '+ Maintenance 1er mois inclus' : null,
    ].filter(Boolean).join(' — ')

    // Dynamic price via price_data (no pre-defined Price ID needed)
    const session = await getStripeClient().checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: devis.estimatedPrice * 100, // cents
            product_data: {
              name: description,
              description: `Devis #${devis_id.slice(0, 8).toUpperCase()} — Livraison incluse`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${APP_URL}/mes-devis?devis_paid=success&devis_id=${devis_id}`,
      cancel_url:  `${APP_URL}/mes-devis`,
      metadata: {
        plan: 'devis',
        devis_id,
        user_id: user.uid,
      },
      locale: 'fr',
      billing_address_collection: 'auto',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[/api/stripe/devis-checkout]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur Stripe' },
      { status: 500 }
    )
  }
}
