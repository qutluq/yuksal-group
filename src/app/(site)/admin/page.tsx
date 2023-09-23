import type { Metadata } from 'next'

import { Admin as AdminComponent } from '@/components/admin'
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
  const title = toTitleCase(translate('admin', lang))

  return getMetadata({ title })
}

const Admin = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)
  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminLayout lang={lang}>
        <AdminComponent lang={lang} />
      </AdminLayout>
    </div>
  )
}

export default Admin
