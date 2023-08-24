import type { Metadata } from 'next'

import { Admin as AdminComponent } from '@/components/admin'
import type { AuthorisationText } from '@/types'
import { getLangSearchParam, toTitleCase, translate } from '@/utils'
import { getMetadata } from '@/utils/db'
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const lang = getLangSearchParam(searchParams)
  const title = toTitleCase(translate('admin', lang))

  return getMetadata({ title })
}

const Admin = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)
  const translations: AuthorisationText = {
    signOutButtonTitle: translate('Sign out', lang),
    signInButtonTitle: translate('Sign in', lang),
    authorizationRequired: translate('Authorisation required', lang),
  }

  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminComponent translations={translations} />
    </div>
  )
}

export default Admin
