import { Link } from 'react-router-dom'
import { Card, SectionHeading, StatusBadge } from '../../design-system'
import { Reveal } from '../../components'
import { projects } from '../../data/projects'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projetos">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow="Projetos em desenvolvimento"
            title="Projetos que materializam nossa visão"
            description="Cada iniciativa nasce como parte de uma arquitetura maior: construir infraestrutura para sistemas verificáveis, inteligentes e descentralizados."
          />
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {projects.map((project) => (
            <Card
              key={project.slug}
              variant="ivory"
              hover
              className={styles.card}
            >
              <div className={styles.top}>
                <h3>{project.title}</h3>
                <StatusBadge variant={project.status}>
                  {project.statusLabel}
                </StatusBadge>
              </div>
              <p className={styles.description}>{project.description}</p>
              <Link to={`/projetos/${project.slug}`} className={styles.link}>
                {project.ctaLabel}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
