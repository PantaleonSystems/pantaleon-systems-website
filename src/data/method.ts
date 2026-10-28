export const beforeAfter = {
  eyebrow: 'Antes e depois',
  title: 'Mesmo trabalho. Dois caminhos.',
  manualLabel: 'Antes · na mão',
  autoLabel: 'Depois · automático',
  /** ações que alguém repete toda vez que uma venda chega */
  manualSteps: [
    { word: 'Chega a venda', icon: 'cart' },
    { word: 'Copiar os dados', icon: 'copy' },
    { word: 'Colar na planilha', icon: 'clipboard' },
    { word: 'Baixar o estoque', icon: 'box' },
    { word: 'Emitir a nota', icon: 'doc' },
    { word: 'Avisar a equipe', icon: 'chat' },
  ],
  event: 'Nova venda',
  eventHint: 'Toque na venda para simular outra',
  targets: [
    { word: 'Planilha', icon: 'sheet' },
    { word: 'Estoque', icon: 'box' },
    { word: 'Nota', icon: 'doc' },
    { word: 'Equipe', icon: 'chat' },
  ],
  caption: 'Chegou uma venda. O resto acontece sozinho.',
  artLabel:
    'Esquema: à esquerda, seis tarefas manuais riscadas; à direita, uma nova venda que dispara sozinha a planilha, o estoque, a nota e a equipe.',
} as const

export const method = {
  eyebrow: 'Como pensamos',
  title: 'Quatro passos, nesta ordem.',
  steps: [
    {
      icon: 'lens',
      verb: 'Observar',
      text: 'Acompanhamos como o trabalho acontece de verdade, antes de mudar qualquer coisa.',
    },
    {
      icon: 'cut',
      verb: 'Simplificar',
      text: 'Cortamos o que não precisa existir. Automatizar uma bagunça só a faz andar mais rápido.',
    },
    {
      icon: 'link',
      verb: 'Conectar',
      text: 'Ligamos as ferramentas que você já usa, para os dados andarem sozinhos entre elas.',
    },
    {
      icon: 'gear',
      verb: 'Automatizar',
      text: 'O que sobrou, a máquina faz. Você acompanha em vez de executar.',
    },
  ],
} as const
