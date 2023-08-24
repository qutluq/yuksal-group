'use client'

import { useSession } from 'next-auth/react'

import { AdminPage } from './admin-page'
import { NoAccessMessage } from './no-access-message'

export const Admin = () => {
  const { data: session } = useSession()

  return session?.user.role === 'admin' ? <AdminPage /> : <NoAccessMessage />
}
