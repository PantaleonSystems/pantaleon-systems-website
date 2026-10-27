import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import styles from './ServiceDiagram.module.css'

export type DiagramKind = 'automation' | 'integration' | 'products'

const VIEWBOX: Record<DiagramKind, string> = {
  automation: '20 20 232 140',
  integration: '8 30 304 120',
  products: '14 36 292 108',
}

/** Esquema pequeno e decorativo de cada serviço. Desenha-se uma vez ao entrar na tela. */
export function ServiceDiagram({ kind }: { kind: DiagramKind }) {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const q = <T extends Element>(s: string) => gsap.utils.toArray<T>(s)
        const lines = q<SVGPathElement>('[data-line]')
        const nodes = q<SVGGElement>('[data-node]')
        const ticks = q<SVGPathElement>('[data-tick]')
        const dots = q<SVGCircleElement>('[data-dot]')
        const clones = q<SVGGElement>('[data-clone]')

        gsap.set(lines, { drawSVG: '0%' })
        gsap.set(ticks, { drawSVG: '0%' })
        gsap.set(nodes, { scale: 0, transformOrigin: '50% 50%' })
        gsap.set(dots, { autoAlpha: 0 })
        gsap.set(clones, { autoAlpha: 0, x: (_i, el) => -Number(el.dataset.from ?? 0) })

        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
        })
        tl.to(nodes, { scale: 1, duration: DUR.base, stagger: 0.12 })
          .to(lines, { drawSVG: '100%', duration: DUR.slow, stagger: 0.12, ease: 'power2.inOut' }, 0.2)
          .to(ticks, { drawSVG: '100%', duration: DUR.fast, stagger: 0.12 }, '>-0.2')
          .to(clones, { autoAlpha: 1, x: 0, duration: DUR.slow, stagger: 0.18 }, 0.4)

        // dados "viajando" pela linha (integração): poucas passadas e param
        dots.forEach((dot, i) => {
          const path = dot.dataset.path!
          tl.to(dot, { autoAlpha: 1, duration: 0.2 }, 1.2 + i * 0.35).to(
            dot,
            {
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: dot.dataset.reverse ? 1 : 0, end: dot.dataset.reverse ? 0 : 1 },
              duration: 1.1,
              ease: 'power1.inOut',
              repeat: 1,
              repeatDelay: 0.5,
            },
            '<',
          )
          tl.to(dot, { autoAlpha: 0, duration: 0.3 }, '>')
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <svg ref={root} className={styles.svg} viewBox={VIEWBOX[kind]} aria-hidden="true">
      {kind === 'automation' && (
        <>
          <g data-node>
            <circle cx="46" cy="90" r="22" className={styles.solid} />
            <path d="M50 78L40 92H47L44 102L54 88H47Z" className={styles.bolt} />
          </g>
          <path data-line d="M68 90H128" className={styles.line} />
          <path data-line d="M128 90C168 90 176 40 212 40" className={styles.line} />
          <path data-line d="M128 90H212" className={styles.line} />
          <path data-line d="M128 90C168 90 176 140 212 140" className={styles.line} />
          {[40, 90, 140].map((y) => (
            <g key={y} data-node>
              <rect x="212" y={y - 14} width="28" height="28" rx="8" className={styles.hollow} />
              <path data-tick d={`M219 ${y}L225 ${y + 6}L234 ${y - 6}`} className={styles.tick} />
            </g>
          ))}
        </>
      )}

      {kind === 'integration' && (
        <>
          <g data-node>
            <rect x="18" y="56" width="78" height="68" rx="14" className={styles.solid} />
            <path d="M34 80H78M34 92H66M34 104H72" className={styles.glyphOnDark} />
          </g>
          <g data-node>
            <rect x="224" y="56" width="78" height="68" rx="14" className={styles.hollow} />
            <path d="M240 80H284M240 92H272M240 104H278" className={styles.glyph} />
          </g>
          <path id={`${kind}-up`} data-line d="M96 78C140 78 180 78 224 78" className={styles.line} />
          <path id={`${kind}-down`} data-line d="M96 102C140 102 180 102 224 102" className={styles.line} />
          {[0, 1].map((i) => (
            <circle key={`a${i}`} data-dot data-path={`#${kind}-up`} r="4" className={styles.dot} />
          ))}
          {[0].map((i) => (
            <circle key={`b${i}`} data-dot data-reverse="1" data-path={`#${kind}-down`} r="4" className={styles.dot} />
          ))}
        </>
      )}

      {kind === 'products' && (
        <>
          <g data-node>
            <rect x="24" y="56" width="68" height="68" rx="16" className={styles.solid} />
            <path d="M44 90H72M58 76V104" className={styles.glyphOnDark} />
          </g>
          <path data-line d="M92 90H128" className={styles.line} />
          {[
            { x: 134, d: false },
            { x: 190, d: false },
            { x: 246, d: true },
          ].map(({ x, d }) => (
            <g key={x} data-clone data-from={x - 92}>
              <rect x={x} y="68" width="44" height="44" rx="11" className={d ? styles.dashed : styles.hollow} />
            </g>
          ))}
        </>
      )}
    </svg>
  )
}
