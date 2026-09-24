'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

const stats = [
  { value: '9+', label: 'clients satisfaits' },
  { value: '4,9/5', label: 'note moyenne' },
  { value: '1 sem.', label: 'délai moyen' },
  { value: '100%', label: 'sur mesure' },
]

export function CtaBanner() {
  return (
    <section className="py-24 lg:py-32 bg-black border-t border-white/5">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Stats bar */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mb-16"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-black py-6 px-4 flex flex-col items-center text-center">
              <span className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</span>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </m.div>

        {/* Main CTA */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            Disponible pour votre projet
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Prêt à lancer
            <br />
            <span style={{ color: '#0066FF' }}>votre site web ?</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Devis gratuit en 5 minutes. Livraison en 1 semaine.
            Sans abonnement, sans surprise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-xl"
              style={{ background: '#0066FF', boxShadow: '0 8px 32px rgba(0,102,255,0.4)' }}
            >
              Demander un devis gratuit
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-base transition-all duration-200 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Nous contacter
            </Link>
          </div>

          {/* Mini social proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
            {['selesta.fr', 'closermatch.fr', 'pharm-consult.fr', 'wavore.com', 'botexpress.fr'].map(site => (
              <span key={site} className="font-mono">{site}</span>
            ))}
            <span className="text-gray-700">+ d&apos;autres</span>
          </div>
        </m.div>

      </div>
    </section>
  )
}
