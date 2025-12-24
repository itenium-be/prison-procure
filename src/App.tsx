import { Routes, Route } from 'react-router-dom'
import { PrisonProvider } from './context/PrisonContext'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Suppliers } from './pages/Suppliers'
import { Articles } from './pages/Articles'
import { Procurement } from './pages/Procurement'
import { Stock } from './pages/Stock'
import { Admin } from './pages/Admin'

function App() {
  return (
    <PrisonProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="articles" element={<Articles />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="stock" element={<Stock />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </PrisonProvider>
  )
}

export default App
