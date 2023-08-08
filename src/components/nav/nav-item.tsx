import Link from 'next/link'

import { classNames } from '@/utils'

type PropTypes = {
  item: { name: string; slug: string }
  page: string
  variant?: 'desktop' | 'mobile'
}

export const NavItem = ({ item, page, variant = 'desktop' }: PropTypes) => (
  <Link
    className={classNames(
      'uppercase text-gray-50 text-sm font-semibold   hover:rounded-md hover:bg-opacity-40',
      variant == 'desktop' && 'px-2 lg:px-5 py-2',
      variant == 'mobile' && 'px-2 py-5',
      item.name == page &&
        variant == 'desktop' &&
        `before:content-[''] before:left-[15px] before:bottom-[5px] before:absolute 
          before:h-[2px] before:bg-[#4ac4cf] before:transition-all before:pointer-events-none 
          before:w-[70%] before:border-box
          after:content-[''] after:left-[7px] after:bottom-[-1px] after:absolute 
          after:h-[2px] after:bg-[#4ac4cf] after:transition-all after:pointer-events-none 
          after:w-[50%] after:border-box hover:bg-none`,
      item.name == page && variant == 'mobile' && `bg-zinc-500`,
      item.name != page && 'hover:bg-zinc-500'
    )}
    href={`/${item.slug}`}
  >
    {item.name}
  </Link>
)
