import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  SectionHeading,
  StatusBadge,
} from '../../design-system'
import { EcosystemDiagram, PageHero, Reveal } from '../../components'
import { BuildStatus } from '../../sections'
import { useDocumentTitle } from '../../hooks'
import { projects } from '../../data/projects'
import { projectPages } from '../../data/projectPages'
import type { TextBlock } from '../../types'
import styles from './ProjectPage.module.css'

export interface ProjectPageProps {
  slug: string
}

function Paragraphs({ block }: { block: TextBlock }) {
  return (
    <>
      {block.paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </>
  )
}

/**
 * Página genérica de projeto: recebe o slug e monta as seções a partir de
 * data/projects.ts (card) + data/projectPages.ts (conteúdo expandido).
 * Estrutura conforme DESIGN_SYSTEM.md › "Páginas internas".
 */
export function ProjectPage({ slug }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === slug)
  const content = projectPages[slug]

  useDocumentTitle(project?.title)

  if (!project || !content) {
    throw new Error(`Projeto sem conteúdo cadastrado: "${slug}"`)
  }

  const others = projects.filter((item) => item.slug !== slug)

  return (
    <>
      <PageHero
        eyebrow="Projeto · Ecossistema Pantaleon"
        title={project.title}
        lead={content.lead}
        aside={
          <StatusBadge variant={project.status}>
            {project.statusLabel}
          </StatusBadge>
        }
      >
        {content.notice && (
          <p className={styles.notice} role="note">
            {content.notice}
          </p>
        )}
      </PageHero>

      <section>
        <div className="wrap">
          <Reveal stagger className={styles.twoCols}>
            <Card variant="warm" className={styles.textCard}>
              <h2 className={styles.cardTitle}>{content.whatIsIt.title}</h2>
              <Paragraphs block={content.whatIsIt} />
            </Card>
            <Card variant="warm" className={styles.textCard}>
              <h2 className={styles.cardTitle}>{content.why.title}</h2>
              <Paragraphs block={content.why} />
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              center
              eyebrow="Onde se encaixa"
              title={content.relation.title}
            />
          </Reveal>
          <Reveal className={styles.relationText}>
            <Paragraphs block={content.relation} />
          </Reveal>
          <Reveal>
            <EcosystemDiagram />
          </Reveal>
        </div>
      </section>

      <BuildStatus
        items={content.stage}
        eyebrow="Estágio atual"
        title={`Onde ${project.title} está hoje`}
        description="O estágio real deste projeto — sem antecipar o que ainda não existe."
      />

      <section className={styles.follow}>
        <Reveal className={`wrap ${styles.followInner}`}>
          <SectionHeading
            center
            eyebrow="Acompanhe"
            title={content.follow.title}
            description={content.follow.paragraphs.join(' ')}
          />
          <div className={styles.btns}>
            <Button variant="primary" to="/#comunidade" arrow>
              Entrar na comunidade
            </Button>
            <Button variant="ghost" to="/#lideranca">
              Falar com a equipe
            </Button>
          </div>
        </Reveal>
      </section>

      <section className={`tint ${styles.others}`}>
        <div className="wrap">
          <Reveal>
            <div className={styles.othersLabel}>Outros projetos</div>
          </Reveal>
          <Reveal stagger className={styles.othersGrid}>
            {others.map((item) => (
              <Link
                key={item.slug}
                to={`/projetos/${item.slug}`}
                className={styles.otherLink}
              >
                <span className={styles.otherTitle}>{item.title}</span>
                <StatusBadge variant={item.status}>
                  {item.statusLabel}
                </StatusBadge>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
