import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Package, Truck, Warehouse, CreditCard, FileText, Upload, X } from 'lucide-react'
import { ARTICLE_GROUPS, ARTICLE_SUBGROUPS, DUMMY_ARTICLES } from '../../data/articles'
import styles from './ArticleDetail.module.css'

type TabType = 'general' | 'suppliers' | 'warehouse' | 'financial' | 'documents'

interface SupplierPrice {
  supplierId: string
  price: number
  deliveryDays: number
}

interface Document {
  id: string
  name: string
  type: 'pds' | 'drawing' | 'certificate'
  uploadDate: string
}

interface ArticleFormData {
  // General
  code: string
  description: string
  group: string
  subgroup: string
  packaging: string
  unit: 'st' | 'kg'
  brand: string
  eanCode: string
  intrastat: string
  blocked: boolean
  // Suppliers
  preferredSupplierId: string
  alternativeSupplierId: string
  supplierPrices: SupplierPrice[]
  // Warehouse
  warehouseId: string
  pickLocation: string
  isOrderArticle: boolean
  stockSystem: 'FEFO' | 'LIFO' | 'FIFO'
  orderQuantityMin: number
  orderQuantityMax: number
  orderQuantityStandard: number
  safetyStock: number
  minimumStock: number
  maximumStock: number
  // Financial
  vatClassification: string
  // Documents
  documents: Document[]
}

const initialFormData: ArticleFormData = {
  code: '',
  description: '',
  group: '',
  subgroup: '',
  packaging: '',
  unit: 'st',
  brand: '',
  eanCode: '',
  intrastat: '',
  blocked: false,
  preferredSupplierId: '',
  alternativeSupplierId: '',
  supplierPrices: [],
  warehouseId: '',
  pickLocation: '',
  isOrderArticle: true,
  stockSystem: 'FIFO',
  orderQuantityMin: 0,
  orderQuantityMax: 0,
  orderQuantityStandard: 0,
  safetyStock: 0,
  minimumStock: 0,
  maximumStock: 0,
  vatClassification: '21',
  documents: [],
}

// Mock suppliers for lookup
const mockSuppliers = [
  { id: '1', code: 'SUP001', name: 'Colruyt Group NV' },
  { id: '2', code: 'SUP002', name: 'Delhaize Belgium NV' },
  { id: '3', code: 'SUP003', name: 'Metro Cash & Carry Belgium' },
  { id: '4', code: 'SUP004', name: 'Makro Belgium NV' },
  { id: '5', code: 'SUP005', name: 'Sligro Food Group Belgium' },
  { id: '6', code: 'SUP006', name: 'Carrefour Belgium SA' },
  { id: '7', code: 'SUP007', name: 'Java Foodservice NV' },
  { id: '8', code: 'SUP008', name: 'Bidfood Belgium NV' },
]

// Mock warehouses
const mockWarehouses = [
  { id: 'WH001', name: 'Hoofdmagazijn' },
  { id: 'WH002', name: 'Keukenmagazijn' },
  { id: 'WH003', name: 'Koelcel' },
  { id: 'WH004', name: 'Diepvriescel' },
  { id: 'WH005', name: 'Schoonmaakproducten' },
]

// Mock extended article data
const mockArticleDetails: Record<string, Partial<ArticleFormData>> = {
  '1': {
    preferredSupplierId: '1',
    alternativeSupplierId: '6',
    supplierPrices: [
      { supplierId: '1', price: 4.50, deliveryDays: 2 },
      { supplierId: '6', price: 4.75, deliveryDays: 3 },
    ],
    warehouseId: 'WH001',
    pickLocation: 'A-12-03',
    isOrderArticle: true,
    stockSystem: 'FIFO',
    orderQuantityMin: 10,
    orderQuantityMax: 100,
    orderQuantityStandard: 50,
    safetyStock: 20,
    minimumStock: 30,
    maximumStock: 150,
    vatClassification: '21',
    documents: [
      { id: 'd1', name: 'Productfiche_CocaCola.pdf', type: 'pds', uploadDate: '2024-01-15' },
    ],
  },
  '5': {
    preferredSupplierId: '7',
    alternativeSupplierId: '8',
    supplierPrices: [
      { supplierId: '7', price: 8.50, deliveryDays: 1 },
      { supplierId: '8', price: 8.75, deliveryDays: 2 },
    ],
    warehouseId: 'WH003',
    pickLocation: 'K-05-01',
    isOrderArticle: true,
    stockSystem: 'FEFO',
    orderQuantityMin: 5,
    orderQuantityMax: 50,
    orderQuantityStandard: 20,
    safetyStock: 10,
    minimumStock: 15,
    maximumStock: 60,
    vatClassification: '6',
    documents: [
      { id: 'd2', name: 'Kwaliteitscertificaat_Kip.pdf', type: 'certificate', uploadDate: '2024-02-20' },
      { id: 'd3', name: 'Productinformatieblad.pdf', type: 'pds', uploadDate: '2024-02-20' },
    ],
  },
}

