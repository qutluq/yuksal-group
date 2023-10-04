import type { ImageFile, SettingsImages } from '@/types'

export type UploadModal = {
  closed: boolean
  file: ImageFile | undefined
}

export type SettingsField = {
  field: keyof SettingsImages | 'SlideImage' | ''
  slideIndex: number
}
