import { getApps, initializeApp, cert, App } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

let adminApp: App | null = null

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0]

  const projectId   = process.env.FIREBASE_PROJECT_ID
  const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL

  if (!projectId || !privateKey || !clientEmail) {
    throw new Error(
      '[Firebase Admin] Missing service account credentials.\n' +
      'Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in .env.local.\n' +
      'Get them from Firebase Console → Project Settings → Service accounts → Generate new private key.'
    )
  }

  adminApp = initializeApp({
    credential: cert({ projectId, privateKey, clientEmail }),
  })

  return adminApp
}

export function getAdminAuth() {
  return getAuth(getAdminApp())
}

export function getAdminDb() {
  return getFirestore(getAdminApp())
}
