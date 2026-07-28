export interface NavItem {
  label: string
  /** id da seção na Home (sem "#") */
  hash: string
}

export type FooterLink =
  | { label: string; hash: string; to?: never; href?: never }
  | { label: string; to: string; hash?: never; href?: never }
  | { label: string; href: string; hash?: never; to?: never }

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface EcosystemNode {
  title: string
  role: string
  /** verbo que conecta este nó ao próximo (omitir no último nó da cadeia) */
  connector?: string
}

export type ProjectStatus = 'dev' | 'rnd'

export interface Project {
  slug: string
  title: string
  status: ProjectStatus
  /** rótulo exato exibido no StatusBadge (varia por projeto, não só por status) */
  statusLabel: string
  description: string
  ctaLabel: string
}

export interface Leader {
  name: string
  role: string
  bio: string
  /** URL resolvida do import da foto em src/assets */
  photo: string
}

export interface Principle {
  n: string
  text: string
}

export interface SimpleWordsQuestion {
  number: string
  question: string
  answer: string
}

export interface ComparisonColumn {
  tag: string
  title: string
  items: string[]
}

export interface WhyItMattersItem {
  title: string
  description: string
}

export interface ResearchBlock {
  n: string
  title: string
  description: string
}
