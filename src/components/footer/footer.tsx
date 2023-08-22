import Link from 'next/link'

import { getAllTranslations, getTranslationFunction } from '@/utils/db'

export const Footer = async ({ lang }: { lang: string }) => {
  const translations = await getAllTranslations()
  const translate = getTranslationFunction(translations, lang)
  console.log({ tr: translate('All Rights Reserved'), lang })
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 bg-white/10 py-3 text-sm text-[var(--color-text-primary)] sm:flex-row sm:gap-2 md:text-lg">
      <p>Yuksal Group © 2023</p>
      <p className="hidden sm:inline-block">{' / '}</p>
      <p>{translate('All Rights Reserved')}</p>
      <p className="hidden sm:inline-block">{' / '}</p>
      <p className="flex flex-row gap-2">
        {translate('Design by')}
        <Link
          className="text-[var(--color-primary)]"
          href="https://github.com/qutluq"
        >
          {translate('Qutluq')}
        </Link>
      </p>
    </div>
  )
}
