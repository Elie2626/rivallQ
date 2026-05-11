import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'

export async function DELETE() {
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const db = getAdminDb()
  const snap = await db.collection('audits').where('user_id', '==', user.uid).get()

  if (snap.empty) return NextResponse.json({ success: true, deleted: 0 })

  const batch = db.batch()
  snap.docs.forEach(doc => batch.delete(doc.ref))
  await batch.commit()

  return NextResponse.json({ success: true, deleted: snap.size })
}
