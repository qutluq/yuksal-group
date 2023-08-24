'use client'
import { useSession } from 'next-auth/react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession(undefined)

  //session === undefined if next-auth session has not hydrated
  //show nothing until next-auth session hydrates
  return session === undefined ? null : [children]
}
