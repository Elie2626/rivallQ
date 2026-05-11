'use client'

import dynamic from 'next/dynamic'

const GenerativeArtScene = dynamic(
  () => import('@/components/ui/anomalous-matter-hero').then(m => m.GenerativeArtScene),
  { ssr: false, loading: () => null }
)

/**
 * Fond animé pour les sections hero de chaque page.
 * La sphère est rendue dans un container de taille fixe (600×600 px)
 * centré dans la section — taille identique sur toutes les pages.
 * À placer dans un conteneur `relative overflow-hidden`.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Sphère wireframe dans un container fixe centré */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.17]"
        style={{ width: 600, height: 600 }}
      >
        <GenerativeArtScene />
      </div>
      {/* Lueur rouge ambiante */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[110px]" />
      {/* Dégradé bas */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  )
}
