import type { Metadata } from 'next'
import { ContactForm } from './contact-form'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'Contact — Support RivallQ',
  description:
    "Contactez RivallQ — agence web & audit SEO en ligne. Devis création site internet, diagnostic référencement, amélioration visibilité Google. Réponse sous 24h.",
  alternates: { canonical: `${BASE}/contact` },
  openGraph: {
    title: 'Contacter RivallQ — Support & Assistance',
    description: "Écrivez-nous pour toute question. Réponse sous 24h ouvrées.",
    url: `${BASE}/contact`,
  },
}

export default function ContactPage() {
  return <ContactForm />
}
