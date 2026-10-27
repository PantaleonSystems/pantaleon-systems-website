import { buttonClasses } from '../design-system'
import { useDocumentTitle } from '../hooks'
import { HashLink } from '../components/HashLink/HashLink'
import { Link } from 'react-router-dom'
import styles from './Page.module.css'

export default function NotFoundPage() {
  useDocumentTitle('Página não encontrada')

  return (
    <div className={`wrap ${styles.page} ${styles.center}`}>
      <p className={styles.code}>Erro 404</p>
      <h1 className={styles.title}>Esta página não está aqui.</h1>
      <p className={styles.intro}>O endereço pode ter mudado ou nunca ter existido.</p>
      <Link to="/" className={buttonClasses('dark')} data-press>
        Voltar ao início
      </Link>
      <HashLink hash="produto" className={styles.back}>
        Ou conheça o nosso primeiro produto
      </HashLink>
    </div>
  )
}
