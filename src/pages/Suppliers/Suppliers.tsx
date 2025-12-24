import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Ban, CheckCircle, Power } from 'lucide-react'
import styles from './Suppliers.module.css'

interface Supplier {
  id: string
  code: string
  name: string
  email: string
  phone: string
  blocked: boolean
  activeForLocal: boolean
}

// Mock data for demonstration
const mockSuppliers: Supplier[] = [
  { id: '1', code: 'SUP001', name: 'Acme Foods NV', email: 'info@acmefoods.be', phone: '+32 2 123 45 67', blocked: false, activeForLocal: true },
  { id: '2', code: 'SUP002', name: 'Belgian Supplies BVBA', email: 'contact@belsupplies.be', phone: '+32 3 234 56 78', blocked: false, activeForLocal: false },
  { id: '3', code: 'SUP003', name: 'Euro Logistics SA', email: 'orders@eurologistics.eu', phone: '+32 4 345 67 89', blocked: true, activeForLocal: false },
  { id: '4', code: 'SUP004', name: 'Fresh Products BV', email: 'sales@freshproducts.nl', phone: '+31 20 456 78 90', blocked: false, activeForLocal: true },
]

export function Suppliers() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)

  const handleEdit = (id: string) => {
    navigate(`/suppliers/${id}`)
  }

  const handleToggleBlock = (id: string) => {
    setSuppliers(prev =>
      prev.map(s => (s.id === id ? { ...s, blocked: !s.blocked } : s))
    )
  }

  const handleToggleActive = (id: string) => {
    setSuppliers(prev =>
      prev.map(s => (s.id === id ? { ...s, activeForLocal: !s.activeForLocal } : s))
    )
  }

  const handleAddNew = () => {
    navigate('/suppliers/new')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{t('pages.suppliers.title')}</h1>
          <p className={styles.subtitle}>{t('pages.suppliers.description')}</p>
        </div>
        <button className={styles.addButton} onClick={handleAddNew}>
          <Plus size={20} />
          {t('suppliers.addNew')}
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('suppliers.fields.code')}</th>
              <th>{t('suppliers.fields.name')}</th>
              <th>{t('suppliers.fields.email')}</th>
              <th>{t('suppliers.fields.phone')}</th>
              <th>{t('suppliers.status')}</th>
              <th>{t('suppliers.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id} className={supplier.blocked ? styles.blockedRow : ''}>
                <td className={styles.code}>{supplier.code}</td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>
                  <div className={styles.statusBadges}>
                    {supplier.blocked && (
                      <span className={`${styles.badge} ${styles.blocked}`}>
                        {t('suppliers.blocked')}
                      </span>
                    )}
                    {supplier.activeForLocal ? (
                      <span className={`${styles.badge} ${styles.active}`}>
                        {t('suppliers.activeLocal')}
                      </span>
                    ) : (
                      <span className={`${styles.badge} ${styles.inactive}`}>
                        {t('suppliers.inactiveLocal')}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEdit(supplier.id)}
                      title={t('common.edit')}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${supplier.blocked ? styles.unblock : styles.block}`}
                      onClick={() => handleToggleBlock(supplier.id)}
                      title={supplier.blocked ? t('suppliers.unblock') : t('suppliers.block')}
                    >
                      {supplier.blocked ? <CheckCircle size={16} /> : <Ban size={16} />}
                    </button>
                    <button
                      className={`${styles.actionButton} ${supplier.activeForLocal ? styles.deactivate : styles.activate}`}
                      onClick={() => handleToggleActive(supplier.id)}
                      title={supplier.activeForLocal ? t('suppliers.deactivateLocal') : t('suppliers.activateLocal')}
                    >
                      <Power size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
