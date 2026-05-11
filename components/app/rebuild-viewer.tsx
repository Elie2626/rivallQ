'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Monitor, Smartphone, Download, Globe, Code2,
  CheckCircle2, Loader2, ExternalLink, Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusIndicator } from '@/components/ui/status-indicator'
import { toast } from 'sonner'
import type { Rebuild } from '@/types'

interface Props { rebuild: Rebuild }

export function RebuildViewer({ rebuild }: Props) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [unlockLoading, setUnlockLoading] = useState(false)
  const [wpLoading, setWpLoading] = useState(false)

  const isPaid = rebuild.payment_status === 'paid'

  const handleUnlockDownload = async () => {
    setUnlockLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'rebuild', audit_id: rebuild.audit_id, rebuild_id: rebuild.id }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setUnlockLoading(false)
  }
  const [showWpForm, setShowWpForm] = useState(false)
  const [wpForm, setWpForm] = useState({ url: '', username: '', password: '', appPassword: '' })

  const handleDownload = async () => {
    setDownloadLoading(true)
    try {
      const res = await fetch(`/api/export/zip?rebuild_id=${rebuild.id}`)
      if (!res.ok) throw new Error('Export échoué')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `rivallq-site-${rebuild.id.slice(0, 8)}.zip`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Export téléchargé !')
    } catch {
      toast.error('Erreur lors de l\'export')
    } finally {
      setDownloadLoading(false)
    }
  }

  const handleWpInstall = async (e: React.FormEvent) => {
    e.preventDefault()
    setWpLoading(true)
    try {
      const res = await fetch('/api/rebuild/wordpress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rebuild_id: rebuild.id, ...wpForm }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Installation WordPress lancée ! Vérifiez votre site dans quelques minutes.')
      setShowWpForm(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur WordPress')
    } finally {
      setWpLoading(false)
    }
  }

  if (rebuild.status === 'generating') {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-6"
        >
          <Loader2 className="h-6 w-6 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-zinc-100 mb-2">Génération en cours…</h1>
        <p className="text-zinc-500 text-sm">Claude génère votre site optimisé. Cela prend 1 à 2 minutes.</p>
        <p className="text-xs text-zinc-600 mt-4">Restez sur cette page, nous vous notifierons dès que c&apos;est prêt.</p>
      </div>
    )
  }

  if (rebuild.status === 'failed') {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-zinc-100 mb-2">Génération échouée</h1>
        <p className="text-zinc-500 text-sm mb-6">{rebuild.error_message}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Réessayer</Button>
      </div>
    )
  }

  const previewHtml = rebuild.homepage_html
    ? `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script src="https://cdn.tailwindcss.com"></script>${rebuild.homepage_css ? `<style>${rebuild.homepage_css}</style>` : ''}</head><body>${rebuild.homepage_html}</body></html>`
    : '<html><body><p style="font-family:sans-serif;color:#666;padding:2rem">Prévisualisation non disponible</p></body></html>'

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-1">Votre site optimisé</h1>
          <div className="flex items-center gap-3">
            <StatusIndicator status={rebuild.status} />
            {rebuild.meta_title && (
              <span className="text-xs text-zinc-500 truncate max-w-xs">{rebuild.meta_title}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isPaid ? (
            <>
              <Button
                variant="gradient"
                size="sm"
                loading={downloadLoading}
                onClick={handleDownload}
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                Télécharger ZIP
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowWpForm(!showWpForm)}
                leftIcon={<Globe className="h-3.5 w-3.5" />}
              >
                Installer sur WordPress
              </Button>
            </>
          ) : (
            <Button
              variant="gradient"
              size="sm"
              loading={unlockLoading}
              onClick={handleUnlockDownload}
              leftIcon={<Lock className="h-3.5 w-3.5" />}
            >
              Télécharger le ZIP — 79€
            </Button>
          )}
        </div>
      </div>

      {/* WordPress form */}
      {showWpForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
        >
          <h3 className="text-sm font-semibold text-zinc-200 mb-4">Connexion WordPress</h3>
          <form onSubmit={handleWpInstall} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-zinc-500 mb-1 block">URL WordPress</label>
              <input
                type="url"
                placeholder="https://monsite.com"
                required
                value={wpForm.url}
                onChange={e => setWpForm({ ...wpForm, url: e.target.value })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Identifiant admin</label>
              <input
                type="text"
                placeholder="admin"
                required
                value={wpForm.username}
                onChange={e => setWpForm({ ...wpForm, username: e.target.value })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Mot de passe d&apos;application</label>
              <input
                type="password"
                placeholder="xxxx xxxx xxxx xxxx"
                required
                value={wpForm.appPassword}
                onChange={e => setWpForm({ ...wpForm, appPassword: e.target.value })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
              />
              <p className="text-[10px] text-zinc-600 mt-1">Paramètres → Sécurité → Mots de passe d&apos;application</p>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowWpForm(false)}>Annuler</Button>
              <Button type="submit" variant="gradient" size="sm" loading={wpLoading}>Installer</Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* View mode */}
        <div className="flex rounded-xl border border-zinc-800 p-1">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${viewMode === 'preview' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <ExternalLink className="h-3.5 w-3.5" /> Aperçu
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${viewMode === 'code' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Code2 className="h-3.5 w-3.5" /> Code HTML
          </button>
        </div>

        {/* Device (preview only) */}
        {viewMode === 'preview' && (
          <div className="flex rounded-xl border border-zinc-800 p-1">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${device === 'desktop' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
              aria-label="Desktop"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${device === 'mobile' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
              aria-label="Mobile"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Pages tabs */}
        {rebuild.pages && rebuild.pages.length > 0 && (
          <div className="flex gap-1">
            <Badge variant="default">Homepage</Badge>
            {rebuild.pages.map(p => (
              <Badge key={p.slug} variant="secondary">{p.title}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* Paywall notice */}
      {!isPaid && (
        <div className="rounded-2xl border border-violet-500/30 bg-violet-600/10 p-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Lock className="h-4 w-4 text-violet-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-violet-300">Aperçu gratuit — Téléchargement verrouillé</p>
              <p className="text-xs text-zinc-500 mt-0.5">Payez 79€ pour débloquer le ZIP et l&apos;installation WordPress.</p>
            </div>
          </div>
          <Button variant="gradient" size="sm" loading={unlockLoading} onClick={handleUnlockDownload} leftIcon={<Download className="h-3.5 w-3.5" />}>
            Débloquer — 79€
          </Button>
        </div>
      )}

      {/* Viewer */}
      <div className={`rounded-2xl border border-zinc-800 overflow-hidden transition-all ${viewMode === 'preview' ? 'bg-white' : 'bg-zinc-950'}`}>
        {viewMode === 'preview' ? (
          <div className={`transition-all mx-auto ${device === 'mobile' ? 'max-w-sm' : 'w-full'}`}>
            <iframe
              srcDoc={previewHtml}
              title="Aperçu du site optimisé"
              className="w-full border-0"
              style={{ height: '700px' }}
              sandbox="allow-scripts"
            />
          </div>
        ) : (
          <pre className="p-6 text-xs text-zinc-300 overflow-auto max-h-[700px] font-mono leading-relaxed">
            <code>{rebuild.homepage_html ?? 'Aucun HTML disponible'}</code>
          </pre>
        )}
      </div>

      {/* Improvements summary */}
      {rebuild.meta_title && (
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Meta Title', value: rebuild.meta_title, icon: CheckCircle2 },
            { label: 'Meta Description', value: rebuild.meta_description ?? '—', icon: CheckCircle2 },
            { label: 'Pages générées', value: `${1 + (rebuild.pages?.length ?? 0)} page(s)`, icon: CheckCircle2 },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs text-zinc-500">{label}</span>
              </div>
              <p className="text-sm text-zinc-300 font-medium line-clamp-2">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
