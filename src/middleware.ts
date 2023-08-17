// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from 'next-auth/middleware'

// https://next-auth.js.org/configuration/nextjs#basic-usage
// /admin/:path* matches /admin/a/b/c because * is zero or more
export const config = { matcher: ['/admin/:path*'] }
