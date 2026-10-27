import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { NO_PREF } from '../../lib/motion'
import { beforeAfter } from '../../data/method'
import styles from './BeforeAfter.module.css'

export function BeforeAfter() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const steps = gsap.utils.toArray<HTMLElement>('[data-step]')
        const strikes = gsap.utils.toArray<HTMLElement>('[data-strike]')
        const auto = root.current!.querySelector('[data-auto]')!
        const autoParts = gsap.utils.toArray<HTMLElement>('[data-auto-part]')

        gsap.set(steps, { opacity: 1 })
        gsap.set(strikes, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(autoParts, { autoAlpha: 0, y: 16 })
        gsap.set(auto, { autoAlpha: 0.35 })

        // pin no container; os filhos é que animam
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            // se a cena for mais alta que a tela, o pin começa com a base dela alinhada à base da tela
            start: () => `top top-=${Math.max(0, root.current!.scrollHeight - window.innerHeight)}`,
            invalidateOnRefresh: true,
            end: '+=140%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        })
        steps.forEach((step, i) => {
          tl.to(strikes[i], { scaleX: 1, duration: 1 }, i * 1.1)
          tl.to(step, { opacity: 0.35, duration: 1 }, i * 1.1)
        })
        tl.to(auto, { autoAlpha: 1, duration: 1 }, '>-0.2')
          .to(autoParts, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.6 }, '<')
          .to({}, { duration: 0.8 })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="antes-depois" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <p className="eyebrow">{beforeAfter.eyebrow}</p>
        <h2 className={styles.title}>{beforeAfter.title}</h2>
        <div className={styles.cols}>
          <div className={styles.manual}>
            <p className={styles.label}>{beforeAfter.manualLabel}</p>
            <ol className={styles.steps}>
              {beforeAfter.manualSteps.map((text) => (
                <li key={text} data-step className={styles.step}>
                  <span className={styles.stepText}>{text}</span>
                  <i data-strike className={styles.strike} />
                </li>
              ))}
            </ol>
          </div>
          <div data-auto className={styles.auto}>
            <p className={styles.label}>{beforeAfter.autoLabel}</p>
            <p data-auto-part className={styles.autoStep}>
              {beforeAfter.autoStep}
            </p>
            <p data-auto-part className={styles.autoResult}>
              {beforeAfter.autoResult}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
