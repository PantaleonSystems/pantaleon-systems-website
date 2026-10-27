import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import { mainNavItems } from '../../data/navigation'
import { whatsappUrl } from '../../data/contact'
import { HashLink } from '../HashLink/HashLink'
import logo from '../../assets/logo.png'
import styles from './Header.module.css'

export function Header() {
  const ref = useRef<HTMLElement>(null)

  // Esconde ao rolar para baixo, volta ao rolar para cima (só com movimento permitido).
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_PREF, () => {
        const hide = gsap.to(ref.current, {
          yPercent: -110,
          duration: DUR.fast,
          ease: EASE,
          paused: true,
        })
        const trigger = ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const goingDown = self.direction === 1 && self.scroll() > 120
            if (goingDown) hide.play()
            else hide.reverse()
          },
        })
        return () => {
          trigger.kill()
          hide.kill()
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <header ref={ref} className={styles.header}>
      <div className={`wrap ${styles.nav}`}>
        <HashLink hash="topo" className={styles.brand}>
          <img src={logo} alt="" className={styles.logo} />
          <span>Pantaleon Systems</span>
        </HashLink>

        <nav className={styles.links} aria-label="Principal">
          {mainNavItems.map((item) => (
            <HashLink key={item.hash} hash={item.hash}>
              {item.label}
            </HashLink>
          ))}
        </nav>

        <a className={styles.cta} href={whatsappUrl()} target="_blank" rel="noreferrer">
          Falar com a gente
        </a>
      </div>
    </header>
  )
}
