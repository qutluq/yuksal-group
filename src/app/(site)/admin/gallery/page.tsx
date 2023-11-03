import type { Metadata } from 'next'

import { GalleryEdit } from '@/components/gallery' //import from gallery-edit to avoid circular import
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
  const title = toTitleCase(translate('gallery', lang))

  return getMetadata({ title })
}

const Gallery = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)

  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminLayout lang={lang}>
        <MainLayout page="gallery" lang={lang} mode="admin">
          <GalleryEdit lang={lang} />
        </MainLayout>
      </AdminLayout>
    </div>
  )
}

export default Gallery
