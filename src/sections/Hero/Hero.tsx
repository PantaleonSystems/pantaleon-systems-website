import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { DUR, EASE, EASE_IN_OUT, NO_PREF } from '../../lib/motion'
import { buttonClasses } from '../../design-system'
import { HashLink } from '../../components/HashLink/HashLink'
import { useMediaQuery, usePressFeedback } from '../../hooks'
import { whatsappUrl } from '../../data/contact'
import { hero, tall, wide, type NodeKind } from '../../data/hero'
import logoImage from '../../assets/logo.png'
import styles from './Hero.module.css'

function NodeIcon({ kind }: { kind: NodeKind }) {
  // ícones de 28x28 centrados na origem; traço dourado, sem preenchimento
  switch (kind) {
    case 'sheet':
      return (
        <>
          <rect x="-11" y="-12" width="22" height="24" rx="3" />
          <path d="M-11 -4H11M-11 4H11M-3 -12V12" />
        </>
      )
    case 'message':
      return <path d="M-12 -9H12V5H-1L-8 11V5H-12Z" />
    case 'copy':
      return (
        <>
          <rect x="-12" y="-12" width="14" height="16" rx="2" />
          <rect x="-2" y="-4" width="14" height="16" rx="2" />
        </>
      )
    case 'arrow':
      return <path d="M-12 4C-12 -8 2 -8 8 -2M8 -2L2 -2M8 -2L8 4" />
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const isTall = useMediaQuery('(max-width: 700px)')
  const layout = isTall ? tall : wide
  usePressFeedback(root)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(NO_PREF, () => {
        const el = <T extends Element>(selector: string) => root.current!.querySelector<T>(selector)!
        const all = <T extends Element>(selector: string) => gsap.utils.toArray<T>(selector, root.current!)

        const thread = el<SVGPathElement>('[data-thread]')
        const spark = el<SVGCircleElement>('[data-spark]')
        const guide = el<SVGPathElement>('[data-line-guide]')
        const logoIn = el<HTMLElement>('[data-logo-in]')
        const logo = el<HTMLElement>('[data-logo]')
        const glow = el<HTMLElement>('[data-glow]')
        const ring = el<SVGCircleElement>('[data-ring]')
        const orbitPath = el<SVGPathElement>('[data-orbit-path]')
        const orbitDot = el<SVGCircleElement>('[data-orbit-dot]')
        const pulses = all<SVGCircleElement>('[data-pulse]')
        const icons = all<SVGGElement>('[data-node]')
        const labels = all<SVGTextElement>('[data-label]')
        const arcs = all<SVGCircleElement>('[data-arc]')
        const intro = all<HTMLElement>('[data-intro]')

        // Estado inicial: emaranhado, logo ausente. O estado final é o HTML/CSS padrão.
        gsap.set(thread, { attr: { d: layout.scribbleD } })
        gsap.set(spark, { autoAlpha: 0 })
        gsap.set(intro, { autoAlpha: 0, y: 18 })
        gsap.set(logoIn, { autoAlpha: 0, scale: 0.6 })
        gsap.set(glow, { autoAlpha: 0, scale: 0.5 })
        gsap.set(ring, { drawSVG: '0%' })
        gsap.set(arcs, { drawSVG: '0%' })
        gsap.set(labels, { autoAlpha: 0, y: 8 })
        icons.forEach((icon, i) => {
          const s = layout.nodes[i].scatter
          gsap.set(icon, { x: s.x, y: s.y, rotation: s.r, scale: 0.9, autoAlpha: 0 })
        })

        // Animações criadas por eventos (hover, toque, chegada do brilho) ficam fora do contexto
        // do GSAP; guardamos todas para encerrá-las na limpeza.
        const live: gsap.core.Animation[] = []
        const track = <T extends gsap.core.Animation>(animation: T) => {
          live.push(animation)
          return animation
        }

        // Ondas douradas + ponto em órbita ao redor da logo (hover, toque e chegada do brilho)
        let busy = false
        const emit = () => {
          if (busy) return
          busy = true
          track(gsap.fromTo(
            pulses,
            { scale: 1, autoAlpha: 0.55, transformOrigin: '50% 50%' },
            { scale: 1.9, autoAlpha: 0, duration: 1.7, ease: 'power2.out', stagger: 0.18 },
          ))
          gsap.set(orbitDot, { autoAlpha: 1 })
          track(gsap.to(orbitDot, {
            motionPath: { path: orbitPath, align: orbitPath, alignOrigin: [0.5, 0.5] },
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(orbitDot, { autoAlpha: 0 })
              busy = false
            },
          }))
        }
        const arrive = () => {
          track(gsap.fromTo(logoIn, { scale: 1 }, { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }))
          emit()
        }

        // Título por linhas, com máscara; refaz o split quando a fonte termina de carregar.
        const title = SplitText.create('[data-line]', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          aria: 'auto',
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: DUR.base + 0.2,
              ease: EASE,
              stagger: 0.12,
              delay: 0.25,
            }),
        })

        const tl = gsap.timeline({ defaults: { ease: EASE } })
        tl.from(thread, { drawSVG: '0%', duration: 1.1, ease: 'power2.inOut' }, 0.1)
          .to(icons, { autoAlpha: 1, duration: 0.6, stagger: 0.12 }, 0.3)
          // do emaranhado à linha reta
          .to(thread, { morphSVG: { shape: layout.lineD, shapeIndex: 'auto' }, duration: 1.5, ease: EASE_IN_OUT }, 1.5)
          .to(
            icons,
            {
              x: (i) => layout.nodes[i].x,
              y: (i) => layout.nodes[i].y,
              rotation: 0,
              scale: 1,
              duration: 1.5,
              ease: EASE_IN_OUT,
              stagger: 0.06,
            },
            1.5,
          )
          // a logo é o destino da linha: surge, ganha o anel dourado e os nós ganham nome
          .to(glow, { autoAlpha: 1, scale: 1, duration: 2 }, 1.9)
          .to(logoIn, { autoAlpha: 1, scale: 1, duration: 1.4 }, 1.9)
          .to(arcs, { drawSVG: '100%', duration: 1.8, stagger: 0.15, ease: 'power2.inOut' }, 2.2)
          .to(ring, { drawSVG: '100%', duration: 1.2, ease: 'power2.inOut' }, 2.8)
          .to(labels, { autoAlpha: 1, y: 0, duration: DUR.base, stagger: 0.1 }, 3.0)
          .call(arrive, undefined, 3.6)
          .to(intro, { autoAlpha: 1, y: 0, duration: DUR.base, stagger: 0.12 }, 2.6)

        // Brilho raro: percorre a linha até a logo, que pulsa ao recebê-lo. Fora disso, tudo parado.
        const glint = gsap.timeline({ delay: 5.2, repeat: -1, repeatDelay: 9 })
        glint
          .set(spark, { autoAlpha: 1 })
          .to(spark, {
            motionPath: { path: guide, align: guide, alignOrigin: [0.5, 0.5] },
            duration: 2.2,
            ease: 'power1.inOut',
          })
          .to(spark, { autoAlpha: 0, duration: 0.2 })
          .call(arrive)

        // Logo interativa: inclina em 3D seguindo o cursor, com brilho que acompanha o mouse
        gsap.set(logo, { transformPerspective: 700 })
        const rx = gsap.quickTo(logo, 'rotationX', { duration: 0.5, ease: 'power3.out' })
        const ry = gsap.quickTo(logo, 'rotationY', { duration: 0.5, ease: 'power3.out' })
        // quickTo não aplica 'scale' (alias): usa-se scaleX/scaleY
        const scx = gsap.quickTo(logo, 'scaleX', { duration: 0.5, ease: EASE })
        const scy = gsap.quickTo(logo, 'scaleY', { duration: 0.5, ease: EASE })
        const sc = (value: number) => {
          scx(value)
          scy(value)
        }
        const onMove = (event: PointerEvent) => {
          const box = logo.getBoundingClientRect()
          const px = (event.clientX - box.left) / box.width
          const py = (event.clientY - box.top) / box.height
          ry((px - 0.5) * 24)
          rx(-(py - 0.5) * 24)
          logo.style.setProperty('--mx', `${px * 100}%`)
          logo.style.setProperty('--my', `${py * 100}%`)
        }
        const onEnter = () => {
          sc(1.06)
          emit()
        }
        const onLeave = () => {
          rx(0)
          ry(0)
          sc(1)
        }
        logo.addEventListener('pointermove', onMove)
        logo.addEventListener('pointerenter', onEnter)
        logo.addEventListener('pointerleave', onLeave)
        logo.addEventListener('click', emit)

        return () => {
          title.revert()
          glint.kill()
          live.forEach((animation) => animation.kill())
          gsap.set([...pulses, orbitDot], { clearProps: 'all' })
          logo.removeEventListener('pointermove', onMove)
          logo.removeEventListener('pointerenter', onEnter)
          logo.removeEventListener('pointerleave', onLeave)
          logo.removeEventListener('click', emit)
        }
      })

      // Movimento reduzido: nada a fazer, o HTML já está no estado final.
      return () => mm.revert()
    },
    { scope: root, dependencies: [isTall], revertOnUpdate: true },
  )

  const { logo, box, nr, labelSide } = layout
  const pos = {
    left: `${((logo.cx - logo.r - box.x) / box.w) * 100}%`,
    top: `${((logo.cy - logo.r - box.y) / box.h) * 100}%`,
    width: `${((logo.r * 2) / box.w) * 100}%`,
  }

  return (
    <section ref={root} id="topo" className={styles.hero}>
      <div className={`wrap ${styles.copy}`}>
        <h1 className={styles.title}>
          <span data-line className={styles.l1}>
            {hero.titleLines[0]}
          </span>
          <span data-line className={styles.l2}>
            {hero.titleLines[1]}
          </span>
        </h1>
        <div className={styles.aside}>
          <p data-intro className={styles.sub}>
            {hero.subtitle}
          </p>
          <div data-intro className={styles.actions}>
            <HashLink hash="produto" className={buttonClasses('light')} press>
              {hero.primaryCta}
            </HashLink>
            <a
              className={buttonClasses('ghost-on-dark')}
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-press
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.glowPos} style={pos} aria-hidden="true">
          <div data-glow className={styles.glow} />
        </div>
        <svg className={styles.art} viewBox={layout.viewBox} role="img" aria-label={hero.artLabel}>
          {[1.7, 2.5, 3.5, 4.8].map((m) => (
            <circle key={m} data-arc cx={logo.cx} cy={logo.cy} r={logo.r * m} className={styles.arc} />
          ))}
          <path data-line-guide d={layout.lineD} fill="none" stroke="none" />
          <path data-thread d={layout.lineD} className={styles.thread} />
          <circle cx={layout.start[0]} cy={layout.start[1]} r="5" className={styles.end} />
          {layout.nodes.map((n) => (
            <g key={n.kind} data-node transform={`translate(${n.x} ${n.y})`} className={styles.node}>
              <circle r={nr} className={styles.badge} />
              <g transform={`scale(${nr / 28})`} className={styles.glyph}>
                <NodeIcon kind={n.kind} />
              </g>
            </g>
          ))}
          {layout.nodes.map((n) => (
            <text
              key={n.kind}
              data-label
              x={labelSide === 'below' ? n.x : n.x + nr + 14}
              y={labelSide === 'below' ? n.y + nr + 28 : n.y + 5}
              textAnchor={labelSide === 'below' ? 'middle' : 'start'}
              className={styles.label}
            >
              {n.label}
            </text>
          ))}
          <circle data-spark r="6" cx="0" cy="0" className={styles.spark} />
        </svg>

        <div className={styles.logoPos} style={pos}>
          <svg className={styles.halo} viewBox="-14 -14 128 128" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <circle key={i} data-pulse cx="50" cy="50" r="53" className={styles.pulse} />
            ))}
            <path data-orbit-path d="M50 -11A61 61 0 1 1 49.99 -11Z" fill="none" stroke="none" />
            <circle data-orbit-dot r="2.6" className={styles.orbitDot} />
          </svg>
          <div data-logo-in className={styles.logoIn}>
            <div data-logo className={styles.logo}>
              <div className={styles.face}>
                <img src={logoImage} alt="Logo da Pantaleon Systems" draggable={false} />
                <i className={styles.glare} aria-hidden="true" />
              </div>
              {/* o anel acompanha a inclinação e o zoom da logo, e fica só na borda externa */}
              <svg className={styles.ringSvg} viewBox="-14 -14 128 128" aria-hidden="true">
                <circle data-ring cx="50" cy="50" r="52.5" className={styles.ring} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
