import { useState } from 'react'

export const useModal = () => {
  const [modalClosed, setModalClosed] = useState(true)
  const [confirmed, setConfirmed] = useState(false)

  return { modalClosed, setModalClosed, confirmed, setConfirmed }
}
