import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { slugify } from '@/utils'

type BlogPostType = {
  title: string
  slug: string
  content: string
  description: string
  readingTime: number
  authorId: number
  published: boolean
  publishedAt: Date | null
  updatedAt: Date
}

const loremParagraphs = (min: number, max: number, separator = '\n') => {
  const n = faker.number.int({ min, max })
  let str = ''
  for (let i = 0; i < n; i++) {
    str = str.concat(faker.lorem.sentences({ min: 5, max: 17 }))
    str = str.concat(separator)
  }

  return str
}

const seedBlog = async (count: number = 11) => {
  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: process.env.SEED_ADMIN_EMAIL!,
      },
    })

    if (user) {
      try {
        const posts: BlogPostType[] = []

        const dates = faker.date
          .betweens({
            from: '2020-01-01T00:00:00.000Z',
            to: '2023-01-01T00:00:00.000Z',
            count: count,
          })
          .sort((a, b) => a.getTime() - b.getTime())

        const slugs = ['']

        for (let i = 0; i < count; i++) {
          let title = ''
          let slug = ''
          // eslint-disable-next-line no-constant-condition
          while (true) {
            //make sure slugs are unique
            title = faker.commerce.productName()
            slug = slugify(title)
            if (slugs.indexOf(slug) == -1) {
              break
            }
          }
          const published = faker.number.int({ min: 1, max: 7 }) !== 3
          posts.push({
            title: title,
            slug: slugify(title),
            content: loremParagraphs(10, 17),
            description: faker.lorem.sentences({ min: 3, max: 5 }),
            readingTime: faker.number.int({ min: 1, max: 7 }),
            authorId: user.id,
            published: published,
            publishedAt: published ? dates[i] : null,
            updatedAt: dates[i],
          })
        }

        const records = await prisma.post.createMany({
          data: posts,
        })

        console.log(`🚀 Seeded ${records.count} posts`)
        return records
      } catch (error) {
        console.error('Error creating new posts:', error)
      } finally {
        await prisma.$disconnect()
      }
    } else {
      console.log('❌ Admin user not found.')
      throw new Error('Admin user not found')
    }
  } catch (error) {
    console.error('❌ Error finding user:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export default seedBlog
