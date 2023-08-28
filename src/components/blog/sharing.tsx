import Link from 'next/link'
import { TfiFacebook, TfiInstagram, TfiYoutube } from 'react-icons/tfi'

import { translate } from '@/utils'

export const Sharing = ({ slug, lang }: { slug: string; lang: string }) => {
  return (
    <>
      <p className="pt-1 text-xl text-[var(--color-text-secondary)]">
        {translate('Share', lang)}:
      </p>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${slug}/`}
        target="_blank"
      >
        <TfiYoutube className="text-3xl text-white" />
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${slug}/`}
        target="_blank"
      >
        <TfiFacebook className="text-3xl text-white" />
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${slug}/`}
        target="_blank"
      >
        <TfiInstagram className="text-3xl text-white" />
      </Link>
    </>
  )
}
