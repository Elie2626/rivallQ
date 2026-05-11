import { getServerUser, isAdminEmail } from '@/lib/firebase/server'
import { getServerProfile } from '@/lib/firebase/server'
import NewAuditFormWrapper from './new-audit-form'

export default async function NewAuditPage() {
  const user = await getServerUser()
  const profile = user ? await getServerProfile(user.uid) as { email?: string } | null : null
  const userEmail = profile?.email ?? user?.email ?? ''
  const adminUser = isAdminEmail(userEmail)

  return <NewAuditFormWrapper isAdmin={adminUser} />
}
