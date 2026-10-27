export const hero = {
  titleLines: ['Diga não', 'ao manual.'],
  title: 'Diga não ao manual.',
  subtitle:
    'A Pantaleon Systems cria sistemas que conectam suas ferramentas e automatizam o trabalho repetitivo, para você e sua equipe cuidarem do que realmente importa.',
  primaryCta: 'Conhecer nosso primeiro produto',
  secondaryCta: 'Falar com a gente',
} as const

/** Linha reta final (viewBox 1200x500). */
export const LINE_D = 'M80 250H1120'

/** Emaranhado inicial: mesma origem e destino da linha. */
export const SCRIBBLE_D =
  'M80 250C200 40 260 460 330 250S330 60 420 330S520 40 560 300S650 420 700 160S800 460 860 220S940 60 1000 300S1080 330 1120 250'

/** Quatro tarefas manuais que viram nós da linha. x = posição final; scatter = posição solta. */
export const nodes = [
  { kind: 'sheet', x: 250, scatter: { x: 170, y: 120, r: -24 } },
  { kind: 'message', x: 480, scatter: { x: 430, y: 385, r: 18 } },
  { kind: 'copy', x: 720, scatter: { x: 700, y: 110, r: 30 } },
  { kind: 'arrow', x: 950, scatter: { x: 1010, y: 380, r: -16 } },
] as const
