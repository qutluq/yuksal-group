import type { SettingsImages } from '@/types'

export type SettingsField = {
  field:
    | keyof SettingsImages
    | 'slidesimage'
    | 'slidestitle'
    | 'slidescontent'
    | 'slidesarticleSlug'
    | ''
  slideIndex: number
}
