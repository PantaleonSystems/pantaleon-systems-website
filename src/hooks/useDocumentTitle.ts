import { useEffect } from 'react'

const SITE_NAME = 'Pantaleon Systems'
const DEFAULT_TITLE = 'Pantaleon Systems · Diga não ao manual'

/** "Página · Pantaleon Systems", ou o título padrão da home quando vazio. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE
  }, [title])
}
