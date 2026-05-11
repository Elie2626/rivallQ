import { redirect } from 'next/navigation'
import { getServerUser, isAdminEmail } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import Link from 'next/link'
import { Zap, LayoutDashboard, Users, FileText, BarChart3 } from 'lucide-react'

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Utilisateurs', icon: Users },
  { href: '/admin/audits', label: 'Audits', icon: FileText },
  { href: '/admin/revenue', label: 'Revenus', icon: BarChart3 },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()
  if (!user) redirect('/login')

  // Accès par email (prioritaire) ou flag Firestore is_admin
  if (!isAdminEmail(user.email)) {
    const profileDoc = await getAdminDb().collection('profiles').doc(user.uid).get()
    const profile = profileDoc.data() as { is_admin?: boolean } | undefined
    if (!profile?.is_admin) redirect('/dashboard')
  }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Admin sidebar */}
      <aside className="w-56 flex flex-col border-r border-zinc-800 bg-zinc-950">
        <div className="flex h-14 items-center gap-2 px-4 border-b border-zinc-800">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Zap className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-zinc-100">Admin</span>
        </div>
        <nav className="flex-1 p-3">
          <ul className="flex flex-col gap-0.5">
            {adminNav.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-3 py-2">
            ← Retour à l&apos;app
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
