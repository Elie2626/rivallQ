import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

// Guard initialization — NEXT_PUBLIC_ vars may be absent at build/SSR time.
// Client components only use auth/db in browser context (effects & event handlers),
// so safe to export as undefined during SSR pre-render.
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: apiKey ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
}

let app: FirebaseApp | undefined
let _auth: Auth | undefined
let _db: Firestore | undefined

if (apiKey) {
  app = getApps()[0] ?? initializeApp(firebaseConfig)
  _auth = getAuth(app)
  _db = getFirestore(app)
}

// These are cast to their types — they are always initialised at runtime in the
// browser where NEXT_PUBLIC_FIREBASE_API_KEY is always present.
export const auth = _auth as Auth
export const db = _db as Firestore
