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

  'facebookLink',
  'youtubeLink',
  'instagramLink',
  'tiktokLink',

  'paginationLimit',
]

export type GalleryImage = {
  id: number
  title: string
  date: Date
  image: string
}

export type GalleryImageInitialized = Omit<GalleryImage, 'image'> & {
  image: ImageFile
}

export type UserMode = 'user' | 'admin'

export type Modal = {
  title: string
  closed: boolean
  approved: boolean
}

export type NewsThumbnail = {
  id: number
  title: string
  date: Date
  image: string
  url: string
}

export type NewsThumbnailInitialized = Omit<NewsThumbnail, 'image'> & {
  image: ImageFile
}

export type AboutMain = {
  id: number
  title: string
  content: string
  image: string
  language: string
}

export type AboutMainInitialized = Omit<AboutMain, 'image'> & {
  image: ImageFile
}
