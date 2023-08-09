'use client'
import { Nav } from '@/components/nav'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function PostLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const isSmallScreen = useMediaQuery('(min-width: 768px)')

  const lgBgImg = '/img/default-post-featured-img.jpg'
  const smBgImg = '/img/blog-bread-cover-img-640x160.png'
  const styles = (isSmallScreen) =>
    ({
      backgroundImage: isSmallScreen ? `url(${lgBgImg})` : `url(${smBgImg})`,
    } as React.CSSProperties)

  return (
    <section>
      <div
        style={styles(isSmallScreen)}
        className={`md:bg-[var(--color-secondary)] 
                    bg-cover h-48 md:h-[480px]  bg-center`}
      >
        <div className="bg-[#1c284980] md:py-5">
          <Nav page="blog" />
        </div>
      </div>
      {children}
    </section>
  )
}
