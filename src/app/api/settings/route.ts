import type { Settings } from '@/types'
import { accessPermitted } from '@/utils/api-server'
import { getSettings, updateSettings } from '@/utils/db'

export async function GET() {
  try {
    const settings = await getSettings()

    return new Response(JSON.stringify(settings), { status: 200 })
  } catch (error) {
    console.error('Unable to fetch settings', { error })
    return new Response(null, {
      status: 500,
    })
  }
}

export async function POST(request: Request) {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  try {
    let settings = await request.json()
    settings = {
      ...settings,
      paginationLimit: parseInt(settings.paginationLimit),
    } as Settings

    updateSettings(settings)
    return new Response(null, {
      status: 204,
    })
  } catch (error) {
    console.error('Unable to fetch filenames', { error })
    return new Response(null, {
      status: 500,
    })
  }
}
