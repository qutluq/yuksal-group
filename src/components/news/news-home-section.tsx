'use client'
import './styles.css'

import Link from 'next/link'

import { translate } from '@/utils'

const newsItems = [
  {
    id: 1,
    date: new Date(300000000000),
    title: 'TEASING THE DEMO OF MY NEW TRACK ‘I NEED YOU’',
    url: 'https://www.bbc.com',
  },
  {
    id: 2,
    date: new Date(100000000000),
    title: 'BRING YOUR FAVORITE ARTIST TO YOUR CITY!',
    url: 'https://www.bbc.com',
  },
  {
    id: 3,
    date: new Date(400000000000),
    title: 'NEW SINGLE: ‘RAVE ON’ (RAVERZ 2019 ANTHEM)',
    url: 'https://www.bbc.com',
  },
]
type PropTypes = {
  lang: string
}

export const NewsSectionHome = ({ lang }: PropTypes) => {
  return (
    <div className="py-10">
      <div className="text-center text-sm uppercase md:text-3xl">
        {translate('Latest news', lang)}
      </div>
      <div className="mx-auto grid w-fit grid-cols-1 gap-20 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {newsItems.map((newsItem) => (
          <div
            key={newsItem.id}
            className="news-section relative flex h-[500px]  w-80 flex-col items-center justify-center"
          >
            <div className="h-[50%] w-full bg-gray-700"></div>
            <span className="absolute top-0 flex h-full items-center justify-center">
              <span className="flex h-10 items-center justify-center rounded-3xl bg-[var(--color-primary)] p-3 text-sm md:p-3 lg:p-5 lg:text-base">
                {newsItem.date.toDateString()}
              </span>
            </span>
            <div className="flex h-[50%] w-full flex-col items-center justify-center gap-6 bg-white text-[var(--color-secondary)]">
              <span className="w-64 text-center font-bold">
                {newsItem.title}
              </span>
              <span className="h-[1px] w-[145px] bg-black/10" />
              <Link
                href={newsItem.url}
                className="flex w-fit flex-col items-center justify-center gap-[2px] rounded-full border border-white bg-white/10 text-sm uppercase after:block after:h-[1px] after:w-full after:bg-[var(--color-secondary)] after:content-['']"
              >
                {translate('read more', lang)}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
