export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getAdminDb } from '@/lib/firebase/admin'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils/format'
import { Users } from 'lucide-react'

export const metadata: Metadata = { title: 'Utilisateurs — Admin RivallQ' }

export default async function AdminUsersPage() {
  const db = getAdminDb()
  const snap = await db.collection('profiles').orderBy('created_at', 'desc').limit(100).get()

  const users = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Array<{
    id: string
    email?: string
    full_name?: string
    plan?: string
    subscription_status?: string
    is_admin?: boolean
    created_at?: { toDate?: () => Date } | string
  }>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-5 w-5 text-zinc-400" />
        <h1 className="text-2xl font-bold text-zinc-100">Utilisateurs ({users.length})</h1>
      </div>

      <Card>
        <CardHeader><CardTitle>Tous les utilisateurs</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  {['Email', 'Nom', 'Plan', 'Abonnement', 'Inscrit le', 'Admin'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 pr-4 text-zinc-300 text-xs">{u.email}</td>
                    <td className="py-3 pr-4 text-zinc-400 text-xs">{u.full_name ?? '—'}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={u.plan === 'subscription' ? 'default' : u.plan ? 'secondary' : 'outline'}>
                        {u.plan ?? 'Gratuit'}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4">
                      {u.subscription_status ? (
                        <Badge variant={u.subscription_status === 'active' ? 'success' : 'danger'}>
                          {u.subscription_status}
                        </Badge>
                      ) : <span className="text-zinc-700 text-xs">—</span>}
                    </td>
                    <td className="py-3 pr-4 text-zinc-500 text-xs">{formatDate(u.created_at)}</td>
                    <td className="py-3">
                      {u.is_admin && <Badge variant="warning">Admin</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
