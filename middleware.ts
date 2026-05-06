import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/login'
  const session = request.cookies.get('admin_session')
  const valid = session?.value === process.env.ADMIN_SECRET

  if (!isLoginPage && !valid) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage && valid) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
