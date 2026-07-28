import { Button, Eyebrow } from '../../design-system'
import { Reveal } from '../../components'
import styles from './FinalCTA.module.css'

export function FinalCTA() {
  return (
    <section className={styles.finalcta} id="contato">
      <Reveal className={`wrap ${styles.inner}`}>
        <Eyebrow center>Acompanhe a construção</Eyebrow>
        <h2 className={styles.title}>Acompanhe a construção da Pantaleon</h2>
        <p>
          Estamos reunindo pesquisadores, desenvolvedores, parceiros e
          visionários interessados em construir infraestrutura para sistemas
          inteligentes, verificáveis e descentralizados.
        </p>
        <div className={styles.btns}>
          <Button variant="primary" href="#comunidade" arrow>
            Entrar na comunidade
          </Button>
          <Button variant="ghost" href="#projetos">
            Explorar projetos
          </Button>
          <Button variant="ghost" href="#lideranca">
            Falar com a equipe
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
