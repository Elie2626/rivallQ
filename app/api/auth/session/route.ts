import { NextRequest, NextResponse } from 'next/server'
import { verifyFirebaseIdToken } from '@/lib/firebase/verify-token'
import { FieldValue } from 'firebase-admin/firestore'

// ID tokens live 1 h; the client SessionRefresher renews the cookie before expiry
const SESSION_MAX_AGE = 60 * 60 // 1 hour in seconds

// ── POST — verify ID token and set session cookie ────────────
export async function POST(request: NextRequest) {
  try {
    const { idToken, userData } = await request.json()

    if (!idToken) {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
    }

    // Verify token via Google public certs — no service account needed
    const decoded = await verifyFirebaseIdToken(idToken)

    // Upsert profile in Firestore (requires service account — skip if not configured)
    try {
      const { getAdminDb } = await import('@/lib/firebase/admin')
      const db = getAdminDb()
      const profileRef = db.collection('profiles').doc(decoded.uid)
      const profileSnap = await profileRef.get()

      if (!profileSnap.exists) {
        await profileRef.set({
          email: decoded.email ?? '',
          full_name: userData?.full_name ?? decoded.name ?? null,
          avatar_url: decoded.picture ?? null,
          plan: null,
          stripe_customer_id: null,
          stripe_subscription_id: null,
          subscription_status: null,
          subscription_end_date: null,
          is_admin: false,
          settings: {},
          created_at: FieldValue.serverTimestamp(),
          updated_at: FieldValue.serverTimestamp(),
        })
      }
    } catch (dbErr) {
      // Firestore may not be configured yet — don't block login
      console.warn('[Session] Firestore upsert skipped:', dbErr)
    }

    // Store the raw ID token as session cookie (renewed by SessionRefresher)
    const response = NextResponse.json({ success: true })
    response.cookies.set('__session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('[Session] Error:', err)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

// ── DELETE — sign out ─────────────────────────────
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('__session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return response
}
