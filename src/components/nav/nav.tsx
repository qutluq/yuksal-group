'use client'
import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import { TfiClose } from 'react-icons/tfi'

import { classNames } from '@/utils'
import { NAV_MENU } from '@/utils/settings'

import { NavItem } from './nav-item'
import { SocialLinks } from './social'

export const Nav = ({ page }) => {
  const [colorChange, setColorchange] = useState(false)

  if (typeof window !== 'undefined') {
    const changeNavbarColor = () => {
      if (window.scrollY >= 80) {
        setColorchange(true)
      } else {
        setColorchange(false)
      }
    }
    window.addEventListener('scroll', changeNavbarColor)
  }

  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={classNames(
            'fixed z-10 flex h-[46px] w-full flex-row  items-center justify-center bg-[var(--color-secondary)] md:h-[76px]',
            colorChange ? 'md:border-b md:border-white' : 'md:bg-transparent',
          )}
        >
          <div className="flex w-full flex-row items-center justify-between border-b-[1px] border-white px-2 md:w-[768px]  md:border-none  lg:w-[1024px]">
            <Disclosure.Button className={'md:hidden'}>
              <IoMenuOutline
                className={classNames('text-3xl text-white', open && 'hidden')}
              />
              <TfiClose
                className={classNames('text-3xl text-white', !open && 'hidden')}
              />
            </Disclosure.Button>

            <Link href={'/'}>
              <Image src="/img/logo.png" alt="Logo" width={192} height={32} />
            </Link>
            <nav className="hidden gap-1 tracking-widest md:flex lg:gap-3">
              {NAV_MENU.map((item) => (
                <NavItem key={item.slug} item={item} page={page} />
              ))}
            </nav>
            <SocialLinks />
          </div>
          <nav
            className={classNames(
              'fixed left-0 top-[46px] z-10 flex flex-col p-2 md:hidden',
              open &&
                'h-screen w-[270px] animate-[translate_0.2s_ease-in-out] bg-[var(--color-secondary)]',
            )}
          >
            <Disclosure.Panel className="flex w-auto flex-col md:hidden">
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
        </div>
      )}
    </Disclosure>
  )
}
