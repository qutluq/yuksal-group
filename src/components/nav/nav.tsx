'use client'
import Image from 'next/image'
import Link from 'next/link'
import { IoMenuOutline } from 'react-icons/io5'
import { TfiClose } from 'react-icons/tfi'

import { classNames } from '@/utils'
import { NAV_MENU } from '@/utils/settings'
import { Disclosure, Transition } from '@headlessui/react'

import { NavItem } from './nav-item'
import { SocialLinks } from './social'

export const Nav = ({ page }) => (
  <Disclosure>
    {({ open }) => (
      <>
        <div className="flex flex-row justify-between items-center mx-auto lg:w-[1024px] md:w-[768px] bg-[var(--color-secondary)] md:bg-transparent md:h-auto h-[46px] border-b-[1px] border-white px-2 md:border-none">
          <Disclosure.Button className={'md:hidden'}>
            <IoMenuOutline
              className={classNames('text-white text-3xl', open && 'hidden')}
            />
            <TfiClose
              className={classNames('text-white text-3xl', !open && 'hidden')}
            />
          </Disclosure.Button>

          <Link href={'/'}>
            <Image src="/img/logo.png" alt="Logo" width={192} height={32} />
          </Link>
          <nav className="hidden md:flex gap-1 lg:gap-3 tracking-widest">
            {NAV_MENU.map((item) => (
              <NavItem key={item.slug} item={item} page={page} />
            ))}
          </nav>
          <SocialLinks />
        </div>
        <nav
          className={classNames(
            'md:hidden flex flex-col p-2 z-10 relative',
            open &&
              'bg-[var(--color-secondary)] h-screen w-[270px] animate-[translate_0.2s_ease-in-out]'
          )}
        >
          <Disclosure.Panel className="md:hidden flex flex-col w-auto">
            {NAV_MENU.map((item) => (
              <NavItem
                key={item.slug}
                item={item}
                page={page}
                variant="mobile"
              />
            ))}
          </Disclosure.Panel>
        </nav>
      </>
    )}
  </Disclosure>
)
