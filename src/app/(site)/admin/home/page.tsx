import type { Metadata } from 'next'

import { getLangSearchParam, toTitleCase, translate } from '@/utils'
import { getMetadata } from '@/utils/db'

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

const Home = () => {
  return (
    <div className="text-[var(--color-text-primary)]">Secured home page</div>
  )
}

export default Home
