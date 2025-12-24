import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Warehouse, Package, Plus, TrendingUp, TrendingDown, AlertTriangle, Pencil, Trash2 } from 'lucide-react'
import { usePrison } from '../../context/PrisonContext'
import { DUMMY_WAREHOUSES, DUMMY_ARTICLE_STOCKS, Warehouse as WarehouseType, ArticleStock } from '../../data/stock'
import styles from './Stock.module.css'

type TabType = 'warehouses' | 'timeline'

export function Stock() {
  const { t } = useTranslation()
  const { selectedPrison } = usePrison()
  const [activeTab, setActiveTab] = useState<TabType>('warehouses')
  const [selectedArticle, setSelectedArticle] = useState<ArticleStock | null>(null)
  const [dateRange, setDateRange] = useState({ from: '2024-12-01', to: '2024-12-24' })

  // Filter warehouses by selected prison
  const warehouses = DUMMY_WAREHOUSES.filter(w => w.prisonId === selectedPrison?.id)

  const tabs = [
    { id: 'warehouses' as TabType, label: t('stock.tabs.warehouses'), icon: Warehouse },
    { id: 'timeline' as TabType, label: t('stock.tabs.timeline'), icon: Package },
  ]

  const renderWarehouses = () => (
    <div className={styles.warehousesSection}>
      <div className={styles.sectionHeader}>
        <h2>{t('stock.warehouses.title')}</h2>
        <button className={styles.addButton}>
          <Plus size={20} />
          {t('stock.warehouses.add')}
        </button>
      </div>

      {warehouses.length === 0 ? (
        <div className={styles.emptyState}>
          <Warehouse size={48} />
          <p>{t('stock.warehouses.empty')}</p>
        </div>
      ) : (
        <div className={styles.warehouseGrid}>
          {warehouses.map(warehouse => (
            <div key={warehouse.id} className={styles.warehouseCard}>
              <div className={styles.warehouseIcon}>
                <Warehouse size={24} />
              </div>
              <div className={styles.warehouseInfo}>
                <span className={styles.warehouseCode}>{warehouse.code}</span>
                <span className={styles.warehouseName}>{warehouse.name}</span>
              </div>
              <div className={styles.warehouseActions}>
                <button className={styles.iconButton} title={t('common.edit')}>
                  <Pencil size={16} />
                </button>
                <button className={`${styles.iconButton} ${styles.danger}`} title={t('common.delete')}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderTimeline = () => (
    <div className={styles.timelineSection}>
      <div className={styles.timelineControls}>
        <div className={styles.articleSelect}>
          <label>{t('stock.timeline.selectArticle')}</label>
          <select
            value={selectedArticle?.articleId || ''}
            onChange={(e) => {
              const article = DUMMY_ARTICLE_STOCKS.find(a => a.articleId === e.target.value)
              setSelectedArticle(article || null)
            }}
          >
            <option value="">{t('stock.timeline.chooseArticle')}</option>
            {DUMMY_ARTICLE_STOCKS.map(article => (
              <option key={article.articleId} value={article.articleId}>
                {article.articleCode} - {article.articleName}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.dateRange}>
          <div className={styles.dateInput}>
            <label>{t('stock.timeline.from')}</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            />
          </div>
          <div className={styles.dateInput}>
            <label>{t('stock.timeline.to')}</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {selectedArticle ? (
        <>
          <div className={styles.stockSummary}>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{t('stock.timeline.currentStock')}</span>
              <span className={styles.summaryValue}>
                {selectedArticle.currentStock} {selectedArticle.unit}
              </span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{t('stock.timeline.minStock')}</span>
              <span className={styles.summaryValue}>
                {selectedArticle.minStock} {selectedArticle.unit}
              </span>
            </div>
            <div className={`${styles.summaryCard} ${selectedArticle.currentStock < selectedArticle.minStock ? styles.warning : styles.ok}`}>
              <span className={styles.summaryLabel}>{t('stock.timeline.status')}</span>
              <span className={styles.summaryValue}>
                {selectedArticle.currentStock < selectedArticle.minStock ? (
                  <><AlertTriangle size={16} /> {t('stock.timeline.lowStock')}</>
                ) : (
                  t('stock.timeline.stockOk')
                )}
              </span>
            </div>
          </div>

          <div className={styles.movementsTable}>
            <table>
              <thead>
                <tr>
                  <th>{t('stock.timeline.date')}</th>
                  <th>{t('stock.timeline.type')}</th>
                  <th>{t('stock.timeline.quantity')}</th>
                  <th>{t('stock.timeline.reference')}</th>
                  <th>{t('stock.timeline.runningStock')}</th>
                </tr>
              </thead>
              <tbody>
                {selectedArticle.movements
                  .filter(m => m.date >= dateRange.from && m.date <= dateRange.to)
                  .map(movement => (
                    <tr key={movement.id} className={movement.runningStock < selectedArticle.minStock ? styles.lowStockRow : ''}>
                      <td>{new Date(movement.date).toLocaleDateString('nl-BE')}</td>
                      <td>
                        <span className={`${styles.movementType} ${styles[movement.type]}`}>
                          {movement.type === 'in' ? (
                            <><TrendingUp size={14} /> {t('stock.timeline.in')}</>
                          ) : (
                            <><TrendingDown size={14} /> {t('stock.timeline.out')}</>
                          )}
                        </span>
                      </td>
                      <td className={styles.quantity}>
                        <span className={movement.type === 'in' ? styles.positive : styles.negative}>
                          {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                        </span>
                      </td>
                      <td>{movement.reference}</td>
                      <td className={styles.runningStock}>
                        {movement.runningStock < selectedArticle.minStock && (
                          <AlertTriangle size={14} className={styles.warningIcon} />
                        )}
                        {movement.runningStock} {selectedArticle.unit}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className={styles.stockForecast}>
            <h3>{t('stock.timeline.forecast')}</h3>
            <p className={styles.forecastText}>
              {selectedArticle.currentStock < selectedArticle.minStock
                ? t('stock.timeline.forecastLow')
                : t('stock.timeline.forecastOk', { days: Math.floor(selectedArticle.currentStock / 5) })}
            </p>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <Package size={48} />
          <p>{t('stock.timeline.selectArticlePrompt')}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{t('stock.title')}</h1>
          <p className={styles.subtitle}>{t('stock.description')}</p>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'warehouses' && renderWarehouses()}
        {activeTab === 'timeline' && renderTimeline()}
      </div>
    </div>
  )
}
