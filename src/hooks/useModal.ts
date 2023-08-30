import { useState } from 'react'

export const useModal = () => {
  const [modalClosed, setModalClosed] = useState(true)
  const [agreed, setAgreed] = useState(false)

  return { modalClosed, setModalClosed, agreed, setAgreed }
}
