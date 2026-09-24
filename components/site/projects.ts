export type Project = {
  name: string
  domain: string
  url: string
  category: string
  kind: 'Site web' | 'SaaS' | 'Site + application'
  shot: string
  logo: string
  /** Tile background behind the logo, matching the icon's own backdrop. */
  logoBg: string
  /** Crops white corners baked into some source icons. */
  logoZoom?: number
}

export const PROJECTS: Project[] = [
  {
    name: 'CloserMatch', domain: 'closermatch.fr', url: 'https://closermatch.fr',
    category: 'Mise en relation fondateurs & commerciaux', kind: 'SaaS',
    shot: '/work/closermatch.webp', logo: '/clients/closermatch.png', logoBg: '#0f1729', logoZoom: 1.3,
  },
  {
    name: 'BotExpress', domain: 'botexpress.fr', url: 'https://botexpress.fr',
    category: 'Chatbots IA pour sites web', kind: 'SaaS',
    shot: '/work/botexpress.webp', logo: '/clients/botexpress.png', logoBg: '#0066ff',
  },
  {
    name: 'Wavore', domain: 'wavore.com', url: 'https://wavore.com',
    category: 'Pubs vidéo & musicales sur mesure', kind: 'SaaS',
    shot: '/work/wavore.webp', logo: '/clients/wavore.png', logoBg: '#0d0718',
  },
  {
    name: 'G-Cours', domain: 'g-cours.fr', url: 'https://g-cours.fr',
    category: 'Cours particuliers & app d’entraînement', kind: 'Site + application',
    shot: '/work/gcours.jpg', logo: '/clients/gcours.png', logoBg: '#ffffff',
  },
  {
    name: 'Selesta', domain: 'selesta.fr', url: 'https://selesta.fr',
    category: 'Rénovation & façades', kind: 'Site web',
    shot: '/work/selesta.webp', logo: '/clients/selesta.png', logoBg: '#000000',
  },
  {
    name: 'Pharmconsult', domain: 'pharm-consult.fr', url: 'https://pharm-consult.fr',
    category: 'Conseil en industrie pharmaceutique', kind: 'Site web',
    shot: '/work/pharmconsult.webp', logo: '/clients/pharm-consult.png', logoBg: '#ffffff', logoZoom: 1.25,
  },
  {
    name: 'Matteo Lencou', domain: 'rdv-osteo-bordeaux.fr', url: 'https://rdv-osteo-bordeaux.fr',
    category: 'Cabinet d’ostéopathie', kind: 'Site web',
    shot: '/work/osteo.webp', logo: '/clients/rdvosteo.png', logoBg: '#f7ead9', logoZoom: 1.12,
  },
  {
    name: 'SAD Services', domain: 'serrurerie.sadservice.fr', url: 'https://serrurerie.sadservice.fr',
    category: 'Serrurerie & dépannage 24h/24', kind: 'Site web',
    shot: '/work/sadservice.webp', logo: '/clients/sadservice.png', logoBg: '#ffffff',
  },
]
