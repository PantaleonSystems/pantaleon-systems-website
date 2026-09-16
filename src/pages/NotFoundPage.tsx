import { Button } from '../design-system'
import { PageHero } from '../components'
import { useDocumentTitle } from '../hooks'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  useDocumentTitle('Página não encontrada')

  return (
    <PageHero
      eyebrow="Erro 404"
      title="Este estado não foi encontrado"
      lead="A página que você procura não existe ou mudou de endereço. Volte para a Home ou explore os projetos do ecossistema."
    >
      <div className={styles.btns}>
        <Button variant="primary" to="/" arrow>
          Voltar para a Home
        </Button>
        <Button variant="ghost" to="/#projetos">
          Ver projetos
        </Button>
      </div>
    </PageHero>
  )
}
