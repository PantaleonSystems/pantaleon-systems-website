import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { buttonClasses } from '../../design-system'
import { usePressFeedback } from '../../hooks'
import { custom } from '../../data/product'
import { whatsappUrl } from '../../data/contact'
import { CustomFlow } from '../../components/visuals/CustomFlow'
import styles from './Custom.module.css'

export function Custom() {
  const root = useRef<HTMLElement>(null)
  usePressFeedback(root)

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
              scrollTrigger: { trigger: '[data-title]', start: 'top 85%', once: true },
            }),
        })
        gsap.from('[data-fade]', {
          autoAlpha: 0,
          y: 18,
          duration: DUR.base,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: { trigger: '[data-fade]', start: 'top 92%', once: true },
        })
        return () => title.revert()
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="sob-medida" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{custom.eyebrow}</p>
          <h2 data-title className={styles.title}>
            {custom.title}
          </h2>
          <div data-fade>
            <a
              className={buttonClasses('dark')}
              href={whatsappUrl('Olá! Tenho um processo que quero automatizar.')}
              target="_blank"
              rel="noreferrer"
              data-press
            >
              {custom.cta}
            </a>
          </div>
        </div>
        <CustomFlow />
      </div>
    </section>
  )
}
