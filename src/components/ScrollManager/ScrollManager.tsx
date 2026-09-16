import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * O BrowserRouter não rola a página ao trocar de rota nem resolve o hash
 * (ex.: Header fora da Home aponta para "/#visao"). Este componente faz os
 * dois: sobe ao topo em cada navegação e, se houver hash, rola até o alvo
 * depois que a nova página renderizou.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    // requestAnimationFrame garante que as seções da página destino já
    // estão no DOM antes de procurar o elemento.
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
