import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

import { classNames } from '@/utils'

type PropTypes = LinkProps & {
  href: string | Object
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
      'rounded border text-sm flex justify-center items-center px-3 py-1',
      variant == 'desktop' && ' bg-gray-100  text-gray-800 w-24',
      variant == 'mobile' && ' bg-gray-100 text-gray-800 ',
      disabled && 'pointer-events-none opacity-50'
    )}
    {...props}
  >
    {children}
    {title}
  </Link>
)
