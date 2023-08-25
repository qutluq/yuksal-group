'use client'
import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import { TfiClose } from 'react-icons/tfi'

import { SingOutButton } from '@/components/button'
import {
  LanguageSwitcher,
  LanguageSwitcherMobile,
} from '@/components/language-switcher'
import { LocaleContext } from '@/provider/context'
import { classNames, translate } from '@/utils'
import { DEFAULT_AUTHOR_IMG } from '@/utils/settings'

import { SocialLinks } from './social'

type PropTypes = {
  navItems: React.ReactNode
  navItemsMobile: React.ReactNode
}

export const Nav = ({ navItems, navItemsMobile }: PropTypes) => {
  const [colorChange, setColorchange] = useState(false)
  const { data: session } = useSession()
  const { contextLocale: lang } = useContext(LocaleContext)

  useEffect(() => {
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
  }, [])

  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={classNames(
            'fixed z-10 flex h-[76px] w-full flex-row  items-center justify-center bg-[var(--color-secondary)]',
            colorChange ? 'md:border-b md:border-white' : 'md:bg-transparent',
          )}
        >
          <div className="flex h-full w-full flex-row items-center justify-between border-b-[1px] border-white px-2 md:w-[768px]  md:border-none  lg:w-[1024px]">
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
              {navItems}
            </nav>
            <SocialLinks />
            <div className="hidden md:block">
              <LanguageSwitcher lang={lang} />
            </div>

            {session && (
              <div className="flex flex-col items-center">
                <Disclosure>
                  <Disclosure.Button className={'hidden md:block'}>
                    <Image
                      src={DEFAULT_AUTHOR_IMG}
                      alt=""
                      className="rounded-full object-cover"
                      width={35}
                      height={35}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className={'flex flex-col justify-end'}>
                    <p>{session?.user?.name}</p>
                    <SingOutButton title={translate('Sign out', lang)} />
                  </Disclosure.Panel>
                </Disclosure>
              </div>
            )}
          </div>
          <nav
            className={classNames(
              'fixed left-0 top-[46px] z-10 flex flex-col p-2 md:hidden',
              open &&
                'h-screen w-[270px] animate-[translate_0.2s_ease-in-out] bg-[var(--color-secondary)]',
            )}
          >
            <Disclosure.Panel className="flex w-auto flex-col md:hidden">
              {navItemsMobile}
              <div className="border-t">
                <LanguageSwitcherMobile lang={lang} />
              </div>
            </Disclosure.Panel>
          </nav>
        </div>
      )}
    </Disclosure>
  )
}
