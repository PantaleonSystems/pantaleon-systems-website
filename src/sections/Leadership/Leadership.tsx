import { SectionHeading } from '../../design-system'
import { Reveal } from '../../components'
import { leaders } from '../../data/leadership'
import styles from './Leadership.module.css'

export function Leadership() {
  return (
    <section className="tint" id="lideranca">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow="Liderança"
            title="A liderança por trás da Pantaleon"
            description="Fundadores e arquitetura da visão — quem pesquisa, projeta e conduz a construção."
          />
        </Reveal>

        <Reveal className={styles.grid}>
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
                <p>{leader.bio}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
