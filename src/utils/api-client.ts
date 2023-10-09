import Cookies from 'js-cookie'

import type { ImageFile, Settings, SettingsKeys, Slide } from '@/types'
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
    console.error(`Slides fetch failed: ${error}`)
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
    return await slidesInitialized
  } catch (error) {
    console.error(`Can't fetch image: ${error}`)
  }
  return []
}

export const getHomepageSlideInitialized = async (id: number) => {
  try {
    const { slide } = await getHomepageSlideClientSide(id)
    const response = await getImageClientSide(slide.image)

    const slidesInitialized = {
      ...slide,
      image: { file: null, id: '', href: '' },
    }
    if (!response) return slidesInitialized
    const image_blob = await response.blob()
    let imageUrl = ''
    if (image_blob.size > 0) {
      imageUrl = URL.createObjectURL(image_blob)
    }
    slidesInitialized.image = {
      file: null,
      id: slide.image,
      href: imageUrl,
    } as ImageFile
    return slidesInitialized
  } catch (error) {
    console.error(`Can't fetch image: ${error}`)
  }
  return []
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
