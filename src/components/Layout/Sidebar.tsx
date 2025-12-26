import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  Truck,
  Package,
  ShoppingCart,
  ArrowUpCircle,
  Warehouse,
  Settings,
} from 'lucide-react'
import styles from './Sidebar.module.css'

const navItems = [
  { path: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { path: '/suppliers', icon: Truck, labelKey: 'nav.suppliers' },
  { path: '/articles', icon: Package, labelKey: 'nav.articles' },
  { path: '/procurement', icon: ShoppingCart, labelKey: 'nav.procurement' },
  { path: '/sales', icon: ArrowUpCircle, labelKey: 'nav.sales' },
  { path: '/stock', icon: Warehouse, labelKey: 'nav.stock' },
  { path: '/admin', icon: Settings, labelKey: 'nav.admin' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation()

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Warehouse size={28} />
        </div>
        <span className={styles.logoText}>PrisonProcure</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            end={item.path === '/'}
            onClick={onClose}
          >
            <item.icon size={20} />
            <span>{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.footer}>
        <p>POC v0.1.0</p>
      </div>
    </aside>
  )
}
