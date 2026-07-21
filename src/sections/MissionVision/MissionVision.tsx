import { Card, SectionHeading } from '../../design-system'
import { Reveal } from '../../components'
import { principles } from '../../data/principles'
import styles from './MissionVision.module.css'

export function MissionVision() {
  return (
    <section className="tint">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow="Institucional"
            title="Missão, visão e princípios"
          />
        </Reveal>

        <Reveal className={styles.mvGrid}>
          <Card style={{ padding: '38px 34px' }}>
            <div className={styles.mvLabel}>Missão</div>
            <h3>O que fazemos</h3>
            <p>
              Desenvolver infraestruturas digitais capazes de transformar
              dados, ações e estados em sistemas verificáveis, auditáveis e
              confiáveis.
            </p>
          </Card>
          <Card style={{ padding: '38px 34px' }}>
            <div className={styles.mvLabel}>Visão</div>
            <h3>Onde queremos chegar</h3>
            <p>
              Ser uma deep tech brasileira de referência global na
              construção de infraestrutura para a Web4, conectando redes
              descentralizadas, inteligência artificial, agentes autônomos e
              validação de estados.
            </p>
          </Card>
        </Reveal>

        {/* Container próprio de Reveal + um segundo Reveal (stagger) aninhado
            para a lista — cada um com sua própria observação via
            useScrollReveal, para não repetir o bug do protótipo original em
            que a lista de princípios dependia de um único seletor global de
            IntersectionObserver e podia nunca receber a classe que a
            revelava. */}
        <Reveal className={styles.principles}>
          <div className={styles.principlesLabel}>Princípios</div>
          <Reveal stagger className={styles.principlesList}>
            {principles.map((principle) => (
              <div className={styles.principle} key={principle.n}>
                <span className={styles.pn}>{principle.n}</span>
                <p>{principle.text}</p>
              </div>
            ))}
          </Reveal>
        </Reveal>
      </div>
    </section>
  )
}
