import Link from 'next/link'
import { LogoSphere } from '@/components/ui/logo-sphere'

const footerLinks = {
  Produit: [
    { href: '/features', label: 'Fonctionnalités' },
    { href: '/pricing', label: 'Tarifs' },
    { href: '/faq', label: 'FAQ' },
    { href: '/changelog', label: 'Changelog' },
  ],
  Entreprise: [
    { href: '/about', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/affiliates', label: 'Affiliation' },
  ],
  Légal: [
    { href: '/privacy', label: 'Confidentialité' },
    { href: '/terms', label: "Conditions d'utilisation" },
    { href: '/cookies', label: 'Cookies' },
    { href: '/mentions-legales', label: 'Mentions légales' },
  ],
}

export function PublicFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-100 font-bold text-lg">
              <LogoSphere size={32} />
              <span>RivallQ</span>
            </Link>
            <p className="mt-3 text-sm text-zinc-500 max-w-xs leading-relaxed">
              Auditez, optimisez et reconstruisez votre site web avec l&apos;IA en quelques minutes.
            </p>
            {/* Social */}
            <div className="mt-4 flex gap-3">
              {['twitter', 'linkedin', 'github'].map((s) => (
                <a
                  key={s}
                  href={`https://${s}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
                  aria-label={s}
                >
                  <span className="sr-only">{s}</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                {group}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} RivallQ. Tous droits réservés.
          </p>
          <p className="text-xs text-zinc-600">
            Fabriqué par Tsitsit
          </p>
        </div>
      </div>
    </footer>
  )
}
