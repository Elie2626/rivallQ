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
          email: 'elieamar2007@gmail.com',
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
          "Auditez votre site web avec l'IA et créez votre nouveau site sur mesure dès 500€. Score SEO, UX, conversion en 5 minutes.",
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
          "Outil d'audit SEO et de création de site web propulsé par l'IA. Analysez votre site en 5 minutes, obtenez un rapport complet, puis créez votre site vitrine sur mesure dès 500€.",
        offers: [
          {
            '@type': 'Offer',
            name: 'Audit SEO IA',
            price: '9.99',
            priceCurrency: 'EUR',
            description: 'Audit SEO complet, score UX, score de conversion, top 10 problèmes, recommandations.',
          },
          {
            '@type': 'Offer',
            name: 'Site Vitrine Simple',
            price: '500',
            priceCurrency: 'EUR',
            description: 'Site vitrine professionnel 1 à 5 pages, mobile responsive, SEO de base. Livré en 24h à 1 semaine.',
          },
          {
            '@type': 'Offer',
            name: 'Site Vitrine Complet avec Chatbot IA',
            price: '1000',
            priceCurrency: 'EUR',
            description: "Jusqu'à 10 pages, chatbot IA intégré, blog, SEO avancé. Livré en 1 à 2 semaines.",
          },
          {
            '@type': 'Offer',
            name: 'Site Premium 3D',
            price: '1500',
            priceCurrency: 'EUR',
            description: 'Pages illimitées, design 3D sur mesure, animations avancées, chatbot IA. Livré en 2 à 3 semaines.',
          },
          {
            '@type': 'Offer',
            name: 'Maintenance mensuelle',
            price: '50',
            priceCurrency: 'EUR',
            description: 'Mises à jour, sauvegardes automatiques, sécurité, support technique prioritaire.',
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
              name: 'Site Vitrine Simple',
              description: 'Site vitrine professionnel 1 à 5 pages, mobile responsive, SEO de base. Livré en 24h à 1 semaine.',
              offers: {
                '@type': 'Offer',
                price: '500',
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
              name: 'Site Vitrine Complet avec Chatbot IA',
              description: "Jusqu'à 10 pages, chatbot IA intégré, blog, SEO avancé. Livré en 1 à 2 semaines.",
              offers: {
                '@type': 'Offer',
                price: '1000',
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
              name: 'Site Premium 3D',
              description: 'Pages illimitées, design 3D sur mesure, animations avancées, chatbot IA. Livré en 2 à 3 semaines.',
              offers: {
                '@type': 'Offer',
                price: '1500',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'Product',
              name: 'Maintenance mensuelle',
              description: 'Mises à jour, sauvegardes, sécurité, support prioritaire.',
              offers: {
                '@type': 'Offer',
                price: '50',
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
