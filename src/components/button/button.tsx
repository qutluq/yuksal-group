import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { classNames } from '@/utils'

import type { HrefType } from './types'

type PropTypes = LinkProps & {
  href: string | HrefType
  title?: string
  variant?: 'desktop' | 'mobile'
  disabled?: boolean
  children?: ReactNode
}

export const Button = ({
  href,
  title,
  variant = 'desktop',
  disabled = false,
  children,
  ...props
}: PropTypes) => (
  <Link
    href={href}
    className={classNames(
      'flex items-center justify-center rounded border px-3 py-1 text-sm',
      variant == 'desktop' && ' w-24  bg-gray-100 text-gray-800',
      variant == 'mobile' && ' bg-gray-100 text-gray-800 ',
      disabled && 'pointer-events-none opacity-50',
    )}
    {...props}
  >
    {children}
    {title}
  </Link>
)
