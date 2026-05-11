import { NextRequest, NextResponse } from 'next/server'
import { getServerUser, isAdminEmail } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { createCheckoutSession } from '@/lib/stripe/helpers'
import { rateLimit } from '@/lib/utils/rate-limit'
import type { ApiResponse, AuditStartResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    if (!user) return NextResponse.json<ApiResponse>({ success: false, error: 'Non authentifié' }, { status: 401 })

    // Rate limit: max 10 audit creations per user per hour
    const rl = rateLimit('audit:create', user.uid, { max: 10, windowMs: 60 * 60 * 1000 })
    if (!rl.ok) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Trop de requêtes. Réessayez dans une heure.' },
        { status: 429 }
      )
    }

    const { url } = await request.json()
    if (!url || typeof url !== 'string')
      return NextResponse.json<ApiResponse>({ success: false, error: 'URL manquante' }, { status: 400 })

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
    try { new URL(normalizedUrl) } catch {
      return NextResponse.json<ApiResponse>({ success: false, error: 'URL invalide' }, { status: 400 })
    }

    const db = getAdminDb()
    const profileSnap = await db.collection('profiles').doc(user.uid).get()
    const profile = profileSnap.data() as { email?: string; stripe_customer_id?: string } | undefined

    const userEmail = profile?.email ?? user.email ?? ''

    // ── Admin bypass : pas de paiement ──────────────────────────
    if (isAdminEmail(userEmail)) {
      const auditRef = db.collection('audits').doc()
      await auditRef.set({
        user_id: user.uid,
        url: normalizedUrl,
        status: 'pending',
        payment_status: 'paid',
        created_at: FieldValue.serverTimestamp(),
        updated_at: FieldValue.serverTimestamp(),
      })

      // Déclenche l'analyse (même endpoint que le webhook Stripe)
      const appUrl = process.env.NEXT_PUBLIC_APP_URL!
      const analyzeSecret = process.env.ANALYZE_SECRET ?? 'internal-secret-change-me'
      fetch(`${appUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': analyzeSecret,
        },
        body: JSON.stringify({ audit_id: auditRef.id }),
      }).catch(() => {})

      return NextResponse.json<ApiResponse<AuditStartResponse>>({
        success: true,
        data: { audit_id: auditRef.id, checkout_url: `${appUrl}/audit/${auditRef.id}` },
      })
    }

    // ── Parcours normal : checkout Stripe ───────────────────────
    const auditRef = db.collection('audits').doc()
    await auditRef.set({
      user_id: user.uid,
      url: normalizedUrl,
      status: 'pending',
      payment_status: 'pending',
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    })

    const { session, customerId } = await createCheckoutSession({
      userId: user.uid,
      userEmail,
      stripeCustomerId: profile?.stripe_customer_id ?? null,
      plan: 'audit',
      auditId: auditRef.id,
      successPath: `/audit/${auditRef.id}?payment=success`,
      cancelPath: '/audit/new',
    })

    const updates: Record<string, string> = { stripe_session_id: session.id }
    if (!profile?.stripe_customer_id && customerId) {
      await db.collection('profiles').doc(user.uid).update({ stripe_customer_id: customerId })
    }
    await auditRef.update(updates)

    return NextResponse.json<ApiResponse<AuditStartResponse>>({
      success: true,
      data: { audit_id: auditRef.id, checkout_url: session.url! },
    })
  } catch (error) {
    console.error('[API /audit POST]', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    )
  }
}
