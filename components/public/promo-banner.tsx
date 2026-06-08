'use client'

import { useState, useEffect } from 'react'
import { X, Zap } from 'lucide-react'
import Link from 'next/link'

// ── Date de fin de promo — 48h à partir du lancement (08 juin 2026 09:44 CEST) ──
export const PROMO_END = new Date('2026-06-10T09:44:00+02:00')

export function useIsPromoActive() {
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(Date.now() < PROMO_END.getTime())
  }, [])
  return active
}

function useCountdown() {
  const getTimeLeft = () => {
    const diff = PROMO_END.getTime() - Date.now()
    if (diff <= 0) return null
    return {
      hours:   Math.floor(diff / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
    }
  }

  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft())
    const id = setInterval(() => {
      const t = getTimeLeft()
      setTimeLeft(t)
      if (!t) clearInterval(id)
    }, 1_000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false)
  const timeLeft = useCountdown()

  if (!timeLeft || dismissed) return null

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-2 px-10 text-center text-sm font-medium z-[60]">
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {/* Icône + label */}
        <span className="flex items-center gap-1.5 font-extrabold text-yellow-200 uppercase tracking-wide text-xs sm:text-sm">
          <Zap className="h-4 w-4 fill-yellow-300 text-yellow-300 shrink-0" aria-hidden="true" />
          Offre Flash — 50% de réduction
        </span>

        <span className="hidden sm:inline text-white/50" aria-hidden="true">·</span>
        <span className="hidden sm:inline text-white/80 text-xs">Tous les services à moitié prix</span>
        <span className="text-white/50" aria-hidden="true">·</span>

        {/* Countdown */}
        <span className="text-white/80 text-xs">Se termine dans</span>
        <span
          className="font-mono font-bold text-yellow-200 tabular-nums text-sm bg-black/20 px-2 py-0.5 rounded-md"
          aria-live="off"
          aria-label={`${pad(timeLeft.hours)} heures ${pad(timeLeft.minutes)} minutes ${pad(timeLeft.seconds)} secondes`}
        >
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>

        {/* CTA */}
        <Link
          href="#pricing"
          className="hidden sm:inline-block font-semibold underline underline-offset-2 hover:text-yellow-200 transition-colors text-xs"
        >
          En profiter →
        </Link>
      </div>

      {/* Fermer */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Fermer l'offre promotionnelle"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
