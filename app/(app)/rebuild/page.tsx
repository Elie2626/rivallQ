export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { formatDate } from '@/lib/utils/format'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusIndicator } from '@/components/ui/status-indicator'
import { Wand2, ArrowRight, Plus, Globe } from 'lucide-react'
import type { Rebuild } from '@/types'

export const metadata: Metadata = { title: 'Sites optimisés — RivallQ' }

export default async function RebuildIndexPage() {
  const user = await getServerUser()
  if (!user) redirect('/login')

  let rebuilds: Rebuild[] = []

  try {
    const db = getAdminDb()
    const snap = await db
      .collection('rebuilds')
      .where('user_id', '==', user.uid)
      .orderBy('created_at', 'desc')
      .limit(20)
      .get()
    rebuilds = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Rebuild[]
  } catch {
    // Firestore non configuré
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Sites optimisés</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {rebuilds.length
              ? `${rebuilds.length} site${rebuilds.length > 1 ? 's' : ''} reconstruit${rebuilds.length > 1 ? 's' : ''} par l'IA.`
              : 'Lancez un audit puis commandez la refonte de votre site.'}
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/audit/new"><Plus className="h-4 w-4 mr-2" />Nouvel audit</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des refonte</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {!rebuilds.length ? (
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                <Wand2 className="h-7 w-7 text-zinc-600" />
              </div>
              <p className="text-zinc-400 font-medium mb-1">Aucun site reconstruit pour l&apos;instant</p>
              <p className="text-sm text-zinc-600 mb-6">
                Lancez d&apos;abord un audit, puis commandez la reconstruction IA de votre site.
              </p>
              <Button variant="gradient" asChild>
                <Link href="/audit/new">Lancer un audit</Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {rebuilds.map((rebuild) => (
                <Link
                  key={rebuild.id}
                  href={`/rebuild/${rebuild.id}`}
                  className="flex items-center gap-4 py-4 hover:bg-zinc-800/30 -mx-6 px-6 transition-colors rounded-xl group"
                >
                  <div className="h-9 w-9 rounded-lg bg-violet-600/20 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 truncate">
                      Refonte #{rebuild.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-zinc-600">{formatDate(rebuild.created_at)}</p>
                  </div>
                  <StatusIndicator status={rebuild.status} />
                  <Badge
                    variant={rebuild.payment_status === 'paid' ? 'success' : 'secondary'}
                    className="shrink-0"
                  >
                    {rebuild.payment_status === 'paid' ? 'Payé' : 'En attente'}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
