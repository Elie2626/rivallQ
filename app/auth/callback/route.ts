import { NextResponse } from 'next/server'

// Firebase handles auth action URLs natively.
// This route handles any redirects from OAuth or email verification flows.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const next = searchParams.get('next') ?? '/dashboard'
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
