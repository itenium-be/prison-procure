import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DataTable, Column } from '../../components/DataTable'
import { DUMMY_ARTICLES, Article } from '../../data/articles'
import styles from './Articles.module.css'

export function Articles() {
  const { t } = useTranslation()

  const columns: Column<Article>[] = [
    {
      key: 'code',
      header: t('articles.columns.code'),
      sortable: true,
      render: (value) => (
        <span className={styles.codeCell}>{String(value)}</span>
      ),
    },
    {
      key: 'description',
      header: t('articles.columns.description'),
      sortable: true,
    },
    {
      key: 'group',
      header: t('articles.columns.group'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'food', label: t('articles.groups.food') },
        { value: 'beverages', label: t('articles.groups.beverages') },
        { value: 'hygiene', label: t('articles.groups.hygiene') },
        { value: 'cleaning', label: t('articles.groups.cleaning') },
        { value: 'office', label: t('articles.groups.office') },
      ],
      render: (value) => t(`articles.groups.${value}`),
    },
    {
      key: 'subgroup',
      header: t('articles.columns.subgroup'),
      sortable: true,
      render: (value) => t(`articles.subgroups.${value}`),
    },
    {
      key: 'packaging',
      header: t('articles.columns.packaging'),
      sortable: true,
    },
    {
      key: 'unit',
      header: t('articles.columns.unit'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'st', label: t('articles.units.piece') },
        { value: 'kg', label: t('articles.units.kg') },
      ],
      render: (value) => (
        <span className={styles.unitBadge}>
          {value === 'st' ? t('articles.units.piece') : t('articles.units.kg')}
        </span>
      ),
    },
    {
      key: 'brand',
      header: t('articles.columns.brand'),
      sortable: true,
    },
    {
      key: 'eanCode',
      header: t('articles.columns.eanCode'),
      sortable: true,
      render: (value) => (
        <span className={styles.eanCell}>{String(value)}</span>
      ),
    },
    {
      key: 'intrastat',
      header: t('articles.columns.intrastat'),
      sortable: true,
    },
    {
      key: 'blocked',
      header: t('articles.columns.blocked'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'true', label: t('common.yes') },
        { value: 'false', label: t('common.no') },
      ],
      render: (value) => (
        <span className={`${styles.statusBadge} ${value ? styles.blocked : styles.active}`}>
          {value ? t('common.yes') : t('common.no')}
        </span>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{t('articles.title')}</h1>
          <p>{t('articles.description')}</p>
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          {t('articles.addArticle')}
        </button>
      </div>

      <DataTable
        data={DUMMY_ARTICLES as unknown as Record<string, unknown>[]}
        columns={columns as Column<Record<string, unknown>>[]}
        keyField="id"
      />
    </div>
  )
}
