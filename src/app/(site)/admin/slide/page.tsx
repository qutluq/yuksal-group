import type { Metadata } from 'next'

import { SlideEdit } from '@/components/slide'
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

const Slide = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)
  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminLayout lang={lang}>
        <HomeLayout lang={lang} mode="admin">
          <SlideEdit lang={lang} />
        </HomeLayout>
      </AdminLayout>
    </div>
  )
}

export default Slide
