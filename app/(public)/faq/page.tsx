import type { Metadata } from 'next'
import { CtaBanner } from '@/components/public/cta-banner'
import { FaqFull } from '@/components/public/faq-full'
import { HeroBackground } from '@/components/ui/hero-background'
import { FaqSchema } from '@/components/seo/json-ld'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur l'audit SEO par IA",
  description:
    "Toutes vos questions sur RivallQ : comment fonctionne l'audit SEO IA, ce que contient le site régénéré, paiement, remboursement, RGPD et WordPress.",
  alternates: { canonical: `${BASE}/faq` },
  openGraph: {
    title: 'FAQ RivallQ — Audit SEO & Reconstruction IA',
    description: "Réponses à toutes vos questions sur l'audit SEO par IA RivallQ.",
    url: `${BASE}/faq`,
  },
}

const faqItems = [
  { question: "Qu'est-ce que RivallQ ?", answer: "RivallQ est un SaaS d'audit et d'optimisation de sites web propulsé par l'IA. Il scrape votre site, l'analyse en profondeur (SEO, UX, conversion), puis génère automatiquement une version améliorée." },
  { question: "Comment fonctionne l'analyse IA ?", answer: "RivallQ utilise Firecrawl pour scraper votre site, puis Tsitsit pour analyser le SEO, le copywriting, l'UX et les opportunités de conversion. Le tout en moins de 5 minutes." },
  { question: "Quels types de sites sont supportés ?", answer: "Tous les sites web : WordPress, Wix, Squarespace, Webflow, sites custom en HTML/CSS/JS, e-commerce... Si c'est accessible via une URL, RivallQ peut l'analyser." },
  { question: "Que contient exactement l'audit à 9,99€ ?", answer: "Score SEO (0-100), score UX, score de conversion, top 10 des problèmes critiques, analyse des mots-clés, recommandations prioritaires, et un teaser du site régénéré." },
  { question: "Les résultats sont-ils fiables ?", answer: "Oui. Tsitsit analyse chaque élément du code source, du contenu et de la structure. Les recommandations sont basées sur les meilleures pratiques SEO 2026 et CRO (Conversion Rate Optimization)." },
  { question: "Combien de temps dure l'analyse ?", answer: "Entre 3 et 5 minutes selon la complexité du site. Vous pouvez suivre l'avancement en temps réel sur votre dashboard." },
  { question: "Que contient le site régénéré (79€) ?", answer: "Homepage complète optimisée, pages clés (À propos, Services, Contact), copywriting réécrit par Tsitsit, SEO on-page amélioré, export ZIP en HTML/CSS avec Tailwind CSS." },
  { question: "Le design est-il personnalisable ?", answer: "Le site généré utilise les couleurs et la charte de votre site original. Vous pouvez ensuite personnaliser librement le code HTML/CSS livré." },
  { question: "Faut-il des compétences techniques ?", answer: "Non. Pour l'export ZIP, un hébergeur basique suffit (OVH, ionos, etc.). Pour la publication WordPress, tout est automatisé — vous n'avez rien à faire." },
  { question: "Quels moyens de paiement acceptez-vous ?", answer: "Carte bancaire (Visa, Mastercard, Amex), via Stripe. Les paiements sont sécurisés et chiffrés. Nous n'avons jamais accès à vos coordonnées bancaires." },
  { question: "Puis-je me faire rembourser ?", answer: "Oui, sous 7 jours si vous n'êtes pas satisfait du résultat. Envoyez simplement un email à support@rivallq.io avec votre numéro de commande." },
  { question: "L'abonnement est-il sans engagement ?", answer: "Oui. L'abonnement mensuel à 29€/mois peut être annulé à tout moment depuis votre espace facturation, sans frais ni préavis." },
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
