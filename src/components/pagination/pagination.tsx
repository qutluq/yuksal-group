import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import { Button } from '@/components/button'
import { getPaginationText } from '@/utils'

type PropTypes = {
  pathname: string
  page: number
  limit: number
  total: number
}

export const Pagination = ({ pathname, page, limit, total }: PropTypes) => {
  //pathname - slug
  //page - current page number
  //limit - # of items per page
  //total - total # of items

  const totalPages = Math.ceil(total / limit)
  return (
    <div className="flex w-full flex-row items-center justify-center gap-7">
      <p className="hidden pt-1 align-text-bottom text-white md:flex">
        {getPaginationText(page, limit, total)}
      </p>
      <p className="flex pt-1 align-text-bottom text-white md:hidden">
        {getPaginationText(page, limit, total, true)}
      </p>

      <div className="hidden flex-row items-center justify-center gap-1 md:flex">
        <div className="w-24">
          <Button
            href={{
              pathname,
              query: {
                page: page > 1 ? page - 1 : 1,
              },
            }}
            title="Previous"
            disabled={page <= 1}
          />
        </div>

        <div className="w-24">
          <Button
            href={{
              pathname: '/blog',
              query: {
                page: page < total ? page + 1 : total,
              },
            }}
            title="Next"
            disabled={page >= totalPages}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-1 md:hidden">
        <Button
          href={{
            pathname,
            query: {
              page: page > 1 ? page - 1 : 1,
            },
          }}
          disabled={page <= 1}
          variant="contained"
        >
          <BsArrowLeft className="text-xl" />
        </Button>

        <Button
          href={{
            pathname: '/blog',
            query: {
              page: page < total ? page + 1 : total,
            },
          }}
          disabled={page >= totalPages}
          variant="contained"
        >
          <BsArrowRight className="text-xl" />
        </Button>
      </div>
    </div>
  )
}
