import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, MapPin, Users } from 'lucide-react'
import styles from './PrisonDetail.module.css'

type TabType = 'general' | 'location' | 'capacity'

interface PrisonFormData {
  // General
  code: string
  name: string
  phone: string
  email: string
  blocked: boolean
  // Location
  address: string
  city: string
  postalCode: string
  region: 'flanders' | 'wallonia' | 'brussels'
  // Capacity
  capacity: number
  currentOccupancy: number
  director: string
  directorPhone: string
  directorEmail: string
}

const initialFormData: PrisonFormData = {
  code: '',
  name: '',
  phone: '',
  email: '',
  blocked: false,
  address: '',
  city: '',
  postalCode: '',
  region: 'flanders',
  capacity: 0,
  currentOccupancy: 0,
  director: '',
  directorPhone: '',
  directorEmail: '',
}

// Mock data - in a real app this would come from an API
const mockPrisons: Record<string, PrisonFormData> = {
  '1': {
    code: 'ANT',
    name: 'Gevangenis Antwerpen',
    phone: '+32 3 240 59 11',
    email: 'antwerpen@just.fgov.be',
    blocked: false,
    address: 'Begijnenstraat 42',
    city: 'Antwerpen',
    postalCode: '2000',
    region: 'flanders',
    capacity: 440,
    currentOccupancy: 395,
    director: 'Jan Peeters',
    directorPhone: '+32 3 240 59 00',
    directorEmail: 'jan.peeters@just.fgov.be',
  },
  '2': {
    code: 'BRU',
    name: 'Gevangenis Brugge',
    phone: '+32 50 45 71 11',
    email: 'brugge@just.fgov.be',
    blocked: false,
    address: 'Legeweg 200',
    city: 'Brugge',
    postalCode: '8200',
    region: 'flanders',
    capacity: 630,
    currentOccupancy: 580,
    director: 'Marie Claeys',
    directorPhone: '+32 50 45 71 00',
    directorEmail: 'marie.claeys@just.fgov.be',
  },
  '3': {
    code: 'GNT',
    name: 'Gevangenis Gent',
    phone: '+32 9 234 81 11',
    email: 'gent@just.fgov.be',
    blocked: false,
    address: 'Nieuwewandeling 89',
    city: 'Gent',
    postalCode: '9000',
    region: 'flanders',
    capacity: 290,
    currentOccupancy: 275,
    director: 'Peter De Smet',
    directorPhone: '+32 9 234 81 00',
    directorEmail: 'peter.desmet@just.fgov.be',
  },
  '15': {
    code: 'LAN',
    name: 'Gevangenis Lantin',
    phone: '+32 4 361 91 11',
    email: 'lantin@just.fgov.be',
    blocked: false,
    address: 'Rue de la Limite 2',
    city: 'Lantin',
    postalCode: '4450',
    region: 'wallonia',
    capacity: 650,
    currentOccupancy: 720,
    director: 'Philippe Dubois',
    directorPhone: '+32 4 361 91 00',
    directorEmail: 'philippe.dubois@just.fgov.be',
  },
  '23': {
    code: 'HAR',
    name: 'Gevangenis Haren',
    phone: '+32 2 249 91 11',
    email: 'haren@just.fgov.be',
    blocked: false,
    address: 'Witloofstraat 109',
    city: 'Brussel',
    postalCode: '1130',
    region: 'brussels',
    capacity: 1190,
    currentOccupancy: 850,
    director: 'Sophie Laurent',
    directorPhone: '+32 2 249 91 00',
    directorEmail: 'sophie.laurent@just.fgov.be',
  },
}

export function PrisonDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = id === 'new'

  const [activeTab, setActiveTab] = useState<TabType>('general')
  const [formData, setFormData] = useState<PrisonFormData>(initialFormData)

  useEffect(() => {
    if (!isNew && id) {
      // In a real app, this would be an API call
      const prison = mockPrisons[id]
      if (prison) {
        setFormData(prison)
      }
    }
  }, [id, isNew])

  const tabs = [
    { id: 'general' as TabType, label: t('adminPrisons.tabs.general'), icon: Building2 },
    { id: 'location' as TabType, label: t('adminPrisons.tabs.location'), icon: MapPin },
    { id: 'capacity' as TabType, label: t('adminPrisons.tabs.capacity'), icon: Users },
  ]

  const handleChange = (field: keyof PrisonFormData, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save prison data
    console.log('Saving prison:', formData)
    navigate('/admin/prisons')
  }

  const handleCancel = () => {
    navigate('/admin/prisons')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleCancel}>
          <ArrowLeft size={20} />
          {t('common.back')}
        </button>
        <h1>{isNew ? t('adminPrisons.newPrison') : t('adminPrisons.editPrison')}</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'general' && (
            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.code')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.code}
                  onChange={e => handleChange('code', e.target.value)}
                  placeholder={t('adminPrisons.fields.codePlaceholder')}
                  maxLength={3}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.name')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder={t('adminPrisons.fields.namePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.phone')}</label>
                <input
                  type="tel"
                  className={styles.input}
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder={t('adminPrisons.fields.phonePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.email')}</label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder={t('adminPrisons.fields.emailPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.blocked')}</label>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={formData.blocked}
                    onChange={e => handleChange('blocked', e.target.checked)}
                  />
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {formData.blocked ? t('adminPrisons.fields.blockedYes') : t('adminPrisons.fields.blockedNo')}
                  </span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className={styles.fields}>
              <div className={styles.fieldGroupFull}>
                <label className={styles.label}>{t('adminPrisons.fields.address')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                  placeholder={t('adminPrisons.fields.addressPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.postalCode')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.postalCode}
                  onChange={e => handleChange('postalCode', e.target.value)}
                  placeholder={t('adminPrisons.fields.postalCodePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.city')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.city}
                  onChange={e => handleChange('city', e.target.value)}
                  placeholder={t('adminPrisons.fields.cityPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.region')}</label>
                <select
                  className={styles.select}
                  value={formData.region}
                  onChange={e => handleChange('region', e.target.value)}
                >
                  <option value="flanders">{t('adminPrisons.regions.flanders')}</option>
                  <option value="wallonia">{t('adminPrisons.regions.wallonia')}</option>
                  <option value="brussels">{t('adminPrisons.regions.brussels')}</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'capacity' && (
            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.capacity')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.capacity}
                  onChange={e => handleChange('capacity', parseInt(e.target.value) || 0)}
                  placeholder={t('adminPrisons.fields.capacityPlaceholder')}
                  min={0}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.currentOccupancy')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.currentOccupancy}
                  onChange={e => handleChange('currentOccupancy', parseInt(e.target.value) || 0)}
                  placeholder={t('adminPrisons.fields.currentOccupancyPlaceholder')}
                  min={0}
                />
              </div>

              <div className={styles.fieldGroupFull}>
                <label className={styles.label}>{t('adminPrisons.fields.director')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.director}
                  onChange={e => handleChange('director', e.target.value)}
                  placeholder={t('adminPrisons.fields.directorPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.directorPhone')}</label>
                <input
                  type="tel"
                  className={styles.input}
                  value={formData.directorPhone}
                  onChange={e => handleChange('directorPhone', e.target.value)}
                  placeholder={t('adminPrisons.fields.phonePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('adminPrisons.fields.directorEmail')}</label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.directorEmail}
                  onChange={e => handleChange('directorEmail', e.target.value)}
                  placeholder={t('adminPrisons.fields.emailPlaceholder')}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            {t('common.cancel')}
          </button>
          <button type="submit" className={styles.saveButton}>
            {t('common.save')}
          </button>
        </div>
      </form>
    </div>
  )
}
