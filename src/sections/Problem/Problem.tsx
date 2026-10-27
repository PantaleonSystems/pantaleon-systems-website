import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { problem } from '../../data/problem'
import { ManualWindows } from '../../components/visuals/ManualWindows'
import styles from './Problem.module.css'

export function Problem() {
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

        const closing = gsap.utils.toArray<HTMLElement>('[data-closing]')
        gsap.set(closing, { autoAlpha: 0, y: 22 })
        ScrollTrigger.create({
          trigger: '[data-closing-wrap]',
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(closing, { autoAlpha: 1, y: 0, duration: DUR.slow, ease: EASE, stagger: 0.35 }),
        })

        return () => title.revert()
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="problema" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{problem.eyebrow}</p>
          <h2 data-title className={styles.title}>
            {problem.title}
          </h2>
          {/* o visual ao lado é decorativo; os exemplos continuam acessíveis aqui */}
          <ul className="sr-only">
            {problem.examples.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <p data-closing-wrap className={styles.closing}>
            <span data-closing>{problem.closing[0]}</span>{' '}
            <span data-closing className={styles.accent}>
              {problem.closing[1]}
            </span>
          </p>
        </div>
        <ManualWindows />
      </div>
    </section>
  )
}
