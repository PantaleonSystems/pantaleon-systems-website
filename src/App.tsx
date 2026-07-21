import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Footer, Header } from './components'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import IfraNetworkPage from './pages/projects/IfraNetworkPage'
import UsfEnginePage from './pages/projects/UsfEnginePage'
import KhipuPage from './pages/projects/KhipuPage'
import CidadesMilPage from './pages/projects/CidadesMilPage'
// TEMPORÁRIO — remover junto com a rota /_ds abaixo (ver src/pages/DesignSystemGalleryPage.tsx)
import DesignSystemGalleryPage from './pages/DesignSystemGalleryPage'
// TEMPORÁRIO — remover junto com a rota /_layout-test abaixo (ver src/pages/LayoutPreviewPage.tsx)
import LayoutPreviewPage from './pages/LayoutPreviewPage'

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
      <Routes>
        {/* TEMPORÁRIO — remover esta rota junto com DesignSystemGalleryPage.tsx */}
        <Route path="_ds" element={<DesignSystemGalleryPage />} />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="projetos/ifra-network" element={<IfraNetworkPage />} />
          <Route path="projetos/usf-engine" element={<UsfEnginePage />} />
          <Route path="projetos/khipu" element={<KhipuPage />} />
          <Route path="projetos/cidadesmil" element={<CidadesMilPage />} />
          {/* TEMPORÁRIO — remover junto com LayoutPreviewPage.tsx */}
          <Route path="_layout-test" element={<LayoutPreviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
