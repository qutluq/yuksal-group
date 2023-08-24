'use client'
import { useContext } from 'react'

import { SingInButton } from '@/components/button'
import { LocaleContext } from '@/provider/context'
import { translate } from '@/utils'

export const NoAccessMessage = () => {
  const { contextLocale: lang } = useContext(LocaleContext)
  return (
    <div className="flex flex-col items-center gap-3 p-10">
      <p>{translate('Authorisation required', lang)}</p>
      <SingInButton title={translate('Sign in', lang)} />
    </div>
  )
}
