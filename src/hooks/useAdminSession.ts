import { useSession } from 'next-auth/react'

export const useAdminSession = () => {
  const { data: session } = useSession(undefined)

  return {
    isAdminSession:
      session === undefined ? false : session?.user.role === 'admin',
    session,
  }
}
