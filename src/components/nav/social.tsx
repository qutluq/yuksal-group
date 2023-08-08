import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa6'

export const SocialLinks = () => (
  <div className="flex flex-row justify-right">
    <Link
      href="wwww.facebook.com"
      className="hover:bg-zinc-500 p-2 hover:rounded-md hover:bg-opacity-40"
    >
      <FaFacebookF className="text-gray-50" />
    </Link>
    <Link
      href="wwww.twitter.com"
      className="hover:bg-zinc-500 p-2 hover:rounded-md hover:bg-opacity-40"
    >
      <FaTwitter className="text-gray-50" />
    </Link>
    <Link
      href="wwww.instagram.com"
      className="hover:bg-zinc-500 p-2 hover:rounded-md hover:bg-opacity-40"
    >
      <FaInstagram className="text-gray-50" />
    </Link>
  </div>
)
