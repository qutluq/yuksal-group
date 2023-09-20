export type TypeMenuPage =
  | 'admin'
  | 'home'
  | 'blog'
  | 'about'
  | 'gallery'
  | 'contact'

export type ImageFile = {
  id: string
  href: string
  file: File | null
}

export type Settings = {
  siteName: string
  siteDescription: string
  siteUrl: string

  defaultPosterPostsImg: string
  defaultPosterPostsPlaceholderImg: string
  defaultCoverPostsImg: string
  defaultCoverPostsPlaceholderImg: string
  logoImg: string

  paginationLimit: number
}
