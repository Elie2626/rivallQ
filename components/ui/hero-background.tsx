'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const GenerativeArtScene = dynamic(
  () => import('@/components/ui/anomalous-matter-hero').then(mod => mod.GenerativeArtScene),
  { ssr: false, loading: () => null }
)

export function HeroBackground() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => { setIsDesktop(window.innerWidth >= 1024) }, [])

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {isDesktop ? (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.17]"
          style={{ width: 600, height: 600 }}
        >
          <GenerativeArtScene />
        </div>
      ) : (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle at 40% 40%, #a78bfa 0%, #6d28d9 40%, transparent 70%)' }}
        />
      )}
      {/* Lueur rouge ambiante */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[110px]" />
      {/* Dégradé bas */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  )
}
