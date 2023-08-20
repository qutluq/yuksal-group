'use client'

import { Breadcrumb } from '@/components/breadcrumb'
import { Nav } from '@/components/nav'

export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div
        className={`h-48 
                    bg-[url('/img/blog-bread-cover-img-640x160.png')] bg-cover 
                    bg-center md:h-[480px] md:bg-[var(--color-secondary)] md:bg-[url('/img/blog-bread-cover-img.png')]`}
      >
        <Nav page="blog" />
        <Breadcrumb page="blog" />
      </div>
      {children}
    </>
  )
}