'use client'
import { useSession } from 'next-auth/react'

import { NoAccessMessage } from '@/components/admin'

export const AdminLayout = ({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: string
}) => {
  const { data: session } = useSession(undefined)

  //session === undefined if next-auth session has not hydrated
  //show nothing until next-auth session hydrates
  return session === undefined ? null : session?.user.role === 'admin' ? (
    [children]
  ) : (
    <NoAccessMessage lang={lang} />
  )
}
