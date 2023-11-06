import Cookies from 'js-cookie'

import { findClosestStandardAspectRatio } from '@/utils/'

import type { NewsThumbnail } from '@prisma/client'

import type {
  AboutMain,
  AboutMainInitialized,
  GalleryImage,
  GalleryImageInitialized,
  HomeGalleryImage,
  HomeGalleryImageInitialized,
  ImageFile,
  ImageTag,
  NewsThumbnailInitialized,
  Settings,
  SettingsKeys,
  Slide,
} from '@/types'
import type { Post } from '@/types/blog'
export const updatePostClientSide = async (id: number, data: Post) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    return response
  } catch (error) {
    console.error(`Post Update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const createPostClientSide = async (data: Post) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    return response
  } catch (error) {
    console.error(`Post Create failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const deletePostClientSide = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
      {
        method: 'DELETE',
      },
    )

    return response
  } catch (error) {
    console.error(`Post Delete failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const deleteGalleryImageClientSide = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery/${id}`,
      {
        method: 'DELETE',
      },
    )

    return response
  } catch (error) {
    console.error(`Gallery image delete failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const deleteNewsThumbnailClientSide = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news-thumbnail/${id}`,
      {
        method: 'DELETE',
      },
    )

    return response
  } catch (error) {
    console.error(`News thumbnail delete failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const getPostsClientSide = async (page: number = 1, limit: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?page=${page}&limit=${limit}`,
      {
        method: 'GET',
      },
    )

    return response
  } catch (error) {
    console.error(`Posts Get failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const getPostClientSide = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`,
      {
        method: 'GET',
      },
    )

    return response
  } catch (error) {
    console.error(`Post Get failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const getImageClientSide = async (
  filename: string,
  size: 'sm' | 'md' | undefined = undefined,
) => {
  if (!filename) {
    console.error('Image can not be fetched: empty filename')
    return undefined
  }
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images?filename=${filename}${
      size ? '&size=' : ''
    }${size ? size : ''}`,
    {
      method: 'GET',
      // next: { tags: ['images-cache'] },
      // cache: 'force-cache',
    },
  )
  return response
}

export const getHomepageSlidesClientSide = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/slides/`,
      {
        method: 'GET',
        // next: { tags: ['slides-cache'] },
        // cache: 'force-cache',
      },
    )

    const data = await response.json()

    const { slides } = data

    return slides
  } catch (error) {
    console.error(`Slides fetch failed: ${error}`)
  }
  return []
}

export const getHomeGalleryImagesClientSide = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/home-gallery/`,
      {
        method: 'GET',
      },
    )

    const data = await response.json()

    const { galleryImages } = data

    return galleryImages
  } catch (error) {
    console.error(`Home gallery images fetch failed: ${error}`)
  }
  return []
}
export const getNewsThumbnailsClientSide = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news-thumbnail/`,
      {
        method: 'GET',
      },
    )

    const data = await response.json()

    const { newsThumbnails } = data

    return newsThumbnails
  } catch (error) {
    console.error(`News thumbnails fetch failed: ${error}`)
  }
  return []
}

export const getGalleryImagesClientSide = async (tagFilter: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery/${
        tagFilter ? `?tag=${tagFilter}` : ''
      }`,
      {
        method: 'GET',
      },
    )

    const galleryImages = await response.json()

    return galleryImages
  } catch (error) {
    console.error(`Gallery images fetch failed: ${error}`)
  }
  return []
}

export const getAboutMainClientSide = async (lang: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/about-main/?lang=${lang}`,
      {
        method: 'GET',
      },
    )

    const data = await response.json()

    const { aboutMain } = data

    return aboutMain
  } catch (error) {
    console.error(`About main fetch failed: ${error}`)
  }
  return undefined
}

export const getHomepageSlideClientSide = async (id: number) => {
  if (!id) {
    return undefined
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/slides?id=${id.toString()}`,
      {
        method: 'GET',
      },
    )
    if (response.status !== 200) {
      return undefined
    }

    const slide = await response.json()

    return slide
  } catch (error) {
    console.error(`Slide fetch failed: ${error}`)
  }
  return undefined
}

export const getHomeGalleryImageClientSide = async (id: number) => {
  if (!id) {
    console.error('Home gallery image fetch failed: no id provided')
    return undefined
  }
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/home-gallery?id=${id.toString()}`,
      {
        method: 'GET',
      },
    )
    if (response.status !== 200) {
      return undefined
    }

    const galleryImage = await response.json()
    return galleryImage
  } catch (error) {
    console.error(`Gallery image fetch failed: ${error}`)
  }
  return undefined
}

export const getGalleryImageClientSide = async (id: number) => {
  if (!id) {
    console.error('Gallery image fetch failed: no id provided')
    return undefined
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery?id=${id.toString()}`,
      {
        method: 'GET',
      },
    )
    if (response.status !== 200) {
      return undefined
    }

    const galleryImage = await response.json()
    return galleryImage
  } catch (error) {
    console.error(`Gallery image fetch failed: ${error}`)
  }
  return undefined
}

