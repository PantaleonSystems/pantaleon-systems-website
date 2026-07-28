import type { ReactNode } from 'react'
import { SectionHeading } from '../../design-system'
import { Reveal } from '../../components'
import { whyItMattersItems } from '../../data/whyItMatters'
import styles from './WhyItMatters.module.css'

const icons: ReactNode[] = [
  <svg
    key="agents"
    viewBox="0 0 44 44"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <circle cx={22} cy={16} r={7} />
    <path d="M11 36c0-6 5-10 11-10s11 4 11 10" />
    <circle cx={22} cy={16} r={2.5} fill="currentColor" stroke="none" />
  </svg>,
  <svg
    key="networks"
    viewBox="0 0 44 44"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <circle cx={14} cy={14} r={5} />
    <circle cx={30} cy={14} r={5} />
    <circle cx={22} cy={30} r={5} />
    <path d="M18 17l3 9M26 17l-3 9M19 14h6" />
  </svg>,
  <svg
    key="cities"
    viewBox="0 0 44 44"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <rect x={9} y={18} width={26} height={18} rx={2} />
    <path d="M14 18v-4a8 8 0 0116 0v4M22 26v4" />
  </svg>,
  <svg
    key="trust"
    viewBox="0 0 44 44"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path d="M22 6l14 6v8c0 8-6 14-14 16-8-2-14-8-14-16v-8z" />
    <path d="M16 22l4 4 8-8" />
  </svg>,
]

export function WhyItMatters() {
  return (
    <section className="tint">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow="Por que isso importa"
            title="Por que essa infraestrutura importa?"
          />
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {whyItMattersItems.map((item, index) => (
            <div className={styles.card} key={item.title}>
              <span className={styles.icon}>{icons[index]}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