function generateArticleCode(): string {
  const maxCode = DUMMY_ARTICLES.reduce((max, article) => {
    const num = parseInt(article.code.replace('ART-', ''))
    return num > max ? num : max
  }, 0)
  return `ART-${String(maxCode + 1).padStart(6, '0')}`
}

export function ArticleDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = id === 'new'

  const [activeTab, setActiveTab] = useState<TabType>('general')
  const [formData, setFormData] = useState<ArticleFormData>(initialFormData)
  const [availableSubgroups, setAvailableSubgroups] = useState<{ id: string; nameKey: string }[]>([])

  useEffect(() => {
    if (isNew) {
      setFormData(prev => ({ ...prev, code: generateArticleCode() }))
    } else if (id) {
      const article = DUMMY_ARTICLES.find(a => a.id === id)
      if (article) {
        const extendedData = mockArticleDetails[id] || {}
        setFormData({
          ...initialFormData,
          code: article.code,
          description: article.description,
          group: article.group,
          subgroup: article.subgroup,
          packaging: article.packaging,
          unit: article.unit,
          brand: article.brand,
          eanCode: article.eanCode,
          intrastat: article.intrastat,
          blocked: article.blocked,
          ...extendedData,
        })
        if (article.group) {
          setAvailableSubgroups(ARTICLE_SUBGROUPS[article.group] || [])
        }
      }
    }
  }, [id, isNew])

  const tabs = [
    { id: 'general' as TabType, label: t('articles.detail.tabs.general'), icon: Package },
    { id: 'suppliers' as TabType, label: t('articles.detail.tabs.suppliers'), icon: Truck },
    { id: 'warehouse' as TabType, label: t('articles.detail.tabs.warehouse'), icon: Warehouse },
    { id: 'financial' as TabType, label: t('articles.detail.tabs.financial'), icon: CreditCard },
    { id: 'documents' as TabType, label: t('articles.detail.tabs.documents'), icon: FileText },
  ]

  const handleChange = (field: keyof ArticleFormData, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    if (field === 'group') {
      setAvailableSubgroups(ARTICLE_SUBGROUPS[value as string] || [])
      setFormData(prev => ({ ...prev, subgroup: '' }))
    }
  }

  const handleSupplierPriceChange = (supplierId: string, field: 'price' | 'deliveryDays', value: number) => {
    setFormData(prev => {
      const prices = [...prev.supplierPrices]
      const index = prices.findIndex(p => p.supplierId === supplierId)
      if (index >= 0) {
        prices[index] = { ...prices[index], [field]: value }
      } else {
        prices.push({ supplierId, price: 0, deliveryDays: 0, [field]: value })
      }
      return { ...prev, supplierPrices: prices }
    })
  }

  const getSupplierPrice = (supplierId: string): SupplierPrice | undefined => {
    return formData.supplierPrices.find(p => p.supplierId === supplierId)
  }

  const getSupplierName = (supplierId: string): string => {
    const supplier = mockSuppliers.find(s => s.id === supplierId)
    return supplier ? supplier.name : ''
  }

  const handleRemoveDocument = (docId: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== docId),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Saving article:', formData)
    navigate('/articles')
  }

  const handleCancel = () => {
    navigate('/articles')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleCancel}>
          <ArrowLeft size={20} />
          {t('common.back')}
        </button>
        <h1>{isNew ? t('articles.detail.newArticle') : t('articles.detail.editArticle')}</h1>
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
                <label className={styles.label}>{t('articles.detail.fields.code')}</label>
                <input
                  type="text"
                  className={`${styles.input} ${styles.readonly}`}
                  value={formData.code}
                  readOnly
                  disabled
                />
                <span className={styles.hint}>{t('articles.detail.fields.codeHint')}</span>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.description')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder={t('articles.detail.fields.descriptionPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.group')}</label>
                <select
                  className={styles.select}
                  value={formData.group}
                  onChange={e => handleChange('group', e.target.value)}
                >
                  <option value="">{t('articles.detail.fields.selectGroup')}</option>
                  {ARTICLE_GROUPS.map(group => (
                    <option key={group.id} value={group.id}>
                      {t(group.nameKey)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.subgroup')}</label>
                <select
                  className={styles.select}
                  value={formData.subgroup}
                  onChange={e => handleChange('subgroup', e.target.value)}
                  disabled={!formData.group}
                >
                  <option value="">{t('articles.detail.fields.selectSubgroup')}</option>
                  {availableSubgroups.map(subgroup => (
                    <option key={subgroup.id} value={subgroup.id}>
                      {t(subgroup.nameKey)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.packaging')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.packaging}
                  onChange={e => handleChange('packaging', e.target.value)}
                  placeholder={t('articles.detail.fields.packagingPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.unit')}</label>
                <select
                  className={styles.select}
                  value={formData.unit}
                  onChange={e => handleChange('unit', e.target.value)}
                >
                  <option value="st">{t('articles.units.piece')}</option>
                  <option value="kg">{t('articles.units.kg')}</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.brand')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.brand}
                  onChange={e => handleChange('brand', e.target.value)}
                  placeholder={t('articles.detail.fields.brandPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.eanCode')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.eanCode}
                  onChange={e => handleChange('eanCode', e.target.value)}
                  placeholder={t('articles.detail.fields.eanCodePlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.intrastat')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.intrastat}
                  onChange={e => handleChange('intrastat', e.target.value)}
                  placeholder={t('articles.detail.fields.intrastatPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.blocked')}</label>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={formData.blocked}
                    onChange={e => handleChange('blocked', e.target.checked)}
                  />
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {formData.blocked ? t('common.yes') : t('common.no')}
                  </span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.preferredSupplier')}</label>
                <select
                  className={styles.select}
                  value={formData.preferredSupplierId}
                  onChange={e => handleChange('preferredSupplierId', e.target.value)}
                >
                  <option value="">{t('articles.detail.fields.selectSupplier')}</option>
                  {mockSuppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.code} - {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              {formData.preferredSupplierId && (
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t('articles.detail.fields.supplierName')}</label>
                  <input
                    type="text"
                    className={`${styles.input} ${styles.readonly}`}
                    value={getSupplierName(formData.preferredSupplierId)}
                    readOnly
                    disabled
                  />
                </div>
              )}

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.alternativeSupplier')}</label>
                <select
                  className={styles.select}
                  value={formData.alternativeSupplierId}
                  onChange={e => handleChange('alternativeSupplierId', e.target.value)}
                >
                  <option value="">{t('articles.detail.fields.selectSupplier')}</option>
                  {mockSuppliers
                    .filter(s => s.id !== formData.preferredSupplierId)
                    .map(supplier => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.code} - {supplier.name}
                      </option>
                    ))}
                </select>
              </div>

              {formData.alternativeSupplierId && (
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t('articles.detail.fields.supplierName')}</label>
                  <input
                    type="text"
                    className={`${styles.input} ${styles.readonly}`}
                    value={getSupplierName(formData.alternativeSupplierId)}
                    readOnly
                    disabled
                  />
                </div>
              )}

              {(formData.preferredSupplierId || formData.alternativeSupplierId) && (
                <div className={styles.fieldGroupFull}>
                  <h3 className={styles.sectionTitle}>{t('articles.detail.fields.pricesDelivery')}</h3>
                  <div className={styles.supplierPriceTable}>
                    <table>
                      <thead>
                        <tr>
                          <th>{t('articles.detail.fields.supplier')}</th>
                          <th>{t('articles.detail.fields.purchasePrice')}</th>
                          <th>{t('articles.detail.fields.deliveryTime')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.preferredSupplierId && (
                          <tr>
                            <td>
                              <span className={styles.preferredBadge}>{t('articles.detail.fields.preferred')}</span>
                              {getSupplierName(formData.preferredSupplierId)}
                            </td>
                            <td>
                              <div className={styles.priceInput}>
                                <span className={styles.currency}>EUR</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={getSupplierPrice(formData.preferredSupplierId)?.price || ''}
                                  onChange={e => handleSupplierPriceChange(formData.preferredSupplierId, 'price', parseFloat(e.target.value) || 0)}
                                />
                              </div>
                            </td>
                            <td>
                              <div className={styles.deliveryInput}>
                                <input
                                  type="number"
                                  min="0"
                                  value={getSupplierPrice(formData.preferredSupplierId)?.deliveryDays || ''}
                                  onChange={e => handleSupplierPriceChange(formData.preferredSupplierId, 'deliveryDays', parseInt(e.target.value) || 0)}
                                />
                                <span className={styles.days}>{t('articles.detail.fields.days')}</span>
                              </div>
                            </td>
                          </tr>
                        )}
                        {formData.alternativeSupplierId && (
                          <tr>
                            <td>
                              <span className={styles.alternativeBadge}>{t('articles.detail.fields.alternative')}</span>
                              {getSupplierName(formData.alternativeSupplierId)}
                            </td>
                            <td>
                              <div className={styles.priceInput}>
                                <span className={styles.currency}>EUR</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={getSupplierPrice(formData.alternativeSupplierId)?.price || ''}
                                  onChange={e => handleSupplierPriceChange(formData.alternativeSupplierId, 'price', parseFloat(e.target.value) || 0)}
                                />
                              </div>
                            </td>
                            <td>
                              <div className={styles.deliveryInput}>
                                <input
                                  type="number"
                                  min="0"
                                  value={getSupplierPrice(formData.alternativeSupplierId)?.deliveryDays || ''}
                                  onChange={e => handleSupplierPriceChange(formData.alternativeSupplierId, 'deliveryDays', parseInt(e.target.value) || 0)}
                                />
                                <span className={styles.days}>{t('articles.detail.fields.days')}</span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'warehouse' && (
            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.warehouse')}</label>
                <select
                  className={styles.select}
                  value={formData.warehouseId}
                  onChange={e => handleChange('warehouseId', e.target.value)}
                >
                  <option value="">{t('articles.detail.fields.selectWarehouse')}</option>
                  {mockWarehouses.map(wh => (
                    <option key={wh.id} value={wh.id}>
                      {wh.id} - {wh.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.pickLocation')}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.pickLocation}
                  onChange={e => handleChange('pickLocation', e.target.value)}
                  placeholder={t('articles.detail.fields.pickLocationPlaceholder')}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.isOrderArticle')}</label>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={formData.isOrderArticle}
                    onChange={e => handleChange('isOrderArticle', e.target.checked)}
                  />
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {formData.isOrderArticle ? t('common.yes') : t('common.no')}
                  </span>
                </label>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.stockSystem')}</label>
                <select
                  className={styles.select}
                  value={formData.stockSystem}
                  onChange={e => handleChange('stockSystem', e.target.value)}
                >
                  <option value="FIFO">FIFO - First In, First Out</option>
                  <option value="LIFO">LIFO - Last In, First Out</option>
                  <option value="FEFO">FEFO - First Expired, First Out</option>
                </select>
              </div>

              <div className={styles.fieldGroupFull}>
                <h3 className={styles.sectionTitle}>{t('articles.detail.fields.orderQuantities')}</h3>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.orderQuantityMin')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.orderQuantityMin}
                  onChange={e => handleChange('orderQuantityMin', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.orderQuantityMax')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.orderQuantityMax}
                  onChange={e => handleChange('orderQuantityMax', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.orderQuantityStandard')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.orderQuantityStandard}
                  onChange={e => handleChange('orderQuantityStandard', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>

              <div className={styles.fieldGroupFull}>
                <h3 className={styles.sectionTitle}>{t('articles.detail.fields.stockLevels')}</h3>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.safetyStock')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.safetyStock}
                  onChange={e => handleChange('safetyStock', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.minimumStock')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.minimumStock}
                  onChange={e => handleChange('minimumStock', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.maximumStock')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.maximumStock}
                  onChange={e => handleChange('maximumStock', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t('articles.detail.fields.vatClassification')}</label>
                <select
                  className={styles.select}
                  value={formData.vatClassification}
                  onChange={e => handleChange('vatClassification', e.target.value)}
                >
                  <option value="0">0% - {t('articles.detail.fields.vatExempt')}</option>
                  <option value="6">6% - {t('articles.detail.fields.vatReduced')}</option>
                  <option value="12">12% - {t('articles.detail.fields.vatIntermediate')}</option>
                  <option value="21">21% - {t('articles.detail.fields.vatStandard')}</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className={styles.documentsSection}>
              <div className={styles.uploadArea}>
                <Upload size={48} className={styles.uploadIcon} />
                <p>{t('articles.detail.fields.dragDropFiles')}</p>
                <button type="button" className={styles.uploadButton}>
                  {t('articles.detail.fields.selectFiles')}
                </button>
                <span className={styles.uploadHint}>{t('articles.detail.fields.supportedFormats')}</span>
              </div>

              {formData.documents.length > 0 && (
                <div className={styles.documentsList}>
                  <h3 className={styles.sectionTitle}>{t('articles.detail.fields.uploadedDocuments')}</h3>
                  <table className={styles.documentsTable}>
                    <thead>
                      <tr>
                        <th>{t('articles.detail.fields.documentName')}</th>
                        <th>{t('articles.detail.fields.documentType')}</th>
                        <th>{t('articles.detail.fields.uploadDate')}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.documents.map(doc => (
                        <tr key={doc.id}>
                          <td>
                            <FileText size={16} className={styles.docIcon} />
                            {doc.name}
                          </td>
                          <td>
                            <span className={`${styles.docTypeBadge} ${styles[doc.type]}`}>
                              {t(`articles.detail.fields.docType.${doc.type}`)}
                            </span>
                          </td>
                          <td>{doc.uploadDate}</td>
                          <td>
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => handleRemoveDocument(doc.id)}
                            >
                              <X size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
