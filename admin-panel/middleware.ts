import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.replace('Bearer ', '')
  const { pathname } = request.nextUrl

  // Public paths (no authentication required)
  const publicPaths = ['/login']
  
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}