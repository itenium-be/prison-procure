import { useTranslation } from 'react-i18next'
import { ArrowUpCircle } from 'lucide-react'
import styles from './Sales.module.css'

export function Sales() {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div className={styles.placeholder}>
        <ArrowUpCircle size={64} className={styles.icon} />
        <h2>{t('pages.sales.title')}</h2>
        <p>{t('pages.sales.description')}</p>
      </div>
    </div>
  )
}
