import type { Project } from '../types'

export const projects: Project[] = [
  {
    slug: 'ifra-network',
    title: 'IFRA Network',
    status: 'dev',
    statusLabel: 'em desenvolvimento',
    description:
      'Infraestrutura descentralizada voltada à validação de estados, dados e transições informacionais.',
    ctaLabel: 'Conhecer IFRA',
  },
  {
    slug: 'usf-engine',
    title: 'USF Engine',
    status: 'rnd',
    statusLabel: 'núcleo de P&D',
    description:
      'Motor computacional proprietário para experimentos em validação de estado, novidade informacional e coerência de transições.',
    ctaLabel: 'Entender a tecnologia',
  },
  {
    slug: 'khipu',
    title: 'Khipu',
    status: 'rnd',
    statusLabel: 'em estudo técnico-jurídico',
    description:
      'Conceito de camada econômica e simbólica inspirada em registros ancestrais de informação, pensada para futuras aplicações na rede.',
    ctaLabel: 'Explorar conceito',
  },
  {
    slug: 'cidadesmil',
    title: 'CidadesMIL',
    status: 'dev',
    statusLabel: 'aplicação estratégica',
    description:
      'Linha de aplicação voltada a cidades inteligentes, sensores, IoT e validação de dados físico-digitais.',
    ctaLabel: 'Ver aplicação',
  },
]
