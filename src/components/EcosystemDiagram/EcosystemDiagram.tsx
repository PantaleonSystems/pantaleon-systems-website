import { Fragment } from 'react'
import { ecosystemLeaves, ecosystemNodes } from '../../data/ecosystem'
import type { EcosystemNode } from '../../types'
import styles from './EcosystemDiagram.module.css'

export interface EcosystemDiagramProps {
  nodes?: EcosystemNode[]
  leaves?: string[]
  className?: string
}

export function EcosystemDiagram({
  nodes = ecosystemNodes,
  leaves = ecosystemLeaves,
  className,
}: EcosystemDiagramProps) {
  return (
    <div className={[styles.map, className].filter(Boolean).join(' ')}>
      {nodes.map((node, index) => (
        <Fragment key={node.title}>
          <div
            className={[styles.node, index === 0 && styles.root]
              .filter(Boolean)
              .join(' ')}
          >
            <h3 className={styles.title}>{node.title}</h3>
            <div className={styles.role}>{node.role}</div>
          </div>
          {node.connector && (
            <div className={styles.connector}>
              <span className={styles.connectorLine} />
              <span className={styles.verb}>{node.connector}</span>
              <span className={styles.connectorLine} />
            </div>
          )}
        </Fragment>
      ))}

      {leaves.length > 0 && (
        <div className={styles.leafRow}>
          {leaves.map((leaf) => (
            <span key={leaf} className={styles.leaf}>
              {leaf}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
