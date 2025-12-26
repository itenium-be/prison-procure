import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Ban, CheckCircle } from 'lucide-react'
import styles from './Prisons.module.css'

interface Prison {
  id: string
  code: string
  name: string
  city: string
  region: 'flanders' | 'wallonia' | 'brussels'
  capacity: number
  phone: string
  blocked: boolean
}

// Mock data for demonstration
const mockPrisons: Prison[] = [
  { id: '1', code: 'ANT', name: 'Gevangenis Antwerpen', city: 'Antwerpen', region: 'flanders', capacity: 440, phone: '+32 3 240 59 11', blocked: false },
  { id: '2', code: 'BRU', name: 'Gevangenis Brugge', city: 'Brugge', region: 'flanders', capacity: 630, phone: '+32 50 45 71 11', blocked: false },
  { id: '3', code: 'GNT', name: 'Gevangenis Gent', city: 'Gent', region: 'flanders', capacity: 290, phone: '+32 9 234 81 11', blocked: false },
  { id: '4', code: 'LEU', name: 'Gevangenis Leuven Centraal', city: 'Leuven', region: 'flanders', capacity: 300, phone: '+32 16 31 82 11', blocked: false },
  { id: '5', code: 'MEC', name: 'Gevangenis Mechelen', city: 'Mechelen', region: 'flanders', capacity: 130, phone: '+32 15 28 62 11', blocked: false },
  { id: '6', code: 'HAS', name: 'Gevangenis Hasselt', city: 'Hasselt', region: 'flanders', capacity: 450, phone: '+32 11 28 88 11', blocked: false },
  { id: '7', code: 'TON', name: 'Gevangenis Tongeren', city: 'Tongeren', region: 'flanders', capacity: 165, phone: '+32 12 39 01 11', blocked: false },
  { id: '8', code: 'TUR', name: 'Gevangenis Turnhout', city: 'Turnhout', region: 'flanders', capacity: 162, phone: '+32 14 44 78 11', blocked: false },
  { id: '9', code: 'DEN', name: 'Gevangenis Dendermonde', city: 'Dendermonde', region: 'flanders', capacity: 180, phone: '+32 52 25 98 11', blocked: false },
  { id: '10', code: 'OUD', name: 'Gevangenis Oudenaarde', city: 'Oudenaarde', region: 'flanders', capacity: 145, phone: '+32 55 33 99 11', blocked: false },
  { id: '11', code: 'IEP', name: 'Gevangenis Ieper', city: 'Ieper', region: 'flanders', capacity: 62, phone: '+32 57 22 88 11', blocked: true },
  { id: '12', code: 'BER', name: 'Gevangenis Berkendael', city: 'Brussel', region: 'brussels', capacity: 120, phone: '+32 2 349 31 11', blocked: false },
  { id: '13', code: 'VOR', name: 'Gevangenis Vorst', city: 'Brussel', region: 'brussels', capacity: 400, phone: '+32 2 348 51 11', blocked: false },
  { id: '14', code: 'SGI', name: 'Gevangenis Sint-Gillis', city: 'Brussel', region: 'brussels', capacity: 850, phone: '+32 2 543 81 11', blocked: false },
  { id: '15', code: 'LAN', name: 'Gevangenis Lantin', city: 'Lantin', region: 'wallonia', capacity: 650, phone: '+32 4 361 91 11', blocked: false },
  { id: '16', code: 'MAR', name: 'Gevangenis Marche-en-Famenne', city: 'Marche-en-Famenne', region: 'wallonia', capacity: 312, phone: '+32 84 32 04 11', blocked: false },
  { id: '17', code: 'NAM', name: 'Gevangenis Namen', city: 'Namen', region: 'wallonia', capacity: 150, phone: '+32 81 72 51 11', blocked: false },
  { id: '18', code: 'MON', name: 'Gevangenis Bergen', city: 'Bergen', region: 'wallonia', capacity: 350, phone: '+32 65 40 11 11', blocked: false },
  { id: '19', code: 'JAM', name: 'Gevangenis Jamioulx', city: 'Jamioulx', region: 'wallonia', capacity: 205, phone: '+32 71 27 81 11', blocked: false },
  { id: '20', code: 'ARL', name: 'Gevangenis Aarlen', city: 'Aarlen', region: 'wallonia', capacity: 110, phone: '+32 63 24 01 11', blocked: false },
  { id: '21', code: 'DIN', name: 'Gevangenis Dinant', city: 'Dinant', region: 'wallonia', capacity: 56, phone: '+32 82 22 81 11', blocked: true },
  { id: '22', code: 'VER', name: 'Gevangenis Verviers', city: 'Verviers', region: 'wallonia', capacity: 95, phone: '+32 87 32 21 11', blocked: false },
  { id: '23', code: 'HAR', name: 'Gevangenis Haren', city: 'Brussel', region: 'brussels', capacity: 1190, phone: '+32 2 249 91 11', blocked: false },
]

export function Prisons() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [prisons, setPrisons] = useState<Prison[]>(mockPrisons)

  const handleEdit = (id: string) => {
    navigate(`/admin/prisons/${id}`)
  }

  const handleToggleBlock = (id: string) => {
    setPrisons(prev =>
      prev.map(p => (p.id === id ? { ...p, blocked: !p.blocked } : p))
    )
  }

  const handleAddNew = () => {
    navigate('/admin/prisons/new')
  }

  const getRegionLabel = (region: string) => {
    return t(`adminPrisons.regions.${region}`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{t('adminPrisons.title')}</h1>
          <p className={styles.subtitle}>{t('adminPrisons.description')}</p>
        </div>
        <button className={styles.addButton} onClick={handleAddNew}>
          <Plus size={20} />
          {t('adminPrisons.addNew')}
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('adminPrisons.fields.code')}</th>
              <th>{t('adminPrisons.fields.name')}</th>
              <th>{t('adminPrisons.fields.city')}</th>
              <th>{t('adminPrisons.fields.region')}</th>
              <th>{t('adminPrisons.fields.capacity')}</th>
              <th>{t('adminPrisons.fields.phone')}</th>
              <th>{t('adminPrisons.status')}</th>
              <th>{t('adminPrisons.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {prisons.map(prison => (
              <tr key={prison.id} className={prison.blocked ? styles.blockedRow : ''}>
                <td>
                  <button
                    className={styles.codeLink}
                    onClick={() => handleEdit(prison.id)}
                  >
                    {prison.code}
                  </button>
                </td>
                <td>{prison.name}</td>
                <td>{prison.city}</td>
                <td>
                  <span className={`${styles.regionBadge} ${styles[prison.region]}`}>
                    {getRegionLabel(prison.region)}
                  </span>
                </td>
                <td>{prison.capacity}</td>
                <td><a href={`tel:${prison.phone}`} className={styles.link}>{prison.phone}</a></td>
                <td>
                  <div className={styles.statusBadges}>
                    {prison.blocked ? (
                      <span className={`${styles.badge} ${styles.blocked}`}>
                        {t('adminPrisons.blocked')}
                      </span>
                    ) : (
                      <span className={`${styles.badge} ${styles.active}`}>
                        {t('adminPrisons.active')}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEdit(prison.id)}
                      title={t('common.edit')}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${prison.blocked ? styles.unblock : styles.block}`}
                      onClick={() => handleToggleBlock(prison.id)}
                      title={prison.blocked ? t('adminPrisons.unblock') : t('adminPrisons.block')}
                    >
                      {prison.blocked ? <CheckCircle size={16} /> : <Ban size={16} />}
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
