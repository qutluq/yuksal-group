import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { classNames } from '@/utils'

import type { HrefType } from './types'

type PropTypes = Omit<LinkProps, 'href'> & {
  href?: string | HrefType
  title?: string
  variant?: 'text' | 'contained'
  onClick?: () => void
  disabled?: boolean
  children?: ReactNode
}

export const Button = ({
  href,
  title,
  variant = 'contained',
  disabled = false,
  onClick,
  children,
  ...props
}: PropTypes) =>
  href ? (
    <Link
      href={href}
      className={classNames(
        'flex items-center justify-center px-3 py-1',
        variant == 'contained' && 'rounded border bg-gray-100 text-gray-800',
        variant == 'text' && href
          ? 'text-[var(--color-primary)]'
          : 'text-[var(--color-text-primary)]',
        disabled && 'pointer-events-none opacity-50',
      )}
      {...props}
    >
      {children}
      {title}
    </Link>
  ) : (
    <button
      className={classNames(
        'flex items-center justify-center px-3 py-1',
        variant == 'contained' && 'rounded border bg-gray-100 text-gray-800',
        variant == 'text' && href
          ? 'text-[var(--color-primary)]'
          : 'text-[var(--color-text-primary)]',
        disabled && 'pointer-events-none opacity-50',
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {title}
    </button>
  )
