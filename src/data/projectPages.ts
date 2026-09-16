import type { ProjectPageContent } from '../types'

/**
 * Conteúdo das páginas /projetos/{slug}. O card resumido (título, status,
 * descrição curta) continua em projects.ts — aqui fica só o que a página
 * interna acrescenta.
 *
 * Restrições de copy (ver docs/CLAUDE.md):
 * - USF Engine: nível conceitual, sem detalhes proprietários.
 * - Khipu: "conceito", "planejado", "em estudo" — sem oferta, pré-venda,
 *   listagem ou promessa de retorno.
 */
export const projectPages: Record<string, ProjectPageContent> = {
  'ifra-network': {
    slug: 'ifra-network',
    lead: 'Uma rede em desenvolvimento para registrar, validar e auditar estados, dados e transições informacionais — a camada de rede da tese Web4.',
    whatIsIt: {
      title: 'O que é',
      paragraphs: [
        'A IFRA Network é a infraestrutura descentralizada que a Pantaleon está construindo para validar estados, dados e transições. Em vez de apenas registrar o que aconteceu, a rede é pensada para verificar se uma transição é coerente com o estado anterior e produzir provas auditáveis disso.',
        'É a expressão em rede do núcleo de pesquisa: onde os mecanismos de validação deixam de ser experimentos e passam a operar entre nós independentes.',
      ],
    },
    why: {
      title: 'Por que existe',
      paragraphs: [
        'Numa rede de agentes autônomos e decisões automatizadas, registrar não basta. Sistemas que apenas armazenam eventos não conseguem responder se um estado é válido, se uma ação foi legítima ou se uma transição faz sentido.',
        'A IFRA existe para tornar essa validação uma propriedade da infraestrutura — não uma camada opcional acrescentada depois.',
      ],
    },
    relation: {
      title: 'Relação com a Pantaleon',
      paragraphs: [
        'A Pantaleon desenvolve o USF Engine, que sustenta a IFRA Network. A rede é o projeto de infraestrutura central do ecossistema: as aplicações — como a CidadesMIL — e a camada econômica planejada (Khipu) dependem dela para operar.',
      ],
    },
    stage: [
      {
        stage: 'now',
        label: 'Hoje',
        description:
          'Arquitetura inicial para Proof-of-State e experimentos com recibos criptográficos, sobre o kernel experimental do USF.',
      },
      {
        stage: 'next',
        label: 'Próximo',
        description:
          'Nó auditável, replay de estado e documentação técnica para os primeiros desenvolvedores.',
      },
      {
        stage: 'future',
        label: 'Futuro',
        description:
          'Rede aberta entre nós independentes, integração dos projetos e infraestrutura para aplicações de terceiros.',
      },
    ],
    follow: {
      title: 'Como acompanhar',
      paragraphs: [
        'A IFRA Network está em desenvolvimento. Publicaremos documentação, avanços do nó auditável e formas de participação pela comunidade — sem prazos anunciados antes de estarem prontos.',
      ],
    },
  },

  'usf-engine': {
    slug: 'usf-engine',
    lead: 'O núcleo computacional proprietário da Pantaleon: onde a validação de estado, a novidade informacional e a coerência de transições são pesquisadas e experimentadas.',
    whatIsIt: {
      title: 'O que é',
      paragraphs: [
        'O USF Engine é o motor computacional que sustenta o restante do ecossistema. É nele que a Pantaleon concentra sua pesquisa em três perguntas: um estado é válido? uma transição é coerente com o que veio antes? uma informação é realmente nova?',
        'Trata-se de tecnologia proprietária e núcleo de P&D. Por isso, esta página descreve o papel do USF no ecossistema, não os detalhes de sua implementação.',
      ],
    },
    why: {
      title: 'Por que existe',
      paragraphs: [
        'Redes verificáveis precisam de um mecanismo de validação que não dependa de confiança em quem registra. O USF existe para ser esse mecanismo — a base sobre a qual a IFRA Network e as aplicações podem afirmar, com provas, que um estado é o que diz ser.',
      ],
    },
    relation: {
      title: 'Relação com a Pantaleon',
      paragraphs: [
        'A Pantaleon desenvolve o USF Engine diretamente: é o primeiro nó da cadeia do ecossistema. O USF sustenta a IFRA Network, que por sua vez poderá utilizar o Khipu e se aplica em linhas como a CidadesMIL.',
      ],
    },
    stage: [
      {
        stage: 'now',
        label: 'Hoje',
        description:
          'Kernel experimental em pesquisa ativa: validação de estado e geração de recibos criptográficos em ambiente controlado.',
      },
      {
        stage: 'next',
        label: 'Próximo',
        description:
          'Consolidação do núcleo para sustentar o nó auditável e o replay de estado da IFRA Network.',
      },
      {
        stage: 'future',
        label: 'Futuro',
        description:
          'Evolução contínua como base de validação da rede e das aplicações do ecossistema.',
      },
    ],
    follow: {
      title: 'Como acompanhar',
      paragraphs: [
        'Por ser núcleo proprietário, o USF é comunicado por seus resultados — pela documentação e pelos avanços da IFRA Network e das aplicações. Acompanhe pela comunidade.',
      ],
    },
  },

  khipu: {
    slug: 'khipu',
    lead: 'Um conceito em estudo: uma camada econômica e simbólica inspirada nos registros ancestrais de informação, pensada para futuras aplicações na rede.',
    notice:
      'O Khipu é um conceito em estudo técnico-jurídico. Não existe token emitido, oferta, pré-venda, listagem ou qualquer promessa de retorno. Nada nesta página constitui oferta ou recomendação de investimento.',
    whatIsIt: {
      title: 'O que é',
      paragraphs: [
        'O khipu era o sistema andino de registro por nós em cordas — uma forma ancestral de codificar informação de modo durável e verificável. O Khipu da Pantaleon toma esse nome como referência simbólica para um conceito: uma camada econômica planejada para a rede, cuja utilidade futura seria coordenar e representar valor dentro do ecossistema.',
        'Neste momento, o Khipu é exclusivamente um conceito em estudo. Sua forma, seu funcionamento e sua viabilidade jurídica ainda estão sendo avaliados.',
      ],
    },
    why: {
      title: 'Por que existe',
      paragraphs: [
        'Redes descentralizadas costumam precisar de um mecanismo de coordenação econômica entre participantes. A Pantaleon estuda se — e como — esse mecanismo deveria existir na IFRA Network, com a mesma cautela aplicada a todo o restante: pesquisa antes do hype, infraestrutura antes da especulação.',
      ],
    },
    relation: {
      title: 'Relação com a Pantaleon',
      paragraphs: [
        'No diagrama do ecossistema, a IFRA Network "poderá utilizar" o Khipu — o verbo é intencional. O Khipu não é a Pantaleon, não é a rede e não é um produto. É uma possibilidade estudada pela organização-mãe, subordinada à maturidade da infraestrutura.',
      ],
    },
    stage: [
      {
        stage: 'now',
        label: 'Hoje',
        description:
          'Estudo conceitual e avaliação técnico-jurídica. Nenhum ativo emitido.',
      },
      {
        stage: 'next',
        label: 'Próximo',
        description:
          'Definição de se e como o conceito se integra à IFRA Network, condicionada à evolução da rede e do enquadramento jurídico.',
      },
      {
        stage: 'future',
        label: 'Futuro',
        description:
          'Eventual aplicação na rede, apenas após a infraestrutura estar madura e o estudo concluído.',
      },
    ],
    follow: {
      title: 'Como acompanhar',
      paragraphs: [
        'Qualquer evolução do conceito será comunicada pelos canais oficiais da Pantaleon, com linguagem clara sobre o que existe e o que ainda é estudo. Desconfie de qualquer comunicação que afirme o contrário.',
      ],
    },
  },

  cidadesmil: {
    slug: 'cidadesmil',
    lead: 'A linha de aplicação estratégica da Pantaleon para cidades inteligentes: sensores, IoT e validação de dados físico-digitais sobre infraestrutura verificável.',
    whatIsIt: {
      title: 'O que é',
      paragraphs: [
        'A CidadesMIL é a primeira linha de aplicação do ecossistema. Ela leva a validação de estados para o mundo físico: dados de sensores, dispositivos IoT e sistemas urbanos que precisam ser confiáveis para orientar decisões.',
        'É onde a tese da Web4 encontra ruas, redes de energia, mobilidade e serviços públicos — dados físico-digitais que podem ser verificados, não apenas coletados.',
      ],
    },
    why: {
      title: 'Por que existe',
      paragraphs: [
        'Cidades já produzem volumes enormes de dados, mas raramente conseguem provar que esses dados são íntegros, atuais e coerentes. Sem isso, automação urbana e agentes de decisão operam sobre bases frágeis.',
        'A CidadesMIL existe para demonstrar, em um domínio concreto, o valor de uma infraestrutura que valida estados antes de agir sobre eles.',
      ],
    },
    relation: {
      title: 'Relação com a Pantaleon',
      paragraphs: [
        'A CidadesMIL é uma das aplicações em que a IFRA Network se aplica — ao lado de agentes de IA, IoT, redes Web4 e dados físico-digitais. Ela consome a infraestrutura; não a substitui.',
      ],
    },
    stage: [
      {
        stage: 'now',
        label: 'Hoje',
        description:
          'Definição da linha de aplicação e dos cenários de validação de dados físico-digitais prioritários.',
      },
      {
        stage: 'next',
        label: 'Próximo',
        description:
          'Protótipos sobre o nó auditável da IFRA Network e busca de parceiros para validação em contexto real.',
      },
      {
        stage: 'future',
        label: 'Futuro',
        description:
          'Aplicações urbanas operando sobre a rede, com dados verificáveis de ponta a ponta.',
      },
    ],
    follow: {
      title: 'Como acompanhar',
      paragraphs: [
        'Parceiros públicos e privados interessados em cenários de cidades inteligentes podem falar com a equipe. Avanços da linha serão publicados pela comunidade.',
      ],
    },
  },
}
