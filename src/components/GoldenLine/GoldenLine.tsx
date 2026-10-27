import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { NO_PREF } from '../../lib/motion'
import styles from './GoldenLine.module.css'

/**
 * Fio dourado que desce pela história, desenhado pela rolagem, e termina num nó.
 * Deve ser filho direto de um elemento com position: relative que envolve as cenas.
 */
export function GoldenLine() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const path = root.current!.querySelector('path')!
        const end = root.current!.querySelector('[data-end]')
        gsap.set(end, { scale: 0 })
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root.current!.parentElement,
              start: 'top 60%',
              end: 'bottom bottom',
              scrub: 0.6,
              // depende da altura final (pins das cenas criam espaçadores): atualiza por último
              refreshPriority: 100,
            },
          })
          .fromTo(path, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 20 })
          .to(end, { scale: 1, duration: 1, ease: 'power2.out' })
        ScrollTrigger.refresh()
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className={styles.root} aria-hidden="true">
      <svg className={styles.line} viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d="M95 0C95 120 90 160 90 300S97 420 97 560S91 700 91 800S94 900 94 1000" />
      </svg>
      {/* o fio termina num nó, no fim da história, antes do rodapé */}
      <i data-end className={styles.end} />
    </div>
  )
}
