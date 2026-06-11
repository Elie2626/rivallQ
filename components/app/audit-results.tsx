'use client'

import { useState } from 'react'
import Link from 'next/link'
import { m } from 'framer-motion'
import {
  AlertTriangle, Info, CheckCircle2, ArrowRight,
  Globe, ExternalLink, BarChart3, Search, Eye, Zap, Share2, Check, FileText,
} from 'lucide-react'
import { ScoreRing } from '@/components/ui/score-ring'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getDomain, formatDate } from '@/lib/utils/format'
import type { Audit, Issue } from '@/types'

const categoryIcons = {
  seo: Search,
  ux: Eye,
  conversion: BarChart3,
  performance: Zap,
  copywriting: Globe,
}

const severityConfig = {
  critical: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', badge: 'danger' as const },
  warning:  { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', badge: 'warning' as const },
  info:     { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', badge: 'info' as const },
}

export function AuditResults({ audit }: { audit: Audit }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'keywords' | 'recommendations'>('overview')
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: `Audit SEO — ${getDomain(audit.url)}`, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // (rebuild feature removed — replaced by devis)

  const scores = [
    { label: 'SEO', value: audit.seo_score ?? 0, icon: Search },
    { label: 'UX', value: audit.ux_score ?? 0, icon: Eye },
    { label: 'Conversion', value: audit.conversion_score ?? 0, icon: BarChart3 },
    { label: 'Performance', value: audit.performance_score ?? 0, icon: Zap },
  ]

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'issues', label: `Problèmes (${audit.issues?.length ?? 0})` },
    { id: 'keywords', label: 'Mots-clés' },
    { id: 'recommendations', label: 'Recommandations' },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="h-4 w-4 text-zinc-500" />
            <a
              href={audit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
            >
              {getDomain(audit.url)}
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-zinc-700">·</span>
            <span className="text-xs text-zinc-600">{formatDate(audit.created_at)}</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Résultats de l&apos;audit</h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Partager */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            leftIcon={copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
            className={copied ? 'border-emerald-500/40 text-emerald-400' : ''}
          >
            {copied ? 'Lien copié !' : 'Partager'}
          </Button>

          {/* Devis */}
          <Button variant="gradient" asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/devis">Créer mon site</Link>
          </Button>
        </div>
      </div>

      {/* Global score + sub-scores */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Overall */}
        <Card className="flex items-center justify-center p-6 lg:col-span-1">
          <div className="text-center">
            <ScoreRing score={audit.overall_score ?? 0} size="lg" />
            <p className="text-xs text-zinc-500 mt-2">Score global</p>
          </div>
        </Card>

        {/* Sub-scores */}
        <Card className="lg:col-span-4 p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {scores.map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 mb-3">
                  <Icon className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">{label}</span>
                </div>
                <ScoreRing score={value} size="md" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 w-fit">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === id
                ? 'bg-zinc-700 text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <m.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && <OverviewTab audit={audit} />}
        {activeTab === 'issues' && <IssuesTab issues={audit.issues ?? []} />}
        {activeTab === 'keywords' && <KeywordsTab audit={audit} />}
        {activeTab === 'recommendations' && <RecommendationsTab audit={audit} />}
      </m.div>

      {/* CTA Devis */}
      {audit.status === 'completed' && (
        <div className="rounded-2xl border border-violet-500/30 bg-violet-600/10 p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-300">Passez à l&apos;étape suivante</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Créez un site vitrine optimisé à partir de 500€ — devis gratuit, prix en temps réel.
              </p>
            </div>
          </div>
          <Button variant="gradient" asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/devis">Obtenir mon devis</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

// ── Tab: Overview ─────────────────────────────
function OverviewTab({ audit }: { audit: Audit }) {
  const seo = audit.seo_analysis
  const ux = audit.ux_analysis

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {/* SEO summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-4 w-4 text-violet-400" />
            Résumé SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {seo && [
            { label: 'Titre', value: seo.title_analysis.score },
            { label: 'Meta description', value: seo.meta_description_analysis.score },
            { label: 'Headings', value: seo.headings_analysis.score },
            { label: 'Contenu', value: seo.content_analysis.score },
            { label: 'SEO technique', value: seo.technical_seo.score },
          ].map(({ label, value }) => (
            <ProgressBar key={label} label={label} value={value} showValue animated />
          ))}
        </CardContent>
      </Card>

      {/* UX summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-400" />
            Résumé UX & Conversion
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {ux && [
            { label: 'CTA & appels à l\'action', value: ux.cta_analysis.score },
            { label: 'Copywriting', value: ux.copywriting_analysis.score },
            { label: 'Hiérarchie visuelle', value: ux.visual_hierarchy.score },
            { label: 'Signaux de confiance', value: ux.trust_signals.score },
            { label: 'Mobile', value: ux.mobile_friendliness.score },
          ].map(({ label, value }) => (
            <ProgressBar key={label} label={label} value={value} showValue animated />
          ))}
        </CardContent>
      </Card>

      {/* Key findings */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Problèmes critiques à corriger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {(audit.issues ?? [])
              .filter((i) => i.severity === 'critical')
              .slice(0, 4)
              .map((issue) => {
                const cfg = severityConfig[issue.severity]
                return (
                  <div key={issue.id} className={`rounded-xl border p-4 ${cfg.bg}`}>
                    <div className="flex items-start gap-2">
                      <cfg.icon className={`h-4 w-4 shrink-0 mt-0.5 ${cfg.color}`} />
                      <div>
                        <p className={`text-sm font-medium ${cfg.color}`}>{issue.title}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{issue.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Tab: Issues ────────────────────────────────
function IssuesTab({ issues }: { issues: Issue[] }) {
  const critical = issues.filter(i => i.severity === 'critical')
  const warnings = issues.filter(i => i.severity === 'warning')
  const infos = issues.filter(i => i.severity === 'info')

  return (
    <div className="space-y-6">
      {[
        { label: 'Critiques', items: critical, cfg: severityConfig.critical },
        { label: 'Avertissements', items: warnings, cfg: severityConfig.warning },
        { label: 'Informations', items: infos, cfg: severityConfig.info },
      ].filter(({ items }) => items.length > 0).map(({ label, items, cfg }) => (
        <div key={label}>
          <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
            <cfg.icon className={`h-4 w-4 ${cfg.color}`} />
            {label} ({items.length})
          </h3>
          <div className="flex flex-col gap-3">
            {items.map((issue) => {
              const CatIcon = categoryIcons[issue.category] ?? Globe
              return (
                <div key={issue.id} className={`rounded-2xl border p-5 ${cfg.bg}`}>
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                      <CatIcon className={`h-4 w-4 ${cfg.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-zinc-200">{issue.title}</p>
                        <Badge variant={cfg.badge} className="text-[10px]">
                          {issue.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-400 mb-2">{issue.description}</p>
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-zinc-500">{issue.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Tab: Keywords ──────────────────────────────
function KeywordsTab({ audit }: { audit: Audit }) {
  const kw = audit.keyword_analysis
  if (!kw) return <p className="text-zinc-500 text-sm">Analyse des mots-clés non disponible.</p>

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <Card>
        <CardHeader><CardTitle>Mots-clés principaux</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {kw.primary_keywords.slice(0, 8).map((kwd) => (
              <div key={kwd.term} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                <span className="text-sm text-zinc-300 font-medium">{kwd.term}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">×{kwd.frequency}</span>
                  <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/30 px-2 py-0.5 rounded-full">{kwd.position}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Opportunités de mots-clés</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {kw.opportunities.slice(0, 6).map((opp) => (
              <div key={opp.keyword} className="rounded-xl bg-zinc-800/50 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-zinc-200">{opp.keyword}</span>
                  <div className="flex items-center gap-2">
                    {opp.estimated_volume && (
                      <span className={`text-xs font-semibold ${
                        opp.estimated_volume === 'high' ? 'text-emerald-400' :
                        opp.estimated_volume === 'medium' ? 'text-orange-400' :
                        'text-red-400'
                      }`}>
                        vol. {opp.estimated_volume}
                      </span>
                    )}
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                      opp.difficulty === 'easy'
                        ? 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40'
                        : opp.difficulty === 'medium'
                        ? 'text-orange-300 bg-orange-500/20 border-orange-500/40'
                        : 'text-red-300 bg-red-500/20 border-red-500/40'
                    }`}>
                      {opp.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">{opp.recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {kw.content_gaps.length > 0 && (
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Lacunes de contenu à combler</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {kw.content_gaps.map((gap) => (
                <Badge key={gap} variant="outline" className="text-sm py-1 px-3">{gap}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ── Tab: Recommendations ───────────────────────
function RecommendationsTab({ audit }: { audit: Audit }) {
  const recs = audit.recommendations ?? []
  const high = recs.filter(r => r.priority === 'high')
  const medium = recs.filter(r => r.priority === 'medium')
  const low = recs.filter(r => r.priority === 'low')

  return (
    <div className="space-y-6">
      {[
        { label: 'Priorité haute', items: high, color: 'text-red-400', dot: 'bg-red-500' },
        { label: 'Priorité moyenne', items: medium, color: 'text-yellow-400', dot: 'bg-yellow-500' },
        { label: 'Priorité basse', items: low, color: 'text-zinc-400', dot: 'bg-zinc-500' },
      ].filter(({ items }) => items.length > 0).map(({ label, items, color, dot }) => (
        <div key={label}>
          <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${color}`}>
            <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
            {label} ({items.length})
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((rec) => {
              const CatIcon = categoryIcons[rec.category] ?? Globe
              return (
                <div key={rec.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <div className="flex items-start gap-2 mb-3">
                    <CatIcon className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-zinc-200">{rec.title}</p>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">{rec.description}</p>
                  <div className="rounded-lg bg-zinc-800/50 px-3 py-2 mb-2">
                    <p className="text-xs text-zinc-400"><strong>Comment :</strong> {rec.implementation}</p>
                  </div>
                  <p className="text-xs text-emerald-400">↑ {rec.estimated_impact}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
