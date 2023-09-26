import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6'

import { useContextSettings } from '@/hooks/useContextSettings'

type PropTypes = {
  variant?: 'main' | 'submenu'
}

export const SocialLinks = ({ variant = 'main' }: PropTypes) => {
  const { settings } = useContextSettings()
  return (
    <>
      <Link
        href={settings.facebookLink || ''}
        target="_blank"
        className="p-2 text-center hover:rounded-md hover:bg-zinc-500/40"
      >
        {variant === 'main' && <FaFacebookF className="text-gray-50" />}
        {variant === 'submenu' && 'Facebook'}
      </Link>
      <Link
        href={settings.youtubeLink || ''}
        target="_blank"
        className="p-2 text-center hover:rounded-md hover:bg-zinc-500/40"
      >
        {variant === 'main' && <FaYoutube className="text-gray-50" />}
        {variant === 'submenu' && 'Youtube'}
      </Link>
      <Link
        href={settings.instagramLink || ''}
        target="_blank"
        className="p-2 text-center hover:rounded-md hover:bg-zinc-500/40"
      >
        {variant === 'main' && <FaInstagram className="text-gray-50" />}
        {variant === 'submenu' && 'Instagram'}
      </Link>
      <Link
        href={settings.tiktokLink || ''}
        target="_blank"
        className="p-2 text-center hover:rounded-md hover:bg-zinc-500/40"
      >
        {variant === 'main' && <FaTiktok className="text-gray-50" />}
        {variant === 'submenu' && 'Tiktok'}
      </Link>
    </>
  )
}
