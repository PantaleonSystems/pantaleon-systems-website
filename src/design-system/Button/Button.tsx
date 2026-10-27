import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonClasses, type ButtonVariant } from './buttonClasses'

type CommonProps = { variant?: ButtonVariant; children?: ReactNode }

type ButtonProps =
  | (CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })

/** O atributo data-press liga o feedback de pressão (ver usePressFeedback). */
export function Button(props: ButtonProps) {
  const { variant = 'dark', children, ...rest } = props
  const className = buttonClasses(variant)

  if (props.href !== undefined) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a className={className} data-press {...anchorRest}>
        {children}
      </a>
    )
  }
  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={className} data-press {...buttonRest}>
      {children}
    </button>
  )
}
