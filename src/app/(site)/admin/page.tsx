import type { Metadata } from 'next'

import { Admin as AdminComponent } from '@/components/admin'
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

const Admin = () => {
  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminComponent />
    </div>
  )
}

export default Admin
