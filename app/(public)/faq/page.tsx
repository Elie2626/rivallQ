import type { Metadata } from 'next'
import { CtaBanner } from '@/components/public/cta-banner'
import { FaqFull } from '@/components/public/faq-full'
import { HeroBackground } from '@/components/ui/hero-background'

export const metadata: Metadata = {
  title: 'FAQ — RivallQ',
  description: 'Toutes les réponses à vos questions sur RivallQ : comment ça marche, sécurité, remboursement, WordPress...',
}

export default function FaqPage() {
  return (
    <div className="pt-20">
      <div className="text-center py-20 px-4 relative overflow-hidden">
        <HeroBackground />
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">FAQ</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">Questions fréquentes</h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Tout ce que vous voulez savoir sur RivallQ.
          </p>
        </div>
      </div>
      <FaqFull />
      <CtaBanner />
    </div>
  )
}
