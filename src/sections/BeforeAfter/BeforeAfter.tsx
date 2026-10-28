import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { useMediaQuery } from '../../hooks'
import { beforeAfter } from '../../data/method'
import { Glyph, GlyphPaths } from '../../components/visuals/Glyph'
import styles from './BeforeAfter.module.css'

interface Geometry {
  viewBox: string
  event: { x: number; y: number; w: number; h: number }
  targetX: number
  targetW: number
  targetH: number
  targetTops: number[]
  /** caminho da linha de cada destino, do evento até a borda do cartão */
  paths: string[]
}

/** Tela larga: evento à esquerda, quatro destinos à direita. */
const wideGeo: Geometry = (() => {
  const event = { x: 6, y: 92, w: 128, h: 110 }
  const targetX = 262
  const targetH = 52
  const targetTops = [10, 80, 150, 220]
  const sy = event.y + event.h / 2
  return {
    viewBox: '0 0 470 282',
    event,
    targetX,
    targetW: 200,
    targetH,
    targetTops,
    paths: targetTops.map((t) => `M${event.x + event.w} ${sy}C196 ${sy} 200 ${t + targetH / 2} ${targetX} ${t + targetH / 2}`),
  }
})()

/** Celular: evento no topo, destinos empilhados, com um tronco dourado à esquerda. */
const tallGeo: Geometry = (() => {
  const event = { x: 110, y: 6, w: 120, h: 100 }
  const targetH = 56
  const targetTops = [150, 218, 286, 354]
  const firstCy = targetTops[0] + targetH / 2
  return {
    viewBox: '0 0 340 420',
    event,
    targetX: 28,
    targetW: 296,
    targetH,
    targetTops,
    paths: targetTops.map(
      (t) => `M170 ${event.y + event.h}C170 134 14 122 14 ${firstCy}V${t + targetH / 2}H28`,
    ),
  }
})()

type TargetKind = (typeof beforeAfter.targets)[number]['icon']

/** Miniatura do "resultado" de cada destino, numa caixa de 44x24. */
function Result({ icon }: { icon: TargetKind }) {
  switch (icon) {
    case 'sheet':
      return (
        <>
          <rect x="0" y="1" width="44" height="5" rx="2" className={styles.mini} />
          <rect x="0" y="10" width="44" height="5" rx="2" className={styles.mini} />
          <rect data-result="sheet" x="0" y="19" width="44" height="5" rx="2" className={styles.miniHot} />
        </>
      )
    case 'box':
      return (
        <>
          <rect x="0" y="8" width="44" height="8" rx="4" className={styles.mini} />
          {/* barra do estoque: 60% no estado final; a animação parte de cheia (scaleX 1,667) */}
          <rect data-result="stock" x="0" y="8" width="26.4" height="8" rx="4" className={styles.miniHot} />
        </>
      )
    case 'doc':
      return <path data-result="check" d="M6 13L16 22L38 3" className={styles.check} />
    case 'chat':
      return (
        <g data-result="bubble">
          <rect x="0" y="0" width="44" height="24" rx="12" className={styles.bubble} />
          <rect x="9" y="7" width="26" height="3.5" rx="1.75" className={styles.bubbleLine} />
          <rect x="9" y="14" width="16" height="3.5" rx="1.75" className={styles.bubbleLine} />
        </g>
      )
    default:
      return null
  }
}

