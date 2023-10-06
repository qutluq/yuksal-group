import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './styles.css'

import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { classNames, translate } from '@/utils'

import type { SlideInitialized } from '@/types'
type PropTypes = {
  slides: SlideInitialized[] | undefined
  lang: string
}

export const Carousel = ({ slides, lang }: PropTypes) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {slides?.map((slide) => (
        <SwiperSlide key={slide.title} className="relative">
          {({ isActive }) => (
            <>
              <div className="z-10 flex flex-col items-center justify-center gap-10 text-white">
                <div
                  className={classNames(
                    'text-lg fade-in-up',
                    isActive ? ' active' : 'fade-in-small',
                  )}
                >
                  {slide.title}
                </div>
                <div
                  className={classNames(
                    'text-8xl fade-in-up',
                    isActive ? ' active' : 'fade-in-large',
                  )}
                >
                  {slide.content}
                </div>
                {slide.articleSlug && (
                  <Link
                    href={slide.articleSlug}
                    className={classNames(
                      'fade-in-up flex h-16 w-[250px] items-center justify-center rounded-full border border-white bg-white/10',
                      isActive ? ' active' : 'fade-in-medium',
                    )}
                  >
                    {translate('read more', lang)}
                  </Link>
                )}
              </div>
              {slide.image && (
                <div className="absolute h-[480px] w-full overflow-hidden md:h-[750px] xl:h-[950px]">
                  <Image
                    src={slide.image?.href}
                    alt=""
                    className="object-cover"
                    fill
                  />
                </div>
              )}
            </>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
