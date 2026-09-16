import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Footer, Header, ScrollManager } from './components'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import IfraNetworkPage from './pages/projects/IfraNetworkPage'
import UsfEnginePage from './pages/projects/UsfEnginePage'
import KhipuPage from './pages/projects/KhipuPage'
import CidadesMilPage from './pages/projects/CidadesMilPage'

function Layout() {
  return (
    <div id="top">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="projetos/ifra-network" element={<IfraNetworkPage />} />
          <Route path="projetos/usf-engine" element={<UsfEnginePage />} />
          <Route path="projetos/khipu" element={<KhipuPage />} />
          <Route path="projetos/cidadesmil" element={<CidadesMilPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
