import Link from 'next/link'
import { LogoSphere } from '@/components/ui/logo-sphere'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Passer au contenu principal
      </a>

      {/* Minimal nav */}
      <header className="flex h-16 items-center justify-between px-6 border-b border-zinc-800/60">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-100 font-bold text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
        >
          <LogoSphere size={34} />
          <span>RivallQ</span>
        </Link>
      </header>

      {/* Background pattern */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center justify-center px-4 py-12"
      >
        {children}
      </main>
    </div>
  )
}
