import type { ReactNode } from 'react'
import styles from './Eyebrow.module.css'

export interface EyebrowProps {
  children: ReactNode
  variant?: 'light' | 'dark'
  center?: boolean
}

export function Eyebrow({ children, variant = 'light', center }: EyebrowProps) {
  const classes = [
    styles.eyebrow,
    variant === 'dark' && styles.dark,
    center && styles.center,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{children}</span>
}
