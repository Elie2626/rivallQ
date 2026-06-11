'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { getDomain } from '@/lib/utils/format'
import type { Audit } from '@/types'

const GenerativeArtScene = dynamic(
  () => import('@/components/ui/anomalous-matter-hero').then(mod => mod.GenerativeArtScene),
  { ssr: false, loading: () => null }
)

const steps = [
  { key: 'scraping', label: 'Scraping du site…', sub: 'Lecture du code source, images, liens' },
  { key: 'seo', label: 'Analyse SEO en cours…', sub: 'Balises, mots-clés, vitesse, structure' },
  { key: 'ux', label: 'Analyse UX & conversion…', sub: 'Copywriting, CTA, hiérarchie visuelle' },
  { key: 'keywords', label: 'Recherche de mots-clés…', sub: 'Opportunités et analyse concurrentielle' },
  { key: 'report', label: 'Génération du rapport…', sub: 'Recommandations personnalisées par l\'IA' },
]

interface Props {
  audit: Audit
}

export function AuditProcessing({ audit }: Props) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => { setIsDesktop(window.innerWidth >= 1024) }, [])

  // Poll every 3 seconds to check if analysis is done
  useEffect(() => {
    let rebuildStarted = false

    const interval = setInterval(async () => {
      const res = await fetch(`/api/audit/${audit.id}/status`)
      if (!res.ok) return
      const data = await res.json()

      if (data.status === 'completed' && !rebuildStarted) {
        rebuildStarted = true
        // Await the start call — it returns as soon as the Firestore record is
        // created (before generation begins), so this is fast (< 2 s).
        try {
          await fetch('/api/rebuild/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audit_id: audit.id }),
          })
        } catch {
          // Non-fatal — AuditResults will retry if rebuild_status is missing
        }
        router.refresh()
      } else if (data.status === 'failed') {
        router.refresh()
      }
    }, 3000)

    // Animate through steps
    const stepInterval = setInterval(() => {
      setCurrentStep(s => Math.min(s + 1, steps.length - 1))
    }, 4000)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [audit.id, router])

  return (
    <div className="max-w-lg mx-auto text-center py-8">
      {/* Animation — même sphère que le header, taille réduite */}
      <div className="relative mx-auto mb-6" style={{ width: 200, height: 200 }}>
        <div className="absolute inset-0 opacity-80">
          <GenerativeArtScene isStatic={!isDesktop} />
        </div>
        {/* Lueur violette ambiante */}
        <div className="absolute inset-0 rounded-full bg-violet-600/15 blur-2xl" />
      </div>

      <h1 className="text-2xl font-bold text-zinc-100 mb-2">Analyse en cours…</h1>
      <p className="text-zinc-500 text-sm mb-8">
        Analyse de <strong className="text-zinc-300">{getDomain(audit.url)}</strong> — restez sur cette page.
      </p>

      {/* Steps */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-left">
        {steps.map(({ key, label, sub }, i) => {
          const done = i < currentStep
          const active = i === currentStep
          return (
            <div
              key={key}
              className={`flex items-start gap-3 py-3 border-b border-zinc-800 last:border-0 transition-opacity ${
                i > currentStep ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  done
                    ? 'bg-emerald-500 text-white'
                    : active
                    ? 'bg-violet-500 text-white animate-pulse'
                    : 'bg-zinc-700 text-zinc-500'
                }`}
                aria-hidden="true"
              >
                {done ? '✓' : i + 1}
              </span>
              <div>
                <p className={`text-sm font-medium ${active ? 'text-violet-300' : done ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {label}
                </p>
                <p className="text-xs text-zinc-600">{sub}</p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-zinc-600 mt-6">Temps estimé : 5 minutes selon la taille du site</p>
    </div>
  )
}
