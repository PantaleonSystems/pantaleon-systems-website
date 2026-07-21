import { Button, Eyebrow } from '../../design-system'
import { KhipuLines, OrbitVisual } from '../../components'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <KhipuLines variant="light" density="high" />
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Eyebrow>Deep tech brasileira · Web4</Eyebrow>
          <h1 className={styles.title}>
            Construindo a infraestrutura para a{' '}
            <span className={styles.accent}>Web4</span>: estados, agentes e
            redes verificáveis
          </h1>
          <p className={styles.sub}>
            A Pantaleon Systems é uma deep tech brasileira que pesquisa e
            desenvolve a infraestrutura por trás de redes capazes de validar
            dados, ações e estados em ambientes inteligentes e
            descentralizados.
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
