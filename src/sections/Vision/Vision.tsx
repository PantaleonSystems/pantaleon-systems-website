import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { vision } from '../../data/problem'
import { VisionGraphic } from '../../components/visuals/VisionGraphic'
import styles from './Vision.module.css'

export function Vision() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const title = SplitText.create('[data-title]', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: DUR.slow,
              ease: EASE,
              stagger: 0.12,
              scrollTrigger: { trigger: '[data-title]', start: 'top 80%', once: true },
            }),
        })

        // o texto "acende" palavra por palavra conforme a rolagem
        const text = SplitText.create('[data-text]', {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.18 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.08,
                scrollTrigger: {
                  trigger: '[data-text]',
                  start: 'top 80%',
                  end: 'bottom 45%',
                  scrub: true,
                },
              },
            ),
        })

        return () => {
          title.revert()
          text.revert()
        }
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="visao" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{vision.eyebrow}</p>
        <h2 data-title className={styles.title}>
          {vision.title}
        </h2>
        <p data-text className={styles.text}>
          {vision.text}
        </p>
        <VisionGraphic />
      </div>
    </section>
  )
}