export const getNewsThumbnailClientSide = async (id: number) => {
  if (!id) {
    console.error('News thumbnail fetch failed: no id provided')
    return undefined
  }
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/news-thumbnail?id=${id.toString()}`,
      {
        method: 'GET',
      },
    )
    if (response.status !== 200) {
      return undefined
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error(`Gallery image fetch failed: ${error}`)
  }
  return undefined
}

export const getHomepageSlidesInitialized = async () => {
  try {
    const slides = await getHomepageSlidesClientSide()
    const responses = await Promise.all(
      slides.map((slide) => getImageClientSide(slide.image)),
    )
    const slidesInitialized = await Promise.all(
      responses.map(async (response, index) => {
        const slide = { ...slides[index] }
        if (!response) return slide
        const image_blob = await response.blob()
        let imageUrl = ''
        if (image_blob.size > 0) {
          imageUrl = URL.createObjectURL(image_blob)
        }
        slide.image = {
          file: null,
          id: slide.image,
          href: imageUrl,
        } as ImageFile
        return slide
      }),
    )
    return slidesInitialized
  } catch (error) {
    console.error(`Can't fetch slides: ${error}`)
  }
  return []
}

export const getHomeGalleryImagesInitialized = async () => {
  try {
    const galleryImages = await getHomeGalleryImagesClientSide()
    const responses = await Promise.all(
      galleryImages.map((item) => getImageClientSide(item.image)),
    )
    const galleryImagesInitialized = await Promise.all(
      responses.map(async (response, index) => {
        if (!response)
          return {
            ...galleryImages[index],
            image: { id: galleryImages[index].image, href: '', file: null },
          } as HomeGalleryImageInitialized
        const image_blob = await response.blob()
        let imageUrl = ''
        if (image_blob.size > 0) {
          imageUrl = URL.createObjectURL(image_blob)
        }
        const galleryImageInitialized = {
          ...galleryImages[index],
          image: {
            id: galleryImages[index].image,
            href: imageUrl,
            file: null,
          },
        } as HomeGalleryImageInitialized

        return galleryImageInitialized
      }),
    )
    return galleryImagesInitialized
  } catch (error) {
    console.error(`Can't fetch gallery image: ${error}`)
  }
  return []
}

export const getGalleryImagesInitialized = async (tagFilter: string) => {
  try {
    const galleryImages = await getGalleryImagesClientSide(tagFilter)
    const responses = await Promise.all(
      galleryImages.map((item) => getImageClientSide(item.src)),
    )
    const galleryImagesInitialized = await Promise.all(
      responses.map(async (response, index) => {
        if (!response)
          return {
            ...galleryImages[index],
            image: { id: galleryImages[index].src, href: '', file: null },
          } as GalleryImageInitialized
        const image_blob = await response.blob()
        let imageUrl = ''
        const dimensions = { width: 0, height: 0 }
        if (image_blob.size > 0) {
          imageUrl = URL.createObjectURL(image_blob)
          const bmp = await createImageBitmap(image_blob)
          const { width, height } = bmp
          const ratio = findClosestStandardAspectRatio(width, height)

          dimensions.width = ratio[0]
          dimensions.height = ratio[1]

          bmp.close() // free memory
        }

        const newsThumbnailInitialized = {
          ...galleryImages[index],
          image: {
            id: galleryImages[index].src,
            href: imageUrl,
            file: null,
            ...dimensions,
          },
        } as GalleryImageInitialized

        return newsThumbnailInitialized
      }),
    )
    return galleryImagesInitialized
  } catch (error) {
    console.error(`Can't fetch gallery images: ${error}`)
  }
  return []
}
export const getNewsThumbnailsInitialized = async () => {
  try {
    const newsThumbnails = await getNewsThumbnailsClientSide()
    const responses = await Promise.all(
      newsThumbnails.map((item) => getImageClientSide(item.image)),
    )
    const newsThumbnailsInitialized = await Promise.all(
      responses.map(async (response, index) => {
        if (!response)
          return {
            ...newsThumbnails[index],
            image: { id: newsThumbnails[index].image, href: '', file: null },
          } as NewsThumbnailInitialized
        const image_blob = await response.blob()
        let imageUrl = ''
        if (image_blob.size > 0) {
          imageUrl = URL.createObjectURL(image_blob)
        }
        const newsThumbnailInitialized = {
          ...newsThumbnails[index],
          image: {
            id: newsThumbnails[index].image,
            href: imageUrl,
            file: null,
          },
        } as NewsThumbnailInitialized

        return newsThumbnailInitialized
      }),
    )
    return newsThumbnailsInitialized
  } catch (error) {
    console.error(`Can't fetch gallery image: ${error}`)
  }
  return []
}

