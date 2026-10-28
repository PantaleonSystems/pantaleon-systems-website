export const hero = {
  titleLines: ['Diga não', 'ao manual.'],
  title: 'Diga não ao manual.',
  subtitle:
    'A Pantaleon Systems cria sistemas que conectam suas ferramentas e automatizam o trabalho repetitivo, para você e sua equipe cuidarem do que realmente importa.',
  primaryCta: 'Conhecer nosso primeiro produto',
  secondaryCta: 'Falar com a gente',
  artLabel:
    'Um emaranhado de tarefas soltas vira uma linha reta que liga planilha, mensagens, cadastros e pedidos à marca da Pantaleon Systems.',
} as const

export type NodeKind = 'sheet' | 'message' | 'copy' | 'arrow'

export interface HeroNode {
  kind: NodeKind
  label: string
  x: number
  y: number
  /** posição solta (início da animação) */
  scatter: { x: number; y: number; r: number }
}

export interface HeroLayout {
  viewBox: string
  /** retângulo do viewBox, para posicionar a logo em % */
  box: { x: number; y: number; w: number; h: number }
  start: [number, number]
  lineD: string
  scribbleD: string
  logo: { cx: number; cy: number; r: number }
  /** raio do selo de cada nó (os ícones têm 28 de referência) */
  nr: number
  /** rótulo: onde fica em relação ao nó */
  labelSide: 'below' | 'right'
  nodes: HeroNode[]
}

/** Tela larga: linha horizontal terminando na logo, à direita. */
export const wide: HeroLayout = {
  viewBox: '0 85 1200 330',
  box: { x: 0, y: 85, w: 1200, h: 330 },
  start: [60, 250],
  lineD: 'M60 250H935',
  scribbleD:
    'M60 250C190 40 250 460 330 250S330 60 420 330S520 40 560 300S650 420 700 160S800 460 860 220S900 100 935 250',
  logo: { cx: 1030, cy: 250, r: 105 },
  nr: 28,
  labelSide: 'below',
  nodes: [
    { kind: 'sheet', label: 'Planilha', x: 220, y: 250, scatter: { x: 170, y: 130, r: -24 } },
    { kind: 'message', label: 'Mensagens', x: 420, y: 250, scatter: { x: 430, y: 370, r: 18 } },
    { kind: 'copy', label: 'Cadastros', x: 620, y: 250, scatter: { x: 700, y: 120, r: 30 } },
    { kind: 'arrow', label: 'Pedidos', x: 820, y: 250, scatter: { x: 880, y: 370, r: -16 } },
  ],
}

/** Celular: linha vertical à esquerda que curva para a logo, embaixo à direita. */
export const tall: HeroLayout = {
  viewBox: '0 0 340 330',
  box: { x: 0, y: 0, w: 340, h: 330 },
  start: [44, 16],
  lineD: 'M44 16V222C44 262 130 266 214 246',
  scribbleD: 'M44 16C150 20 -20 80 120 100S10 170 160 150S30 250 110 230S200 200 214 246',
  logo: { cx: 262, cy: 206, r: 64 },
  nr: 20,
  labelSide: 'right',
  nodes: [
    { kind: 'sheet', label: 'Planilha', x: 44, y: 50, scatter: { x: 230, y: 40, r: -24 } },
    { kind: 'message', label: 'Mensagens', x: 44, y: 104, scatter: { x: 150, y: 120, r: 18 } },
    { kind: 'copy', label: 'Cadastros', x: 44, y: 158, scatter: { x: 290, y: 100, r: 30 } },
    { kind: 'arrow', label: 'Pedidos', x: 44, y: 212, scatter: { x: 110, y: 290, r: -16 } },
  ],
}
