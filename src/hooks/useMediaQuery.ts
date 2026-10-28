import { useSyncExternalStore } from 'react'

/** true enquanto a media query casar; acompanha mudanças de tamanho/orientação. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', notify)
      return () => mql.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
