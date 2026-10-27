import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { method } from '../../data/method'
import { StepIcon } from '../../components/visuals/StepIcon'
import styles from './Method.module.css'

export function Method() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-method-step]')
        const nodes = gsap.utils.toArray<HTMLElement>('[data-node]')
        const spine = root.current!.querySelector('[data-spine]')
        const list = root.current!.querySelector('[data-list]')

        // a linha dourada que liga os passos é desenhada pela rolagem
        gsap.fromTo(
          spine,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: list, start: 'top 60%', end: 'bottom 55%', scrub: 0.6 },
          },
        )

        // só o passo no centro da tela fica em destaque; o nó dele acende
        rows.forEach((row, i) => {
          gsap.set(row, { opacity: 0.22 })
          gsap.set(nodes[i], { '--on': 0 })
          // onEnter/onLeave também disparam quando a rolagem pula o passo (âncora, scroll rápido)
          const apply = (self: ScrollTrigger) => {
            const done = self.progress === 1
            gsap.to(row, { opacity: self.isActive ? 1 : done ? 0.5 : 0.22, duration: DUR.base, ease: EASE, overwrite: true })
            gsap.to(nodes[i], { '--on': self.isActive || done ? 1 : 0, duration: DUR.base, ease: EASE, overwrite: true })
          }
          ScrollTrigger.create({
            trigger: row,
            start: 'top 62%',
            end: 'bottom 38%',
            onEnter: apply,
            onLeave: apply,
            onEnterBack: apply,
            onLeaveBack: apply,
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="metodo" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <p className="eyebrow">{method.eyebrow}</p>
        <h2 className={styles.title}>{method.title}</h2>
        <div className={styles.listWrap}>
          <i data-spine className={styles.spine} aria-hidden="true" />
          <ol data-list className={styles.list}>
            {method.steps.map((step) => (
              <li key={step.verb} data-method-step className={styles.row}>
                <span data-node className={styles.node}>
                  <StepIcon kind={step.icon} />
                </span>
                <h3 className={styles.verb}>{step.verb}</h3>
                <p className={styles.text}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
