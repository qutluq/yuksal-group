import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6'

export const SocialLinks = () => (
  <div className="flex flex-row justify-end">
    <Link
      href="https://wwww.facebook.com"
      target="_blank"
      className="p-2 hover:rounded-md hover:bg-zinc-500/40"
    >
      <FaFacebookF className="text-gray-50" />
    </Link>
    <Link
      href="https://wwww.twitter.com"
      target="_blank"
      className="p-2 hover:rounded-md hover:bg-zinc-500/40"
    >
      <FaTwitter className="text-gray-50" />
    </Link>
    <Link
      href="https://wwww.instagram.com"
      target="_blank"
      className="p-2 hover:rounded-md hover:bg-zinc-500/40"
    >
      <FaInstagram className="text-gray-50" />
    </Link>
  </div>
)
