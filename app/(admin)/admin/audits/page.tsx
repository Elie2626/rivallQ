export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getAdminDb } from '@/lib/firebase/admin'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusIndicator } from '@/components/ui/status-indicator'
import { formatDate, getDomain } from '@/lib/utils/format'
import { FileText } from 'lucide-react'

export const metadata: Metadata = { title: 'Audits — Admin RivallQ' }

export default async function AdminAuditsPage() {
  const db = getAdminDb()
  const snap = await db.collection('audits').orderBy('created_at', 'desc').limit(100).get()

  const audits = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Array<{
    id: string
    url: string
    status: string
    payment_status: string
    overall_score?: number | null
    rebuild_payment_status?: string
    user_id: string
    created_at?: unknown
  }>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-zinc-400" />
        <h1 className="text-2xl font-bold text-zinc-100">Audits ({audits.length})</h1>
      </div>

      <Card>
        <CardHeader><CardTitle>Tous les audits</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  {['URL', 'Statut', 'Score', 'Audit payé', 'Rebuild payé', 'Date'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {audits.map((a) => (
                  <tr key={a.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 pr-4 text-zinc-300 text-xs max-w-[200px] truncate">{getDomain(a.url)}</td>
                    <td className="py-3 pr-4"><StatusIndicator status={a.status} /></td>
                    <td className="py-3 pr-4 text-zinc-300 font-semibold text-sm">
                      {a.overall_score != null ? `${a.overall_score}/100` : '—'}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={a.payment_status === 'paid' ? 'success' : 'secondary'}>
                        {a.payment_status === 'paid' ? '✓ 9,99€' : 'Impayé'}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4">
                      {a.rebuild_payment_status === 'paid'
                        ? <Badge variant="default">✓ 79€</Badge>
                        : <span className="text-zinc-700 text-xs">—</span>
                      }
                    </td>
                    <td className="py-3 text-zinc-500 text-xs">{formatDate(a.created_at)}</td>
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
