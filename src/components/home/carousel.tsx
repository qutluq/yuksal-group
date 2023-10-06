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
              <div className="z-10 flex flex-col items-center justify-center gap-6 text-white md:gap-8 lg:gap-10">
                <div
                  className={classNames(
                    'text-xs md:text-base lg:text-lg fade-in-up',
                    isActive ? ' active' : 'fade-in-small',
                  )}
                >
                  {slide.title}
                </div>
                <div
                  className={classNames(
                    'text-2xl md:text-5xl lg:text-8xl fade-in-up',
                    isActive ? ' active' : 'fade-in-large',
                  )}
                >
                  {slide.content}
                </div>
                {slide.articleSlug && (
                  <Link
                    href={slide.articleSlug}
                    className={classNames(
                      'fade-in-up flex h-12 w-[120px] md:w-[170px] md:h-14 lg:h-16 lg:w-[250px] items-center text-sm md:text-base justify-center rounded-full border border-white bg-white/10',
                      isActive ? ' active' : 'fade-in-medium',
                    )}
                  >
                    {translate('read more', lang)}
                  </Link>
                )}
              </div>
              {slide.image && (
                <div className="absolute h-[570px] w-full overflow-hidden md:h-[570px] xl:h-[950px]">
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
