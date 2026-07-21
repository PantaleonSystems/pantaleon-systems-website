import { SectionHeading } from '../../design-system'
import { Reveal } from '../../components'
import { web3Column, web4Column } from '../../data/web3ToWeb4'
import type { ComparisonColumn } from '../../types'
import styles from './Web3ToWeb4.module.css'

export function Web3ToWeb4() {
  return (
    <section id="visao">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow="Nossa visão"
            title="Da Web3 à Web4: o que muda?"
          />
        </Reveal>

        <Reveal>
          <p className={styles.lead}>
            A Web3 criou redes capazes de registrar ativos, transações e
            propriedade digital. Mas a próxima fase da internet será marcada
            por{' '}
            <strong>
              agentes autônomos, sensores, sistemas inteligentes e decisões
              automatizadas
            </strong>
            . Nesse novo ambiente, não basta saber que uma transação
            aconteceu — será necessário validar se uma ação foi correta, se
            um dado é confiável e se o estado final pode ser auditado.
          </p>
        </Reveal>

        <Reveal>
          <div className={styles.compare}>
            <ComparisonColumnBlock column={web3Column} variant="w3" />
            <div className={styles.arrow} aria-hidden="true">
              →
            </div>
            <ComparisonColumnBlock column={web4Column} variant="w4" />
          </div>
        </Reveal>

        <Reveal>
          <p className={styles.close}>
            A Pantaleon Systems nasce para construir{' '}
            <span className={styles.gold}>
              infraestrutura para essa nova camada de confiança.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ComparisonColumnBlock({
  column,
  variant,
}: {
  column: ComparisonColumn
  variant: 'w3' | 'w4'
}) {
  const classes = [styles.col, styles[variant]].join(' ')

  return (
    <div className={classes}>
      <span className={styles.tag}>{column.tag}</span>
      <h3>{column.title}</h3>
      <ul>
        {column.items.map((item) => (
          <li key={item}>
            <span className={styles.dot} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
