import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const doc = await getAdminDb().collection('audits').doc(id).get()
  if (!doc.exists) return NextResponse.json({ error: 'Audit non trouvé' }, { status: 404 })

  const data = doc.data() as Record<string, unknown>
  if (data.user_id !== user.uid) return NextResponse.json({ error: 'Interdit' }, { status: 403 })

  return NextResponse.json({
    status: data.status,
    overall_score: data.overall_score ?? null,
    error_message: data.error_message ?? null,
    rebuild_status: data.rebuild_status ?? null,
    rebuild_id: data.rebuild_id ?? null,
  })
}
