import type { Metadata } from 'next'
import { ContactForm } from './contact-form'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'Contact — Support RivallQ',
  description:
    "Contactez l'équipe RivallQ pour toute question sur votre audit SEO, le site régénéré ou votre abonnement. Réponse sous 24h.",
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
