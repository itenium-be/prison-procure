import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, CreditCard, Truck } from 'lucide-react'
import styles from './SupplierDetail.module.css'

type TabType = 'general' | 'financial' | 'logistics'

interface SupplierFormData {
  // General
  code: string
  name: string
  address: string
  phone: string
  email: string
  language: string
  blocked: boolean
  // Financial
  vatNumber: string
  iban: string
  bic: string
  paymentTerms: string
  currency: string
  // Logistics
  contactPerson: string
  contactPhone: string
  contactEmail: string
  openingHours: string
  closingDays: string
}

const initialFormData: SupplierFormData = {
  code: '',
  name: '',
  address: '',
  phone: '',
  email: '',
  language: 'nl',
  blocked: false,
  vatNumber: '',
  iban: '',
  bic: '',
  paymentTerms: '30',
  currency: 'EUR',
  contactPerson: '',
  contactPhone: '',
  contactEmail: '',
  openingHours: '',
  closingDays: '',
}

export function SupplierDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = id === 'new'

  const [activeTab, setActiveTab] = useState<TabType>('general')
  const [formData, setFormData] = useState<SupplierFormData>(initialFormData)

  const tabs = [
    { id: 'general' as TabType, label: t('suppliers.tabs.general'), icon: Building2 },
    { id: 'financial' as TabType, label: t('suppliers.tabs.financial'), icon: CreditCard },
    { id: 'logistics' as TabType, label: t('suppliers.tabs.logistics'), icon: Truck },
  ]

  const handleChange = (field: keyof SupplierFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save supplier data
    console.log('Saving supplier:', formData)
    navigate('/suppliers')
  }

  const handleCancel = () => {
    navigate('/suppliers')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleCancel}>
          <ArrowLeft size={20} />
          {t('common.back')}
        </button>
        <h1>{isNew ? t('suppliers.newSupplier') : t('suppliers.editSupplier')}</h1>
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
                <label className={styles.label}>{t('suppliers.fields.code')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.code}
                  onChange={e => handleChange('code', e.target.value)}
                  placeholder={t('suppliers.fields.codePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.name')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder={t('suppliers.fields.namePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroupFull}>
                <label className={styles.label}>{t('suppliers.fields.address')}</label>
                <textarea
                  className={styles.textarea}
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                  placeholder={t('suppliers.fields.addressPlaceholder')}
                  rows={3}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.phone')}</label>
                <input
                  type="tel"
                  className={styles.input}
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder={t('suppliers.fields.phonePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.email')}</label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder={t('suppliers.fields.emailPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.language')}</label>
                <select
                  className={styles.select}
                  value={formData.language}
                  onChange={e => handleChange('language', e.target.value)}
                >
                  <option value="nl">{t('languages.nl')}</option>
                  <option value="fr">{t('languages.fr')}</option>
                  <option value="de">{t('languages.de')}</option>
                  <option value="en">{t('languages.en')}</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.blocked')}</label>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={formData.blocked}
                    onChange={e => handleChange('blocked', e.target.checked)}
                  />
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {formData.blocked ? t('suppliers.fields.blockedYes') : t('suppliers.fields.blockedNo')}
                  </span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.vatNumber')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.vatNumber}
                  onChange={e => handleChange('vatNumber', e.target.value)}
                  placeholder={t('suppliers.fields.vatNumberPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.iban')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.iban}
                  onChange={e => handleChange('iban', e.target.value)}
                  placeholder={t('suppliers.fields.ibanPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.bic')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.bic}
                  onChange={e => handleChange('bic', e.target.value)}
                  placeholder={t('suppliers.fields.bicPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.paymentTerms')}</label>
                <select
                  className={styles.select}
                  value={formData.paymentTerms}
                  onChange={e => handleChange('paymentTerms', e.target.value)}
                >
                  <option value="0">{t('suppliers.fields.paymentTermsImmediate')}</option>
                  <option value="14">14 {t('suppliers.fields.days')}</option>
                  <option value="30">30 {t('suppliers.fields.days')}</option>
                  <option value="45">45 {t('suppliers.fields.days')}</option>
                  <option value="60">60 {t('suppliers.fields.days')}</option>
                  <option value="90">90 {t('suppliers.fields.days')}</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.currency')}</label>
                <select
                  className={styles.select}
                  value={formData.currency}
                  onChange={e => handleChange('currency', e.target.value)}
                >
                  <option value="EUR">EUR - Euro</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'logistics' && (
            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.contactPerson')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.contactPerson}
                  onChange={e => handleChange('contactPerson', e.target.value)}
                  placeholder={t('suppliers.fields.contactPersonPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.contactPhone')}</label>
                <input
                  type="tel"
                  className={styles.input}
                  value={formData.contactPhone}
                  onChange={e => handleChange('contactPhone', e.target.value)}
                  placeholder={t('suppliers.fields.contactPhonePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('suppliers.fields.contactEmail')}</label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.contactEmail}
                  onChange={e => handleChange('contactEmail', e.target.value)}
                  placeholder={t('suppliers.fields.contactEmailPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroupFull}>
                <label className={styles.label}>{t('suppliers.fields.openingHours')}</label>
                <textarea
                  className={styles.textarea}
                  value={formData.openingHours}
                  onChange={e => handleChange('openingHours', e.target.value)}
                  placeholder={t('suppliers.fields.openingHoursPlaceholder')}
                  rows={3}
                />
              </div>

              <div className={styles.fieldGroupFull}>
                <label className={styles.label}>{t('suppliers.fields.closingDays')}</label>
                <textarea
                  className={styles.textarea}
                  value={formData.closingDays}
                  onChange={e => handleChange('closingDays', e.target.value)}
                  placeholder={t('suppliers.fields.closingDaysPlaceholder')}
                  rows={2}
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
