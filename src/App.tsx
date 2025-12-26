import { Routes, Route } from 'react-router-dom'
import { PrisonProvider } from './context/PrisonContext'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Suppliers, SupplierDetail } from './pages/Suppliers'
import { Articles, ArticleDetail } from './pages/Articles'
import { Procurement } from './pages/Procurement'
import { Sales } from './pages/Sales'
import { Stock } from './pages/Stock'
import { Admin, UserManagement } from './pages/Admin'
import { Prisons, PrisonDetail } from './pages/Prisons'

function App() {
  return (
    <PrisonProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="suppliers/:id" element={<SupplierDetail />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="sales" element={<Sales />} />
          <Route path="stock" element={<Stock />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/users" element={<UserManagement />} />
	  <Route path="admin/prisons" element={<Prisons />} />
          <Route path="admin/prisons/:id" element={<PrisonDetail />} />
        </Route>
      </Routes>
    </PrisonProvider>
  )
}

export default App
