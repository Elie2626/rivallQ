'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const GenerativeArtScene = dynamic(
  () => import('@/components/ui/anomalous-matter-hero').then(mod => mod.GenerativeArtScene),
  { ssr: false, loading: () => null }
)

export function GlobalBackground() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => { setIsDesktop(window.innerWidth >= 1024) }, [])

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {isDesktop ? (
        <div className="absolute inset-0 opacity-[0.13]">
          <GenerativeArtScene />
        </div>
      ) : (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle at 40% 40%, #ef4444 0%, #C1121F 40%, #7f1d1d 65%, transparent 80%)' }}
        />
      )}
    </div>
  )
}
