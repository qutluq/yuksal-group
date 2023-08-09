import { PrismaClient } from '@prisma/client'

import seedAdmin from './seeds/seedAdmin'
import seedBlog from './seeds/seedBlog'

if (process.env.NODE_ENV === 'production') {
  console.log('❌ This command cannot be run on production')
  process.exit(0)
}

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

const seed = async () => {
  console.log('Seeding database')
  return prisma.$transaction(async () => {
    await seedAdmin()
    await seedBlog(300)
  })
}

seed()
  .then(async () => {
    console.log('✅ Database seeding completed')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(`❌ ${e.message}`)
    await prisma.$disconnect()
  })
