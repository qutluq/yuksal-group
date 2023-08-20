// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import nextConfig from '../next.config'

export const config = {
  matcher: [
    // https://next-auth.js.org/configuration/nextjs#basic-usage
    // /admin/:path* matches /admin/a/b/c because * is zero or more

    '/admin/:path*',

    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

// Regex to check whether something has an extension, e.g. .jpg
// const PUBLIC_FILE = /.*\..*$/
const PUBLIC_FILE = /\.(.*)$/
// '.*\.\(xls\|csv\)'

export async function middleware(req: NextRequest) {
  // Cookie locale
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
  const defaultLocale = nextConfig.i18n?.defaultLocale || 'en'

  try {
    // Early return if public file encountered
    if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
      return
    }

    //return if lang is set to break out of infinite loop
    if (req.nextUrl.search.includes('lang=')) {
      return
    }

    // Early return if there is a no cookie present
    // Redirect right away to the default locale
    if (!cookieLocale) {
      return NextResponse.redirect(
        new URL(
          `${req.nextUrl.pathname}/${req.nextUrl.search}${
            req.nextUrl.search ? '&' : '?'
          }lang=${defaultLocale}`,
          req.url,
        ),
      )
    }

    // If cookie set redirect to the set language
    return NextResponse.redirect(
      new URL(
        `${req.nextUrl.pathname}/${req.nextUrl.search}${
          req.nextUrl.search ? '&' : '?'
        }lang=${cookieLocale}`,
        req.url,
      ),
    )
  } catch (error) {
    console.log(error)
  }
}
