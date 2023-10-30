import type { Metadata } from 'next'

import { Gallery as GalleryComponent } from '@/components/gallery'
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
      <MainLayout page="gallery" lang={lang}>
        <GalleryComponent />
      </MainLayout>
    </div>
  )
}

export default Gallery
