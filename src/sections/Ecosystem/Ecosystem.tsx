import { SectionHeading } from '../../design-system'
import { EcosystemDiagram, Reveal } from '../../components'

export function Ecosystem() {
  return (
    <section id="ecossistema-map">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            center
            eyebrow="O ecossistema Pantaleon"
            title="Uma visão, várias expressões"
            description="A Pantaleon é a organização-mãe. Cada projeto ocupa um lugar claro na arquitetura — do núcleo computacional às aplicações."
          />
        </Reveal>
        <Reveal>
          <EcosystemDiagram />
        </Reveal>
      </div>
    </section>
  )
}
