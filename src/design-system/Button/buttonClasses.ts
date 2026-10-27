import styles from './Button.module.css'

export type ButtonVariant = 'dark' | 'light' | 'ghost-on-dark' | 'ghost'

const variantClass: Record<ButtonVariant, string> = {
  dark: styles.dark,
  light: styles.light,
  'ghost-on-dark': styles.ghostOnDark,
  ghost: styles.ghost,
}

/** Classes de botão, para usar também em <HashLink>/<Link>. */
export function buttonClasses(variant: ButtonVariant = 'dark') {
  return `${styles.btn} ${variantClass[variant]}`
}
