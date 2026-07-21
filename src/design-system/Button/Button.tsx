import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'ghost' | 'ghost-on-dark'

interface ButtonBaseProps {
  variant?: ButtonVariant
  arrow?: boolean
  className?: string
  children?: ReactNode
}

interface ButtonAsLinkProps
  extends ButtonBaseProps,
    Omit<LinkProps, 'className' | 'children'> {
  href?: never
}

interface ButtonAsAnchorProps
  extends ButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
  to?: never
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  to?: never
  href?: never
}

export type ButtonProps =
  | ButtonAsLinkProps
  | ButtonAsAnchorProps
  | ButtonAsButtonProps

function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return props.to !== undefined
}

function isAnchorProps(props: ButtonProps): props is ButtonAsAnchorProps {
  return props.href !== undefined
}

const variantClassName: Record<ButtonVariant, keyof typeof styles> = {
  primary: 'primary',
  ghost: 'ghost',
  'ghost-on-dark': 'ghostOnDark',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', arrow, className, children, ...rest } = props

  const classes = [styles.btn, styles[variantClassName[variant]], className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </>
  )

  if (isLinkProps(props)) {
    const { to, ...linkRest } = rest as Omit<
      ButtonAsLinkProps,
      keyof ButtonBaseProps
    >
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    )
  }

  if (isAnchorProps(props)) {
    const { href, ...anchorRest } = rest as Omit<
      ButtonAsAnchorProps,
      keyof ButtonBaseProps
    >
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    )
  }

  const buttonRest = rest as Omit<ButtonAsButtonProps, keyof ButtonBaseProps>
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
