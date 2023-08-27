import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6'

type PropTypes = {
  variant?: 'main' | 'submenu'
}

export const SocialLinks = ({ variant = 'main' }: PropTypes) => (
  <>
    <Link
      href="https://www.facebook.com"
      target="_blank"
      className="p-2 hover:rounded-md hover:bg-zinc-500/40"
    >
      {variant === 'main' && <FaFacebookF className="text-gray-50" />}
      {variant === 'submenu' && 'Facebook'}
    </Link>
    <Link
      href="https://www.twitter.com"
      target="_blank"
      className="p-2 hover:rounded-md hover:bg-zinc-500/40"
    >
      {variant === 'main' && <FaTwitter className="text-gray-50" />}
      {variant === 'submenu' && 'Twitter'}
    </Link>
    <Link
      href="https://www.instagram.com"
      target="_blank"
      className="p-2 hover:rounded-md hover:bg-zinc-500/40"
    >
      {variant === 'main' && <FaInstagram className="text-gray-50" />}
      {variant === 'submenu' && 'Instagram'}
    </Link>
  </>
)
