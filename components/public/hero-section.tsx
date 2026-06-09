'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, ShieldCheck, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

// Three.js — desktop uniquement (évite 512KB JS sur mobile)
const GenerativeArtScene = dynamic(
  () => import('@/components/ui/anomalous-matter-hero').then(m => m.GenerativeArtScene),
  { ssr: false, loading: () => null }
)

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    // Ne charger Three.js que sur desktop (≥1024px)
    setIsDesktop(window.innerWidth >= 1024)
  }, [])
  return isDesktop
}

const stats = [
  { value: '2 400+', label: 'sites analysés' },
  { value: '4,9/5',  label: 'satisfaction client' },
  { value: '+47%',   label: 'conversions moy.' },
  { value: '4,99€',  label: 'au lieu de 500€+' },
]

// Compteur live : démarre à 100 à minuit, croît ~8/h, incrémente aléatoirement en temps réel
function LiveAuditCounter() {
  const getBaseCount = () => {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(0, 0, 0, 0)
    const hoursElapsed = (now.getTime() - midnight.getTime()) / 3_600_000
    // 100 de base + 8 par heure + variation aléatoire quotidienne fixe (basée sur la date)
    const daySeed = now.getFullYear() * 1000 + now.getMonth() * 31 + now.getDate()
    const dailyVariation = daySeed % 23 // 0-22, pseudo-aléatoire mais stable dans la journée
    return Math.floor(100 + hoursElapsed * 8 + dailyVariation)
  }

  const [count, setCount] = useState<number | null>(null)
  const [flash, setFlash] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setCount(getBaseCount())

    const scheduleNext = () => {
      // Incrément toutes les 40–100 secondes (aléatoire)
      const delay = 40_000 + Math.random() * 60_000
      timerRef.current = setTimeout(() => {
        setCount(c => {
          const next = (c ?? getBaseCount()) + 1
          setFlash(true)
          setTimeout(() => setFlash(false), 600)
          return next
        })
        scheduleNext()
      }, delay)
    }
    scheduleNext()

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  if (count === null) return null

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500 bg-emerald-950 px-5 py-2.5">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <span className="text-sm font-semibold text-zinc-200">
        <span className={`font-bold transition-colors duration-300 ${flash ? 'text-white' : 'text-emerald-300'}`}>
          {count.toLocaleString('fr-FR')}
        </span>
        {' audits lancés aujourd\'hui'}
      </span>
    </div>
  )
}

export function HeroSection() {
  const [url, setUrl]         = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const router = useRouter()
  const isDesktop = useIsDesktop()

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

      {/* ── Sphère Three.js — desktop uniquement (trop lourde sur mobile) ── */}
      {isDesktop && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute opacity-[0.18] inset-0 w-full h-full">
            <GenerativeArtScene />
          </div>
        </div>
      )}

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
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-400 mb-8">
              <span className="animate-pulse h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
              Audit SEO · Création site web dès 500€
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-zinc-100 leading-[1.1] tracking-tight mb-6"
          >
            Votre site est invisible sur Google.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              On règle ça.
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Diagnostic SEO complet en 5 minutes — score, problèmes, mots-clés. Puis je crée votre site vitrine professionnel à la main, sur mesure, dès 500€.
          </motion.p>

          {/* Formulaire URL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-4">
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
                Analyser mon site
              </Button>
            </form>

            {error && (
              <p id="url-error" className="text-sm text-red-400 mb-3" role="alert">
                {error}
              </p>
            )}

            {/* Sous-form reassurances */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-0">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                Remboursé si insatisfait — 7 jours
              </span>
              <span className="text-zinc-700 text-xs" aria-hidden="true">·</span>
              <span className="text-xs text-zinc-500">Sans abonnement</span>
              <span className="text-zinc-700 text-xs" aria-hidden="true">·</span>
              <span className="text-xs text-zinc-500">Résultats en 5 min</span>
            </div>
          </motion.div>

          {/* Compteur live */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="mt-12 flex justify-center"
          >
            <LiveAuditCounter />
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-3"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800/60 rounded-2xl overflow-hidden border border-zinc-800">
              {stats.map(({ value, label }) => (
                <div key={label} className="bg-zinc-900/60 py-5 px-4 flex flex-col items-center">
                  <span className="text-2xl font-bold text-zinc-100 mb-0.5">{value}</span>
                  <span className="text-xs text-zinc-500">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lien démo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 flex justify-center"
          >
            <Link
              href="#demo"
              className="inline-flex items-center gap-2.5 text-sm text-zinc-500 hover:text-violet-400 transition-colors"
            >
              <span
                className="h-7 w-7 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <Play className="h-3 w-3 text-violet-400 fill-violet-400" />
              </span>
              Voir une démonstration
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
