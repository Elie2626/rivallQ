import type { Metadata } from 'next'
import { HeroBackground } from '@/components/ui/hero-background'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — RivallQ',
  description:
    'Politique de confidentialité de RivallQ. Comment nous collectons, utilisons et protégeons vos données personnelles. Conformité RGPD.',
  alternates: { canonical: `${BASE}/privacy` },
  openGraph: {
    title: 'Politique de confidentialité — RivallQ',
    description: 'Vos données, vos droits. Politique de confidentialité conforme au RGPD.',
    url: `${BASE}/privacy`,
  },
}

const LAST_UPDATED = '27 mai 2025'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">{title}</h2>
      <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">{children}</div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-zinc-200 mb-2">{title}</h3>
      <div className="space-y-2 text-sm text-zinc-400 leading-relaxed">{children}</div>
    </div>
  )
}

function Table({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="text-left py-2 pr-4 font-semibold text-zinc-300 whitespace-nowrap">Donnée</th>
            <th className="text-left py-2 pr-4 font-semibold text-zinc-300">Finalité</th>
            <th className="text-left py-2 pr-4 font-semibold text-zinc-300 whitespace-nowrap">Base légale</th>
            <th className="text-left py-2 font-semibold text-zinc-300 whitespace-nowrap">Conservation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([data, purpose, legal, retention]) => (
            <tr key={data} className="border-b border-zinc-800/60">
              <td className="py-2.5 pr-4 text-zinc-300 font-medium whitespace-nowrap">{data}</td>
              <td className="py-2.5 pr-4 text-zinc-500">{purpose}</td>
              <td className="py-2.5 pr-4 text-zinc-500">{legal}</td>
              <td className="py-2.5 text-zinc-500">{retention}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PrivacyPage() {
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
            Politique de confidentialité
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Vos données vous appartiennent. Voici exactement comment nous les traitons.
          </p>
          <p className="text-xs text-zinc-600 mt-4">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12">

          {/* Intro */}
          <div className="mb-10 p-5 rounded-xl border border-violet-500/20 bg-violet-500/5 text-sm text-zinc-400 leading-relaxed">
            La présente politique de confidentialité décrit comment <strong className="text-zinc-200">RivallQ</strong> (ci-après «&nbsp;nous&nbsp;», «&nbsp;notre&nbsp;», «&nbsp;nos&nbsp;») collecte, utilise et protège les informations personnelles que vous nous fournissez lorsque vous utilisez notre service accessible sur <strong className="text-zinc-200">rivallq.com</strong>. Elle est conforme au Règlement Général sur la Protection des Données (RGPD — UE 2016/679).
          </div>

          <Section title="1. Responsable du traitement">
            <p>
              <strong className="text-zinc-200">RivallQ</strong><br />
              Email : <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">elieamar2007@gmail.com</a><br />
              Site : <a href="https://rivallq.com" className="text-violet-400 hover:text-violet-300 transition-colors">rivallq.com</a>
            </p>
            <p>
              Pour toute question relative à la protection de vos données, vous pouvez nous contacter à l&apos;adresse ci-dessus.
            </p>
          </Section>

          <Section title="2. Données collectées et finalités">
            <p>Nous collectons uniquement les données nécessaires au fonctionnement du service.</p>

            <Table
              rows={[
                ['Adresse email', 'Création de compte, authentification, communications', 'Contrat', '3 ans après dernière activité'],
                ['URL du site analysé', 'Réalisation de l\'audit et amélioration du site', 'Contrat', 'Durée du compte + 1 an'],
                ['Résultats d\'audit', 'Affichage des recommandations, historique', 'Contrat', 'Durée du compte + 1 an'],
                ['Données de paiement', 'Facturation (traitées par Stripe, non stockées par nous)', 'Contrat', 'Selon politique Stripe'],
                ['Logs techniques', 'Sécurité, débogage, prévention des abus', 'Intérêt légitime', '90 jours'],
                ['Cookies de session', 'Authentification et navigation', 'Consentement', 'Session / 30 jours'],
              ]}
            />
          </Section>

          <Section title="3. Base légale des traitements">
            <p>Nos traitements reposent sur les bases légales suivantes au sens de l&apos;article 6 du RGPD :</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li><strong className="text-zinc-300">Exécution du contrat</strong> — traitement nécessaire à la fourniture du service acheté.</li>
              <li><strong className="text-zinc-300">Intérêt légitime</strong> — sécurité de la plateforme, prévention des fraudes, amélioration du service.</li>
              <li><strong className="text-zinc-300">Consentement</strong> — communications marketing, cookies non essentiels (révocable à tout moment).</li>
              <li><strong className="text-zinc-300">Obligation légale</strong> — conservation des données de facturation (art. L.123-22 C.com.).</li>
            </ul>
          </Section>

          <Section title="4. Sous-traitants et destinataires">
            <p>Nous faisons appel à des prestataires techniques soigneusement sélectionnés :</p>

            <SubSection title="Hébergement & infrastructure">
              <p><strong className="text-zinc-300">Vercel Inc.</strong> (États-Unis) — hébergement de l&apos;application. Données transférées sous clause contractuelles types (CCT) de la Commission européenne.</p>
              <p><strong className="text-zinc-300">Google Firebase / Firestore</strong> (EU) — base de données. Serveurs en région <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">europe-west</code>.</p>
            </SubSection>

            <SubSection title="Paiement">
              <p><strong className="text-zinc-300">Stripe Inc.</strong> — traitement des paiements. Certifié PCI-DSS niveau 1. Nous ne stockons jamais vos numéros de carte. <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">Politique Stripe →</a></p>
            </SubSection>

            <SubSection title="Analyse IA">
              <p><strong className="text-zinc-300">Anthropic PBC</strong> — moteur d&apos;analyse IA (Claude). Le contenu de votre site est transmis pour générer les recommandations et les améliorations. Anthropic ne conserve pas ces données au-delà du traitement. <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">Politique Anthropic →</a></p>
            </SubSection>

            <SubSection title="Scraping">
              <p><strong className="text-zinc-300">Firecrawl</strong> — extraction du contenu de votre site web pour l&apos;analyse. Seul le contenu public est accédé.</p>
            </SubSection>

            <p className="mt-4 text-zinc-500 text-xs">Aucune de vos données n&apos;est vendue à des tiers à des fins commerciales ou publicitaires.</p>
          </Section>

          <Section title="5. Transferts hors UE">
            <p>
              Certains de nos sous-traitants (Vercel, Anthropic, Stripe) sont établis aux États-Unis. Ces transferts sont encadrés par les <strong className="text-zinc-300">clauses contractuelles types</strong> (CCT) approuvées par la Commission européenne, ou par le <strong className="text-zinc-300">Data Privacy Framework UE-États-Unis</strong> pour les entreprises certifiées.
            </p>
          </Section>

          <Section title="6. Sécurité">
            <p>Nous appliquons des mesures techniques et organisationnelles adaptées :</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Chiffrement TLS 1.3 pour toutes les communications</li>
              <li>Données au repos chiffrées (AES-256) sur Firebase</li>
              <li>Authentification sécurisée avec hachage des mots de passe (bcrypt)</li>
              <li>Accès aux données de production restreint aux seuls développeurs autorisés</li>
              <li>Journalisation des accès et alertes d&apos;anomalies</li>
            </ul>
          </Section>

          <Section title="7. Cookies">
            <p>Nous utilisons les cookies suivants :</p>

            <SubSection title="Cookies essentiels (pas de consentement requis)">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">sb-access-token</code> — session d&apos;authentification Supabase. Durée : session.</li>
                <li><code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">sb-refresh-token</code> — renouvellement du token. Durée : 30 jours.</li>
              </ul>
            </SubSection>

            <SubSection title="Cookies analytiques (consentement requis)">
              <p>Si vous acceptez, nous utilisons des outils d&apos;analyse d&apos;audience anonymisés pour améliorer le service. Vous pouvez refuser sans impact sur le fonctionnement du site.</p>
            </SubSection>

            <p>Vous pouvez gérer ou supprimer les cookies via les paramètres de votre navigateur à tout moment.</p>
          </Section>

          <Section title="8. Vos droits (RGPD)">
            <p>Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {[
                { right: 'Droit d\'accès', desc: 'Obtenir une copie de vos données (art. 15)' },
                { right: 'Droit de rectification', desc: 'Corriger des données inexactes (art. 16)' },
                { right: 'Droit à l\'effacement', desc: 'Supprimer votre compte et vos données (art. 17)' },
                { right: 'Droit à la portabilité', desc: 'Recevoir vos données dans un format lisible par machine (art. 20)' },
                { right: 'Droit d\'opposition', desc: 'Vous opposer au traitement basé sur l\'intérêt légitime (art. 21)' },
                { right: 'Droit à la limitation', desc: 'Suspendre temporairement le traitement (art. 18)' },
              ].map(({ right, desc }) => (
                <div key={right} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <p className="text-xs font-semibold text-zinc-200 mb-1">{right}</p>
                  <p className="text-xs text-zinc-500">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              Pour exercer l&apos;un de ces droits, contactez-nous à <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">elieamar2007@gmail.com</a>. Nous répondons sous <strong className="text-zinc-300">30 jours maximum</strong>.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <strong className="text-zinc-300">CNIL</strong> : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">cnil.fr</a>.
            </p>
          </Section>

          <Section title="9. Durée de conservation">
            <p>
              Vos données sont conservées le temps nécessaire à la fourniture du service. À la fermeture de votre compte, vos données personnelles sont supprimées sous <strong className="text-zinc-300">30 jours</strong>, à l&apos;exception des données de facturation conservées <strong className="text-zinc-300">10 ans</strong> conformément à l&apos;obligation légale comptable (art. L.123-22 du Code de commerce).
            </p>
          </Section>

          <Section title="10. Mineurs">
            <p>
              Le service RivallQ est destiné aux personnes majeures (+18 ans). Nous ne collectons pas sciemment de données concernant des mineurs. Si vous avez connaissance qu&apos;un mineur nous a communiqué des données, contactez-nous pour suppression immédiate.
            </p>
          </Section>

          <Section title="11. Modifications de cette politique">
            <p>
              Nous pouvons mettre à jour cette politique pour refléter l&apos;évolution de nos pratiques ou des obligations légales. En cas de modification substantielle, nous vous en informerons par email ou par une notification dans l&apos;application au moins <strong className="text-zinc-300">15 jours avant</strong> l&apos;entrée en vigueur.
            </p>
            <p>
              La version en vigueur est toujours disponible sur cette page avec la date de dernière mise à jour.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              Pour toute question sur cette politique ou vos données personnelles :
            </p>
            <div className="mt-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 text-sm">
              <p className="font-semibold text-zinc-200 mb-1">RivallQ — Délégué à la protection des données</p>
              <p>Email : <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">elieamar2007@gmail.com</a></p>
              <p className="text-zinc-500 text-xs mt-2">Réponse garantie sous 72 heures ouvrées.</p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}
