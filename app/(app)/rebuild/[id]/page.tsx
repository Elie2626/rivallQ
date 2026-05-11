export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { RebuildViewer } from '@/components/app/rebuild-viewer'
import { serializeDoc } from '@/lib/utils/serialize'
import type { Rebuild } from '@/types'

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return { title: `Site optimisé ${id.slice(0, 8)} — RivallQ` }
}

export default async function RebuildPage({ params }: Props) {
  const { id } = await params
  const user = await getServerUser()
  if (!user) redirect('/login')

  const doc = await getAdminDb().collection('rebuilds').doc(id).get()

  if (!doc.exists) notFound()

  const rebuild = serializeDoc<Rebuild>(doc.id, doc.data())

  if (rebuild.user_id !== user.uid) notFound()

  return <RebuildViewer rebuild={rebuild} />
}
