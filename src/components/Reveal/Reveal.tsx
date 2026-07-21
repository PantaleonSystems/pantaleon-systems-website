import type { CSSProperties, ReactElement, ReactNode } from 'react'
import { Children, cloneElement, isValidElement } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export type RevealTag = 'div' | 'section'

export interface RevealProps {
  children: ReactNode
  as?: RevealTag
  stagger?: boolean
  className?: string
}

const STAGGER_DELAY_MS = 85

export function Reveal({
  children,
  as: Tag = 'div',
  stagger,
  className,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal()

  const classes = [
    stagger ? 'stagger' : 'reveal',
    isVisible && 'is-visible',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = stagger
    ? Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        const element = child as ReactElement<{ style?: CSSProperties }>
        return cloneElement(element, {
          style: {
            ...element.props.style,
            transitionDelay: `${index * STAGGER_DELAY_MS}ms`,
          },
        })
      })
    : children

  return (
    <Tag ref={ref} className={classes}>
      {content}
    </Tag>
  )
}
