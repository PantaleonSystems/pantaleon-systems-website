import type { ReactNode } from 'react'
import styles from './StatusBadge.module.css'

export type StatusBadgeVariant = 'dev' | 'rnd'

export interface StatusBadgeProps {
  variant: StatusBadgeVariant
  children: ReactNode
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  const classes = [styles.status, styles[variant]].join(' ')
  return <span className={classes}>{children}</span>
}
