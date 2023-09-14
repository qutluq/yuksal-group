//npx prisma db seed -- --action seed - seeds the blog and user tables in db
//npx prisma db seed -- --action update-translations - updates the translations in db
import { parseArgs } from 'node:util'

import { PrismaClient } from '@prisma/client'

import seedAdmin from './seeds/seedAdmin'
import seedBlog from './seeds/seedBlog'

const options = {
  action: { type: 'string' },
} as const

if (
  typeof process.env.SEED_ADMIN_EMAIL === 'undefined' ||
  typeof process.env.SEED_ADMIN_PASSWORD === 'undefined'
) {
  // Both variables are defined
  console.log(
    '❌ To seed admin, environment variables: SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD need to be defined.',
  )
  process.exit(0)
}

const prisma = new PrismaClient()

const main = async () => {
  const {
    values: { action },
  } = parseArgs({ options })

  switch (action) {
    case 'seed':
      if (process.env.NODE_ENV === 'production') {
        console.log('❌ This command cannot be run on production')
        process.exit(0)
      }

      console.log('Seeding database')

      return prisma.$transaction(async () => {
        await seedAdmin()
        await seedBlog(300)
      })

    default:
      console.log('❌ please provide correct action for seeding: --action seed')
      break
  }
}

main()
  .then(async () => {
    console.log('✅ Database seeding completed')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(`❌ ${e.message}`)
    await prisma.$disconnect()
  })
