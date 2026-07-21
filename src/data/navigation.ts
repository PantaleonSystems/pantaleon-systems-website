import type { FooterColumn, FooterLink, NavItem } from '../types'

export const mainNavItems: NavItem[] = [
  { label: 'Visão', hash: 'visao' },
  { label: 'Ecossistema', hash: 'ecossistema-map' },
  { label: 'Projetos', hash: 'projetos' },
  { label: 'Liderança', hash: 'lideranca' },
  { label: 'Pesquisa', hash: 'pesquisa' },
  { label: 'Comunidade', hash: 'comunidade' },
]

export const footerAbout =
  'Deep tech brasileira construindo a base da Web4: infraestrutura para validar estados, agentes e ações em redes inteligentes, verificáveis e descentralizadas.'

export const footerTagline =
  'Da informação ao estado · Do estado à prova · Da prova à confiança'

export const footerColumns: FooterColumn[] = [
  {
    title: 'Navegação',
    links: mainNavItems.map(({ label, hash }): FooterLink => ({ label, hash })),
  },
  {
    title: 'Projetos',
    links: [
      { label: 'IFRA Network', to: '/projetos/ifra-network' },
      { label: 'USF Engine', to: '/projetos/usf-engine' },
      { label: 'Khipu', to: '/projetos/khipu' },
      { label: 'CidadesMIL', to: '/projetos/cidadesmil' },
    ],
  },
  {
    title: 'Conecte-se',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'X / Twitter', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Discord', href: '#' },
      { label: 'Newsletter', href: '#' },
    ],
  },
]

export const footerLegalLinks: Extract<FooterLink, { href: string }>[] = [
  { label: 'Privacidade', href: '#' },
  { label: 'Termos', href: '#' },
  { label: 'Avisos legais', href: '#' },
]
