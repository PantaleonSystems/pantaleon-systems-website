import { Button, Card, SectionHeading } from '../design-system'
import { PageHero, Reveal } from '../components'
import { useDocumentTitle } from '../hooks'
import { aboutCta, aboutHero, mission, timeline, vision } from '../data/about'
import { leaders } from '../data/leadership'
import { principles } from '../data/principles'
import type { TextBlock } from '../types'
import styles from './AboutPage.module.css'

function MvCard({ label, block }: { label: string; block: TextBlock }) {
  return (
    <Card variant="warm" className={styles.mvCard}>
      <div className={styles.label}>{label}</div>
      <h2 className={styles.mvTitle}>{block.title}</h2>
      {block.paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </Card>
  )
}

export default function AboutPage() {
  useDocumentTitle('Sobre')

  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        lead={aboutHero.lead}
      />

      <section>
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Institucional"
              title="Missão e visão"
            />
          </Reveal>
          <Reveal stagger className={styles.mvGrid}>
            <MvCard label="Missão" block={mission} />
            <MvCard label="Visão" block={vision} />
          </Reveal>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Princípios"
              title="O que orienta cada decisão"
              description="Cinco compromissos que valem para a pesquisa, para o código e para a forma como falamos do que fazemos."
            />
          </Reveal>
          <Reveal stagger className={styles.principles}>
            {principles.map((principle) => (
              <div className={styles.principle} key={principle.n}>
                <span className={styles.pn}>{principle.n}</span>
                <p>{principle.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Liderança"
              title="Quem pesquisa, projeta e conduz"
            />
          </Reveal>
          <Reveal stagger className={styles.leaders}>
            {leaders.map((leader) => (
              <div className={styles.leader} key={leader.name}>
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className={styles.photo}
                />
                <div>
                  <h3>{leader.name}</h3>
                  <div className={styles.role}>{leader.role}</div>
                  {leader.bioLong.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Trajetória"
              title="Como a Pantaleon está sendo construída"
              description="Fases, não datas. Cada etapa só é anunciada quando está de fato em curso."
            />
          </Reveal>
          <Reveal stagger className={styles.timeline}>
            {timeline.map((item) => (
              <div className={styles.step} key={item.label}>
                <div className={styles.stepLabel}>{item.label}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={styles.cta}>
        <Reveal className={`wrap ${styles.ctaInner}`}>
          <SectionHeading
            center
            eyebrow={aboutCta.eyebrow}
            title={aboutCta.title}
            description={aboutCta.description}
          />
          <div className={styles.btns}>
            <Button variant="primary" to="/#comunidade" arrow>
              Entrar na comunidade
            </Button>
            <Button variant="ghost" to="/#projetos">
              Explorar projetos
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
