'use client'
import dynamic from 'next/dynamic'

import type { ViewerImage } from './types'

type PropTypes = {
  visible: boolean
  handleOnClose: () => void
  images: ViewerImage[]
  activeIndex?: number
}

const DynamicViewer = dynamic(() => import('react-viewer'), {
  ssr: false,
})

export const Viewer = ({
  visible,
  handleOnClose,
  images,
  activeIndex = 0,
}: PropTypes) => (
  <DynamicViewer
    visible={visible}
    onClose={handleOnClose}
    images={images}
    activeIndex={activeIndex}
  />
)
