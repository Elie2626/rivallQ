import { redirect } from 'next/navigation'
import { getServerUser, getServerProfile, isAdminEmail } from '@/lib/firebase/server'
import { AppShell } from '@/components/layouts/app-shell'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()
  if (!user) redirect('/login')

  const profile = await getServerProfile(user.uid) as { full_name?: string; email?: string } | null
  const userEmail = profile?.email ?? user.email ?? ''

  return (
    <AppShell
      userEmail={userEmail}
      userName={profile?.full_name ?? undefined}
      isAdmin={isAdminEmail(userEmail)}
    >
      {children}
    </AppShell>
  )
}
