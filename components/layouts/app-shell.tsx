'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AppSidebar } from './app-sidebar'
import { LogoSphere } from '@/components/ui/logo-sphere'

interface AppShellProps {
  children: React.ReactNode
  userEmail?: string
  userName?: string
  isAdmin?: boolean
}

export function AppShell({ children, userEmail, userName, isAdmin = false }: AppShellProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Ferme le drawer à chaque changement de route
  useEffect(() => { setOpen(false) }, [pathname])

  // Bloque le scroll du body quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">

      {/* ── Sidebar desktop (≥ lg) ── */}
      <div className="hidden lg:flex">
        <AppSidebar userEmail={userEmail} userName={userName} isAdmin={isAdmin} />
      </div>

      {/* ── Drawer mobile (< lg) ── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full w-72 shadow-2xl animate-in slide-in-from-left duration-200">
            <AppSidebar
              userEmail={userEmail}
              userName={userName}
              isAdmin={isAdmin}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── Zone contenu ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header mobile (< lg) */}
        <header className="lg:hidden flex items-center gap-3 px-4 h-14 border-b border-zinc-800 bg-zinc-950 shrink-0">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LogoSphere size={28} />
            <span className="text-base font-bold text-zinc-100">RivallQ</span>
          </Link>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
