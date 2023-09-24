export type TypeMenuPage =
  | 'admin'
  | 'home'
  | 'blog'
  | 'about'
  | 'gallery'
  | 'contact'
  | 'settings'

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
  defaultCoverPostsImg: string

  paginationLimit: number
}

export type SettingsImages = {
  defaultPosterPostsImg: ImageFile
  defaultCoverPostsImg: ImageFile
}

export type SettingsInitialized = Omit<Settings, keyof SettingsImages> &
  SettingsImages

export type SettingsKeys = keyof Settings
export const settingsKeys: (keyof Settings)[] = [
  'siteName',
  'siteDescription',
  'siteUrl',

  'defaultPosterPostsImg',
  'defaultCoverPostsImg',

  'paginationLimit',
]
