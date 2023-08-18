import { PrismaClient } from '@prisma/client'

import { slugify } from '@/utils'

import { translations as trs } from './translations'

type Translation = {
  id: string
  en: string
  ru: string
  ug: string
}

const getTranslationsById = (translations) => {
  const translationsById = {}

  translations.forEach((translation) => {
    if (!translationsById[translation.id]) {
      translationsById[translation.id] = []
    }
    translationsById[translation.id].push(translation)
  })

  return translationsById
}

export const updateTranslations = async () => {
  const translations: Translation[] = []
  const ids: string[] = []

  trs.map((translation) => {
    const id = slugify(translation.en)
    ids.push(id)
    translations.push({ id: slugify(translation.en), ...translation })
  })

  const duplicateIds = ids.filter((item, index) => ids.indexOf(item) != index)
  if (duplicateIds.length > 0) {
    console.log('❌ translations contain duplicate ids:')
    const translationsById = getTranslationsById(translations)
    duplicateIds.map((id) => console.log(translationsById[id]))
    console.log('❌ translations update failed')
  }

  const prisma = new PrismaClient()

  try {
    await prisma.translation.deleteMany({})
    console.error('Deleted all translations')
  } catch (error) {
    console.error('Error creating deleting translations:', error)
    await prisma.$disconnect()
    return
  }

  try {
    const records = await prisma.translation.createMany({ data: translations })

    console.log(`🚀 Added ${translations.length} translations`)
    return records
  } catch (error) {
    console.error('Error updating translations:', error)
  } finally {
    await prisma.$disconnect()
  }
}
