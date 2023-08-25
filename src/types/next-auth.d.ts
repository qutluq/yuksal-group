// eslint-disable-next-line prettier/prettier
import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string
      email?: string
      role: 'user' | 'admin'
    }
  }
}