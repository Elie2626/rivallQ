import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { createCheckoutSession } from '@/lib/stripe/helpers'
import type { PlanTier } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await request.json()
    const { plan, audit_id, rebuild_id } = body as { plan: PlanTier; audit_id?: string; rebuild_id?: string }

    if (!plan) return NextResponse.json({ error: 'Plan requis' }, { status: 400 })

    const db = getAdminDb()
    const profileDoc = await db.collection('profiles').doc(user.uid).get()
    const profile = profileDoc.data() as { email?: string; stripe_customer_id?: string } | undefined

    // Build paths based on plan
    const paths = {
      audit: {
        success: `/audit/${audit_id ?? 'unknown'}?payment=success`,
        cancel: `/audit/new`,
      },
      rebuild: {
        success: rebuild_id ? `/rebuild/${rebuild_id}?payment=success` : `/audit/${audit_id}?rebuild=success`,
        cancel: rebuild_id ? `/rebuild/${rebuild_id}` : `/audit/${audit_id}`,
      },
      installation: {
        success: `/audit/${audit_id}?installation=success`,
        cancel: `/audit/${audit_id}`,
      },
      subscription: {
        success: `/billing?subscription=success`,
        cancel: `/billing`,
      },
    }

    const { success: successPath, cancel: cancelPath } = paths[plan]

    const { session, customerId } = await createCheckoutSession({
      userId: user.uid,
      userEmail: profile?.email ?? user.email ?? '',
      stripeCustomerId: profile?.stripe_customer_id ?? null,
      plan,
      auditId: audit_id ?? '',
      rebuildId: rebuild_id,
      successPath,
      cancelPath,
    })

    if (!profile?.stripe_customer_id && customerId) {
      await db.collection('profiles').doc(user.uid).update({ stripe_customer_id: customerId })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[API /stripe/checkout]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur Stripe' },
      { status: 500 }
    )
  }
}
