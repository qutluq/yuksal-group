import type { ImageFile } from '@/types'

export type Settings = {
  siteName: string
  siteDescription: string
  siteUrl: string

  defaultPosterPostsImg: ImageFile | undefined
  defaultPosterPostsPlaceholderImg: ImageFile | undefined
  defaultCoverPostsImg: ImageFile | undefined
  defaultCoverPostsPlaceholderImg: ImageFile | undefined
  logoImg: ImageFile | undefined

  paginationLimit: number
}
