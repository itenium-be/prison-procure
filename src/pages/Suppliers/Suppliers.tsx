import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable, Column } from '../../components/DataTable'
import { DUMMY_SUPPLIERS, Supplier } from '../../data/suppliers'
import styles from './Suppliers.module.css'

export function Suppliers() {
  const { t } = useTranslation()

  const columns: Column<Supplier>[] = [
    {
      key: 'code',
      header: t('suppliers.columns.code'),
      sortable: true,
    },
    {
      key: 'name',
      header: t('suppliers.columns.name'),
      sortable: true,
    },
    {
      key: 'telephone',
      header: t('suppliers.columns.telephone'),
      sortable: true,
    },
    {
      key: 'email',
      header: t('suppliers.columns.email'),
      sortable: true,
    },
    {
      key: 'language',
      header: t('suppliers.columns.language'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'NL', label: 'NL' },
        { value: 'FR', label: 'FR' },
        { value: 'DE', label: 'DE' },
        { value: 'EN', label: 'EN' },
      ],
      render: (value) => (
        <span className={styles.languageBadge}>{String(value)}</span>
      ),
    },
    {
      key: 'published',
      header: t('suppliers.columns.published'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'true', label: t('common.yes') },
        { value: 'false', label: t('common.no') },
      ],
      render: (value) => (
        <span className={`${styles.statusBadge} ${value ? styles.published : styles.unpublished}`}>
          {value ? t('common.yes') : t('common.no')}
        </span>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{t('suppliers.title')}</h1>
          <p>{t('suppliers.description')}</p>
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          {t('suppliers.addSupplier')}
        </button>
      </div>

      <DataTable
        data={DUMMY_SUPPLIERS as unknown as Record<string, unknown>[]}
        columns={columns as Column<Record<string, unknown>>[]}
        keyField="id"
      />
    </div>
  )
}