export const getAboutMainInitialized = async (lang: string) => {
  try {
    const aboutMain = await getAboutMainClientSide(lang)
    const response = await getImageClientSide(aboutMain.image)

    if (!response)
      return {
        ...aboutMain,
        image: { id: aboutMain.image, href: '', file: null },
      } as AboutMainInitialized

    const image_blob = await response.blob()
    let imageUrl = ''
    if (image_blob.size > 0) {
      imageUrl = URL.createObjectURL(image_blob)
    }
    const aboutMainInitialized = {
      ...aboutMain,
      image: {
        id: aboutMain.image,
        href: imageUrl,
        file: null,
      },
    } as AboutMainInitialized

    return aboutMainInitialized
  } catch (error) {
    console.error(`Can't fetch about main: ${error}`)
  }
  return {
    id: 1,
    title: '',
    content: '',
    image: { id: '', href: '', file: null },
  } as AboutMainInitialized
}

export const getHomepageSlideInitialized = async (id: number) => {
  try {
    const { slide } = await getHomepageSlideClientSide(id)
    const response = await getImageClientSide(slide.image)

    const slideInitialized = {
      ...slide,
      image: { file: null, id: '', href: '' },
    }
    if (!response) return slideInitialized
    const image_blob = await response.blob()
    let imageUrl = ''
    if (image_blob.size > 0) {
      imageUrl = URL.createObjectURL(image_blob)
    }
    slideInitialized.image = {
      file: null,
      id: slide.image,
      href: imageUrl,
    } as ImageFile
    return slideInitialized
  } catch (error) {
    console.error(`Can't fetch image: ${error}`)
  }
  return []
}

export const getHomeGalleryImageInitialized = async (id: number) => {
  if (!id) {
    console.error('Home gallery image fetch failed: no id provided')
    return undefined
  }

  try {
    const { galleryImage } = await getHomeGalleryImageClientSide(id)
    const response = await getImageClientSide(galleryImage.image)

    const galleryImageInitialized = {
      ...galleryImage,
      image: { file: null, id: '', href: '' },
    }
    if (!response) return galleryImageInitialized
    const image_blob = await response.blob()
    let imageUrl = ''
    if (image_blob.size > 0) {
      imageUrl = URL.createObjectURL(image_blob)
    }

    galleryImageInitialized.image = {
      file: null,
      id: galleryImage.image,
      href: imageUrl,
    } as ImageFile

    return galleryImageInitialized
  } catch (error) {
    console.error(`Can't fetch gallery image: ${error}`)
  }
  return undefined
}

export const getGalleryImageInitialized = async (id: number) => {
  if (!id) {
    console.error('Gallery image fetch failed: no id provided')
    return undefined
  }

  try {
    const { galleryImage } = await getGalleryImageClientSide(id)
    const response = await getImageClientSide(galleryImage.src)

    const galleryImageInitialized = {
      ...galleryImage,
      image: { file: null, id: '', href: '' },
    } as GalleryImageInitialized
    if (!response) return galleryImageInitialized
    const image_blob = await response.blob()
    let imageUrl = ''
    if (image_blob.size > 0) {
      imageUrl = URL.createObjectURL(image_blob)
    }

    galleryImageInitialized.image = {
      file: null,
      id: galleryImage.src,
      href: imageUrl,
      width: 0,
      height: 0,
    }

    return galleryImageInitialized
  } catch (error) {
    console.error(`Can't fetch gallery image: ${error}`)
  }
  return undefined
}

export const getNewsThumbnailInitialized = async (id: number) => {
  if (!id) {
    console.error('Home gallery image fetch failed: no id provided')
    return undefined
  }

  try {
    const { newsThumbnail } = await getNewsThumbnailClientSide(id)
    if (!newsThumbnail) return null

    const response = await getImageClientSide(newsThumbnail.image)

    const newsThumbnailInitialized = {
      ...newsThumbnail,
      date: new Date(newsThumbnail.date),
      image: { file: null, id: '', href: '' },
    }
    if (!response) return newsThumbnailInitialized
    const image_blob = await response.blob()
    let imageUrl = ''
    if (image_blob.size > 0) {
      imageUrl = URL.createObjectURL(image_blob)
    }

    newsThumbnailInitialized.image = {
      file: null,
      id: newsThumbnail.image,
      href: imageUrl,
    } as ImageFile

    return newsThumbnailInitialized
  } catch (error) {
    console.error(`Can't fetch gallery image: ${error}`)
  }
  return undefined
}

