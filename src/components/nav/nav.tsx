'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
import { TfiClose } from 'react-icons/tfi'

import { SingOutButton } from '@/components/button'
import {
  LanguageSwitcher,
  LanguageSwitcherMobile,
} from '@/components/language-switcher'
import { useAdminSession } from '@/hooks/useAdminSession'
import { classNames, translate } from '@/utils'
import { DEFAULT_AUTHOR_IMG } from '@/utils/settings'
import { Disclosure } from '@headlessui/react'

import { SocialLinks } from './social'

type PropTypes = {
  navItems: React.ReactNode
  navItemsMobile: React.ReactNode
  lang: string
}

export const Nav = ({ navItems, navItemsMobile, lang }: PropTypes) => {
  const [colorChange, setColorchange] = useState(false)
  const { isAdminSession, session } = useAdminSession()

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
    <div
      className={classNames(
        'fixed z-50 flex h-[76px] w-full flex-row justify-center bg-[var(--color-secondary)]',
        colorChange ? 'border-b border-white' : 'md:bg-transparent',
      )}
    >
      <div className="flex w-full max-w-7xl flex-row items-start justify-between px-5 pt-5">
        <div className="md:hidden">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button>
                  <IoMenuOutline
                    className={classNames(
                      'text-3xl text-white',
                      open && 'hidden',
                    )}
                  />
                  <TfiClose
                    className={classNames(
                      'text-3xl text-white',
                      !open && 'hidden',
                    )}
                  />
                </Disclosure.Button>

                <nav
                  className={classNames(
                    'fixed left-0 top-[76px] z-10 flex flex-col p-2 md:hidden',
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
              </>
            )}
          </Disclosure>
        </div>
        <Link href={'/'}>
          <Image src="/assets/logo.png" alt="Logo" width={192} height={32} />
        </Link>

        <nav className=" hidden gap-1 tracking-widest md:flex lg:gap-3">
          {navItems}
        </nav>

        <div className="hidden md:block md:w-2 lg:hidden"> </div>

        {isAdminSession && (
          <div className="flex-row gap-7 lg:flex">
            <div className="w-8 lg:hidden"> </div>
            <div className="right-20 hidden pt-[6px] md:fixed md:block lg:static">
              <LanguageSwitcher lang={lang} />
            </div>

            <Disclosure>
              <div className="relative ">
                <div className="fixed right-5 lg:static">
                  <Disclosure.Button>
                    <Image
                      src={DEFAULT_AUTHOR_IMG}
                      alt=""
                      className="rounded-full object-cover"
                      width={35}
                      height={35}
                    />
                  </Disclosure.Button>
                </div>
                <div
                  className={classNames(
                    'fixed right-5 w-36 lg:absolute 2xl:right-[-45px]',
                    !colorChange && 'top-[80px] md:top-[70px]',
                    colorChange && 'top-[80px] md:top-[86px]',
                  )}
                >
                  <Disclosure.Panel
                    className={'flex flex-col items-start gap-3'}
                  >
                    <p className="w-full text-center">{session?.user?.name}</p>
                    <div className="flex w-full flex-col justify-center">
                      <SocialLinks variant="submenu" />
                    </div>
                    <div className="block border-t md:hidden">
                      <LanguageSwitcherMobile lang={lang} />
                    </div>
                    <div className="flex w-full flex-row justify-center">
                      <SingOutButton title={translate('Sign out', lang)} />
                    </div>
                  </Disclosure.Panel>
                </div>
              </div>
            </Disclosure>
          </div>
        )}

        {!isAdminSession && (
          <div className="flex flex-row gap-3">
            <div className="hidden flex-row lg:flex">
              <SocialLinks />
            </div>
            <div className="right-12 hidden pt-[6px] md:fixed md:block lg:static">
              <LanguageSwitcher lang={lang} />
            </div>
            <div className="pt-[9px] lg:hidden">
              <Disclosure>
                <Disclosure.Button className={'right-6 z-10 md:fixed'}>
                  <PiDotsThreeOutlineVerticalFill />
                </Disclosure.Button>

                <div
                  className={classNames(
                    'fixed right-1 pt-7',
                    !colorChange && 'md:top-17',
                    colorChange && 'md:top-14',
                  )}
                >
                  <div className="flex flex-col items-end">
                    <Disclosure.Panel>
                      <div className="flex flex-col justify-end">
                        <SocialLinks variant="submenu" />
                      </div>
                    </Disclosure.Panel>
                  </div>
                </div>
              </Disclosure>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
