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
    console.log('useSettings init...')
    setInitialized(false)
    promiseAll([
      getSettingClientSide('siteName'),
      getSettingClientSide('siteDescription'),
      getSettingClientSide('siteUrl'),
      getSettingClientSide('paginationLimit'),
      getSettingClientSide('defaultPosterPostsImg'),
      getSettingClientSide('defaultCoverPostsImg'),
      getSettingClientSide('logoImg'),
    ]).then((cookieSettings: (string | number)[]) => {
      const [siteName, siteDescription, siteUrl, paginationLimit, ...images] =
        cookieSettings
      const [poster, cover, logo] = images

      getImageUrlsClientSide(images as string[])
        .then((imageUrlsObject) => {
          setSettings(
            () =>
              ({
                siteName: siteName,
                siteDescription: siteDescription,
                siteUrl: siteUrl,
                paginationLimit: paginationLimit,
                defaultPosterPostsImg: {
                  id: poster,
                  href: imageUrlsObject[poster],
                },
                defaultCoverPostsImg: {
                  id: cover,
                  href: imageUrlsObject[cover],
                },
                logoImg: { id: logo, href: imageUrlsObject[logo] },
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
