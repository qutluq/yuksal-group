import type { Metadata } from 'next'

import { Settings as SettingsComponent } from '@/components/admin'
import { AdminLayout } from '@/layouts/admin'
import {
  getLangSearchParam,
  getMetadata,
  toTitleCase,
  translate,
} from '@/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const lang = getLangSearchParam(searchParams)
  const title = toTitleCase(translate('settings', lang))

  return getMetadata({ title })
}

const Settings = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)
  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminLayout lang={lang}>
        <SettingsComponent lang={lang} />
      </AdminLayout>
    </div>
  )
}

export default Settings
