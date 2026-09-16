import type { TextBlock, TimelineItem } from '../types'

export const aboutHero = {
  eyebrow: 'Sobre a Pantaleon',
  title: 'A organização por trás da visão',
  lead: 'A Pantaleon Systems é uma deep tech brasileira orientada por pesquisa. Não somos a blockchain nem o token: somos a organização-mãe que projeta e constrói a infraestrutura para a próxima geração de redes, agentes e sistemas verificáveis.',
}

export const mission: TextBlock = {
  title: 'O que fazemos',
  paragraphs: [
    'Desenvolver infraestruturas digitais capazes de transformar dados, ações e estados em sistemas verificáveis, auditáveis e confiáveis.',
    'Isso significa pesquisar e construir a base — núcleo computacional, protocolos de validação e rede — sobre a qual aplicações inteligentes e descentralizadas possam operar com confiança demonstrável, não presumida.',
  ],
}

export const vision: TextBlock = {
  title: 'Onde queremos chegar',
  paragraphs: [
    'Ser uma deep tech brasileira de referência global na construção de infraestrutura para a Web4, conectando redes descentralizadas, inteligência artificial, agentes autônomos e validação de estados.',
    'Queremos que a transição da informação ao estado, do estado à prova e da prova à confiança seja uma camada aberta e verificável — e que ela tenha sido pensada e construída a partir do Brasil.',
  ],
}

export const timeline: TimelineItem[] = [
  {
    label: 'Fase 01',
    title: 'Pesquisa',
    description:
      'Formulação da tese Web4 e dos fundamentos de validação de estado, novidade informacional e coerência de transições.',
  },
  {
    label: 'Fase 02',
    title: 'Kernel experimental',
    description:
      'Construção do núcleo USF e dos primeiros experimentos com recibos criptográficos e arquitetura inicial para Proof-of-State.',
  },
  {
    label: 'Fase 03',
    title: 'Identidade institucional',
    description:
      'Consolidação da Pantaleon como organização-mãe, com posicionamento, marca e estrutura dos projetos que orbitam a visão.',
  },
  {
    label: 'Fase 04',
    title: 'Comunidade e rede',
    description:
      'Formação da comunidade inicial, documentação técnica, nó auditável e caminho para a rede e o ecossistema aberto.',
  },
]

export const aboutCta = {
  eyebrow: 'Faça parte',
  title: 'Construa com a gente',
  description:
    'Pesquisadores, desenvolvedores, parceiros e visionários interessados em infraestrutura verificável são bem-vindos desde o início da construção.',
}
