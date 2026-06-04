import type { Metadata } from 'next'
import { CtaBanner } from '@/components/public/cta-banner'
import { FaqFull } from '@/components/public/faq-full'
import { HeroBackground } from '@/components/ui/hero-background'
import { FaqSchema } from '@/components/seo/json-ld'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: "FAQ — Comment Vérifier son Référencement Google & Créer son Site | RivallQ",
  description:
    "Comment savoir si mon site est bien référencé ? Comment obtenir un devis création site internet ? Toutes les réponses : audit SEO automatique, vérification référencement, prix création site web, remboursement.",
  alternates: { canonical: `${BASE}/faq` },
  openGraph: {
    title: 'FAQ RivallQ — Référencement Google & Création Site Web',
    description: "Comment vérifier le référencement de son site ? Devis création site internet ? Toutes les réponses.",
    url: `${BASE}/faq`,
  },
}

const faqItems = [
  { question: "Qu'est-ce que RivallQ ?", answer: "RivallQ est un outil d'audit et de création de sites web propulsé par l'IA. Il analyse votre site en profondeur (SEO, UX, conversion) en 5 minutes, puis vous propose un devis personnalisé pour créer votre nouveau site à partir de 500€." },
  { question: "Comment fonctionne l'analyse IA ?", answer: "RivallQ utilise Firecrawl pour scraper votre site, puis l'IA analyse le SEO, le copywriting, l'UX et les opportunités de conversion. Le tout en moins de 5 minutes." },
  { question: "Quels types de sites sont supportés pour l'audit ?", answer: "Tous les sites web : WordPress, Wix, Squarespace, Webflow, sites custom en HTML/CSS/JS, e-commerce... Si c'est accessible via une URL, RivallQ peut l'analyser." },
  { question: "Que contient exactement l'audit à 9,99€ ?", answer: "Score SEO (0-100), score UX, score de conversion, top 10 des problèmes critiques, analyse des mots-clés, recommandations prioritaires, et un lien vers le questionnaire de devis pour créer votre nouveau site." },
  { question: "Les résultats sont-ils fiables ?", answer: "Oui. L'IA analyse chaque élément du code source, du contenu et de la structure. Les recommandations sont basées sur les meilleures pratiques SEO 2026 et CRO (Conversion Rate Optimization)." },
  { question: "Combien de temps dure l'analyse ?", answer: "Entre 3 et 5 minutes selon la complexité du site. Vous pouvez suivre l'avancement en temps réel sur votre dashboard." },
  { question: "Quelles sont les formules de création de site ?", answer: "Trois formules : Site Vitrine Simple (500€, livré en 24h–1 semaine), Site Vitrine Complet avec chatbot IA (1 000€, 1–2 semaines), Site Premium 3D avec animations avancées (1 500€, 2–3 semaines). Maintenance disponible à 50€/mois." },
  { question: "Comment obtenir un devis de création de site ?", answer: "Rendez-vous sur /devis. Répondez à 5 questions et le prix s'adapte en temps réel. Vous recevez un devis détaillé sous 24h, gratuit et sans engagement." },
  { question: "Le devis est-il sans engagement ?", answer: "Oui, totalement gratuit et sans engagement. Vous ne payez qu'une fois le devis accepté." },
  { question: "Quels moyens de paiement acceptez-vous ?", answer: "Carte bancaire (Visa, Mastercard, Amex), via Stripe. Les paiements sont sécurisés et chiffrés. Nous n'avons jamais accès à vos coordonnées bancaires." },
  { question: "Puis-je me faire rembourser l'audit ?", answer: "Oui, sous 7 jours si vous n'êtes pas satisfait du résultat. Envoyez simplement un email à elieamar2007@gmail.com avec votre numéro de commande." },
  { question: "Que faites-vous avec les données de mon site ?", answer: "Les données scrapées sont utilisées uniquement pour générer votre audit. Elles sont stockées sur des serveurs européens, chiffrées, et jamais revendues à des tiers." },
  { question: "RivallQ est-il conforme au RGPD ?", answer: "Oui. RivallQ est hébergé en Europe, applique le principe de minimisation des données, et vous pouvez demander la suppression de votre compte à tout moment." },
]

export default function FaqPage() {
  return (
    <div className="pt-20">
      <FaqSchema items={faqItems} />
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
