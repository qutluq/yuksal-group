import type { Metadata } from 'next'

import { AboutMainEdit } from '@/components/about'
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

const AboutMain = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)

  return (
    <div className="text-[var(--color-text-primary)]">
      <AdminLayout lang={lang}>
        <MainLayout page="about" lang={lang} mode="admin">
          <AboutMainEdit lang={lang} />
        </MainLayout>
      </AdminLayout>
    </div>
  )
}

export default AboutMain
