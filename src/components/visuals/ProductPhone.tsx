import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import styles from './ProductPhone.module.css'

/**
 * Esquema genérico do produto num celular: publica uma vez, aparece no Instagram,
 * alguém comenta "QUERO", a resposta chega no Direct com o link.
 * Sem logos nem telas reais: o produto ainda não foi lançado.
 */
export function ProductPhone() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const steps = gsap.utils.toArray<HTMLElement>('[data-step]')
        const progress = root.current!.querySelector('[data-progress]')
        const lit = root.current!.querySelector('[data-lit]')
        const link = root.current!.querySelector('[data-link]')
        const typing = root.current!.querySelector('[data-typing]')

        gsap.set(steps, { autoAlpha: 0, y: 18 })
        gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(lit, { backgroundColor: 'transparent', color: 'var(--text-primary)' })
        gsap.set(link, { scale: 0.7, autoAlpha: 0, transformOrigin: 'left center' })
        gsap.set(typing, { autoAlpha: 0 })

        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        })
        tl.to(steps[0], { autoAlpha: 1, y: 0, duration: DUR.base })
          .to(steps[1], { autoAlpha: 1, y: 0, duration: DUR.base }, 0.25)
          .to(progress, { scaleX: 1, duration: 1.6, ease: 'none' }, 0.7)
          .to(steps[2], { autoAlpha: 1, y: 0, duration: DUR.base }, 2.1)
          .to(lit, { backgroundColor: 'var(--gold-soft)', color: 'var(--purple-deep)', duration: DUR.fast }, 2.5)
          .to(steps[3], { autoAlpha: 1, y: 0, duration: DUR.base }, 3.2)
          .to(typing, { autoAlpha: 1, duration: 0.2 }, 4.1)
          .to(typing, { autoAlpha: 0, duration: 0.2 }, 4.9)
          .to(steps[4], { autoAlpha: 1, y: 0, duration: DUR.base }, 4.9)
          .to(link, { autoAlpha: 1, scale: 1, duration: DUR.base }, 5.3)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className={styles.wrap}
      role="img"
      aria-label="Esquema do produto: você publica um vídeo uma vez, ele sai no Instagram, alguém comenta QUERO e a resposta chega no Direct com o link."
    >
      <div className={styles.phone} aria-hidden="true">
        <div className={styles.notch} />
        <div className={styles.screen}>
          <div data-step className={styles.title}>Nova publicação</div>

          <div data-step className={styles.video}>
            <span className={styles.play} />
            <div className={styles.track}>
              <i data-progress />
            </div>
          </div>

          <div data-step className={styles.chips}>
            <span data-lit className={styles.chip}>Instagram</span>
            <span className={`${styles.chip} ${styles.soon}`}>Outras redes · em breve</span>
          </div>

          <div data-step className={styles.comment}>
            <span className={styles.avatar} />
            <span className={styles.bubble}>QUERO</span>
          </div>

          <div data-step className={styles.reply}>
            <span className={styles.tag}>Direct</span>
            <div className={styles.replyBubble}>
              <b />
              <b className={styles.short} />
              <span data-link className={styles.link}>seu link</span>
            </div>
            <span data-typing className={styles.typing}><i /><i /><i /></span>
          </div>
        </div>
      </div>
    </div>
  )
}
