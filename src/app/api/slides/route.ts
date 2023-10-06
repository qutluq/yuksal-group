import { getSlides } from '@/utils/db'

export async function GET() {
  const result = await getSlides()

  return new Response(JSON.stringify(result), {
    status: 200,
  })
}
