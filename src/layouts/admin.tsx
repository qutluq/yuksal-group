'use client'

import { NoAccessMessage } from '@/components/admin'
import { useAdminSession } from '@/hooks/useAdminSession'

export const AdminLayout = ({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: string
}) => {
  const { isAdminSession, session } = useAdminSession()

  //session === undefined if next-auth session has not hydrated
  //show nothing until next-auth session hydrates
  return session === undefined ? null : isAdminSession ? (
    [children]
  ) : (
    <NoAccessMessage lang={lang} />
  )
}
