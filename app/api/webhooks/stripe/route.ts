import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { constructWebhookEvent } from '@/lib/stripe/helpers'
import { getAdminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
const ANALYZE_SECRET = process.env.ANALYZE_SECRET ?? ''

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = await constructWebhookEvent(body, signature)
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = getAdminDb()

  try {
    switch (event.type) {
      // ── One-time payment completed ────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { user_id, audit_id, plan } = session.metadata ?? {}

        if (!user_id || !plan) break

        if (plan === 'audit' && audit_id) {
          // Mark audit as paid
          await db.collection('audits').doc(audit_id).update({
            payment_status: 'paid',
            payment_intent_id: session.payment_intent as string,
            stripe_session_id: session.id,
            updated_at: FieldValue.serverTimestamp(),
          })

          // Trigger async analysis
          triggerAnalysis(audit_id)
        }

        if (plan === 'rebuild' && audit_id) {
          const { rebuild_id } = session.metadata ?? {}

          await db.collection('audits').doc(audit_id).update({
            rebuild_payment_status: 'paid',
            rebuild_payment_intent_id: session.payment_intent as string,
            updated_at: FieldValue.serverTimestamp(),
          })

          if (rebuild_id) {
            // Rebuild already exists as preview — just unlock the ZIP download
            await db.collection('rebuilds').doc(rebuild_id).update({
              payment_status: 'paid',
              updated_at: FieldValue.serverTimestamp(),
            })
          } else {
            // Legacy: no preview yet — generate now
            triggerRebuild(audit_id)
          }
        }

        if (plan === 'installation' && audit_id) {
          await db.collection('audits').doc(audit_id).update({
            rebuild_payment_status: 'paid',
            rebuild_payment_intent_id: session.payment_intent as string,
            updated_at: FieldValue.serverTimestamp(),
          })
        }

        // Log event
        await db.collection('subscription_events').add({
          user_id,
          event_type: `checkout.${plan}`,
          stripe_event_id: event.id,
          data: { session_id: session.id, audit_id, plan },
          created_at: FieldValue.serverTimestamp(),
        })

        break
      }

      // ── Subscription created / updated ────────
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription

        const profileSnap = await db
          .collection('profiles')
          .where('stripe_customer_id', '==', sub.customer as string)
          .limit(1)
          .get()

        if (!profileSnap.empty) {
          const profileDoc = profileSnap.docs[0]
          await profileDoc.ref.update({
            plan: 'subscription',
            stripe_subscription_id: sub.id,
            subscription_status: sub.status,
            subscription_end_date: sub.items?.data[0]?.current_period_end
              ? new Date(sub.items.data[0].current_period_end * 1000).toISOString()
              : null,
            updated_at: FieldValue.serverTimestamp(),
          })

          await db.collection('subscription_events').add({
            user_id: profileDoc.id,
            event_type: event.type,
            stripe_event_id: event.id,
            data: { subscription_id: sub.id, status: sub.status },
            created_at: FieldValue.serverTimestamp(),
          })
        }
        break
      }

      // ── Subscription canceled ─────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription

        const profileSnap = await db
          .collection('profiles')
          .where('stripe_customer_id', '==', sub.customer as string)
          .limit(1)
          .get()

        if (!profileSnap.empty) {
          await profileSnap.docs[0].ref.update({
            subscription_status: 'canceled',
            stripe_subscription_id: null,
            updated_at: FieldValue.serverTimestamp(),
          })
        }
        break
      }

      // ── Payment failed ────────────────────────
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent

        const auditSnap = await db
          .collection('audits')
          .where('payment_intent_id', '==', pi.id)
          .limit(1)
          .get()

        if (!auditSnap.empty) {
          await auditSnap.docs[0].ref.update({
            payment_status: 'failed',
            updated_at: FieldValue.serverTimestamp(),
          })
        }
        break
      }

      default:
        // Unhandled event — OK
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook] Handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

// ── Async triggers ────────────────────────────
async function triggerAnalysis(auditId: string) {
  try {
    await fetch(`${APP_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': ANALYZE_SECRET,
      },
      body: JSON.stringify({ audit_id: auditId }),
    })
  } catch (err) {
    console.error('[Webhook] Failed to trigger analysis:', err)
  }
}

async function triggerRebuild(auditId: string) {
  try {
    await fetch(`${APP_URL}/api/rebuild`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': ANALYZE_SECRET,
      },
      body: JSON.stringify({ audit_id: auditId }),
    })
  } catch (err) {
    console.error('[Webhook] Failed to trigger rebuild:', err)
  }
}
