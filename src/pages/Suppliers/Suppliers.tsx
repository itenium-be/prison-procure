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
  { id: '1', code: 'SUP001', name: 'Colruyt Group NV', email: 'info@colruytgroup.com', phone: '+32 2 363 55 45', blocked: false, activeForLocal: true },
  { id: '2', code: 'SUP002', name: 'Delhaize Belgium NV', email: 'contact@delhaize.be', phone: '+32 2 412 21 11', blocked: false, activeForLocal: true },
  { id: '3', code: 'SUP003', name: 'Metro Cash & Carry Belgium', email: 'orders@metro.be', phone: '+32 2 412 81 11', blocked: false, activeForLocal: true },
  { id: '4', code: 'SUP004', name: 'Makro Belgium NV', email: 'service@makro.be', phone: '+32 3 247 21 11', blocked: false, activeForLocal: false },
  { id: '5', code: 'SUP005', name: 'Sligro Food Group Belgium', email: 'belgium@sligro.com', phone: '+32 14 25 87 00', blocked: true, activeForLocal: false },
  { id: '6', code: 'SUP006', name: 'Carrefour Belgium SA', email: 'info@carrefour.be', phone: '+32 2 729 21 11', blocked: false, activeForLocal: true },
  { id: '7', code: 'SUP007', name: 'Java Foodservice NV', email: 'order@java.be', phone: '+32 2 481 68 00', blocked: false, activeForLocal: true },
  { id: '8', code: 'SUP008', name: 'Bidfood Belgium NV', email: 'info@bidfood.be', phone: '+32 15 28 85 11', blocked: false, activeForLocal: false },
  { id: '9', code: 'SUP009', name: 'Pomona Benelux SA', email: 'contact@pomona.be', phone: '+32 2 468 12 00', blocked: false, activeForLocal: true },
  { id: '10', code: 'SUP010', name: 'Brake Belgium NV', email: 'service@brake.be', phone: '+32 2 334 56 00', blocked: false, activeForLocal: true },
  { id: '11', code: 'SUP011', name: 'Lambrechts NV', email: 'info@lambrechts.be', phone: '+32 3 449 22 11', blocked: false, activeForLocal: false },
  { id: '12', code: 'SUP012', name: 'Solucious NV', email: 'order@solucious.be', phone: '+32 2 363 52 00', blocked: false, activeForLocal: true },
  { id: '13', code: 'SUP013', name: 'Transgourmet Belgium SA', email: 'contact@transgourmet.be', phone: '+32 10 47 84 00', blocked: false, activeForLocal: true },
  { id: '14', code: 'SUP014', name: 'Van Zon Fresh Food BV', email: 'sales@vanzon.be', phone: '+32 14 72 08 00', blocked: false, activeForLocal: false },
  { id: '15', code: 'SUP015', name: 'Delifrance Belgium NV', email: 'order@delifrance.be', phone: '+32 2 478 91 00', blocked: true, activeForLocal: false },
  { id: '16', code: 'SUP016', name: 'Hanos Belgium NV', email: 'info@hanos.be', phone: '+32 11 26 93 00', blocked: false, activeForLocal: true },
  { id: '17', code: 'SUP017', name: 'Ardo NV', email: 'sales@ardo.com', phone: '+32 51 30 91 11', blocked: false, activeForLocal: true },
  { id: '18', code: 'SUP018', name: 'Agristo NV', email: 'info@agristo.com', phone: '+32 56 62 71 11', blocked: false, activeForLocal: false },
  { id: '19', code: 'SUP019', name: 'Ter Beke NV', email: 'contact@terbeke.com', phone: '+32 9 272 81 00', blocked: false, activeForLocal: true },
  { id: '20', code: 'SUP020', name: 'Lotus Bakeries NV', email: 'info@lotusbakeries.com', phone: '+32 9 376 26 11', blocked: false, activeForLocal: true },
  { id: '21', code: 'SUP021', name: 'Vandemoortele NV', email: 'order@vandemoortele.com', phone: '+32 9 239 47 11', blocked: false, activeForLocal: true },
  { id: '22', code: 'SUP022', name: 'Greenyard Fresh Belgium', email: 'fresh@greenyard.group', phone: '+32 15 32 42 00', blocked: false, activeForLocal: false },
  { id: '23', code: 'SUP023', name: 'Pidy Belgium NV', email: 'sales@pidy.be', phone: '+32 56 35 20 20', blocked: false, activeForLocal: true },
  { id: '24', code: 'SUP024', name: 'Imperial Meat Products NV', email: 'info@imperial.be', phone: '+32 3 543 85 11', blocked: true, activeForLocal: false },
  { id: '25', code: 'SUP025', name: 'Puratos Group NV', email: 'contact@puratos.com', phone: '+32 2 481 44 44', blocked: false, activeForLocal: true },
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
              <th className={styles.hideOnLarge}>{t('suppliers.fields.email')}</th>
              <th className={styles.hideOnMedium}>{t('suppliers.fields.phone')}</th>
              <th>{t('suppliers.status')}</th>
              <th>{t('suppliers.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id} className={supplier.blocked ? styles.blockedRow : ''}>
                <td>
                  <button
                    className={styles.codeLink}
                    onClick={() => handleEdit(supplier.id)}
                  >
                    {supplier.code}
                  </button>
                </td>
                <td>{supplier.name}</td>
                <td className={styles.hideOnLarge}><a href={`mailto:${supplier.email}`} className={styles.link}>{supplier.email}</a></td>
                <td className={styles.hideOnMedium}><a href={`tel:${supplier.phone}`} className={styles.link}>{supplier.phone}</a></td>
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
