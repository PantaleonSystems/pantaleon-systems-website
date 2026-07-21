import logo from '../../assets/logo.png'
import styles from './OrbitVisual.module.css'

interface OrbitNode {
  key: string
  label: string
  cx: number
  cy: number
  labelTop: string
  labelLeft: string
}

const CENTER = 200

const NODES: OrbitNode[] = [
  { key: 'agentes', label: 'Agentes', cx: 200, cy: 50, labelTop: '6%', labelLeft: '50%' },
  { key: 'estados', label: 'Estados', cx: 350, cy: 200, labelTop: '50%', labelLeft: '94%' },
  { key: 'provas', label: 'Provas', cx: 200, cy: 350, labelTop: '94%', labelLeft: '50%' },
  { key: 'dados', label: 'Dados', cx: 50, cy: 200, labelTop: '50%', labelLeft: '6%' },
]

export interface OrbitVisualProps {
  className?: string
}

export function OrbitVisual({ className }: OrbitVisualProps) {
  const classes = [styles.orbit, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <svg viewBox="0 0 400 400" aria-hidden="true">
        <g fill="none" stroke="var(--border)" strokeWidth={1}>
          <circle cx={CENTER} cy={CENTER} r={150} strokeDasharray="2 6" opacity={0.7} />
          <circle cx={CENTER} cy={CENTER} r={150} stroke="rgba(200,155,60,0.25)" />
        </g>
        <g stroke="var(--gold-khipu)" strokeWidth={1.2} opacity={0.55}>
          {NODES.map((node) => (
            <line key={node.key} x1={CENTER} y1={CENTER} x2={node.cx} y2={node.cy} />
          ))}
        </g>
        <g fill="var(--gold-khipu)">
          {NODES.map((node, index) => (
            <circle
              key={node.key}
              className={styles.node}
              cx={node.cx}
              cy={node.cy}
              r={6}
              style={{
                animationDuration: `${2.6 + index * 0.4}s`,
                animationDelay: `${index * 0.3}s`,
              }}
            />
          ))}
        </g>
      </svg>
      <img className={styles.logo} src={logo} alt="Pantaleon Systems" />
      {NODES.map((node) => (
        <span
          key={node.key}
          className={styles.label}
          style={{ top: node.labelTop, left: node.labelLeft }}
        >
          {node.label}
        </span>
      ))}
    </div>
  )
}
