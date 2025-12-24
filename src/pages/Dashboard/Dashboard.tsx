import { useTranslation } from 'react-i18next'
import {
  ShoppingCart,
  Truck,
  Package,
  AlertTriangle,
  Plus,
  Eye,
  Users,
} from 'lucide-react'
import { usePrison } from '../../context/PrisonContext'
import styles from './Dashboard.module.css'

const DUMMY_STATS = {
  pendingOrders: 12,
  suppliers: 45,
  articles: 1234,
  lowStock: 8,
}

const DUMMY_RECENT_ORDERS = [
  { id: 'PO-2024-001', supplier: 'Colruyt Group', amount: '€ 2,450.00', status: 'pending', date: '2024-01-15' },
  { id: 'PO-2024-002', supplier: 'Delhaize', amount: '€ 1,875.50', status: 'approved', date: '2024-01-14' },
  { id: 'PO-2024-003', supplier: 'Metro Cash & Carry', amount: '€ 3,200.00', status: 'delivered', date: '2024-01-13' },
  { id: 'PO-2024-004', supplier: 'Makro', amount: '€ 890.25', status: 'pending', date: '2024-01-12' },
  { id: 'PO-2024-005', supplier: 'Sligro', amount: '€ 1,560.75', status: 'approved', date: '2024-01-11' },
]

export function Dashboard() {
  const { t } = useTranslation()
  const { selectedPrison } = usePrison()

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h2>{t('dashboard.welcome')}</h2>
        <p>{t('dashboard.subtitle')}</p>
        {selectedPrison && (
          <p className={styles.prisonInfo}>
            {t(selectedPrison.nameKey)}
          </p>
        )}
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7' }}>
            <ShoppingCart size={24} color="#f59e0b" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{DUMMY_STATS.pendingOrders}</span>
            <span className={styles.statLabel}>{t('dashboard.stats.pendingOrders')}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#dbeafe' }}>
            <Truck size={24} color="#3b82f6" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{DUMMY_STATS.suppliers}</span>
            <span className={styles.statLabel}>{t('dashboard.stats.suppliers')}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#d1fae5' }}>
            <Package size={24} color="#10b981" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{DUMMY_STATS.articles}</span>
            <span className={styles.statLabel}>{t('dashboard.stats.articles')}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fee2e2' }}>
            <AlertTriangle size={24} color="#ef4444" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{DUMMY_STATS.lowStock}</span>
            <span className={styles.statLabel}>{t('dashboard.stats.lowStock')}</span>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.recentOrders}>
          <h3>{t('dashboard.recentOrders')}</h3>
          <div className={styles.ordersTable}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Supplier</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_RECENT_ORDERS.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.supplier}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span className={`${styles.status} ${styles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h3>{t('dashboard.quickActions')}</h3>
          <div className={styles.actionButtons}>
            <button className={styles.actionButton}>
              <Plus size={20} />
              <span>{t('dashboard.newOrder')}</span>
            </button>
            <button className={styles.actionButton}>
              <Eye size={20} />
              <span>{t('dashboard.viewStock')}</span>
            </button>
            <button className={styles.actionButton}>
              <Users size={20} />
              <span>{t('dashboard.manageSuppliers')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
