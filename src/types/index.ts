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

type SettingsImages = {
  defaultPosterPostsImg: ImageFile
  defaultPosterPostsPlaceholderImg: ImageFile
  defaultCoverPostsImg: ImageFile
  defaultCoverPostsPlaceholderImg: ImageFile
  logoImg: ImageFile
}

export type SettingsInitialized = Omit<Settings, keyof SettingsImages> &
  SettingsImages

export type SettingsKeys = keyof Settings

export const settingsKeys: (keyof Settings)[] = [
  'siteName',
  'siteDescription',
  'siteUrl',

  'defaultPosterPostsImg',
  'defaultPosterPostsPlaceholderImg',
  'defaultCoverPostsImg',
  'defaultCoverPostsPlaceholderImg',
  'logoImg',

  'paginationLimit',
]
