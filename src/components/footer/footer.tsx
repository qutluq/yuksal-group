'use client'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Link from 'next/link'

export const Footer = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { i18n } = useLingui()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 bg-white/10 py-3 text-sm text-[var(--color-text-primary)] sm:flex-row sm:gap-2 md:text-lg">
      <p>Yuksal Group © 2023</p>
      <p className="hidden sm:inline-block">{' / '}</p>
      <p>{t`All Rights Reserved`}</p>
      <p className="hidden sm:inline-block">{' / '}</p>
      <p className="flex flex-row gap-2">
        {t`Design by`}
        <Link
          className="text-[var(--color-primary)]"
          href="https://github.com/qutluq"
        >{t`Qutluq`}</Link>
      </p>
    </div>
  )
}
