import type { Metadata } from 'next'

import { GalleryImageEdit } from '@/components/gallery'
import { AdminLayout } from '@/layouts/admin'
import { MainLayout } from '@/layouts/main'
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

const GalleryImage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)
  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminLayout lang={lang}>
        <MainLayout page="gallery" lang={lang} mode="admin">
          <GalleryImageEdit lang={lang} />
        </MainLayout>
      </AdminLayout>
    </div>
  )
}

export default GalleryImage
