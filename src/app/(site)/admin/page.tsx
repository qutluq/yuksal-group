import type { Metadata } from 'next'

import { Admin as AdminComponent } from '@/components/admin'
import type { AuthorisationText } from '@/types'
import { getLangSearchParam, toTitleCase } from '@/utils'
import {
  getAllTranslations,
  getMetadata,
  getTranslationFunction,
} from '@/utils/db'
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const lang = getLangSearchParam(searchParams)
  const translations = await getAllTranslations()
  const translate = getTranslationFunction(translations, lang)
  const title = toTitleCase(translate('admin'))

  return getMetadata({ title })
}

const Admin = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)
  const allTranslations = await getAllTranslations()
  const translate = getTranslationFunction(allTranslations, lang)
  const translations: AuthorisationText = {
    signOutButtonTitle: translate('Sign out'),
    signInButtonTitle: translate('Sign in'),
    authorizationRequired: translate('Authorisation required'),
  }

  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminComponent translations={translations} />
    </div>
  )
}

export default Admin
