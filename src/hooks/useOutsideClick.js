import { useEffect } from 'react'
import { useRef } from 'react'

export const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef()

  useEffect(() => {
    function onOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler()
    }
    document.addEventListener('click', onOutsideClick, listenCapturing)
    return () => document.removeEventListener('click', onOutsideClick, listenCapturing)
  }, [handler])

  return ref
}
