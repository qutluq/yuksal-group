import { useRouteChangeEvents } from 'nextjs-router-events'
import { useCallback, useEffect } from 'react'

import { useModal } from '@/hooks/useModal'
import { translate } from '@/utils'

export const usePostUnsavedChanges = (
  unsavedChangesExist: boolean,
  lang: string,
) => {
  const onBeforeRouteChange = useCallback(() => {
    if (unsavedChangesExist) {
      setUnsavedModalClosed(false)
      return false
    }

    return true
  }, [unsavedChangesExist])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })
  const {
    modalClosed: modalUnsavedlosed,
    setModalClosed: setUnsavedModalClosed,
    confirmed,
    setConfirmed: setUnsavedConfirmed,
  } = useModal()

  useEffect(() => {
    if (modalUnsavedlosed && confirmed) {
      allowRouteChange()
    }
  }, [modalUnsavedlosed])

  useEffect(() => {
    const confirmationMessage = translate(
      'Changes are unsaved. Are you sure you want to leave the page?',
      lang,
    )
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.returnValue = confirmationMessage

      return confirmationMessage // Gecko + Webkit, Safari, Chrome etc.
    }
    if (unsavedChangesExist) {
      window.addEventListener('beforeunload', beforeUnloadHandler)
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }
  }, [unsavedChangesExist])
  return { modalUnsavedlosed, setUnsavedModalClosed, setUnsavedConfirmed }
}
