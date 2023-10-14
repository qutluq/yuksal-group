import Link from 'next/link'

import { classNames, translate } from '@/utils'

import type { UserMode } from '@/types'
type PropTypes = {
  item: { id: string; name: string; slug: string }
  page: string
  lang: string
  mode?: UserMode
  variant?: 'desktop' | 'mobile'
}

export const NavItem = ({
  item,
  page,
  lang,
  mode = 'user',
  variant = 'desktop',
}: PropTypes) => {
  return (
    <Link
      className={classNames(
        'text-sm font-semibold uppercase text-gray-50   hover:rounded-md hover:bg-opacity-40',
        variant == 'desktop' && 'relative px-2 py-2 lg:px-5',
        variant == 'mobile' && 'px-2 py-5',
        item.id == page &&
          variant == 'desktop' &&
          `before:border-box after:border-box before:pointer-events-none before:absolute 
          before:bottom-[5px] before:left-[15px] before:h-[2px] before:w-[70%] 
          before:bg-[var(--color-primary)] before:transition-all
          before:content-[''] after:pointer-events-none after:absolute after:bottom-[-1px] 
          after:left-[7px] after:h-[2px] after:w-[50%] after:bg-[var(--color-primary)] 
          after:transition-all after:content-[''] hover:bg-none`,
        item.id == page && variant == 'mobile' && `bg-zinc-500`,
        item.id != page && 'hover:bg-zinc-500',
      )}
      href={`${mode === 'user' ? '/' : '/admin/'}${item.slug}`}
    >
      {translate(item.name, lang)}
    </Link>
  )
}
