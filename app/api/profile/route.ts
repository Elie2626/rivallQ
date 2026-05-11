import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function GET() {
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const doc = await getAdminDb().collection('profiles').doc(user.uid).get()
  return NextResponse.json({ profile: doc.exists ? { id: doc.id, ...doc.data() } : null })
}

export async function PATCH(request: NextRequest) {
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const allowed = ['full_name', 'avatar_url', 'settings']
  const update: Record<string, unknown> = { updated_at: FieldValue.serverTimestamp() }
  for (const key of allowed) {
    if (key in body) update[key] = body[key]
  }

  await getAdminDb().collection('profiles').doc(user.uid).update(update)
  return NextResponse.json({ success: true })
}
