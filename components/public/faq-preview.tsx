'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    q: 'Comment fonctionne l\'analyse IA ?',
    a: 'RivallQ utilise Firecrawl pour scraper votre site, puis Claude (l\'IA d\'Anthropic) pour analyser en profondeur le SEO, l\'UX, le copywriting et les opportunités de conversion. Le tout prend moins de 60 secondes.',
  },
  {
    q: 'Mon site doit-il être sur WordPress ?',
    a: 'Non. L\'audit fonctionne sur n\'importe quel site web (WordPress, Wix, Squarespace, site custom…). Seule l\'option publication automatique nécessite WordPress.',
  },
  {
    q: 'Que contient exactement le site régénéré ?',
    a: 'Le plan à 79€ inclut la homepage complète, les pages clés (À propos, Services, Contact) avec copywriting optimisé, SEO on-page amélioré, et le tout exportable en HTML/CSS prêt à déployer.',
  },
  {
    q: 'Puis-je obtenir un remboursement ?',
    a: 'Oui, sous 7 jours si vous n\'êtes pas satisfait du résultat. Contactez simplement support@rivallq.io.',
  },
  {
    q: 'Les données de mon site sont-elles confidentielles ?',
    a: 'Absolument. Vos données sont chiffrées, jamais revendues et stockées sur des serveurs européens conformes au RGPD. Vous restez propriétaire de tout.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = q.replace(/\s+/g, '-').toLowerCase()

  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="text-sm font-medium text-zinc-200">{q}</span>
        <span className="shrink-0 text-zinc-500" aria-hidden="true">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-zinc-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqPreview() {
  return (
    <section className="py-20 lg:py-28 border-t border-zinc-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">Questions fréquentes</h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6">
          {faqs.map(({ q, a }) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/faq">Voir toutes les questions</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
