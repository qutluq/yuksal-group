import Link from 'next/link'

import { translate } from '@/utils'

export const Footer = ({ lang }: { lang: string }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 bg-white/10 py-3 text-sm text-[var(--color-text-primary)] sm:flex-row sm:gap-2 md:text-lg">
      <p>Yuksal Group © 2023</p>
      <p className="hidden sm:inline-block">{' / '}</p>
      <p>{translate('All Rights Reserved', lang)}</p>
      <p className="hidden sm:inline-block">{' / '}</p>
      <p className="flex flex-row gap-2">
        {translate('Design by', lang)}
        <Link
          className="text-[var(--color-primary)]"
          href="https://github.com/qutluq"
        >
          {translate('Qutluq', lang)}
        </Link>
      </p>
    </div>
  )
}
