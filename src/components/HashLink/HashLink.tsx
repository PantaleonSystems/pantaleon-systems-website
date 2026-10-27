import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { scrollToId } from '../../lib/scroll'

interface HashLinkProps {
  hash: string
  className?: string
  children: ReactNode
  onClick?: () => void
  /** liga o feedback de pressão (usePressFeedback) */
  press?: boolean
}

/** Âncora para uma cena da Home: rola com o smoother na Home, navega para /#id nas outras páginas. */
export function HashLink({ hash, className, children, onClick, press }: HashLinkProps) {
  const { pathname } = useLocation()

  if (pathname !== '/') {
    return (
      <Link to={`/#${hash}`} className={className} onClick={onClick} data-press={press || undefined}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={`#${hash}`}
      className={className}
      data-press={press || undefined}
      onClick={(event) => {
        event.preventDefault()
        history.replaceState(null, '', `#${hash}`)
        scrollToId(hash)
        onClick?.()
      }}
    >
      {children}
    </a>
  )
}
