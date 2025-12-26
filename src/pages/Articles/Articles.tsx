import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil } from 'lucide-react'
import { DataTable, Column } from '../../components/DataTable'
import { DUMMY_ARTICLES, Article } from '../../data/articles'
import styles from './Articles.module.css'

export function Articles() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleEdit = (id: string) => {
    navigate(`/articles/${id}`)
  }

  const handleAddNew = () => {
    navigate('/articles/new')
  }

  const columns: Column<Article>[] = [
    // Combined column for small devices: code + description + blocked
    {
      key: 'code',
      header: t('articles.columns.description'),
      className: styles.showOnSmall,
      render: (_, row) => (
        <div className={styles.combinedCell}>
          <button
            className={styles.codeLink}
            onClick={() => handleEdit(String(row.id))}
          >
            {row.code}
          </button>
          <span className={styles.combinedDescription}>{row.description}</span>
          {row.blocked && (
            <span className={styles.combinedBadge}>
              {t('suppliers.blocked')}
            </span>
          )}
        </div>
      ),
    },
    // Regular code column (hidden on small)
    {
      key: 'code',
      header: t('articles.columns.code'),
      sortable: true,
      className: styles.hideOnSmall,
      render: (value, row) => (
        <button
          className={styles.codeLink}
          onClick={() => handleEdit(String(row.id))}
        >
          {String(value)}
        </button>
      ),
    },
    // Regular description column (hidden on small)
    {
      key: 'description',
      header: t('articles.columns.description'),
      sortable: true,
      className: styles.hideOnSmall,
    },
    // Regular group column (hidden on medium and smaller)
    {
      key: 'group',
      header: t('articles.columns.group'),
      sortable: true,
      filterable: true,
      className: styles.hideOnMedium,
      filterOptions: [
        { value: 'food', label: t('articles.groups.food') },
        { value: 'beverages', label: t('articles.groups.beverages') },
        { value: 'hygiene', label: t('articles.groups.hygiene') },
        { value: 'cleaning', label: t('articles.groups.cleaning') },
        { value: 'office', label: t('articles.groups.office') },
      ],
      render: (value) => t(`articles.groups.${value}`),
    },
    // Combined group/subgroup column (shown only on medium, hidden on small)
    {
      key: 'subgroup',
      header: t('articles.columns.group'),
      className: styles.showOnMedium,
      render: (_, row) => (
        <div className={styles.combinedGroupCell}>
          <span className={styles.groupLine}>{t(`articles.groups.${row.group}`)}</span>
          <span className={styles.subgroupLine}>{t(`articles.subgroups.${row.subgroup}`)}</span>
        </div>
      ),
    },
    // Regular subgroup column (hidden on medium and smaller)
    {
      key: 'subgroup',
      header: t('articles.columns.subgroup'),
      sortable: true,
      className: styles.hideOnMedium,
      render: (value) => t(`articles.subgroups.${value}`),
    },
    {
      key: 'packaging',
      header: t('articles.columns.packaging'),
      sortable: true,
      className: styles.hideOnLarge,
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
      className: styles.hideOnLarge,
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
      className: styles.hideOnLarge,
    },
    // Regular blocked column (hidden on small)
    {
      key: 'blocked',
      header: t('articles.columns.blocked'),
      sortable: true,
      filterable: true,
      className: styles.hideOnSmall,
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
    {
      key: 'id',
      header: t('articles.columns.actions'),
      render: (_, row) => (
        <button
          className={styles.editButton}
          onClick={() => handleEdit(String(row.id))}
          title={t('common.edit')}
        >
          <Pencil size={16} />
        </button>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{t('articles.title')}</h1>
          <p className={styles.subtitle}>{t('articles.description')}</p>
        </div>
        <button className={styles.addButton} onClick={handleAddNew}>
          <Plus size={20} />
          {t('articles.addArticle')}
        </button>
      </div>

      <DataTable<Article>
        data={DUMMY_ARTICLES}
        columns={columns}
        keyField="id"
      />
    </div>
  )
}
