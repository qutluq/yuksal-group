import Link from 'next/link'

import { Translate } from '@/components/translate'

export const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 bg-white/10 py-3 text-sm text-[var(--color-text-primary)] sm:flex-row sm:gap-2 md:text-lg">
      <p>Yuksal Group © 2023</p>
      <p className="hidden sm:inline-block">{' / '}</p>
      <p>
        <Translate text={'All Rights Reserved'} />
      </p>
      <p className="hidden sm:inline-block">{' / '}</p>
      <p className="flex flex-row gap-2">
        <Translate text={'Design by'} />
        <Link
          className="text-[var(--color-primary)]"
          href="https://github.com/qutluq"
        >
          <Translate text={'Qutluq'} />
        </Link>
      </p>
    </div>
  )
}
