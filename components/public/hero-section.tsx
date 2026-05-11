'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Zap, Globe, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

// Three.js — client uniquement, pas de SSR
const GenerativeArtScene = dynamic(
  () => import('@/components/ui/anomalous-matter-hero').then(m => m.GenerativeArtScene),
  { ssr: false, loading: () => null }
)

const trustBadges = [
  { icon: Star,       text: '4.9/5 satisfaction' },
  { icon: Globe,      text: '+2 000 sites analysés' },
  { icon: TrendingUp, text: '+47% conversions en moyenne' },
]

export function HeroSection() {
  const [url, setUrl]         = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmed = url.trim()
    if (!trimmed) { setError('Veuillez entrer une URL'); return }
    setLoading(true)
    router.push(`/register?url=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">

      {/* ── Sphère Three.js — petite sur mobile, plein écran desktop ── */}
      {/* Mobile : 600×600 centré (= HeroBackground des autres pages) · Desktop : plein écran */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute opacity-[0.17]
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
            lg:inset-0 lg:w-full lg:h-full lg:translate-x-0 lg:translate-y-0 lg:opacity-[0.18]"
        >
          <GenerativeArtScene />
        </div>
      </div>

      {/* ── Glows ambiants ─────────────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-violet-500/6 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-600 mb-8">
              <Zap className="h-3 w-3" aria-hidden="true" />
              Propulsé par Claude AI · Analyse en 5 minutes
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-zinc-100 leading-[1.1] tracking-tight mb-6"
          >
            Votre site web{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              optimisé par l&apos;IA
            </span>{' '}
            en 5 minutes
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Entrez votre URL. RivallQ scrape, analyse le SEO, l&apos;UX et les conversions,
            puis génère automatiquement une version améliorée de votre site.
          </motion.p>

          {/* Formulaire URL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
              <div className="flex-1 relative">
                <Globe
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://monsite.com"
                  aria-label="URL de votre site web"
                  aria-describedby={error ? 'url-error' : undefined}
                  aria-invalid={error ? 'true' : undefined}
                  className={cn(
                    'w-full h-14 pl-11 pr-4 rounded-2xl text-base text-zinc-100 placeholder:text-zinc-600',
                    'bg-zinc-900/80 border backdrop-blur-sm',
                    'transition-all duration-200 outline-none',
                    'focus:ring-2 focus:ring-violet-500/40',
                    error
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-zinc-700/60 hover:border-zinc-600 focus:border-violet-500'
                  )}
                />
              </div>
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                loading={loading}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="h-14 px-8 rounded-2xl text-base font-semibold whitespace-nowrap"
              >
                Auditer maintenant
              </Button>
            </form>

            {error && (
              <p id="url-error" className="text-sm text-red-400 mb-4" role="alert">
                {error}
              </p>
            )}

            <p className="text-xs text-violet-600 font-medium">
              Audit initial à 9,99€ · Aucun abonnement requis · Résultats en 5 minutes
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            {trustBadges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-zinc-500">
                <Icon className="h-4 w-4 text-violet-400 shrink-0" aria-hidden="true" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Preview card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-1 shadow-2xl shadow-black/40 max-w-4xl mx-auto"
          >
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4 h-7 rounded-lg bg-zinc-800/80 flex items-center px-3">
                <span className="text-xs text-zinc-600">app.rivallq.io/audit/results</span>
              </div>
            </div>

            {/* Mock dashboard */}
            <div className="p-6 grid grid-cols-4 gap-4">
              {[
                { label: 'Score SEO',   value: 99, color: 'text-green-400' },
                { label: 'Score UX',    value: 95, color: 'text-green-400' },
                { label: 'Conversion',  value: 70, color: 'text-yellow-400' },
                { label: 'Global',      value: 88, color: 'text-violet-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <div className={cn('text-3xl font-bold mb-1', color)}>{value}</div>
                  <div className="text-xs text-zinc-600">{label}</div>
                  <div className="mt-2 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={cn('h-full rounded-full bg-current opacity-60', color)}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
