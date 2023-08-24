'use client'

import { useSession } from 'next-auth/react'

import type { AuthorisationText } from '@/types'

import { AdminPage } from './admin-page'
import { NoAccessMessage } from './no-access-message'

export const BlogAdmin = ({
  translations,
}: {
  translations: AuthorisationText
}) => {
  const { data: session } = useSession()
  return session?.user.role === 'admin' ? (
    <AdminPage translations={translations} />
  ) : (
    <NoAccessMessage translations={translations} />
  )
}
