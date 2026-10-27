import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout, ScrollManager } from './components'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { DataDeletionPage, PrivacyPage, TermsPage } from './pages/LegalPages'

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="termos" element={<TermsPage />} />
          <Route path="privacidade" element={<PrivacyPage />} />
          <Route path="exclusao-de-dados" element={<DataDeletionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
