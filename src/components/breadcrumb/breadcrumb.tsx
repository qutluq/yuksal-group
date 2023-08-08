import Link from 'next/link'

export const Breadcrumb = ({ page }: { page: string }) => (
  <div className="relative pt-8 md:pt-40 h-[130px] md:h-[424px] flex flex-col justify-between items-center">
    <p className="tracking-wide text-3xl md:text-7xl text-white uppercase">
      {page}
    </p>
    <div className="bg-black bg-opacity-30 w-full py-2 md:py-5 text-white">
      <div className="flex flex-row items-center justify-center text-sm md:text-lg uppercase  tracking-wide font-semibold">
        <Link href="home" className="text-[var(--color-primary)]">
          Home
        </Link>
        <p className="align-text-bottom">&nbsp;/&nbsp;</p>
        <p>{page}</p>
      </div>
    </div>
  </div>
)
