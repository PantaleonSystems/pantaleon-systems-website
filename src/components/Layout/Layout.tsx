import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Smoother } from '../Smoother/Smoother'

export function Layout() {
  return (
    <>
      <Smoother />
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
