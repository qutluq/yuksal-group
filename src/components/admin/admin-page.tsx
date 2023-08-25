'use client'

import { SingOutButton } from '@/components/button/sign-out-button'
import { translate } from '@/utils'

export const AdminPage = ({ lang }: { lang: string }) => {
  return (
    <div className="flex flex-col items-center gap-3 p-10">
      <p>Secured admin page</p>
      <SingOutButton title={translate('Sign out', lang)} />
    </div>
  )
}
