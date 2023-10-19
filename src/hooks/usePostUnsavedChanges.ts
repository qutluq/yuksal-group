import { useRouteChangeEvents } from 'nextjs-router-events'
import { useCallback, useEffect, useState } from 'react'

import { translate } from '@/utils'

import type { Modal } from '@/types'
export const usePostUnsavedChanges = (
  unsavedChangesExist: boolean,
  lang: string,
) => {
  const onBeforeRouteChange = useCallback((unsavedChangesExist) => {
    if (unsavedChangesExist) {
      setModal((state) => ({ ...state, closed: false }))
      return false
    }

    return true
  }, [])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })
  const [modal, setModal] = useState<Modal>({
    approved: false,
    closed: true,
    title: '',
  })

  useEffect(() => {
    if (modal.closed && modal.approved) {
      allowRouteChange()
      setModal((state) => ({ ...state, approved: false }))
    }
  }, [modal])

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
  return { modal, setModal }
}
