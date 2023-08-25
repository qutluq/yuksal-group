// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import nextConfig from '../next.config'

const IGNORED_PATHS = /(api|_next\/static|_next\/image|favicon.ico|\.).*/

export async function middleware(req: NextRequest) {
  // Cookie locale
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
  const defaultLocale = nextConfig.i18n?.defaultLocale || 'en'

  try {
    // Early return if ignored files encountered
    if (IGNORED_PATHS.test(req.nextUrl.pathname)) {
      return
    }

    //return if lang is set, to break out of infinite loop
    if (req.nextUrl.search.includes('lang=')) {
      return
    }

    // Early return if there is a no cookie present
    // Redirect right away to the default locale
    if (!cookieLocale) {
      return NextResponse.redirect(
        new URL(
          `${req.nextUrl.pathname}${
            req.nextUrl.search ? `${req.nextUrl.search}&` : '?'
          }lang=${defaultLocale}`,
          req.url,
        ),
      )
    }

    // If cookie set redirect to the set language
    return NextResponse.redirect(
      new URL(
        `${req.nextUrl.pathname}${
          req.nextUrl.search ? `${req.nextUrl.search}&` : '?'
        }lang=${cookieLocale}`,
        req.url,
      ),
    )
  } catch (error) {
    console.log(error)
  }
}
