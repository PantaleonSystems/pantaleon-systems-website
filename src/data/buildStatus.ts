import type { BuildStatusItem } from '../types'

export const buildStatusItems: BuildStatusItem[] = [
  {
    stage: 'now',
    label: 'Hoje',
    description:
      'Pesquisa, kernel experimental, validação de estado e identidade institucional. Experimentos com geração de recibos criptográficos e arquitetura inicial para Proof-of-State.',
  },
  {
    stage: 'next',
    label: 'Próximo',
    description:
      'Nó auditável, replay de estado, documentação técnica e formação da comunidade inicial.',
  },
  {
    stage: 'future',
    label: 'Futuro',
    description:
      'Rede, ecossistema, integração dos projetos e infraestrutura aberta para desenvolvedores.',
  },
]
