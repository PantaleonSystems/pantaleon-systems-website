import { Fragment, useEffect, useRef, useState } from 'react'
import styles from './TransitionPath.module.css'

export const DEFAULT_TRANSITION_STEPS = [
  'Pesquisa',
  'Protótipo',
  'Validação',
  'Rede',
  'Ecossistema',
] as const

export interface TransitionPathProps {
  steps?: readonly string[]
  className?: string
}

const NODE_STAGGER_MS = 250
const LINE_DELAY_MS = 170

export function TransitionPath({
  steps = DEFAULT_TRANSITION_STEPS,
  className,
}: TransitionPathProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [litNodes, setLitNodes] = useState(0)
  const [litLines, setLitLines] = useState(0)

  useEffect(() => {
    const node = trackRef.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLitNodes(steps.length)
      setLitLines(Math.max(steps.length - 1, 0))
      return
    }

    const timeouts: ReturnType<typeof setTimeout>[] = []

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          steps.forEach((_, index) => {
            timeouts.push(
              setTimeout(() => {
                setLitNodes((count) => Math.max(count, index + 1))
              }, index * NODE_STAGGER_MS),
            )
          })

          for (let index = 0; index < steps.length - 1; index += 1) {
            timeouts.push(
              setTimeout(
                () => {
                  setLitLines((count) => Math.max(count, index + 1))
                },
                index * NODE_STAGGER_MS + LINE_DELAY_MS,
              ),
            )
          }

          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
    }
  }, [steps])

  const pathClasses = [styles.path, className].filter(Boolean).join(' ')

  return (
    <div className={pathClasses}>
      <div className={styles.track} ref={trackRef}>
        {steps.map((step, index) => (
          <Fragment key={step}>
            <div
              className={[styles.node, index < litNodes && styles.lit]
                .filter(Boolean)
                .join(' ')}
            >
              <span className={styles.circ} />
              <span>{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={[styles.line, index < litLines && styles.lit]
                  .filter(Boolean)
                  .join(' ')}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