const getImageUrlsClientSideMemo = () => {
  //memoize getImageUrlClientSide
  const cache: { [key: string]: string } = {}

  return async (filenames: (string | undefined)[]) => {
    if (filenames.length === 0) return {}
    for (const filename of filenames) {
      if (!filename) continue
      if (filename in cache) {
        continue
      }

      try {
        const response = await getImageClientSide(filename)
        if (!response) continue
        const image_blob = await response.blob()
        const imageUrl = URL.createObjectURL(image_blob)
        cache[filename] = imageUrl
      } catch (error) {
        console.error(`Can't fetch image: ${error}`)
      }
    }
    return cache
  }
}

export const getImageUrlsClientSide = getImageUrlsClientSideMemo()

export const getImageFilenamesClientSide = async () => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images/`,
    {
      method: 'GET',
      // next: { tags: ['images-cache'] },
      // cache: 'force-cache',
    },
  )
  return response
}

export const uploadImageClientSide = (file) => {
  const formData = new FormData()

  formData.append('file', file, file.name) // 'file' is the field name, and 'filename.txt' is the desired file name

  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images`,
    {
      method: 'POST',
      body: formData,
    },
  )

  return response
}

export const deleteImageClientSide = (filename) => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images/${filename}`,
    {
      method: 'DELETE',
    },
  )

  return response
}

export const revalidateImageCache = () => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=images-cache&secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`,
    {
      method: 'POST',
    },
  ).catch((error) => {
    console.error(`Image cache validation failed ${error}`)
  })

  return response
}

export const revalidateSlidesCache = () => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=slides-cache&secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`,
    {
      method: 'POST',
    },
  ).catch((error) => {
    console.error(`Image cache validation failed ${error}`)
  })
  return response
}

export const getSettingClientSide = async (setting: SettingsKeys) => {
  const cookieName = `setting${setting}`
  const cookieValue = Cookies.get(cookieName)

  if (cookieValue) {
    return cookieValue
  }
  //settings cookies not set
  const response = await getSettingsClientSide()
  if (response.ok && response.status > 199 && response.status < 300) {
    try {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { id, ...settings } = await response.json()
      const inThreeHours = new Date(new Date().getTime() + 1 * 1 * 1 * 1000)
      Object.keys(settings).map((name) => {
        const value = settings[name]
        Cookies.set(`setting${name}`, value, { expires: inThreeHours }) //set session cookie
      })
      return settings[setting]
    } catch (error) {
      console.error(`Cookies set failed`)
      return undefined
    }
  }
  console.error(`Can not fetch settings, status: ${response.status}`)
}

export const getSettingsClientSide = async () => {
  const response = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/`, {
    method: 'GET',
    // next: { tags: ['settings-cache'] },
    // cache: 'force-cache',
  })
  return response
}

export const updateSettingsClientSide = async (settings: Settings) => {
  try {
    const response = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      },
    )

    return response
  } catch (error) {
    console.error(`Settings update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const updateSlideClientSide = async (slide: Slide) => {
  try {
    const response = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/slides/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slide),
    })

    return response
  } catch (error) {
    console.error(`Slide update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const updateHomeGalleryImageClientSide = async (
  galleryImage: HomeGalleryImage,
) => {
  try {
    const response = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/home-gallery/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(galleryImage),
      },
    )

    return response
  } catch (error) {
    console.error(`Gallery image update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const saveGalleryImageClientSide = async (
  galleryImage: GalleryImage & { tags: ImageTag[] },
) => {
  try {
    const response = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(galleryImage),
    })

    return response
  } catch (error) {
    console.error(`Gallery image update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const updateAboutMainClientSide = async (aboutMain: AboutMain) => {
  try {
    const response = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/about-main/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aboutMain),
      },
    )

    return response
  } catch (error) {
    console.error(`About main update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const updateNewsThumbnailClientSide = async (
  newsThumbnail: NewsThumbnail,
) => {
  try {
    const response = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news-thumbnail/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsThumbnail),
      },
    )

    return response
  } catch (error) {
    console.error(`Gallery image update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const revalidateSettingsCache = () => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=settings-cache&secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`,
    {
      method: 'POST',
    },
  ).catch((error) => {
    console.error(`Image cache validation failed ${error}`)
  })

  return response
}
