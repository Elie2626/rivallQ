'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Globe, ArrowRight, Search, Zap, Shield, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/cn'

const features = [
  { icon: Search, label: 'Analyse SEO complète' },
  { icon: TrendingUp, label: 'Score de conversion' },
  { icon: Zap, label: 'Copywriting & UX' },
  { icon: Shield, label: 'Résultats en 5 minutes' },
]

export function NewAuditForm({ isAdmin = false }: { isAdmin?: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [url, setUrl] = useState(searchParams.get('url') ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = url.trim()
    if (!trimmed) {
      setError('Veuillez entrer une URL valide')
      return
    }

    // Basic URL check
    try {
      const normalized = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
      new URL(normalized)
    } catch {
      setError('L\'URL semble invalide. Exemple : https://monsite.com')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error ?? json.data?.error ?? 'Erreur lors de la création de l\'audit')
      }

      const { audit_id, checkout_url } = json.data ?? {}

      // Redirect to Stripe checkout
      if (checkout_url) {
        window.location.href = checkout_url
      } else if (audit_id) {
        router.push(`/audit/${audit_id}`)
      } else {
        throw new Error('Réponse inattendue du serveur')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(message)
      toast.error(message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-xl shadow-violet-500/30 mb-5">
            <Search className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Nouvel audit</h1>
          <p className="text-zinc-500">
            Entrez l&apos;URL de votre site pour obtenir un audit SEO, UX et conversion complet.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="audit-url">
                URL de votre site <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Globe
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="audit-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://monsite.com"
                  aria-label="URL à analyser"
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? 'url-err' : undefined}
                  disabled={loading}
                  className={cn(
                    'w-full h-14 pl-11 pr-4 rounded-xl text-base text-zinc-100 placeholder:text-zinc-600',
                    'bg-zinc-900 border transition-all duration-200 outline-none',
                    'hover:border-zinc-600 focus:ring-2 focus:ring-violet-500/30',
                    loading && 'opacity-50 cursor-not-allowed',
                    error
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-zinc-700 focus:border-violet-500'
                  )}
                />
              </div>
              {error && (
                <p id="url-err" className="mt-2 text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              loading={loading}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="w-full text-base"
            >
              {loading ? 'Préparation de l\'audit…' : isAdmin ? 'Lancer l\'audit — Gratuit' : 'Lancer l\'audit — 4,99€'}
            </Button>

            <p className="text-center text-xs text-zinc-600">
              {isAdmin
                ? '⚡ Compte admin — analyse gratuite et immédiate'
                : 'Paiement sécurisé Stripe · Remboursement sous 7 jours · Résultats en 5 minutes'}
            </p>
          </form>
        </div>

        {/* What you get */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Ce que vous obtenez</p>
          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm text-zinc-400">
                <div className="h-7 w-7 rounded-lg bg-violet-600/20 flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function NewAuditFormWrapper({ isAdmin }: { isAdmin?: boolean }) {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto h-96 rounded-2xl border border-zinc-800 bg-zinc-900/60 animate-pulse" />}>
      <NewAuditForm isAdmin={isAdmin} />
    </Suspense>
  )
}
