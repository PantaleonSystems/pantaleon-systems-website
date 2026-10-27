import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { services } from '../../data/problem'
import { ServiceDiagram } from '../../components/visuals/ServiceDiagram'
import styles from './Services.module.css'

export function Services() {
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
              duration: DUR.base,
              ease: EASE,
              stagger: 0.1,
              scrollTrigger: { trigger: '[data-title]', start: 'top 85%', once: true },
            }),
        })

        gsap.utils.toArray<HTMLElement>('[data-row]').forEach((row) => {
          const rule = row.querySelector('[data-rule]')
          const name = row.querySelector('[data-name]')
          const text = row.querySelector('[data-text]')
          gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })
          gsap.set(name, { autoAlpha: 0, y: 34 })
          gsap.set(text, { autoAlpha: 0 })
          ScrollTrigger.create({
            trigger: row,
            start: 'top 82%',
            once: true,
            onEnter: () => {
              gsap
                .timeline({ defaults: { ease: EASE } })
                .to(rule, { scaleX: 1, duration: DUR.slow })
                .to(name, { autoAlpha: 1, y: 0, duration: DUR.base }, 0.1)
                .to(text, { autoAlpha: 1, duration: DUR.base }, 0.35)
            },
          })
        })

        return () => title.revert()
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="fazemos" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <p className="eyebrow">{services.eyebrow}</p>
        <h2 data-title className={styles.title}>
          {services.title}
        </h2>
        <div className={styles.rows}>
          {services.items.map((item) => (
            <article key={item.title} data-row className={styles.row}>
              <i data-rule className={styles.rule} />
              <div className={styles.copy}>
                <h3 data-name className={styles.name}>
                  {item.title}
                </h3>
                <p data-text className={styles.text}>
                  {item.text}
                </p>
              </div>
              <div className={styles.visual}>
                <ServiceDiagram kind={item.kind} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
