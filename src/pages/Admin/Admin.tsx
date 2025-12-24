import { useTranslation } from 'react-i18next'
import { Settings } from 'lucide-react'
import styles from './Admin.module.css'

export function Admin() {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div className={styles.placeholder}>
        <Settings size={64} className={styles.icon} />
        <h2>{t('pages.admin.title')}</h2>
        <p>{t('pages.admin.description')}</p>
      </div>
    </div>
  )
}
