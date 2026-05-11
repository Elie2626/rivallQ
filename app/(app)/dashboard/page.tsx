export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
// getAdminDb used inside try/catch — requires FIREBASE_PRIVATE_KEY service account
import { formatDate, getDomain, scoreToColor, scoreToLabel } from '@/lib/utils/format'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusIndicator } from '@/components/ui/status-indicator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, TrendingUp, Globe, ArrowRight, Zap, Sparkles } from 'lucide-react'
import type { Audit } from '@/types'

export const metadata: Metadata = { title: 'Dashboard — RivallQ' }

export default async function DashboardPage() {
  const user = await getServerUser()
  if (!user) return null

  let audits: Audit[] = []
  let profile: { full_name?: string; plan?: string; subscription_status?: string } | undefined

  try {
    const db = getAdminDb()
    const [auditsSnap, profileSnap] = await Promise.all([
      db.collection('audits').where('user_id', '==', user.uid).orderBy('created_at', 'desc').limit(10).get(),
      db.collection('profiles').doc(user.uid).get(),
    ])
    audits  = auditsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Audit[]
    profile = profileSnap.data() as typeof profile
  } catch {
    // Firestore not configured (missing service account) — show empty state
  }

  const completedAudits = audits.filter(a => a.status === 'completed')
  const avgScore = completedAudits.length > 0
    ? Math.round(completedAudits.reduce((s, a) => s + (a.overall_score ?? 0), 0) / completedAudits.length)
    : null

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">
            Bonjour{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''} 👋
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {audits.length ? `${audits.length} audit${audits.length > 1 ? 's' : ''} dans votre historique.` : 'Lancez votre premier audit pour commencer.'}
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/audit/new"><Plus className="h-4 w-4 mr-2" />Nouvel audit</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Audits réalisés', value: completedAudits.length.toString(), icon: Search, color: 'text-violet-400' },
          { label: 'Score moyen', value: avgScore !== null ? `${avgScore}/100` : '—', icon: TrendingUp, color: avgScore ? scoreToColor(avgScore) : 'text-zinc-500' },
          { label: 'Sites analysés', value: new Set(audits.map(a => getDomain(a.url))).size.toString(), icon: Globe, color: 'text-blue-400' },
          { label: 'Plan actif', value: profile?.plan ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1) : 'Gratuit', icon: Zap, color: 'text-emerald-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">{label}</p>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
                <div className="h-9 w-9 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <Icon className={`h-4 w-4 ${color}`} aria-hidden="true" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!profile?.plan && (
        <div className="rounded-2xl border border-violet-500/30 bg-violet-600/10 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-violet-300 mb-0.5">Débloquez le plein potentiel d&apos;RivallQ</p>
            <p className="text-xs text-zinc-500">Obtenez votre site optimisé par l&apos;IA pour 79€ — copywriting, SEO et design améliorés.</p>
          </div>
          <Button variant="gradient" size="sm" asChild className="shrink-0">
            <Link href="/billing">Voir les plans</Link>
          </Button>
        </div>
      )}

      {/* ── Exemple de résultat ─────────────────────────────── */}
      <Link
        href="/audit/demo"
        className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-violet-500/40 hover:bg-violet-600/5 transition-all duration-200 px-6 py-5"
      >
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">Voir un exemple d&apos;analyse complet</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Scores SEO/UX/Conversion · 10 problèmes détectés · Mots-clés · Recommandations détaillées
            </p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0" />
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historique des audits</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link href="/audit/new">+ Nouveau</Link></Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {!audits.length ? (
            <div className="text-center py-12">
              <div className="h-14 w-14 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-zinc-600" />
              </div>
              <p className="text-zinc-400 font-medium mb-1">Aucun audit pour l&apos;instant</p>
              <p className="text-sm text-zinc-600 mb-5">Lancez votre premier audit en entrant l&apos;URL de votre site.</p>
              <Button variant="gradient" asChild><Link href="/audit/new">Lancer mon premier audit</Link></Button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {audits.map((audit) => (
                <Link key={audit.id} href={`/audit/${audit.id}`}
                  className="flex items-center gap-4 py-4 hover:bg-zinc-800/30 -mx-6 px-6 transition-colors rounded-xl group">
                  <div className="h-9 w-9 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-zinc-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 truncate">{getDomain(audit.url)}</p>
                    <p className="text-xs text-zinc-600">{formatDate(audit.created_at)}</p>
                  </div>
                  {audit.overall_score !== null && (
                    <div className="text-right shrink-0">
                      <span className={`text-lg font-bold ${scoreToColor(audit.overall_score)}`}>{audit.overall_score}</span>
                      <p className="text-[10px] text-zinc-600">{scoreToLabel(audit.overall_score)}</p>
                    </div>
                  )}
                  <StatusIndicator status={audit.status} />
                  <Badge variant={audit.payment_status === 'paid' ? 'success' : 'secondary'} className="shrink-0">
                    {audit.payment_status === 'paid' ? 'Payé' : 'En attente'}
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
