import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { DUR, EASE, EASE_IN_OUT, NO_PREF } from '../../lib/motion'
import { buttonClasses } from '../../design-system'
import { HashLink } from '../../components/HashLink/HashLink'
import { usePressFeedback } from '../../hooks'
import { whatsappUrl } from '../../data/contact'
import { hero, LINE_D, SCRIBBLE_D, nodes } from '../../data/hero'
import styles from './Hero.module.css'

function NodeIcon({ kind }: { kind: (typeof nodes)[number]['kind'] }) {
  // ícones de 28x28 centrados na origem; traço dourado, sem preenchimento
  switch (kind) {
    case 'sheet':
      return (
        <>
          <rect x="-11" y="-12" width="22" height="24" rx="3" />
          <path d="M-11 -4H11M-11 4H11M-3 -12V12" />
        </>
      )
    case 'message':
      return <path d="M-12 -9H12V5H-1L-8 11V5H-12Z" />
    case 'copy':
      return (
        <>
          <rect x="-12" y="-12" width="14" height="16" rx="2" />
          <rect x="-2" y="-4" width="14" height="16" rx="2" />
        </>
      )
    case 'arrow':
      return <path d="M-12 4C-12 -8 2 -8 8 -2M8 -2L2 -2M8 -2L8 4" />
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  usePressFeedback(root)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(NO_PREF, () => {
        const thread = root.current!.querySelector<SVGPathElement>('[data-thread]')!
        const icons = gsap.utils.toArray<SVGGElement>('[data-node]')
        const spark = root.current!.querySelector<SVGCircleElement>('[data-spark]')!
        const intro = gsap.utils.toArray<HTMLElement>('[data-intro]')

        // Estado inicial: emaranhado. O estado final (linha reta) é o HTML/CSS padrão.
        gsap.set(thread, { attr: { d: SCRIBBLE_D } })
        gsap.set(spark, { autoAlpha: 0 })
        gsap.set(intro, { autoAlpha: 0, y: 18 })
        icons.forEach((icon, i) => {
          gsap.set(icon, {
            x: nodes[i].scatter.x,
            y: nodes[i].scatter.y,
            rotation: nodes[i].scatter.r,
            scale: 0.9,
            autoAlpha: 0,
          })
        })

        // Título por linhas, com máscara; refaz o split quando a fonte termina de carregar.
        const title = SplitText.create('[data-line]', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          aria: 'auto',
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: DUR.base + 0.2,
              ease: EASE,
              stagger: 0.12,
              delay: 0.25,
            }),
        })

        const tl = gsap.timeline({ defaults: { ease: EASE } })
        tl.from(thread, { drawSVG: '0%', duration: 1.1, ease: 'power2.inOut' }, 0.1)
          .to(icons, { autoAlpha: 1, duration: 0.6, stagger: 0.12 }, 0.3)
          // do emaranhado à linha reta
          .to(thread, { morphSVG: { shape: LINE_D, shapeIndex: 'auto' }, duration: 1.5, ease: EASE_IN_OUT }, 1.5)
          .to(
            icons,
            {
              x: (i) => nodes[i].x,
              y: 250,
              rotation: 0,
              scale: 1,
              duration: 1.5,
              ease: EASE_IN_OUT,
              stagger: 0.06,
            },
            1.5,
          )
          .to(intro, { autoAlpha: 1, y: 0, duration: DUR.base, stagger: 0.12 }, 2.6)

        // Brilho raro e curto percorrendo a linha; fora disso ela fica parada.
        const glint = gsap.timeline({ delay: 4.4, repeat: -1, repeatDelay: 9 })
        glint
          .set(spark, { autoAlpha: 1 })
          .to(spark, {
            motionPath: { path: '[data-line-guide]', align: '[data-line-guide]', alignOrigin: [0.5, 0.5] },
            duration: 1.8,
            ease: 'power1.inOut',
          })
          .to(spark, { autoAlpha: 0, duration: 0.3 }, '-=0.3')

        return () => {
          title.revert()
          glint.kill()
        }
      })

      // Movimento reduzido: nada a fazer, o HTML já está no estado final.
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="topo" className={styles.hero}>
      <div className={`wrap ${styles.copy}`}>
        <h1 className={styles.title}>
          <span data-line className={styles.l1}>
            {hero.titleLines[0]}
          </span>
          <span data-line className={styles.l2}>
            {hero.titleLines[1]}
          </span>
        </h1>
        <div className={styles.aside}>
          <p data-intro className={styles.sub}>
            {hero.subtitle}
          </p>
          <div data-intro className={styles.actions}>
            <HashLink hash="produto" className={buttonClasses('light')} press>
              {hero.primaryCta}
            </HashLink>
            <a
              className={buttonClasses('ghost-on-dark')}
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-press
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      <svg
        className={styles.art}
        viewBox="0 85 1200 330"
        role="img"
        aria-label="Um emaranhado de tarefas soltas que se transforma em uma linha reta e conectada."
      >
        <path data-line-guide d={LINE_D} fill="none" stroke="none" />
        <path data-thread d={LINE_D} className={styles.thread} />
        <circle cx="80" cy="250" r="5" className={styles.end} />
        <circle cx="1120" cy="250" r="5" className={styles.end} />
        {nodes.map((n) => (
          <g key={n.kind} data-node transform={`translate(${n.x} 250)`} className={styles.node}>
            <circle r="28" className={styles.badge} />
            <g className={styles.glyph}>
              <NodeIcon kind={n.kind} />
            </g>
          </g>
        ))}
        <circle data-spark r="6" cx="0" cy="0" className={styles.spark} />
      </svg>
    </section>
  )
}
