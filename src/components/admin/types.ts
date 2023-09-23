import type { ImageFile } from '@/types'

import type { Settings } from './settings'

export type Settings = {
  siteName: string
  siteDescription: string
  siteUrl: string

  defaultPosterPostsImg: ImageFile | undefined
  defaultCoverPostsImg: ImageFile | undefined
  logoImg: ImageFile | undefined

  paginationLimit: number
}
