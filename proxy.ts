import { type NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/dashboard', '/audit', '/billing', '/settings', '/account', '/rebuild', '/admin']
const AUTH_ONLY = ['/login', '/register', '/reset-password']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get('__session')?.value

  const isProtected = PROTECTED.some(p => pathname.startsWith(p))
  const isAuthOnly  = AUTH_ONLY.some(p => pathname.startsWith(p))

  if (isProtected && !session) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthOnly && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
