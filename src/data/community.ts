import type { CommunityCard, CommunityChannel } from '../types'

export const communityCards: CommunityCard[] = [
  {
    title: 'Entrar na comunidade',
    description: 'Participe dos nossos canais e acompanhe a construção dos projetos.',
    ctaLabel: 'Entrar',
  },
  {
    title: 'Receber atualizações',
    description: 'Assine a newsletter e acompanhe publicações e notas técnicas.',
    ctaLabel: 'Assinar',
  },
  {
    title: 'Acompanhar GitHub',
    description: 'Em breve, repositórios, documentação e recursos para builders.',
    ctaLabel: 'Acompanhar',
  },
  {
    title: 'Propor parceria',
    description: 'Conecte-se para colaboração técnica, institucional ou estratégica.',
    ctaLabel: 'Propor',
  },
]

export const communityChannels: CommunityChannel[] = [
  { label: 'Discord', href: '#', soon: true },
  { label: 'Telegram', href: '#', soon: true },
  { label: 'LinkedIn', href: '#' },
  { label: 'X / Twitter', href: '#' },
  { label: 'GitHub', href: '#', soon: true },
  { label: 'Newsletter', href: '#' },
]
