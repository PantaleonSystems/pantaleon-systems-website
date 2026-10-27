import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks'
import type { LegalDoc } from '../data/legal'
import styles from './Page.module.css'

export function LegalPage({ doc }: { doc: LegalDoc }) {
  useDocumentTitle(doc.title)

  return (
    <article className={`wrap ${styles.page}`}>
      <Link to="/" className={styles.back}>
        ← Voltar ao início
      </Link>
      <h1 className={styles.title}>{doc.title}</h1>
      <p className={styles.intro}>{doc.intro}</p>
      <p className={styles.updated}>Atualizado em {doc.updated}</p>
      {doc.sections.map((section) => (
        <section key={section.heading} className={styles.block}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </section>
      ))}
    </article>
  )
}
