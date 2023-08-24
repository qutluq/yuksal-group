'use client'
import { useContext } from 'react'

import { SingOutButton } from '@/components/button/sign-out-button'
import { LocaleContext } from '@/provider/context'
import { translate } from '@/utils'

export const AdminPage = () => {
  const { contextLocale: lang } = useContext(LocaleContext)
  return (
    <div className="flex flex-col items-center gap-3 p-10">
      <p>Secured admin page</p>
      <SingOutButton title={translate('Sign out', lang)} />
    </div>
  )
}
