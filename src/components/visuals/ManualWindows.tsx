import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { NO_PREF } from '../../lib/motion'
import styles from './ManualWindows.module.css'

/**
 * Quatro "telas" de trabalho manual (chat, planilha, redes, sistema) que se acumulam
 * conforme a rolagem, com um cursor saltando de uma para outra. Só decoração:
 * o conteúdo equivalente está na lista .sr-only da cena.
 */
export function ManualWindows() {
  const stage = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const wins = gsap.utils.toArray<HTMLElement>('[data-win]')
        const cursor = stage.current!.querySelector<HTMLElement>('[data-cursor]')!

        gsap.set(wins, { autoAlpha: 0, y: 70, scale: 0.94 })
        gsap.set(cursor, { autoAlpha: 0 })

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: stage.current,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })

        wins.forEach((win, i) => {
          const at = i * 1.4
          tl.to(win, { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, at)
          // o cursor vai até a janela, "clica" e segue para a próxima
          tl.to(
            cursor,
            {
              autoAlpha: 1,
              x: () => win.offsetLeft + win.offsetWidth * 0.62,
              y: () => win.offsetTop + win.offsetHeight * 0.58,
              duration: 0.9,
              ease: 'power2.inOut',
            },
            at + 0.7,
          ).to(cursor, { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1, ease: 'none' }, '>')
        })
        tl.to({}, { duration: 0.6 })
      })
      return () => mm.revert()
    },
    { scope: stage },
  )

  return (
    <div ref={stage} className={styles.stage} aria-hidden="true">
      <div data-win className={`${styles.win} ${styles.chat}`}>
        <div className={styles.bar}><i /><i /><i /><span>Mensagens</span></div>
        <div className={styles.body}>
          <p className={`${styles.bubble} ${styles.in}`}><b /><b className={styles.short} /></p>
          <p className={`${styles.bubble} ${styles.out}`}><b /></p>
          <p className={`${styles.bubble} ${styles.in}`}><b /><b className={styles.short} /></p>
          <p className={`${styles.bubble} ${styles.out}`}><b /></p>
        </div>
      </div>

      <div data-win className={`${styles.win} ${styles.sheet}`}>
        <div className={styles.bar}><i /><i /><i /><span>Planilha</span></div>
        <div className={styles.grid}>
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className={i === 6 || i === 13 ? styles.hot : undefined} />
          ))}
        </div>
      </div>

      <div data-win className={`${styles.win} ${styles.post}`}>
        <div className={styles.bar}><i /><i /><i /><span>Redes</span></div>
        <div className={styles.body}>
          <div className={styles.media} />
          <div className={styles.chips}>
            <span /><span /><span /><span />
          </div>
        </div>
      </div>

      <div data-win className={`${styles.win} ${styles.form}`}>
        <div className={styles.bar}><i /><i /><i /><span>Sistema</span></div>
        <div className={styles.body}>
          <div className={styles.field} />
          <div className={styles.field} />
          <div className={`${styles.field} ${styles.fieldShort}`} />
          <div className={styles.save}>Salvar</div>
        </div>
      </div>

      <svg data-cursor className={styles.cursor} viewBox="0 0 24 24" width="28" height="28">
        <path d="M5 3l14 8-6 1.6L10.4 19z" />
      </svg>
    </div>
  )
}
