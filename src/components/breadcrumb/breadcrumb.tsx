import Link from 'next/link'

export const Breadcrumb = ({ page }: { page: string }) => (
  <div className="absolute top-24 flex h-24 w-full flex-col items-center justify-between md:top-56 md:h-64">
    <p className="text-3xl uppercase tracking-wide text-white md:text-7xl">
      {page}
    </p>
    <div className="w-full bg-black/30 py-2 text-white md:py-5">
      <div className="flex flex-row items-center justify-center text-sm font-semibold uppercase  tracking-wide md:text-lg">
        <Link href="home" className="text-[var(--color-primary)]">
          Home
        </Link>
        <p className="align-text-bottom">&nbsp;/&nbsp;</p>
        <p>{page}</p>
      </div>
    </div>
  </div>
)
