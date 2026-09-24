import type { Metadata } from 'next'
import { ConversionTracker } from '@/components/app/conversion-tracker'
import { Hero } from '@/components/site/hero'
import { Statement } from '@/components/site/statement'
import { Expertises } from '@/components/site/expertises'
import { Work } from '@/components/site/work'
import { Method } from '@/components/site/method'
import { Pillars } from '@/components/site/pillars'
import { Contact } from '@/components/site/contact'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'RivallQ — Sites web, applications, SaaS et logiciels sur mesure',
  description:
    'Studio de développement sur mesure : sites web, applications mobiles iOS et Android, SaaS et logiciels métier. De l’idée au lancement, avec une seule équipe.',
  alternates: { canonical: BASE },
  openGraph: {
    title: 'RivallQ — Du site web au logiciel sur mesure',
    description: 'Sites web, applications mobiles, SaaS et logiciels métier conçus et développés sur mesure.',
    url: BASE,
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <ConversionTracker sendTo="AW-18222517793/WWkxCJz48bscEKGclvFD" />
      <Hero />
      <Statement />
      <Expertises />
      <Work />
      <Method />
      <Pillars />
      <Contact />
    </>
  )
}
