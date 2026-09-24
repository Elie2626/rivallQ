import Link from 'next/link'

const GROUPS = [
  {
    title: 'Expertises',
    links: [
      { href: '/#expertises', label: 'Sites web' },
      { href: '/#expertises', label: 'Applications mobiles' },
      { href: '/#expertises', label: 'SaaS' },
      { href: '/#expertises', label: 'Logiciels sur mesure' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { href: '/#realisations', label: 'Réalisations' },
      { href: '/#methode', label: 'Méthode' },
      { href: '/#contact', label: 'Contact' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/privacy', label: 'Confidentialité' },
      { href: '/cookies', label: 'Cookies' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-canvas px-4 sm:px-6">
      <div className="mx-auto max-w-6xl py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-[17px] font-semibold tracking-tight text-fg">RivallQ</Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-subtle">
              Sites web, applications mobiles, SaaS et logiciels sur mesure.
            </p>
          </div>
          {GROUPS.map(g => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="text-xs font-semibold text-fg">{g.title}</h2>
              <ul className="mt-4 space-y-1" role="list">
                {g.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="inline-block py-1.5 text-sm text-fg-subtle transition-colors duration-300 hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-16 border-t border-hairline pt-8 text-xs text-fg-subtle">
          © {new Date().getFullYear()} RivallQ. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
