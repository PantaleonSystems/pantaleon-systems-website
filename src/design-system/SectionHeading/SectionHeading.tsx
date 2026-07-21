import { Eyebrow } from '../Eyebrow/Eyebrow'
import styles from './SectionHeading.module.css'

export interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  center?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: SectionHeadingProps) {
  const classes = [styles.head, center && styles.center]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
