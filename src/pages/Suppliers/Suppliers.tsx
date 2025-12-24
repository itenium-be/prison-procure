import { useTranslation } from 'react-i18next'
import { Truck } from 'lucide-react'
import styles from './Suppliers.module.css'

export function Suppliers() {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div className={styles.placeholder}>
        <Truck size={64} className={styles.icon} />
        <h2>{t('pages.suppliers.title')}</h2>
        <p>{t('pages.suppliers.description')}</p>
      </div>
    </div>
  )
}
