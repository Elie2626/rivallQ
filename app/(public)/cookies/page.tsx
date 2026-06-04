import type { Metadata } from 'next'
import { HeroBackground } from '@/components/ui/hero-background'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'
const LAST_UPDATED = '27 mai 2025'

export const metadata: Metadata = {
  title: 'Politique de cookies — RivallQ',
  description:
    'Politique de gestion des cookies de RivallQ. Quels cookies nous utilisons, pourquoi, et comment les gérer.',
  alternates: { canonical: `${BASE}/cookies` },
  openGraph: {
    title: 'Politique de cookies — RivallQ',
    description: 'Cookies utilisés par RivallQ et comment les gérer.',
    url: `${BASE}/cookies`,
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

type CookieRow = { name: string; type: string; purpose: string; duration: string }

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="text-left py-2 pr-4 font-semibold text-zinc-300">Nom</th>
            <th className="text-left py-2 pr-4 font-semibold text-zinc-300">Type</th>
            <th className="text-left py-2 pr-4 font-semibold text-zinc-300">Finalité</th>
            <th className="text-left py-2 font-semibold text-zinc-300 whitespace-nowrap">Durée</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-zinc-800/60">
              <td className="py-2.5 pr-4 text-zinc-300 font-mono font-medium whitespace-nowrap">{row.name}</td>
              <td className="py-2.5 pr-4 text-zinc-500">{row.type}</td>
              <td className="py-2.5 pr-4 text-zinc-500">{row.purpose}</td>
              <td className="py-2.5 text-zinc-500 whitespace-nowrap">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CookiesPage() {
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
            Politique de cookies
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Transparence totale sur les cookies utilisés par RivallQ.
          </p>
          <p className="text-xs text-zinc-600 mt-4">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12">

          <Section title="1. Qu'est-ce qu'un cookie ?">
            <p>
              Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lorsque vous visitez un site web. Il permet au site de mémoriser des informations sur votre visite, comme votre langue préférée ou votre état de connexion.
            </p>
            <p>
              Les cookies ne contiennent aucun programme exécutable et ne peuvent pas accéder aux données de votre appareil.
            </p>
          </Section>

          <Section title="2. Cookies strictement nécessaires">
            <p>
              Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés. Aucun consentement n&apos;est requis pour leur dépôt.
            </p>
            <CookieTable
              rows={[
                {
                  name: 'sb-access-token',
                  type: 'Session',
                  purpose: 'Authentification — maintient votre connexion active',
                  duration: 'Session',
                },
                {
                  name: 'sb-refresh-token',
                  type: 'Persistant',
                  purpose: 'Renouvellement automatique du token d\'authentification',
                  duration: '30 jours',
                },
                {
                  name: '__stripe_mid',
                  type: 'Persistant',
                  purpose: 'Prévention de la fraude au paiement (Stripe)',
                  duration: '1 an',
                },
                {
                  name: '__stripe_sid',
                  type: 'Session',
                  purpose: 'Sécurité des transactions Stripe',
                  duration: '30 min',
                },
              ]}
            />
          </Section>

          <Section title="3. Cookies de performance et d'analyse">
            <p>
              Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site, afin d&apos;améliorer l&apos;expérience utilisateur. Ils sont déposés uniquement avec votre consentement.
            </p>
            <CookieTable
              rows={[
                {
                  name: '_ga',
                  type: 'Persistant',
                  purpose: 'Mesure d\'audience anonymisée (Google Analytics)',
                  duration: '2 ans',
                },
                {
                  name: '_ga_*',
                  type: 'Persistant',
                  purpose: 'Identifiant de session Google Analytics',
                  duration: '2 ans',
                },
              ]}
            />
            <p className="text-zinc-500 text-xs mt-2">
              Si vous refusez ces cookies, le site fonctionne normalement mais nous ne pouvons pas analyser les statistiques de visite.
            </p>
          </Section>

          <Section title="4. Cookies tiers">
            <p>
              Certains de nos partenaires peuvent déposer des cookies lors de votre utilisation du service :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-zinc-300">Stripe</strong> — cookies de sécurité pour les paiements.{' '}
                <a href="https://stripe.com/fr/cookie-settings" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">
                  Politique Stripe →
                </a>
              </li>
              <li>
                <strong className="text-zinc-300">Google Analytics</strong> — mesure d&apos;audience (si consenti).{' '}
                <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">
                  Politique Google →
                </a>
              </li>
            </ul>
          </Section>

          <Section title="5. Gérer vos préférences">
            <p>
              Vous pouvez contrôler et supprimer les cookies à tout moment via les paramètres de votre navigateur :
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {[
                { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { name: 'Firefox', url: 'https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent' },
                { name: 'Safari', url: 'https://support.apple.com/fr-fr/guide/safari/sfri11471' },
                { name: 'Edge', url: 'https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge' },
              ].map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 hover:border-violet-500/30 hover:text-zinc-100 transition-colors"
                >
                  <span>Gérer sur {name}</span>
                  <span className="text-zinc-600 text-xs">→</span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-zinc-500 text-xs">
              Note : la désactivation de tous les cookies peut altérer le fonctionnement du service (déconnexion automatique, etc.).
            </p>
          </Section>

          <Section title="6. Durée de conservation">
            <p>
              Les cookies persistants sont conservés pour la durée indiquée dans le tableau ci-dessus. Les cookies de session sont automatiquement supprimés à la fermeture de votre navigateur.
            </p>
          </Section>

          <Section title="7. Contact">
            <p>
              Pour toute question sur notre utilisation des cookies :{' '}
              <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                elieamar2007@gmail.com
              </a>
            </p>
          </Section>

        </div>
      </div>
    </div>
  )
}
