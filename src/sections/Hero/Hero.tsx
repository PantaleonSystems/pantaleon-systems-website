import { Button, Eyebrow } from '../../design-system'
import { KhipuLines, OrbitVisual } from '../../components'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <KhipuLines variant="light" density="high" />
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Eyebrow>Deep tech brasileira · Web4 onchain</Eyebrow>
          <h1 className={styles.title}>
            A verdadeira Web4 é{' '}
            <span className={styles.accent}>onchain</span>. Estamos
            construindo ela.
          </h1>
          <p className={styles.sub}>
            Numa rede de agentes autônomos e decisões automatizadas,
            registrar não basta — é preciso validar estados, ações e dados
            onchain. A Pantaleon está construindo essa infraestrutura de
            confiança.
          </p>
          <div className={styles.ctas}>
            <Button variant="primary" href="#visao" arrow>
              Conheça a visão
            </Button>
            <Button variant="ghost" href="#projetos">
              Explore os projetos
            </Button>
            <Button variant="ghost" href="#comunidade">
              Participe do ecossistema
            </Button>
          </div>
          <p className={styles.micro}>
            Da informação ao estado.{' '}
            <span className={styles.gold}>Do estado à prova.</span> Da prova
            à confiança.
          </p>
        </div>
        <div>
          <OrbitVisual />
        </div>
      </div>
    </section>
  )
}
