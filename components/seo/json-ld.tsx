/**
 * Server component — renders JSON-LD <script> tags for structured data.
 * Zero client JS, fully parsed by Google at crawl time.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ── Pre-built schemas ─────────────────────────────────────────────────────────

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'RivallQ',
        url: BASE,
        logo: `${BASE}/icon.svg`,
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@rivallq.io',
          contactType: 'customer support',
          availableLanguage: 'French',
        },
      }}
    />
  )
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'RivallQ',
        url: BASE,
        description:
          "Auditez et reconstruisez votre site web avec l'IA. Score SEO, UX, conversion, et site régénéré automatiquement.",
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE}/audit/new?url={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  )
}

export function SoftwareAppSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'RivallQ',
        url: BASE,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
          "Outil d'audit SEO et de reconstruction de site web propulsé par l'IA Claude d'Anthropic. Analysez votre site en 60 secondes, obtenez un rapport complet et une version optimisée générée automatiquement.",
        offers: [
          {
            '@type': 'Offer',
            name: 'Audit SEO',
            price: '9.99',
            priceCurrency: 'EUR',
            description: 'Audit SEO complet, score UX, score de conversion, top 10 problèmes.',
          },
          {
            '@type': 'Offer',
            name: 'Site Régénéré',
            price: '79',
            priceCurrency: 'EUR',
            description: 'Homepage + pages clés optimisées, copywriting IA, export HTML/CSS.',
          },
          {
            '@type': 'Offer',
            name: 'Installation WordPress',
            price: '299',
            priceCurrency: 'EUR',
            description: 'Publication automatique sur votre WordPress.',
          },
          {
            '@type': 'Offer',
            name: 'Abonnement mensuel',
            price: '29',
            priceCurrency: 'EUR',
            description: 'Audits illimités, mises à jour mensuelles, support prioritaire.',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '247',
          bestRating: '5',
          worstRating: '1',
        },
      }}
    />
  )
}

export function FaqSchema({
  items,
}: {
  items: { question: string; answer: string }[]
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      }}
    />
  )
}

export function PricingSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Tarifs RivallQ',
        description: "Plans et tarifs de l'outil d'audit SEO RivallQ",
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Product',
              name: 'Audit SEO IA',
              description:
                'Score SEO 0-100, score UX, score conversion, top 10 problèmes, analyse mots-clés, recommandations prioritaires.',
              offers: {
                '@type': 'Offer',
                price: '9.99',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Product',
              name: 'Site Régénéré par IA',
              description:
                'Homepage + pages clés reconstruites, copywriting optimisé Claude AI, SEO on-page, export ZIP HTML/CSS.',
              offers: {
                '@type': 'Offer',
                price: '79',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Product',
              name: 'Installation WordPress',
              description: 'Publication automatique du site régénéré sur votre WordPress.',
              offers: {
                '@type': 'Offer',
                price: '299',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Product',
              name: 'Abonnement Mensuel',
              description: 'Audits illimités, mises à jour mensuelles, support prioritaire.',
              offers: {
                '@type': 'Offer',
                price: '29',
                priceCurrency: 'EUR',
                priceSpecification: {
                  '@type': 'RecurringCharge',
                  billingDuration: 'P1M',
                },
                availability: 'https://schema.org/InStock',
              },
            },
          },
        ],
      }}
    />
  )
}
