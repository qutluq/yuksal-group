import type { Metadata } from 'next'

import { HomeNewsEdit } from '@/components/news'
import { AdminLayout } from '@/layouts/admin'
import { HomeLayout } from '@/layouts/home'
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
  const title = toTitleCase(translate('home', lang))

  return getMetadata({ title })
}

const HomeNews = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)
  const isNew =
    searchParams.isnew && typeof searchParams.isnew === 'string'
      ? Boolean(parseInt(searchParams.isnew))
      : false

  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminLayout lang={lang}>
        <HomeLayout lang={lang} mode="admin">
          <HomeNewsEdit isNew={isNew} lang={lang} />
        </HomeLayout>
      </AdminLayout>
    </div>
  )
}

export default HomeNews
