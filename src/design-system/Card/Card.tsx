import type { HTMLAttributes } from 'react'
import styles from './Card.module.css'

export type CardVariant = 'ivory' | 'warm' | 'dark'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  hover?: boolean
}

export function Card({
  variant = 'ivory',
  hover,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [styles.card, styles[variant], hover && styles.hover, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
