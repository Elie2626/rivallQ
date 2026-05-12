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
              <a
                href="https://www.linkedin.com/in/elie-amar-ba2136405/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
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
