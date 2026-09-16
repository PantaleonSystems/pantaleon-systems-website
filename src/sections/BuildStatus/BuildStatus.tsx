import { SectionHeading } from '../../design-system'
import { Reveal } from '../../components'
import { buildStatusItems } from '../../data/buildStatus'
import type { BuildStage, BuildStatusItem } from '../../types'
import styles from './BuildStatus.module.css'

const stageClassName: Record<BuildStage, string> = {
  now: styles.now,
  next: styles.next,
  future: styles.future,
}

export interface BuildStatusProps {
  /** default: estágio geral da Pantaleon (Home). Páginas de projeto passam o próprio. */
  items?: BuildStatusItem[]
  eyebrow?: string
  title?: string
  description?: string
}

export function BuildStatus({
  items = buildStatusItems,
  eyebrow = 'Transparência',
  title = 'Em construção, com transparência',
  description = 'Nada aqui finge estar pronto. Este é o estágio real da construção — e para onde vamos.',
}: BuildStatusProps) {
  return (
    <section className="tint">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {items.map((item) => (
            <div
              className={[styles.card, stageClassName[item.stage]].join(' ')}
              key={item.stage}
            >
              <div className={styles.when}>
                <span className={styles.dot} />
                {item.label}
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
