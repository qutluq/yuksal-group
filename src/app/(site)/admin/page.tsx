import type { Metadata } from 'next'

import { getLangSearchParam, toTitleCase } from '@/utils'
import {
  getAllTranslations,
  getMetadata,
  getTranslationFunction,
} from '@/utils/db'

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

const Admin = async () => {
  return <div className="text-[var(--color-text-primary)]">Admin</div>
}

export default Admin
