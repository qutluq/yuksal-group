import { Breadcrumb } from '@/components/breadcrumb'
import { Nav } from '@/components/nav'

export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div
        className={`bg-[url('/img/blog-bread-cover-img-640x160.png')] 
                    md:bg-[#1c2849] md:bg-[url('/img/blog-bread-cover-img.png')] 
                    bg-cover h-48 md:h-96 md:py-5`}
      >
        <Nav page="blog" />
      </div>
      {children}
    </section>
  )
}