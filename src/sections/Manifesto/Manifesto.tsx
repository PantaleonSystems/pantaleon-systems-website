import { Eyebrow } from '../../design-system'
import { KhipuLines, Reveal } from '../../components'
import styles from './Manifesto.module.css'

export function Manifesto() {
  return (
    <section className={styles.manifesto}>
      <KhipuLines variant="dark" density="low" nodes />
      <Reveal className={`wrap ${styles.content}`}>
        <Eyebrow variant="dark">Manifesto</Eyebrow>
        <h2 className={styles.title}>Construímos para o que vem depois</h2>
        <p>
          Acreditamos que a próxima geração de infraestrutura digital será
          construída sobre estados verificáveis, agentes auditáveis e redes
          capazes de transformar informação em confiança operacional.
        </p>
        <p>
          A Pantaleon Systems existe para investigar, projetar e desenvolver
          essa base.
        </p>
        <p className={styles.impact}>
          Somos uma deep tech brasileira construindo a base da Web4: uma
          infraestrutura para validar{' '}
          <span className={styles.gold}>estados, agentes e ações</span> em
          redes inteligentes.
        </p>
      </Reveal>
    </section>
  )
}
