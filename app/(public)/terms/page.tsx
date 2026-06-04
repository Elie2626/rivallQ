import type { Metadata } from 'next'
import { HeroBackground } from '@/components/ui/hero-background'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'
const LAST_UPDATED = '27 mai 2025'

export const metadata: Metadata = {
  title: "Conditions d'utilisation — RivallQ",
  description:
    "Conditions générales d'utilisation de RivallQ. Accès au service, paiements, responsabilités, propriété intellectuelle et résiliation.",
  alternates: { canonical: `${BASE}/terms` },
  openGraph: {
    title: "Conditions d'utilisation — RivallQ",
    description: "CGU de RivallQ — audit SEO et optimisation de site par IA.",
    url: `${BASE}/terms`,
  },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">{title}</h2>
      <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="text-center py-16 px-4 relative overflow-hidden">
        <HeroBackground />
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">
            Légal
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
            Conditions d&apos;utilisation
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Les règles qui encadrent l&apos;utilisation de RivallQ.
          </p>
          <p className="text-xs text-zinc-600 mt-4">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12">

          {/* Intro */}
          <div className="mb-10 p-5 rounded-xl border border-violet-500/20 bg-violet-500/5 text-sm text-zinc-400 leading-relaxed">
            En accédant à <strong className="text-zinc-200">rivallq.com</strong> et en utilisant nos services, vous acceptez les présentes conditions générales d&apos;utilisation (CGU). Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le service.
          </div>

          <Section title="1. Présentation du service">
            <p>
              RivallQ est un service SaaS d&apos;analyse et d&apos;optimisation de sites web par intelligence artificielle. Il permet notamment d&apos;obtenir un audit SEO, UX et conversion de votre site, ainsi qu&apos;une version améliorée de celui-ci, exportable en HTML/CSS ou publiable sur WordPress.
            </p>
            <p>
              Le service est édité et exploité par <strong className="text-zinc-200">RivallQ</strong>, joignable à <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">elieamar2007@gmail.com</a>.
            </p>
          </Section>

          <Section title="2. Accès au service">
            <p>
              L&apos;accès au service nécessite la création d&apos;un compte avec une adresse email valide. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les actions effectuées depuis votre compte.
            </p>
            <p>
              Vous devez être âgé d&apos;au moins <strong className="text-zinc-300">18 ans</strong> pour utiliser le service. En créant un compte, vous déclarez remplir cette condition.
            </p>
            <p>
              RivallQ se réserve le droit de suspendre ou de résilier tout compte en cas de violation des présentes CGU, d&apos;utilisation abusive ou de comportement frauduleux.
            </p>
          </Section>

          <Section title="3. Tarification et paiements">
            <p>
              Les tarifs en vigueur sont affichés sur la page <a href="/pricing" className="text-violet-400 hover:text-violet-300 transition-colors">Tarifs</a>. Tous les prix sont indiqués en euros (€) hors taxes. La TVA applicable est ajoutée au moment du paiement selon votre pays de résidence.
            </p>
            <p>
              Les paiements sont traités de manière sécurisée par <strong className="text-zinc-300">Stripe</strong>. RivallQ ne stocke jamais vos informations de carte bancaire.
            </p>
            <p>
              Sauf mention contraire, les achats uniques (audit, site optimisé) ne sont pas renouvelés automatiquement. Les abonnements sont renouvelés mensuellement jusqu&apos;à résiliation de votre part.
            </p>
          </Section>

          <Section title="4. Remboursements">
            <p>
              Vous bénéficiez d&apos;une <strong className="text-zinc-300">garantie satisfait ou remboursé de 7 jours</strong> à compter de votre achat. Pour demander un remboursement, contactez-nous à <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">elieamar2007@gmail.com</a> en indiquant votre numéro de commande.
            </p>
            <p>
              Le remboursement sera effectué sur le moyen de paiement d&apos;origine sous 5 à 10 jours ouvrés. Passé ce délai de 7 jours, aucun remboursement ne pourra être accordé sauf cas exceptionnel apprécié par RivallQ.
            </p>
          </Section>

          <Section title="5. Utilisation acceptable">
            <p>En utilisant RivallQ, vous vous engagez à :</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>N&apos;analyser que des sites web dont vous êtes propriétaire ou pour lesquels vous avez une autorisation explicite.</li>
              <li>Ne pas tenter de contourner les limites du service ou d&apos;en extraire les données de manière automatisée (scraping).</li>
              <li>Ne pas utiliser le service à des fins illégales, frauduleuses ou pour porter atteinte aux droits de tiers.</li>
              <li>Ne pas surcharger intentionnellement nos serveurs par des requêtes excessives.</li>
            </ul>
            <p>
              Toute utilisation contraire à ces règles peut entraîner la suspension immédiate de votre compte sans remboursement.
            </p>
          </Section>

          <Section title="6. Propriété intellectuelle">
            <p>
              L&apos;ensemble du service RivallQ — code source, interface, algorithmes, marque, logo — est la propriété exclusive de RivallQ et est protégé par les lois sur la propriété intellectuelle.
            </p>
            <p>
              Les résultats d&apos;audit et le code HTML/CSS généré pour votre site vous appartiennent. Vous disposez d&apos;une licence non-exclusive, non-transférable pour les utiliser sur votre propre site web.
            </p>
            <p>
              Vous conservez l&apos;intégralité des droits sur le contenu original de votre site (textes, images, logo). En le soumettant à notre service, vous nous accordez une licence limitée pour le traiter dans le cadre de l&apos;analyse.
            </p>
          </Section>

          <Section title="7. Disponibilité et maintenance">
            <p>
              Nous nous efforçons d&apos;assurer une disponibilité du service 24h/24, 7j/7. Cependant, des interruptions peuvent survenir pour maintenance, mise à jour ou en cas de force majeure.
            </p>
            <p>
              RivallQ ne peut être tenu responsable des interruptions temporaires et ne garantit pas une disponibilité ininterrompue.
            </p>
          </Section>

          <Section title="8. Limitation de responsabilité">
            <p>
              Le service est fourni <strong className="text-zinc-300">«&nbsp;en l&apos;état&nbsp;»</strong>. Les recommandations et le site amélioré générés par l&apos;IA sont fournis à titre indicatif. RivallQ ne garantit pas de résultats spécifiques en termes de référencement ou de conversion.
            </p>
            <p>
              En aucun cas, la responsabilité de RivallQ ne saurait excéder le montant payé par l&apos;utilisateur pour le service concerné au cours des 12 derniers mois.
            </p>
            <p>
              RivallQ ne saurait être tenu responsable des dommages indirects, consécutifs ou de perte de chiffre d&apos;affaires résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service.
            </p>
          </Section>

          <Section title="9. Résiliation">
            <p>
              Vous pouvez résilier votre compte à tout moment depuis votre espace <a href="/settings" className="text-violet-400 hover:text-violet-300 transition-colors">Paramètres</a> ou en nous contactant par email. La résiliation prend effet immédiatement pour les achats uniques ; à la fin de la période en cours pour les abonnements.
            </p>
            <p>
              En cas de résiliation, vos données sont supprimées dans un délai de 30 jours conformément à notre <a href="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">politique de confidentialité</a>.
            </p>
          </Section>

          <Section title="10. Modifications des CGU">
            <p>
              RivallQ se réserve le droit de modifier les présentes CGU à tout moment. Les modifications substantielles vous seront notifiées par email ou dans l&apos;application au moins <strong className="text-zinc-300">15 jours avant</strong> leur entrée en vigueur. La poursuite de l&apos;utilisation du service après notification vaut acceptation des nouvelles conditions.
            </p>
          </Section>

          <Section title="11. Droit applicable">
            <p>
              Les présentes CGU sont soumises au <strong className="text-zinc-300">droit français</strong>. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront compétents.
            </p>
          </Section>

          <Section title="12. Contact">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
              <p className="font-semibold text-zinc-200 mb-1">RivallQ</p>
              <p>Email : <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">elieamar2007@gmail.com</a></p>
              <p className="text-zinc-500 text-xs mt-1">Réponse garantie sous 72 heures ouvrées.</p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}
