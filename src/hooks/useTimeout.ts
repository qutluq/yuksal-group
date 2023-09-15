import { useEffect, useRef } from 'react'

export const useTimeout = (
  hook: unknown,
  callback: () => void,
  timeout: number,
) => {
  const id = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    clearTimeout(id.current)

    id.current = setTimeout(() => {
      callback()
    }, timeout)
  }, [hook])
}
