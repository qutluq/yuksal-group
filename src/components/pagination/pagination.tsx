import Link from 'next/link'
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
    <div className="w-full flex flex-row items-center justify-center gap-7">
      <p className="text-white align-text-bottom pt-1 hidden md:flex">
        {getPaginationText(page, limit, total)}
      </p>
      <p className="text-white align-text-bottom pt-1 flex md:hidden">
        {getPaginationText(page, limit, total, true)}
      </p>

      <div className="hidden md:flex flex-row gap-1 items-center justify-center">
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
      <div className="flex md:hidden flex-row gap-1 items-center justify-center">
        <Button
          href={{
            pathname,
            query: {
              page: page > 1 ? page - 1 : 1,
            },
          }}
          disabled={page <= 1}
          variant="mobile"
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
          variant="mobile"
        >
          <BsArrowRight className="text-xl" />
        </Button>
      </div>
    </div>
  )
}
