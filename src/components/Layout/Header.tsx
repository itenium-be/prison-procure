import { useTranslation } from 'react-i18next'
import { Building2, Globe, User, Menu } from 'lucide-react'
import { usePrison } from '../../context/PrisonContext'
import styles from './Header.module.css'

const LANGUAGES = [
  { code: 'nl', label: 'NL' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
]

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const { selectedPrison, setSelectedPrison, prisons } = usePrison()

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h1 className={styles.pageTitle}>{t('dashboard.title')}</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.selector}>
          <Building2 size={18} className={styles.selectorIcon} />
          <select
            value={selectedPrison?.id || ''}
            onChange={(e) => {
              const prison = prisons.find((p) => p.id === e.target.value)
              setSelectedPrison(prison || null)
            }}
            className={styles.select}
          >
            {prisons.map((prison) => (
              <option key={prison.id} value={prison.id}>
                {t(prison.nameKey)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.languageSelector}>
          <Globe size={18} className={styles.selectorIcon} />
          <div className={styles.languageButtons}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`${styles.langButton} ${
                  i18n.language === lang.code ? styles.activeLang : ''
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.userMenu}>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  )
}
