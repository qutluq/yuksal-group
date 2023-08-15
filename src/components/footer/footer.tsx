'use client'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Link from 'next/link'

export const Footer = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { i18n } = useLingui()

  return (
    <div className="flex w-full flex-col items-center justify-center bg-white/10 py-3 text-sm text-[var(--color-text-primary)] sm:flex-row md:text-lg">
      <p>Yuksal Group © 2023 \ {t`All Rights Reserved`} \&nbsp;</p>
      <div className="flex flex-row gap-2">
        <p>{t`Design by`}</p>
        <Link
          className="text-[var(--color-primary)]"
          href="https://github.com/qutluq"
        >{t`Qutluq`}</Link>
      </div>
    </div>
  )
}
