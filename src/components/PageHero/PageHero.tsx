import type { ReactNode } from 'react'
import { Eyebrow } from '../../design-system'
import { KhipuLines } from '../KhipuLines/KhipuLines'
import styles from './PageHero.module.css'

export interface PageHeroProps {
  eyebrow: string
  title: string
  lead?: string
  /** conteúdo adicional ao lado do título (ex.: StatusBadge) */
  aside?: ReactNode
  /** conteúdo abaixo do lead (ex.: CTAs) */
  children?: ReactNode
}

/** Hero curto das páginas internas — mesma assinatura visual do Hero da Home. */
export function PageHero({ eyebrow, title, lead, aside, children }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <KhipuLines variant="light" density="low" nodes />
      <div className={`wrap ${styles.inner}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          {aside}
        </div>
        {lead && <p className={styles.lead}>{lead}</p>}
        {children}
      </div>
    </section>
  )
}
