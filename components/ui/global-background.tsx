'use client'

import dynamic from 'next/dynamic'

const GenerativeArtScene = dynamic(
  () => import('@/components/ui/anomalous-matter-hero').then(m => m.GenerativeArtScene),
  { ssr: false, loading: () => null }
)

export function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.13]"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <GenerativeArtScene />
    </div>
  )
}
