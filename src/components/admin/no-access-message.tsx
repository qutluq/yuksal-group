'use client'

import { SingInButton } from '@/components/button'
import { translate } from '@/utils'

export const NoAccessMessage = ({ lang }: { lang: string }) => {
  return (
    <div className="flex flex-col items-center gap-3 p-10">
      <p>{translate('Authorisation required', lang)}</p>
      <SingInButton title={translate('Sign in', lang)} />
    </div>
  )
}
