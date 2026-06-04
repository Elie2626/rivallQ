'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Search,
  FileText,
  CreditCard,
  Settings,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { LogoSphere } from '@/components/ui/logo-sphere'
import { cn } from '@/lib/utils/cn'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { useRouter } from 'next/navigation'

const navItems = [
  {
    group: 'Principal',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/audit/new', icon: Search, label: 'Nouvel audit' },
      { href: '/mes-devis', icon: FileText, label: 'Mes devis' },
    ],
  },
  {
    group: 'Compte',
    items: [
      { href: '/billing', icon: CreditCard, label: 'Facturation' },
      { href: '/settings', icon: Settings, label: 'Paramètres' },
      { href: '/account', icon: User, label: 'Mon compte' },
    ],
  },
]

interface AppSidebarProps {
  userEmail?: string
  userName?: string
  isAdmin?: boolean
  onClose?: () => void
}

export function AppSidebar({ userEmail, userName, isAdmin = false, onClose }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const handleSignOut = async () => {
    await signOut(auth)
    await fetch('/api/auth/session', { method: 'DELETE' })
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Logo */}
      <Link href="/" onClick={onClose} className="flex h-16 items-center gap-2.5 px-6 border-b border-zinc-800 hover:opacity-80 transition-opacity">
        <LogoSphere size={34} />
        <span className="text-lg font-bold text-zinc-100">RivallQ</span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navigation app">
        {navItems.map(({ group, items }) => (
          <div key={group} className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              {group}
            </p>
            <ul className="flex flex-col gap-0.5" role="list">
              {items.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
                        isActive
                          ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon
                        className={cn('h-4 w-4 shrink-0 transition-colors', isActive ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300')}
                        aria-hidden="true"
                      />
                      {label}
                      {isActive && (
                        <ChevronRight className="ml-auto h-3 w-3 text-violet-400" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Admin link */}
      {isAdmin && (
        <div className="px-3 pb-2">
          <Link
            href="/admin"
            onClick={onClose}
            className={cn(
              'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
              pathname.startsWith('/admin')
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                : 'text-violet-400 hover:text-violet-200 hover:bg-violet-500/10 border border-violet-500/20'
            )}
          >
            <ShieldCheck className="h-4 w-4 shrink-0 text-violet-400" />
            Admin
            {pathname.startsWith('/admin') && (
              <ChevronRight className="ml-auto h-3 w-3 text-violet-400" />
            )}
          </Link>
        </div>
      )}

      {/* User section */}
      <div className="border-t border-zinc-800 p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {(userName ?? userEmail ?? '?')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">
              {userName ?? 'Mon compte'}
            </p>
            <p className="text-xs text-zinc-500 truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Se déconnecter"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
