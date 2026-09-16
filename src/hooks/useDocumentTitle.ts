import { useEffect } from 'react'

const SITE_NAME = 'Pantaleon Systems'

/** Define o <title> da aba como "Página · Pantaleon Systems" (ou só o site, se vazio). */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME
  }, [title])
}
