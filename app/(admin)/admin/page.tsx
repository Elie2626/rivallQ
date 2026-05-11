export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getAdminDb } from '@/lib/firebase/admin'
import { Users, FileText, TrendingUp, DollarSign, Activity, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/format'

export const metadata: Metadata = { title: 'Admin — RivallQ' }

export default async function AdminPage() {
  const db = getAdminDb()

  // Parallel queries for stats
  const [
    allProfilesSnap,
    allAuditsSnap,
    paidAuditsSnap,
    activeSubsSnap,
    paidRebuildsSnap,
    recentAuditsSnap,
    recentUsersSnap,
  ] = await Promise.all([
    db.collection('profiles').count().get(),
    db.collection('audits').count().get(),
    db.collection('audits').where('payment_status', '==', 'paid').count().get(),
    db.collection('profiles').where('subscription_status', '==', 'active').count().get(),
    db.collection('rebuilds').where('payment_status', '==', 'paid').count().get(),
    db.collection('audits').orderBy('created_at', 'desc').limit(10).get(),
    db.collection('profiles').orderBy('created_at', 'desc').limit(5).get(),
  ])

  const totalUsers = allProfilesSnap.data().count
  const totalAudits = allAuditsSnap.data().count
  const paidAudits = paidAuditsSnap.data().count
  const activeSubscriptions = activeSubsSnap.data().count
  const paidRebuilds = paidRebuildsSnap.data().count

  const recentAudits = recentAuditsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Array<{
    id: string; url: string; payment_status: string; overall_score?: number | null; created_at?: unknown
  }>

  const recentUsers = recentUsersSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Array<{
    id: string; email?: string; full_name?: string; plan?: string; created_at?: unknown
  }>

  // Estimated cumulative revenue
  const mrr = activeSubscriptions * 29 + paidAudits * 9.99 + paidRebuilds * 79

  const kpis = [
    { label: 'Utilisateurs totaux', value: totalUsers, icon: Users, change: '', color: 'text-blue-400' },
    { label: 'Audits totaux', value: totalAudits, icon: FileText, change: '', color: 'text-violet-400' },
    { label: 'Audits payés', value: paidAudits, icon: DollarSign, change: `${Math.round((paidAudits / Math.max(totalAudits, 1)) * 100)}% conversion`, color: 'text-emerald-400' },
    { label: 'Abonnements actifs', value: activeSubscriptions, icon: Activity, change: '29€/mois chacun', color: 'text-yellow-400' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100 mb-1">Admin Dashboard</h1>
        <p className="text-zinc-500 text-sm">Vue d&apos;ensemble en temps réel.</p>
      </div>

      {/* MRR banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-600/10 p-5 flex items-center gap-5">
        <div className="h-12 w-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-xs text-zinc-500 mb-0.5">Revenus estimés cumulés</p>
          <p className="text-2xl font-bold text-emerald-400">
            {mrr.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon, change, color }) => (
          <Card key={label}>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-zinc-500">{label}</p>
                <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${color} mb-1`}>{value}</p>
              {change && <p className="text-xs text-zinc-600">{change}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent audits */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Derniers audits</CardTitle>
              <Link href="/admin/audits" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                Voir tout <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-zinc-800">
              {recentAudits.map((audit) => (
                <div key={audit.id} className="flex items-center gap-3 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-300 truncate">{audit.url}</p>
                    <p className="text-[10px] text-zinc-600">{formatDate(audit.created_at)}</p>
                  </div>
                  <span className={`text-xs font-semibold ${audit.payment_status === 'paid' ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {audit.payment_status === 'paid' ? '4,99€ ✓' : 'Impayé'}
                  </span>
                  {audit.overall_score != null && (
                    <span className="text-xs text-violet-400 font-bold">{audit.overall_score}/100</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Derniers inscrits</CardTitle>
              <Link href="/admin/users" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                Voir tout <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-zinc-800">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {(u.full_name ?? u.email ?? '?')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-300 truncate">{u.full_name ?? u.email}</p>
                    <p className="text-[10px] text-zinc-600">{formatDate(u.created_at)}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${u.plan ? 'bg-violet-500/20 text-violet-300' : 'bg-zinc-800 text-zinc-500'}`}>
                    {u.plan ?? 'Gratuit'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
