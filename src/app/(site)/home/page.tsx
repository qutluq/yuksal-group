import type { Metadata } from 'next'

import { Home as HomeComponent } from '@/components/home'
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

const Home = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)
  return (
    <HomeLayout page="home" lang={lang}>
      <HomeComponent lang={lang} />
    </HomeLayout>
  )
}

export default Home
