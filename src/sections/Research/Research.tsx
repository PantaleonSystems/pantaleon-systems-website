import { Eyebrow } from '../../design-system'
import { Reveal, TransitionPath } from '../../components'
import { researchBlocks } from '../../data/researchBlocks'
import styles from './Research.module.css'

export function Research() {
  return (
    <section id="pesquisa">
      <div className="wrap">
        <Reveal>
          <Eyebrow>Pesquisa e construção</Eyebrow>
          <h2 className={styles.title}>Research-driven by design</h2>
          <p className={styles.lead}>
            Trabalhamos na interseção entre ciência, engenharia e redes
            digitais. Nossa abordagem parte de modelos teóricos, protótipos
            computacionais, validação experimental e construção progressiva
            de infraestrutura.
          </p>
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {researchBlocks.map((block) => (
            <div className={styles.block} key={block.n}>
              <div className={styles.n}>{block.n}</div>
              <h4>{block.title}</h4>
              <p>{block.description}</p>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <TransitionPath />
        </Reveal>
      </div>
    </section>
  )
}
