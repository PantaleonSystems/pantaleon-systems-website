import { Eyebrow } from '../../design-system'
import { KhipuLines, Reveal } from '../../components'
import { simpleWordsQuestions } from '../../data/simpleWords'
import styles from './SimpleWords.module.css'

export function SimpleWords() {
  return (
    <section className={styles.simple}>
      <KhipuLines variant="dark" density="low" className={styles.khipuBg} />
      <div className={`wrap ${styles.content}`}>
        <Eyebrow variant="dark">Em palavras simples</Eyebrow>
        <p className={styles.lead}>
          Em um mundo onde IAs, sensores e redes tomam decisões, alguém
          precisa validar se os dados são confiáveis, se as ações fazem
          sentido e se o estado final pode ser{' '}
          <span className={styles.gold}>auditado.</span>
        </p>
        <Reveal stagger className={styles.grid}>
          {simpleWordsQuestions.map((item) => (
            <div className={styles.card} key={item.number}>
              <div className={styles.qn}>{item.number}</div>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
