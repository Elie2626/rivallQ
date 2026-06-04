import type { Metadata } from 'next'
import { HeroBackground } from '@/components/ui/hero-background'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'
const LAST_UPDATED = '27 mai 2025'

export const metadata: Metadata = {
  title: 'Mentions légales — RivallQ',
  description:
    "Mentions légales de RivallQ. Éditeur, hébergeur, directeur de publication et informations légales obligatoires.",
  alternates: { canonical: `${BASE}/mentions-legales` },
  openGraph: {
    title: 'Mentions légales — RivallQ',
    description: 'Informations légales obligatoires de RivallQ.',
    url: `${BASE}/mentions-legales`,
  },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">{title}</h2>
      <div className="space-y-2 text-sm text-zinc-400 leading-relaxed">{children}</div>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-2.5 border-b border-zinc-800/60 last:border-0">
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider sm:w-48 shrink-0 mb-0.5 sm:mb-0 sm:pt-0.5">
        {label}
      </span>
      <span className="text-sm text-zinc-300">{value}</span>
    </div>
  )
}

export default function MentionsLegalesPage() {
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
            Mentions légales
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Informations légales obligatoires relatives à l&apos;éditeur du site RivallQ.
          </p>
          <p className="text-xs text-zinc-600 mt-4">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12">

          <Section title="1. Éditeur du site">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
              <InfoRow label="Nom commercial" value="RivallQ" />
              <InfoRow label="Directeur de publication" value="Élie Amar" />
              <InfoRow
                label="Email de contact"
                value={
                  <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                    elieamar2007@gmail.com
                  </a>
                }
              />
              <InfoRow
                label="Site web"
                value={
                  <a href="https://rivallq.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                    rivallq.com
                  </a>
                }
              />
            </div>
          </Section>

          <Section title="2. Hébergement">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
              <InfoRow label="Hébergeur" value="Vercel Inc." />
              <InfoRow label="Adresse" value="440 N Barranca Ave #4133, Covina, CA 91723, États-Unis" />
              <InfoRow
                label="Site"
                value={
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
                    vercel.com
                  </a>
                }
              />
            </div>
            <p className="text-xs text-zinc-500 mt-3">
              Les données sont stockées sur Google Firebase (région europe-west) conformément au RGPD.
            </p>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de RivallQ ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation écrite préalable de RivallQ.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
            </p>
          </Section>

          <Section title="4. Limitation de responsabilité">
            <p>
              Les informations contenues sur ce site sont aussi précises que possible. Le site peut toutefois comporter des inexactitudes, des omissions ou des lacunes. Si vous constatez une erreur ou ce qui vous semble être un dysfonctionnement, merci de bien vouloir le signaler par email à <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">elieamar2007@gmail.com</a>.
            </p>
            <p>
              RivallQ ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site, résultant de l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications techniques requises.
            </p>
          </Section>

          <Section title="5. Liens hypertextes">
            <p>
              Le site peut contenir des liens vers des sites tiers. Ces liens sont fournis uniquement à titre informatif. RivallQ n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur politique de confidentialité.
            </p>
            <p>
              Tout lien pointant vers rivallq.com doit faire l&apos;objet d&apos;une autorisation préalable de notre part. Contactez-nous à <a href="mailto:elieamar2007@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">elieamar2007@gmail.com</a>.
            </p>
          </Section>

          <Section title="6. Droit applicable">
            <p>
              Le présent site et ses mentions légales sont soumis au droit français. Tout litige relatif à l&apos;utilisation du site sera soumis à la compétence exclusive des tribunaux français.
            </p>
          </Section>

          <Section title="7. Données personnelles">
            <p>
              Consultez notre{' '}
              <a href="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">
                politique de confidentialité
              </a>{' '}
              pour toute information relative au traitement de vos données personnelles et à vos droits RGPD.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              Consultez notre{' '}
              <a href="/cookies" className="text-violet-400 hover:text-violet-300 transition-colors">
                politique de cookies
              </a>{' '}
              pour toute information relative aux cookies déposés sur votre appareil.
            </p>
          </Section>

        </div>
      </div>
    </div>
  )
}
