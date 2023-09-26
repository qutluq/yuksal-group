import { useEffect, useState } from 'react'

import type { SettingsInitialized } from '@/types'
import {
  getImageUrlsClientSide,
  getSettingClientSide,
} from '@/utils/api-client'
const promiseAll = async (promises: Promise<string | number>[]) => {
  const res = await Promise.all(promises)
  return res
}
export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsInitialized>(
    {} as SettingsInitialized,
  )
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setInitialized(false)
    promiseAll([
      getSettingClientSide('siteName'),
      getSettingClientSide('siteDescription'),
      getSettingClientSide('siteUrl'),
      getSettingClientSide('paginationLimit'),
      getSettingClientSide('facebookLink'),
      getSettingClientSide('youtubeLink'),
      getSettingClientSide('instagramLink'),
      getSettingClientSide('tiktokLink'),
      getSettingClientSide('defaultPosterPostsImg'),
      getSettingClientSide('defaultCoverPostsImg'),
    ]).then((cookieSettings: (string | number)[]) => {
      const [
        siteName,
        siteDescription,
        siteUrl,
        paginationLimit,
        facebookLink,
        youtubeLink,
        instagramLink,
        tiktokLink,
        ...images
      ] = cookieSettings
      const [poster, cover] = images

      getImageUrlsClientSide(images as string[])
        .then((imageUrlsObject) => {
          setSettings(
            () =>
              ({
                siteName,
                siteDescription,
                siteUrl,
                paginationLimit,
                facebookLink,
                youtubeLink,
                instagramLink,
                tiktokLink,
                defaultPosterPostsImg: {
                  id: poster,
                  href: imageUrlsObject[poster],
                },
                defaultCoverPostsImg: {
                  id: cover,
                  href: imageUrlsObject[cover],
                },
              }) as SettingsInitialized,
          )
        })
        .finally(() => {
          setInitialized(true)
        })
    })
  }, [])
  return { settings, initialized }
}
