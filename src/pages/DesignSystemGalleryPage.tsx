// TEMPORÁRIO — galeria de revisão visual dos primitivos da etapa 3.
// Remover este arquivo, o .module.css correspondente e a rota /_ds em
// App.tsx assim que os primitivos forem aprovados.
import {
  Button,
  Card,
  Eyebrow,
  SectionHeading,
  StatusBadge,
} from '../design-system'
import styles from './DesignSystemGalleryPage.module.css'

export default function DesignSystemGalleryPage() {
  return (
    <div className={styles.page}>
      <h1>Design System — Galeria (temporário)</h1>

      <section className={styles.block}>
        <h3>Button</h3>
        <div className={styles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="primary" arrow>
            Primary com seta
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="ghost" arrow>
            Ghost com seta
          </Button>
          <Button variant="primary" href="#contato" arrow>
            Como &lt;a&gt; (âncora)
          </Button>
          <Button variant="ghost" to="/sobre">
            Como &lt;Link&gt; (rota)
          </Button>
          <Button
            variant="primary"
            onClick={() => window.alert('clicou')}
          >
            Como &lt;button&gt;
          </Button>
        </div>
        <div className={styles.darkRow}>
          <Button variant="ghost-on-dark">Ghost on dark</Button>
          <Button variant="ghost-on-dark" arrow>
            Ghost on dark com seta
          </Button>
        </div>
      </section>

      <section className={styles.block}>
        <h3>Eyebrow</h3>
        <div className={styles.row}>
          <Eyebrow>Light (padrão)</Eyebrow>
        </div>
        <div className={styles.darkRow}>
          <Eyebrow variant="dark">Dark</Eyebrow>
        </div>
        <div className={styles.row}>
          <Eyebrow center>Centralizado</Eyebrow>
        </div>
      </section>

      <section className={styles.block}>
        <h3>SectionHeading</h3>
        <SectionHeading
          eyebrow="Nossa visão"
          title="Da Web3 à Web4: o que muda?"
          description="Texto de exemplo para verificar o parágrafo de descrição, cor secundária e tamanho."
        />
        <SectionHeading
          eyebrow="O ecossistema Pantaleon"
          title="Uma visão, várias expressões"
          description="Versão centralizada, usada em seções como Ecossistema e Comunidade."
          center
        />
      </section>

      <section className={styles.block}>
        <h3>Card</h3>
        <div className={styles.grid}>
          <Card variant="ivory">Ivory, sem hover</Card>
          <Card variant="warm" hover>
            Warm, com hover (passe o mouse)
          </Card>
          <Card variant="dark" hover>
            Dark, com hover
          </Card>
        </div>
      </section>

      <section className={styles.block}>
        <h3>StatusBadge</h3>
        <div className={styles.row}>
          <StatusBadge variant="dev">em desenvolvimento</StatusBadge>
          <StatusBadge variant="rnd">núcleo de P&amp;D</StatusBadge>
        </div>
      </section>
    </div>
  )
}
