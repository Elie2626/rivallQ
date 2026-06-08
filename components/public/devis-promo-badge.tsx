'use client'

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'
import { isPromoActive, PROMO_END_MS } from '@/lib/promo'

export function DevisPromoBadge() {
  const [active, setActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const update = () => {
      if (!isPromoActive()) { setActive(false); return }
      setActive(true)
      const diff = PROMO_END_MS - Date.now()
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      setTimeLeft(`${h}h${String(m).padStart(2, '0')}`)
    }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  if (!active) return null

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
      <div className="inline-flex items-center gap-2 rounded-2xl border border-orange-500/40 bg-gradient-to-r from-orange-500/15 to-red-500/10 px-5 py-3 text-sm font-semibold text-orange-300">
        <Zap className="h-4 w-4 fill-orange-400 text-orange-400 shrink-0" aria-hidden="true" />
        <span>
          Offre flash <strong className="text-orange-200">-50%</strong> sur tous les tarifs —{' '}
          encore <strong className="text-yellow-300 font-mono">{timeLeft}</strong> pour en profiter
        </span>
      </div>
    </div>
  )
}
