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
      setModalClosed(false)
      return false
    }

    return true
  }, [unsavedChangesExist])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })
  const { modalClosed, setModalClosed, confirmed, setConfirmed } = useModal()

  useEffect(() => {
    if (modalClosed && confirmed) {
      allowRouteChange()
    }
  }, [modalClosed])

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
  return { modalClosed, setModalClosed, setConfirmed }
}
