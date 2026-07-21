// TEMPORÁRIO — página de revisão visual da etapa 4 (Header/Footer/KhipuLines/Reveal
// na parte A; OrbitVisual/TransitionPath/EcosystemDiagram na parte B).
// Remover este arquivo, o .module.css correspondente e a rota /_layout-test em
// App.tsx assim que os componentes forem aprovados.
import {
  EcosystemDiagram,
  KhipuLines,
  OrbitVisual,
  Reveal,
  TransitionPath,
} from '../components'
import styles from './LayoutPreviewPage.module.css'

export default function LayoutPreviewPage() {
  return (
    <div className={styles.spacer}>
      <h1>Layout preview (temporário)</h1>
      <p>
        Role a página para ver o Header ganhar o fundo translúcido com blur.
        Os blocos abaixo mostram o KhipuLines nas variantes light e dark.
      </p>

      <Reveal>
        <div className={`${styles.khipuBlock} ${styles.light}`}>
          <KhipuLines variant="light" density="high" />
          <span className={styles.khipuLabel}>
            KhipuLines — variant=&quot;light&quot; density=&quot;high&quot; (padrão Hero)
          </span>
        </div>
      </Reveal>

      <Reveal>
        <div className={`${styles.khipuBlock} ${styles.dark}`}>
          <KhipuLines variant="dark" density="low" nodes />
          <span className={styles.khipuLabel}>
            KhipuLines — variant=&quot;dark&quot; density=&quot;low&quot; nodes (padrão
            Manifesto)
          </span>
        </div>
      </Reveal>

      <div className={styles.demoBlock}>
        <div className={styles.demoLabel}>OrbitVisual</div>
        <OrbitVisual />
      </div>

      <div className={styles.demoBlock}>
        <div className={styles.demoLabel}>EcosystemDiagram</div>
        <EcosystemDiagram />
      </div>

      <div className={styles.tallSpacer} />

      <div className={styles.demoBlock} id="transition-path-demo">
        <div className={styles.demoLabel}>
          TransitionPath — role até aqui para disparar a sequência
        </div>
        <TransitionPath />
      </div>

      <div className={styles.tallSpacer} />

      <p id="contato">
        Seção de contato (âncora usada pelo CTA "Conecte-se" do Header).
      </p>
    </div>
  )
}
