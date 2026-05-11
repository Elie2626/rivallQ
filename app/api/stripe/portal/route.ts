import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { createPortalSession } from '@/lib/stripe/helpers'

export async function POST() {
  try {
    const user = await getServerUser()
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const db = getAdminDb()
    const profileDoc = await db.collection('profiles').doc(user.uid).get()
    const profile = profileDoc.data() as { stripe_customer_id?: string } | undefined

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: 'Aucun compte Stripe associé' }, { status: 400 })
    }

    const session = await createPortalSession(profile.stripe_customer_id, '/billing')
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[API /stripe/portal]', error)
    return NextResponse.json({ error: 'Erreur portail Stripe' }, { status: 500 })
  }
}
