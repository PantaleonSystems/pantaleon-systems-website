import { GoldenLine } from '../components/GoldenLine/GoldenLine'
import { useDocumentTitle } from '../hooks'
import { BeforeAfter } from '../sections/BeforeAfter/BeforeAfter'
import { Custom } from '../sections/Custom/Custom'
import { Hero } from '../sections/Hero/Hero'
import { Method } from '../sections/Method/Method'
import { Problem } from '../sections/Problem/Problem'
import { Product } from '../sections/Product/Product'
import { Services } from '../sections/Services/Services'
import { Vision } from '../sections/Vision/Vision'

export default function HomePage() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <div style={{ position: 'relative' }}>
        <GoldenLine />
        <Problem />
        <Vision />
        <Services />
        <BeforeAfter />
        <Method />
        <Product />
        <Custom />
      </div>
    </>
  )
}
