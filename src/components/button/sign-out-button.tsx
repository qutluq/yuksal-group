'use client'
import { signOut } from 'next-auth/react'

import { Button } from './button'

export const SingOutButton = ({ title }: { title: string }) => (
  <Button onClick={() => signOut({ callbackUrl: '/home' })} title={title} />
)