export function BeforeAfter() {
  const root = useRef<HTMLElement>(null)
  const vertical = useMediaQuery('(max-width: 760px)')
  const geo = vertical ? tallGeo : wideGeo

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const q = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, root.current!)
        const rows = q<HTMLElement>('[data-row]')
        const strikes = q<HTMLElement>('[data-strike]')
        const eventCard = root.current!.querySelector('[data-event]')!
        const pings = q<SVGElement>('[data-ping]')
        const energies = q<SVGPathElement>('[data-energy]')
        const sparks = q<SVGCircleElement>('[data-spark]')
        const lits = q<SVGElement>('[data-lit]')
        const sheet = root.current!.querySelector('[data-result="sheet"]')!
        const stock = root.current!.querySelector('[data-result="stock"]')!
        const check = root.current!.querySelector('[data-result="check"]')!
        const bubble = root.current!.querySelector('[data-result="bubble"]')!
        const caption = root.current!.querySelector('[data-caption]')!

        // animações iniciadas por clique/entrada ficam fora do contexto: guardamos para encerrar
        const live: gsap.core.Animation[] = []
        const track = <T extends gsap.core.Animation>(a: T) => {
          live.push(a)
          return a
        }

        const idle = () => {
          gsap.set(energies, { drawSVG: '0%' })
          gsap.set(sparks, { autoAlpha: 0 })
          gsap.set(lits, { autoAlpha: 0 })
          gsap.set(sheet, { scaleX: 0, transformOrigin: '0% 50%' })
          gsap.set(stock, { scaleX: 1 / 0.6, transformOrigin: '0% 50%' })
          gsap.set(check, { drawSVG: '0%' })
          gsap.set(bubble, { scale: 0, transformOrigin: '50% 50%' })
        }

        let simulation: gsap.core.Timeline | null = null
        const simulate = () => {
          simulation?.kill()
          idle()
          const tl = track(gsap.timeline({ defaults: { ease: EASE } }))
          simulation = tl
          tl.fromTo(eventCard, { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' })
            .fromTo(pings, { scale: 1, autoAlpha: 0.7, transformOrigin: '50% 50%' }, { scale: 1.55, autoAlpha: 0, duration: 1.1, stagger: 0.18, ease: 'power2.out' }, 0)
          energies.forEach((path, i) => {
            const at = 0.45 + i * 0.3
            tl.to(path, { drawSVG: '100%', duration: 0.85, ease: 'power2.inOut' }, at)
              .set(sparks[i], { autoAlpha: 1 }, at)
              .to(sparks[i], { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 0.85, ease: 'power2.inOut' }, at)
              .to(sparks[i], { autoAlpha: 0, duration: 0.15 }, at + 0.85)
              .to(lits[i], { autoAlpha: 1, duration: 0.3 }, at + 0.8)
          })
          const land = (i: number) => 0.45 + i * 0.3 + 0.85
          tl.to(sheet, { scaleX: 1, duration: 0.5 }, land(0))
            .to(stock, { scaleX: 1, duration: 0.7 }, land(1))
            .to(check, { drawSVG: '100%', duration: 0.5 }, land(2))
            .to(bubble, { scale: 1, duration: 0.5 }, land(3))
        }

        // estado inicial: lado manual escondido e o automático parado, esperando o evento
        gsap.set(rows, { autoAlpha: 0, y: 16 })
        gsap.set(strikes, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(caption, { autoAlpha: 0, y: 10 })
        idle()

        track(
          gsap
            .timeline({
              defaults: { ease: EASE },
              scrollTrigger: { trigger: '[data-stage]', start: 'top 78%', once: true },
            })
            .to(rows, { autoAlpha: 1, y: 0, duration: DUR.base, stagger: 0.08 })
            .to(strikes, { scaleX: 1, duration: DUR.fast, stagger: 0.18, ease: 'power2.out' }, '>-0.1')
            .to(rows, { opacity: 0.6, duration: DUR.base, stagger: 0.18 }, '<')
            .call(simulate, undefined, '>-0.2')
            .to(caption, { autoAlpha: 1, y: 0, duration: DUR.base }, '>+0.6'),
        )

        // tocar na venda repete a simulação
        const trigger = root.current!.querySelector('[data-event]')!
        const onKey = (event: Event) => {
          const key = (event as KeyboardEvent).key
          if (key === 'Enter' || key === ' ') {
            event.preventDefault()
            simulate()
          }
        }
        trigger.addEventListener('click', simulate)
        trigger.addEventListener('keydown', onKey)

        return () => {
          trigger.removeEventListener('click', simulate)
          trigger.removeEventListener('keydown', onKey)
          live.forEach((a) => a.kill())
        }
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [vertical], revertOnUpdate: true },
  )

  const { event, targetX, targetW, targetH, targetTops } = geo

  return (
    <section ref={root} id="antes-depois" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <p className="eyebrow">{beforeAfter.eyebrow}</p>
        <h2 className={styles.title}>{beforeAfter.title}</h2>

        <div data-stage className={styles.stage} role="img" aria-label={beforeAfter.artLabel}>
          <div className={styles.before} aria-hidden="true">
            <p className={styles.label}>{beforeAfter.manualLabel}</p>
            <ul className={styles.rows}>
              {beforeAfter.manualSteps.map((step, i) => (
                <li key={step.word} data-row className={`${styles.row} ${styles[`o${i % 3}`]}`}>
                  <span className={styles.icon}>
                    <Glyph kind={step.icon} size={20} />
                  </span>
                  <span className={styles.word}>
                    {step.word}
                    <i data-strike className={styles.strike} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.arrow} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>

          <div className={styles.after} aria-hidden="true">
            <p className={`${styles.label} ${styles.labelOnDark}`}>{beforeAfter.autoLabel}</p>
            <svg className={styles.svg} viewBox={geo.viewBox}>
              {geo.paths.map((d, i) => (
                <g key={i}>
                  <path d={d} className={styles.lineBase} />
                  <path data-energy d={d} className={styles.lineEnergy} />
                </g>
              ))}

              <g data-event tabIndex={0} role="button" aria-label={beforeAfter.eventHint} className={styles.event}>
                {[0, 1].map((i) => (
                  <rect key={i} data-ping x={event.x} y={event.y} width={event.w} height={event.h} rx="24" className={styles.ping} />
                ))}
                <rect x={event.x} y={event.y} width={event.w} height={event.h} rx="24" className={styles.eventCard} />
                <g
                  transform={`translate(${event.x + event.w / 2 - 20} ${event.y + 16}) scale(1.67)`}
                  className={styles.eventGlyph}
                >
                  <GlyphPaths kind="cart" />
                </g>
                <text x={event.x + event.w / 2} y={event.y + event.h - 18} className={styles.eventText}>
                  {beforeAfter.event}
                </text>
              </g>

              {beforeAfter.targets.map((target, i) => {
                const top = targetTops[i]
                return (
                  <g key={target.word} transform={`translate(${targetX} ${top})`}>
                    <rect width={targetW} height={targetH} rx="16" className={styles.target} />
                    <rect data-lit width={targetW} height={targetH} rx="16" className={styles.targetLit} />
                    <g transform={`translate(14 ${targetH / 2 - 11}) scale(0.92)`} className={styles.targetGlyph}>
                      <GlyphPaths kind={target.icon} />
                    </g>
                    <text x="46" y={targetH / 2 + 5.5} className={styles.targetText}>
                      {target.word}
                    </text>
                    <g transform={`translate(${targetW - 58} ${targetH / 2 - 12})`}>
                      <Result icon={target.icon} />
                    </g>
                  </g>
                )
              })}

              {geo.paths.map((_, i) => (
                <circle key={i} data-spark r="5.5" className={styles.spark} />
              ))}
            </svg>
            <p data-caption className={styles.caption}>
              {beforeAfter.caption}
            </p>
            <p className={styles.hint}>{beforeAfter.eventHint}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
