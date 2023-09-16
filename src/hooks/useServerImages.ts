import { useEffect, useState } from 'react'

import {
  getImageClientSide,
  getImageFilenamesClientSide,
} from '@/utils/api-client'

export const useServerImages = () => {
  const [filenames, setFilenames] = useState<string[]>()
  const [images, setImages] = useState<
    | {
        string: string
      }
    | object
  >({})

  const updateImage = (imageKey, imageData) => {
    setImages((images) => ({ ...images, [imageKey]: imageData }))
  }

  useEffect(() => {
    try {
      getImageFilenamesClientSide().then(async (response) => {
        const { filenames: serverFilenames } = await response.json()
        setFilenames(serverFilenames)
      })
    } catch (error) {
      console.error('Filenames was not fetched!')
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (filenames) {
      try {
        filenames.map(async (filename) => {
          updateImage(filename, null)
          getImageClientSide(filename, 'md').then(async (response) => {
            const image_blob = await response.blob()
            const imageUrl = URL.createObjectURL(image_blob)
            updateImage(filename, imageUrl)
          })
        })
      } catch (error) {
        console.error('Files could not be fetched!')
        console.error(error)
      }
    }
  }, [filenames])

  return { images, setImages, updateImage }
}
