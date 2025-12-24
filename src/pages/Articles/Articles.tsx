import { useTranslation } from 'react-i18next'
import { Package } from 'lucide-react'
import styles from './Articles.module.css'

export function Articles() {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div className={styles.placeholder}>
        <Package size={64} className={styles.icon} />
        <h2>{t('pages.articles.title')}</h2>
        <p>{t('pages.articles.description')}</p>
      </div>
    </div>
  )
}
