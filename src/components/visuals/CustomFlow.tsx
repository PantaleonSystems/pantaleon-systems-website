import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { custom } from '../../data/product'
import styles from './CustomFlow.module.css'

/** Três peças soltas do seu dia a dia que se conectam sozinhas quando a cena aparece. */
export function CustomFlow() {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const nodes = gsap.utils.toArray<SVGGElement>('[data-node]')
        const lines = gsap.utils.toArray<SVGPathElement>('[data-line]')
        const dots = gsap.utils.toArray<SVGCircleElement>('[data-dot]')

        // peças soltas: deslocadas e inclinadas até se encaixarem
        const scatter = [
          { x: -26, y: -22, rotation: -8 },
          { x: 20, y: 34, rotation: 6 },
          { x: 30, y: -30, rotation: 9 },
        ]
        nodes.forEach((n, i) => gsap.set(n, { ...scatter[i], autoAlpha: 0, transformOrigin: '50% 50%' }))
        gsap.set(lines, { drawSVG: '0%' })
        gsap.set(dots, { autoAlpha: 0 })

        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        })
        tl.to(nodes, { autoAlpha: 1, duration: DUR.base, stagger: 0.14 })
          .to(nodes, { x: 0, y: 0, rotation: 0, duration: DUR.slow, stagger: 0.1, ease: 'power3.inOut' }, 0.5)
          .to(lines, { drawSVG: '100%', duration: DUR.slow, stagger: 0.25, ease: 'power2.inOut' }, '>-0.4')
        dots.forEach((dot, i) => {
          const path = dot.dataset.path!
          tl.to(dot, { autoAlpha: 1, duration: 0.2 }, '>' + (i === 0 ? '-0.2' : '-0.9')).to(
            dot,
            { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 1.1, ease: 'power1.inOut' },
            '<',
          ).to(dot, { autoAlpha: 0, duration: 0.3 }, '>')
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <svg ref={root} className={styles.svg} viewBox="0 0 360 300" role="img" aria-label={custom.flowLabel}>
      <path id="flow-a" data-line d="M120 76C160 76 176 120 204 150" className={styles.line} />
      <path id="flow-b" data-line d="M240 212C240 236 220 246 188 248" className={styles.line} />
      <circle data-dot data-path="#flow-a" r="4.5" className={styles.dot} />
      <circle data-dot data-path="#flow-b" r="4.5" className={styles.dot} />

      <g data-node>
        <rect x="16" y="44" width="104" height="64" rx="16" className={styles.solid} />
        <text x="68" y="81" className={styles.textOn}>{custom.flowNodes[0]}</text>
      </g>
      <g data-node>
        <rect x="200" y="148" width="112" height="64" rx="16" className={styles.hollow} />
        <text x="256" y="185" className={styles.text}>{custom.flowNodes[1]}</text>
      </g>
      <g data-node>
        <rect x="60" y="216" width="128" height="64" rx="16" className={styles.dashed} />
        <text x="124" y="253" className={styles.text}>{custom.flowNodes[2]}</text>
      </g>
    </svg>
  )
}
