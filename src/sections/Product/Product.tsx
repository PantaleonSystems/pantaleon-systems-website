import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { product } from '../../data/product'
import { WaitlistForm } from '../../components/WaitlistForm/WaitlistForm'
import { ProductPhone } from '../../components/visuals/ProductPhone'
import styles from './Product.module.css'

export function Product() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const titles = gsap.utils.toArray<HTMLElement>('[data-title]').map((el) =>
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: DUR.slow,
                ease: EASE,
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: 'top 82%', once: true },
              }),
          }),
        )
        gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) =>
          gsap.from(el, {
            autoAlpha: 0,
            y: 20,
            duration: DUR.base,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }),
        )
        gsap.from('[data-card]', {
          autoAlpha: 0,
          y: 48,
          duration: DUR.slow,
          ease: EASE,
          scrollTrigger: { trigger: '[data-card]', start: 'top 90%', once: true },
        })
        return () => titles.forEach((t) => t.revert())
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="produto" className={styles.section}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <p className={`eyebrow ${styles.eyebrow}`}>
              {product.eyebrow} <span className={styles.badge}>{product.badge}</span>
            </p>
            <h2 data-title className={styles.title}>
              {product.title}
            </h2>
            <p data-fade className={styles.lead}>
              {product.description}
            </p>
            <p data-fade className={styles.note}>
              {product.honesty}
            </p>
          </div>
          <ProductPhone />
        </div>

        <div className={styles.join}>
          <div className={styles.joinCopy}>
            <h3 data-title className={styles.joinTitle}>
              {product.formTitle}
            </h3>
            <p data-fade className={styles.founder}>
              {product.founder}
            </p>
          </div>
          <div data-card className={styles.form}>
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  )
}
