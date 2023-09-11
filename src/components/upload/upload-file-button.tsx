import type { ChangeEvent } from 'react'
import { HiArrowUpTray } from 'react-icons/hi2'

type PropTypes = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  acceptType: 'images'
}

const accept = (type) => {
  if (type === 'images') {
    return 'image/png, image/gif, image/jpeg'
  }
}

export const FileInputButton = ({ onChange, acceptType }: PropTypes) => {
  return (
    <div className="relative flex flex-row gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-500">
        <HiArrowUpTray className="text-white" />
      </div>

      <input
        type="file"
        id="file"
        onChange={onChange}
        accept={accept(acceptType)}
        className="absolute left-0 top-0 h-12 w-12 opacity-0 hover:cursor-pointer"
      />
    </div>
  )
}
