import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6'

export const SocialLinks = () => (
  <div className="flex flex-row justify-right">
    <Link
      href="https://wwww.facebook.com"
      target="_blank"
      className="hover:bg-zinc-500 p-2 hover:rounded-md hover:bg-opacity-40"
    >
      <FaFacebookF className="text-gray-50" />
    </Link>
    <Link
      href="https://wwww.twitter.com"
      target="_blank"
      className="hover:bg-zinc-500 p-2 hover:rounded-md hover:bg-opacity-40"
    >
      <FaTwitter className="text-gray-50" />
    </Link>
    <Link
      href="https://wwww.instagram.com"
      target="_blank"
      className="hover:bg-zinc-500 p-2 hover:rounded-md hover:bg-opacity-40"
    >
      <FaInstagram className="text-gray-50" />
    </Link>
  </div>
)
