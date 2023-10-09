import { cache } from 'react'

import { PrismaClient } from '@prisma/client'

import { slidesCount } from './settings'

import type { Settings, SettingsKeys, Slide } from '@/types'
import type { Post } from '@/types/blog'
// Instantiate a single instance PrismaClient and save it on the globalThis object.
// Then we keep a check to only instantiate PrismaClient if it's not on the globalThis object otherwise use the same
// instance again if already present to prevent instantiating extra PrismaClient instances.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const deletePost = async (id: number) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id: id,
    },
  })

  return deletedPost
}

export const getPosts = cache(
  async ({
    page,
    limit,
    select = 'published',
  }: {
    page: number
    limit: number
    select: 'published' | 'all'
  }) => {
    const conditions =
      select == 'published'
        ? {
            where: {
              published: true,
            },
          }
        : undefined

    const count = await prisma.post.count(conditions)

    const results = await prisma.post.findMany({
      skip: (page - 1) * limit, // How many rows to skip
      take: limit, // Page size
      orderBy: {
        publishedAt: { sort: 'desc', nulls: 'last' },
      },
      ...conditions,
    })

    return { posts: results as Post[], total: count }
  },
)

export const getSlides = async () => {
  const results = await prisma.slide.findMany({
    where: {
      settingId: 1,
    },
    orderBy: {
      id: 'asc',
    },
  })

  if (results.length === 0) {
    const records: Slide[] = []
    for (let i = 1; i <= slidesCount; i++) {
      const newRecord = await prisma.slide.create({
        data: {
          id: i,
          title: '',
          content: '',
          articleSlug: '',
          image: '',
          settingId: 1,
        },
      })
      records.push(newRecord)
    }
    return records
  }

  return { slides: results as Slide[] }
}

export const getSlide = async (id: number) => {
  const result = await prisma.slide.findUnique({
    where: {
      id: id,
    },
  })

  return { slide: result as Slide }
}

export const updateSlide = async (slide: Slide) => {
  const { id, ...data } = slide
  try {
    await prisma.slide.update({
      where: {
        id: id,
      },
      data: data,
    })
  } catch (error) {
    console.error(`❌ Can not update post with id ${id}: `, error)
    return false
  }
  return true
}

export const updatePost = async (id: number, post: Post) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { authorId, ...data } = post
  try {
    await prisma.post.update({
      where: {
        id: id,
      },
      data: data,
    })
  } catch (error) {
    console.error(`❌ Can not update post with id ${id}: `, error)
    return false
  }
  return true
}

export const getPost = cache(async (slug: string) => {
  const result = await prisma.post.findMany({
    take: 1,
    where: {
      slug,
    },
  })

  return result
})

export const getAuthor = cache(async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return result
})

export const getNeighbourPosts = async (post: Post) => {
  // Get previous post
  const nextPost = await prisma.post.findFirst({
    where: {
      published: true,
      publishedAt: {
        lt: post.publishedAt!,
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  // Get next post
  const previousPost = await prisma.post.findFirst({
    where: {
      published: true,
      publishedAt: {
        gt: post.publishedAt!,
      },
    },
    orderBy: {
      publishedAt: 'asc',
    },
  })

  return {
    nextPost: nextPost as Post,
    previousPost: previousPost as Post,
  }
}

export const getSettings = cache(async () => {
  const result = await prisma.settings.findUnique({
    where: { id: 1 },
  })

  if (!result) {
    //no settings record found
    const newRecord = await prisma.settings.create({ data: { id: 1 } })
    return newRecord
  }

  return result
})

export const getSetting = cache(async (setting: SettingsKeys) => {
  const result = await prisma.settings.findUnique({
    where: { id: 1 },
  })

  if (!result) {
    //no settings record found
    const newRecord = await prisma.settings.create({ data: { id: 1 } })
    return newRecord[setting]
  }

  return result[setting]
})

export const updateSettings = async (settings: Settings) => {
  try {
    const result = await prisma.settings.findUnique({
      where: { id: 1 },
    })

    if (result) {
      //settings record exist
      const newRecord = await prisma.settings.update({
        where: { id: 1 },
        data: settings,
      })
      return newRecord
    }

    return result
  } catch (error) {
    console.error(`Can not update settings: ${error}`)
    return null
  }
}

export const updateSlides = async (slides: Slide[]) => {
  try {
    slides.forEach(async (slide, index) => {
      const result = await prisma.slide.findUnique({
        where: { id: index + 1 },
      })

      if (!result) {
        await prisma.slide.create({
          data: { ...slide, settingId: 1 },
        })
        return
      }

      await prisma.slide.update({
        where: { id: index + 1 },
        data: { ...slide, settingId: 1 },
      })
    })

    return true
  } catch (error) {
    console.error(`Can not update settings: ${error}`)
    return null
  }
}
