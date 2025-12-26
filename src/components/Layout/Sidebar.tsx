import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  Truck,
  Package,
  ShoppingCart,
  Warehouse,
  Settings,
  ArrowUpCircle,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { usePrison, AppMode } from '../../context/PrisonContext'
import styles from './Sidebar.module.css'

interface NavItem {
  path: string
  icon: typeof LayoutDashboard
  labelKey: string
  modes: AppMode[]
}

const navItems: NavItem[] = [
  { path: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard', modes: ['central', 'local'] },
  { path: '/suppliers', icon: Truck, labelKey: 'nav.suppliers', modes: ['central', 'local'] },
  { path: '/articles', icon: Package, labelKey: 'nav.articles', modes: ['central', 'local'] },
  { path: '/procurement', icon: ShoppingCart, labelKey: 'nav.procurement', modes: ['local'] },
  { path: '/sales', icon: ArrowUpCircle, labelKey: 'nav.sales', modes: ['local'] },
  { path: '/stock', icon: Warehouse, labelKey: 'nav.stock', modes: ['local'] },
  { path: '/admin', icon: Settings, labelKey: 'nav.admin', modes: ['central'] },
]

interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  onClose: () => void
  onToggleCollapse: () => void
}

export function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: SidebarProps) {
  const { t } = useTranslation()
  const { mode } = usePrison()

  const filteredNavItems = navItems.filter((item) => item.modes.includes(mode))

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Warehouse size={28} />
        </div>
        {!isCollapsed && <span className={styles.logoText}>PrisonProcure</span>}
      </div>
      <nav className={styles.nav}>
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            end={item.path === '/'}
            onClick={onClose}
            title={isCollapsed ? t(item.labelKey) : undefined}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{t(item.labelKey)}</span>}
          </NavLink>
        ))}
      </nav>
      <div className={styles.footer}>
        <button
          className={styles.collapseButton}
          onClick={onToggleCollapse}
          title={isCollapsed ? t('nav.expand') : t('nav.collapse')}
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          {!isCollapsed && <span>{t('nav.collapse')}</span>}
        </button>
      </div>
    </aside>
  )
}
