import type { Metadata } from 'next'
import { DevisQuestionnaire } from '@/components/app/devis-questionnaire'
import { DevisPromoBadge } from '@/components/public/devis-promo-badge'

export const metadata: Metadata = {
  title: 'Devis Création Site Internet Gratuit — Prix en Temps Réel | RivallQ',
  description:
    "Devis création site internet gratuit et sans engagement. Prix création site web professionnel calculé en temps réel : site vitrine dès 500€, création site web sur mesure avec chatbot, design 3D. Réponse sous 24h.",
}

export default function DevisPage() {
  return (
    <section className="min-h-screen py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">
            Création de site
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
            Votre devis{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              en temps réel
            </span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Répondez à quelques questions — le prix s&apos;adapte instantanément.
            Recevez un devis détaillé sous 24h.
          </p>
          {/* Badge promo si active */}
          <DevisPromoBadge />
          {/* Vous avez déjà un site ? */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-2 text-sm text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
            Vous avez déjà un site ? On peut le refondre ou l&apos;améliorer — même tarif.
          </div>
        </div>

        {/* Questionnaire */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-10 backdrop-blur-sm">
          <DevisQuestionnaire />
        </div>
      </div>
    </section>
  )
}
