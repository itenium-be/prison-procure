import { useTranslation } from 'react-i18next'
import { Warehouse } from 'lucide-react'
import styles from './Stock.module.css'

export function Stock() {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div className={styles.placeholder}>
        <Warehouse size={64} className={styles.icon} />
        <h2>{t('pages.stock.title')}</h2>
        <p>{t('pages.stock.description')}</p>
      </div>
    </div>
  )
}
