import { useTranslation } from 'react-i18next'
import { ShoppingCart } from 'lucide-react'
import styles from './Procurement.module.css'

export function Procurement() {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div className={styles.placeholder}>
        <ShoppingCart size={64} className={styles.icon} />
        <h2>{t('pages.procurement.title')}</h2>
        <p>{t('pages.procurement.description')}</p>
      </div>
    </div>
  )
}
