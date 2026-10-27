import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../../lib/gsap'
import { scrollToId, scrollToTop } from '../../lib/scroll'

/**
 * A cada navegação sobe ao topo e, se houver hash, rola até a cena depois
 * que a página nova renderizou (e os ScrollTriggers foram recalculados).
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (!hash) {
        scrollToTop()
        return
      }
      scrollToId(decodeURIComponent(hash.slice(1)), false)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
