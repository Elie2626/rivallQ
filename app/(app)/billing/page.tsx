export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { BillingClient } from '@/components/app/billing-client'
import { serialize, serializeDoc } from '@/lib/utils/serialize'
import type { Audit } from '@/types'

export const metadata: Metadata = { title: 'Facturation — RivallQ' }

export default async function BillingPage() {
  const user = await getServerUser()
  if (!user) redirect('/login')

  const db = getAdminDb()

  const [profileDoc, auditsSnap] = await Promise.all([
    db.collection('profiles').doc(user.uid).get(),
    db.collection('audits')
      .where('user_id', '==', user.uid)
      .orderBy('created_at', 'desc')
      .limit(50)
      .get(),
  ])

  const raw = profileDoc.exists ? profileDoc.data() : null
  const profile = raw
    ? serialize<{
        plan: string | null
        stripe_customer_id: string | null
        stripe_subscription_id: string | null
        subscription_status: string | null
        subscription_end_date: string | null
      }>({
        plan: raw.plan ?? null,
        stripe_customer_id: raw.stripe_customer_id ?? null,
        stripe_subscription_id: raw.stripe_subscription_id ?? null,
        subscription_status: raw.subscription_status ?? null,
        subscription_end_date: raw.subscription_end_date ?? null,
      })
    : null

  const audits = auditsSnap.docs
    .map(d => serializeDoc<Audit>(d.id, d.data()))
    .filter((a: Audit) => a.payment_status === 'paid')

  return (
    <BillingClient
      profile={profile}
      audits={audits}
      userId={user.uid}
    />
  )
}
