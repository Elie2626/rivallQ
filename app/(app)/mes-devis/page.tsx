export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { DevisSection } from '@/components/app/devis-section'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { Devis } from '@/types'

export const metadata: Metadata = { title: 'Mes devis — RivallQ' }

export default async function MesDevisPage({
  searchParams,
}: {
  searchParams: Promise<{ devis_paid?: string; devis_id?: string }>
}) {
  const params = await searchParams
  const paidDevisId = params.devis_paid === 'success' ? (params.devis_id ?? null) : null

  const user = await getServerUser()
  if (!user) return null

  let devis: Devis[] = []

  try {
    const db = getAdminDb()
    const userEmail = user.email ?? ''
    if (userEmail) {
      const snap = await db
        .collection('devis')
        .where('email', '==', userEmail)
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get()
      devis = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Devis[]
    }
  } catch {
    // Firestore not configured
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Mes devis</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {devis.length
              ? `${devis.length} devis dans votre historique.`
              : 'Aucun devis pour le moment — obtenez votre premier devis gratuitement.'}
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/devis">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau devis
          </Link>
        </Button>
      </div>

      <DevisSection devis={devis} paidDevisId={paidDevisId} />
    </div>
  )
}
