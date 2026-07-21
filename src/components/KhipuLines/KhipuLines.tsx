import styles from './KhipuLines.module.css'

export type KhipuLinesVariant = 'light' | 'dark'
export type KhipuLinesDensity = 'high' | 'low'

export interface KhipuLinesProps {
  /** light = sobre fundo ivory (usa --gold-khipu); dark = sobre fundo roxo (usa --gold-soft) */
  variant?: KhipuLinesVariant
  /** high = padrão do Hero (4 curvas + 7 nós pulsantes); low = padrão do Manifesto/SimpleWords (3 curvas + nós estáticos opcionais) */
  density?: KhipuLinesDensity
  /** exibe os nós circulares (pulsantes em density="high", estáticos em density="low") */
  nodes?: boolean
  className?: string
}

const HIGH_PATHS = [
  'M-50 180 Q300 140 620 210 T1260 190',
  'M-50 300 Q340 260 700 330 T1260 300',
  'M-50 430 Q320 400 660 460 T1260 440',
  'M-50 540 Q360 510 720 570 T1260 560',
]

const HIGH_NODES: Array<[number, number, number]> = [
  [300, 152, 3.5],
  [620, 205, 4],
  [940, 200, 3],
  [700, 325, 4.5],
  [320, 412, 3.5],
  [880, 445, 4],
  [720, 567, 3.5],
]

const LOW_PATHS = [
  'M-50 120 Q400 90 800 150 T1260 130',
  'M-50 260 Q380 230 760 290 T1260 270',
  'M-50 390 Q420 360 820 410 T1260 400',
]

const LOW_NODES: Array<[number, number, number]> = [
  [400, 102, 3],
  [800, 148, 3.5],
  [760, 288, 3.5],
  [820, 408, 3],
]

export function KhipuLines({
  variant = 'light',
  density = 'high',
  nodes = density === 'high',
  className,
}: KhipuLinesProps) {
  const color = variant === 'dark' ? 'var(--gold-soft)' : 'var(--gold-khipu)'
  const isHigh = density === 'high'
  const paths = isHigh ? HIGH_PATHS : LOW_PATHS
  const nodeList = isHigh ? HIGH_NODES : LOW_NODES
  const viewBoxHeight = isHigh ? 700 : 500

  const classes = [styles.khipu, styles[density], className]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      className={classes}
      viewBox={`0 0 1200 ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth={1} opacity={isHigh ? 0.24 : 0.3}>
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {nodes && (
        <g fill={color} opacity={isHigh ? undefined : 0.8}>
          {nodeList.map(([cx, cy, r], index) =>
            isHigh ? (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={r}
                className={styles.pulse}
                style={{
                  animationDuration: `${3 + (index % 3)}s`,
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ) : (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ),
          )}
        </g>
      )}
    </svg>
  )
}
