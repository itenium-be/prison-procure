import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Users, Building2 } from 'lucide-react'
import styles from './Admin.module.css'

export function Admin() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const tiles = [
    {
      id: 'users',
      icon: Users,
      title: t('admin.tiles.userManagement'),
      description: t('admin.tiles.userManagementDesc'),
      path: '/admin/users',
    },
    {
      id: 'prisons',
      icon: Building2,
      title: t('admin.tiles.prisonManagement'),
      description: t('admin.tiles.prisonManagementDesc'),
      path: '/admin/prisons',
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{t('admin.title')}</h1>
        <p>{t('admin.description')}</p>
      </div>

      <div className={styles.tilesGrid}>
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className={styles.tile}
            onClick={() => navigate(tile.path)}
          >
            <div className={styles.tileIcon}>
              <tile.icon size={32} />
            </div>
            <h3>{tile.title}</h3>
            <p>{tile.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
