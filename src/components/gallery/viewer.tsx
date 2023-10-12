'use client'
import dynamic from 'next/dynamic'

import type { ViewerImage } from './types'

type PropTypes = {
  visible: boolean
  handleOnClose: () => void
  images: ViewerImage[]
}

const DynamicViewer = dynamic(() => import('react-viewer'), {
  ssr: false,
})

export const Viewer = ({ visible, handleOnClose, images }: PropTypes) => (
  <DynamicViewer visible={visible} onClose={handleOnClose} images={images} />
)
