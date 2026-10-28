import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { visionGraphic } from '../../data/problem'
import styles from './VisionGraphic.module.css'

/** Fatia de tarefas manuais no anel: de 78% (antes) para 28% (depois). */
const MANUAL_BEFORE = 78
const MANUAL_AFTER = 28

const PROCESS_ROWS = [0, 1, 2, 3]

/** Seta dourada entre dois cartões. */
function Connector() {
  return (
    <svg data-conn className={styles.conn} viewBox="0 0 56 24" aria-hidden="true">
      <path d="M2 12H46M38 5l8 7-8 7" />
    </svg>
  )
}

/**
 * A visão em três passos de causa e efeito: menos tempo em tarefa repetida (anel) libera
 * atenção e controle (painel de processos) e isso vira faturamento (curva subindo).
 * É ilustração, não dado: sem números. Toca uma vez ao entrar, sem prender a rolagem.
 */
export function VisionGraphic() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const el = <T extends Element>(s: string) => root.current!.querySelector<T>(s)!
        const all = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, root.current!)

        const cards = all<HTMLElement>('[data-card]')
        const conns = all<SVGPathElement>('[data-conn] path')
        const manual = el<SVGCircleElement>('[data-manual]')
        const free = el<SVGCircleElement>('[data-free]')
        const hand = el<SVGLineElement>('[data-hand]')
        const dots = all<SVGCircleElement>('[data-dot]')
        const bars = all<SVGRectElement>('[data-bar]')
        const ticks = all<SVGPathElement>('[data-tick]')
        const curve = el<SVGPathElement>('[data-curve]')
        const area = el<SVGPathElement>('[data-area]')
        const peak = el<SVGCircleElement>('[data-peak]')
        const peakRing = el<SVGCircleElement>('[data-peak-ring]')

        // fatias do anel: "manual" de 0 a p, "livre" de p a 100
        const share = { p: MANUAL_BEFORE }
        const paint = () => {
          gsap.set(manual, { drawSVG: `0% ${share.p}%` })
          gsap.set(free, { drawSVG: `${share.p}% 100%` })
        }

        gsap.set(cards, { autoAlpha: 0, y: 28 })
        gsap.set(conns, { drawSVG: '0%' })
        paint()
        gsap.set(hand, { rotation: 0, svgOrigin: '100 70' })
        gsap.set(dots, { fill: 'rgba(255,253,248,0.28)' })
        gsap.set(bars, { scaleX: 0.22, transformOrigin: '0% 50%' })
        gsap.set(ticks, { drawSVG: '0%' })
        gsap.set(curve, { drawSVG: '0%' })
        gsap.set(area, { autoAlpha: 0 })
        gsap.set([peak, peakRing], { autoAlpha: 0, transformOrigin: '50% 50%' })

        gsap
          .timeline({
            defaults: { ease: EASE },
            scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
          })
          // 1) tempo: a fatia manual encolhe, o tempo livre cresce e o relógio dá uma volta
          .to(cards[0], { autoAlpha: 1, y: 0, duration: DUR.base })
          .to(share, { p: MANUAL_AFTER, duration: 1.8, ease: 'power3.inOut', onUpdate: paint }, '>+0.1')
          .to(hand, { rotation: 360, duration: 1.8, ease: 'power3.inOut' }, '<')
          .to(conns[0], { drawSVG: '100%', duration: DUR.base, ease: 'power2.inOut' }, '>-0.3')
          // 2) atenção e controle: os processos acendem um a um
          .to(cards[1], { autoAlpha: 1, y: 0, duration: DUR.base }, '<0.1')
          .to(bars, { scaleX: 1, duration: 0.7, stagger: 0.25, ease: 'power2.out' }, '>-0.2')
          .to(dots, { fill: '#E7C879', duration: 0.3, stagger: 0.25 }, '<')
          .to(ticks, { drawSVG: '100%', duration: 0.35, stagger: 0.25 }, '<0.2')
          .to(conns[1], { drawSVG: '100%', duration: DUR.base, ease: 'power2.inOut' }, '>-0.2')
          // 3) dinheiro: a curva sobe
          .to(cards[2], { autoAlpha: 1, y: 0, duration: DUR.base }, '<0.1')
          .to(curve, { drawSVG: '100%', duration: 1.6, ease: 'power2.inOut' }, '>-0.2')
          .to(area, { autoAlpha: 1, duration: 1.2 }, '<0.4')
          .to(peak, { autoAlpha: 1, duration: 0.3 }, '>-0.3')
          .fromTo(peakRing, { autoAlpha: 0.7, scale: 1 }, { autoAlpha: 0, scale: 3.2, duration: 1.2, ease: 'power2.out' }, '<')
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className={styles.stage} role="img" aria-label={visionGraphic.label}>
      {/* 1. TEMPO */}
      <article data-card className={styles.card} aria-hidden="true">
        <svg className={styles.art} viewBox="0 0 200 140">
          <g transform="rotate(-90 100 70)">
            <circle cx="100" cy="70" r="48" className={styles.track} />
            <circle data-manual cx="100" cy="70" r="48" className={styles.manual} />
            <circle data-free cx="100" cy="70" r="48" className={styles.free} />
          </g>
          <circle cx="100" cy="70" r="3" className={styles.hub} />
          <line data-hand x1="100" y1="70" x2="100" y2="48" className={styles.hand} />
        </svg>
        <h3 className={styles.title}>{visionGraphic.steps[0].title}</h3>
        <p className={styles.caption}>{visionGraphic.steps[0].caption}</p>
      </article>

      <Connector />

      {/* 2. ATENÇÃO E CONTROLE */}
      <article data-card className={styles.card} aria-hidden="true">
        <svg className={styles.art} viewBox="0 0 200 140">
          {PROCESS_ROWS.map((i) => {
            const y = 22 + i * 30
            return (
              <g key={i}>
                <circle data-dot cx="24" cy={y} r="8" className={styles.dot} />
                <path data-tick d={`M20 ${y}L23 ${y + 3.5}L28.5 ${y - 3.5}`} className={styles.tick} />
                <rect x="44" y={y - 5} width="140" height="10" rx="5" className={styles.barTrack} />
                <rect data-bar x="44" y={y - 5} width="140" height="10" rx="5" className={styles.bar} />
              </g>
            )
          })}
        </svg>
        <h3 className={styles.title}>{visionGraphic.steps[1].title}</h3>
        <p className={styles.caption}>{visionGraphic.steps[1].caption}</p>
      </article>

      <Connector />

      {/* 3. DINHEIRO */}
      <article data-card className={styles.card} aria-hidden="true">
        <svg className={styles.art} viewBox="0 0 200 140">
          <path d="M10 40H190M10 80H190M10 120H190" className={styles.grid} />
          <path data-area d="M10 120C50 114 70 102 100 88S150 52 190 20V130H10Z" className={styles.area} />
          <path data-curve d="M10 120C50 114 70 102 100 88S150 52 190 20" className={styles.curve} />
          <circle data-peak-ring cx="190" cy="20" r="5" className={styles.peakRing} />
          <circle data-peak cx="190" cy="20" r="5.5" className={styles.peak} />
        </svg>
        <h3 className={styles.title}>{visionGraphic.steps[2].title}</h3>
        <p className={styles.caption}>{visionGraphic.steps[2].caption}</p>
      </article>
    </div>
  )
}
