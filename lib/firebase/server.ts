import { cookies } from 'next/headers'
import { verifyFirebaseIdToken } from './verify-token'
export type { FirebaseTokenPayload as FirebaseUser } from './verify-token'

/** Returns the verified Firebase user from the session cookie, or null. */
export async function getServerUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('__session')?.value
    if (!token) return null
    return await verifyFirebaseIdToken(token)
  } catch {
    return null
  }
}

/** Reads the Firestore profile for a given UID (requires service account). */
export async function getServerProfile(uid: string) {
  try {
    const { getAdminDb } = await import('./admin')
    const doc = await getAdminDb().collection('profiles').doc(uid).get()
    if (!doc.exists) return null
    return { id: doc.id, ...doc.data() } as Record<string, unknown>
  } catch {
    return null
  }
}

/** Returns true if the email matches the admin env var. */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase())
  return admins.includes(email.toLowerCase())
}

/** Returns true if the user is admin (by email or Firestore flag). */
export async function isAdmin(uid: string, email?: string | null): Promise<boolean> {
  if (isAdminEmail(email)) return true
  const profile = await getServerProfile(uid)
  return profile?.is_admin === true
}
