import type { Metadata } from 'next'

import { About as AboutComponent } from '@/components/about'
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
  const title = toTitleCase(translate('about', lang))

  return getMetadata({ title })
}

const About = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)

  return (
    <MainLayout page="about" lang={lang}>
      <AboutComponent />
    </MainLayout>
  )
}

export default About
