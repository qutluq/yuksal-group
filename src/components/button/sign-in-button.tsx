'use client'
import { signIn } from 'next-auth/react'

import { Button } from './button'

export const SingInButton = ({ title }: { title: string }) => (
  <Button onClick={() => signIn()} title={title} />
)
