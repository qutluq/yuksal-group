import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import { Button } from '@/components/button'
import { getPaginationText } from '@/utils'

type PropTypes = {
  page: number
  setPage: (page: number) => void
  limit: number
  total: number
}

export const PaginationClientSide = ({
  page,
  setPage,
  limit,
  total,
}: PropTypes) => {
  //page - current page number hook
  //setPage - set page hook
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
        <Button
          title="Previous"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="w-28"
        />

        <Button
          title="Next"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="w-28"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-1 md:hidden">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          variant="contained"
        >
          <BsArrowLeft className="text-xl" />
        </Button>

        <Button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          variant="contained"
        >
          <BsArrowRight className="text-xl" />
        </Button>
      </div>
    </div>
  )
}
