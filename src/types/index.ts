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

export type UploadModal = {
  closed: boolean
  file: ImageFile | undefined
}

export type Slide = {
  id: number
  title: string
  content: string
  articleSlug: string
  image: string
}

export type SlideInitialized = Omit<Slide, 'image'> & {
  image: ImageFile | undefined
}

export type Settings = {
  siteName: string
  siteDescription: string
  siteUrl: string

  defaultPosterPostsImg: string
  defaultCoverPostsImg: string

  facebookLink: string
  youtubeLink: string
  instagramLink: string
  tiktokLink: string

  slides: Slide[]

  paginationLimit: number
}

export type SettingsImages = {
  defaultPosterPostsImg: ImageFile
  defaultCoverPostsImg: ImageFile
}

export type SettingsInitialized = Omit<
  Settings,
  keyof SettingsImages | 'slides'
> &
  SettingsImages & { slides: SlideInitialized[] }

export type SettingsKeys = keyof Settings
export const settingsKeys: (keyof Settings)[] = [
  'siteName',
  'siteDescription',
  'siteUrl',

  'defaultPosterPostsImg',
  'defaultCoverPostsImg',

  'facebookLink',
  'youtubeLink',
  'instagramLink',
  'tiktokLink',

  'slides',

  'paginationLimit',
]
