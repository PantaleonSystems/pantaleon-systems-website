import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { NO_PREF } from '../../lib/motion'
import { visionGraphic } from '../../data/problem'
import styles from './VisionGraphic.module.css'

/**
 * A visão em imagem: as tarefas manuais são riscadas e somem, e o que sobra
 * (tempo, atenção, dinheiro) fica ligado pela linha dourada. Guiado pela rolagem.
 */
export function VisionGraphic() {
  const stage = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const chips = gsap.utils.toArray<HTMLElement>('[data-chip]')
        const strikes = gsap.utils.toArray<HTMLElement>('[data-strike]')
        const line = stage.current!.querySelector('[data-line]')
        const nodes = gsap.utils.toArray<HTMLElement>('[data-result]')

        gsap.set(chips, { opacity: 1, scale: 1, y: 0 })
        gsap.set(strikes, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(line, { drawSVG: '0%' })
        gsap.set(nodes, { opacity: 0.25, scale: 0.9 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.current,
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: 0.8,
          },
        })
        chips.forEach((chip, i) => {
          tl.to(strikes[i], { scaleX: 1, duration: 0.5 }, i * 0.35)
            .to(chip, { opacity: 0.14, scale: 0.94, y: 6, duration: 0.6, ease: 'power2.out' }, i * 0.35 + 0.35)
        })
        tl.to(line, { drawSVG: '100%', duration: 2, ease: 'power1.inOut' }, '>-0.6')
          .to(nodes, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.6, ease: 'power2.out' }, '<0.2')
      })
      return () => mm.revert()
    },
    { scope: stage },
  )

  return (
    <div ref={stage} className={styles.stage} aria-hidden="true">
      <div className={styles.chips}>
        {visionGraphic.tasks.map((label, i) => (
          <span key={label} data-chip className={`${styles.chip} ${styles[`p${i}`]}`}>
            {label}
            <i data-strike className={styles.strike} />
          </span>
        ))}
      </div>

      <div className={styles.result}>
        <svg className={styles.wire} viewBox="0 0 600 20" preserveAspectRatio="none">
          <path data-line d="M30 10H570" />
        </svg>
        {visionGraphic.kept.map((label) => (
          <div key={label} data-result className={styles.node}>
            <span className={styles.dot} />
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
