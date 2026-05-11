import { createVerify } from 'node:crypto'

const PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ??
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ??
  ''

const GOOGLE_KEYS_URL =
  'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'

export interface FirebaseTokenPayload {
  uid: string
  email?: string
  name?: string
  picture?: string
  email_verified?: boolean
  exp: number
  iat: number
}

/**
 * Verifies a Firebase ID token using Google's public certificates.
 * Does NOT require a Firebase Admin service account.
 */
export async function verifyFirebaseIdToken(token: string): Promise<FirebaseTokenPayload> {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('Malformed token')

  const [headerB64, payloadB64, sigB64] = parts

  const payload = JSON.parse(
    Buffer.from(payloadB64, 'base64url').toString('utf8')
  ) as Record<string, unknown>

  if ((payload.exp as number) < Date.now() / 1000) throw new Error('Token expired')
  if (payload.aud !== PROJECT_ID) throw new Error('Invalid audience')
  if (payload.iss !== `https://securetoken.google.com/${PROJECT_ID}`) throw new Error('Invalid issuer')

  const keysRes = await fetch(GOOGLE_KEYS_URL, { next: { revalidate: 3600 } })
  const keys = (await keysRes.json()) as Record<string, string>

  const header = JSON.parse(
    Buffer.from(headerB64, 'base64url').toString('utf8')
  ) as { kid: string }

  const publicKey = keys[header.kid]
  if (!publicKey) throw new Error('Public key not found for kid: ' + header.kid)

  const verifier = createVerify('RSA-SHA256')
  verifier.update(`${headerB64}.${payloadB64}`)
  const valid = verifier.verify(publicKey, Buffer.from(sigB64, 'base64url'))
  if (!valid) throw new Error('Invalid token signature')

  return {
    uid:            (payload.sub ?? payload.user_id) as string,
    email:          payload.email as string | undefined,
    name:           payload.name as string | undefined,
    picture:        payload.picture as string | undefined,
    email_verified: payload.email_verified as boolean | undefined,
    exp:            payload.exp as number,
    iat:            payload.iat as number,
  }
}
